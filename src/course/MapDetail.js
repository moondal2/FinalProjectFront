import './MapDetail.css';
import CourseModal from "../modal/CourseModal";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import { LegendToggleOutlined } from '@mui/icons-material';
import MapIcon from '@mui/icons-material/Map';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import jwt_decode from 'jwt-decode';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
// import { Swiper, SwiperSlide } from 'swiper/react';
import MapDetailComment from './MapDetailComment';


function MapDetail(props) {

    let nickName = null;
    let userId = null;
    let jwtToken = null;
    if (sessionStorage.getItem('token') != null) {
        jwtToken = sessionStorage.getItem('token');
        userId = jwt_decode(jwtToken).sub;
        nickName = jwt_decode(jwtToken).nickname;
    }

    const header = {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
    };



    const googleMapKey = 'AIzaSyA5TChzH-V9NZ7sp0JKZd2AK64_7LjFAEw';
    const [mapMarkers, setMapMarkers] = useState('');
    const [arrMarker, setArrMarker] = useState([]);
    const [markerNumber, setMarkerNumber] = useState(1);

    let googleMapURL = `https://maps.googleapis.com/maps/api/staticmap?&size=296x250&maptype=roadmap&${mapMarkers}&key=${googleMapKey}`;

    const modal = props.modal;
    const setModal = props.setModal;
    const title = props.title;
    const writer = props.userId;
    const userNickname = props.userNickname;
    const startDate = props.startDate;
    const endDate = props.endDate;
    const days = props.days;
    const removeDuplicates = props.removeDuplicates;
    const modalStateClose = props.modalStateClose;

    const navigate = useNavigate();

    let day식별자 = [];

    const 객체배열담기 = (origin) => {
        const originArr = origin;
        const 담을배열 = [];
        let 임시객체 = [];

        //고유키값설정
        day식별자 = removeDuplicates(originArr, 'day');

        for (let i = 0; i < day식별자.length; i++) {
            for (let j = 0; j < originArr.length; j++) {
                if (day식별자[i].day == originArr[j].day) {
                    임시객체 = [
                        ...임시객체, {
                            travelcourseIdx: originArr[j].travelcourseIdx,
                            day: originArr[j].day,
                            dayDescription: originArr[j].dayDescription,
                            lat: originArr[j].lat,
                            lng: originArr[j].lng,
                            orders: originArr[j].orders,
                            placeName: originArr[j].placeName
                        }
                    ]
                }
            }
            if (임시객체 != 0) {
                담을배열.push(임시객체);
            }
            임시객체 = [];//초기화
        }
        return 담을배열;
    }


    //days를 사용해서 DAY별 객체로 담음. days는 day중복있는 데이터.
    const 필터day = 객체배열담기(days)

    //마커정리하기
    const handlerChangeMarkers = (index) => {
        let tempMakers = '';
        let number = 1;
        let tempArrMarker = [];
        필터day[index].forEach(element => {
            tempMakers = tempMakers + "&markers=color:red%7Clabel:" + number++ + "%7C" + element.lat + "," + element.lng + "&markers=size:tiny";
            tempArrMarker.push(`${element.lat},${element.lng}`)
        });
        setArrMarker(tempArrMarker);
        setMapMarkers(tempMakers);
        setMarkerNumber(1);
        console.log(tempArrMarker);
    }

    const travelcourseIdx = 필터day[0][0].travelcourseIdx;
    console.log(travelcourseIdx);

    //{핸들러} 구글맵으로 이동
    const handlerMoveToGoogleMap = () => {

        window.open(`https://www.google.com/maps/search/${arrMarker[markerNumber - 1]}`, '_blank');
    }

    //{핸들러} 구글맵으로 이동할 마커번호 줄이기
    const handlerMarkerNumberMinus = () => {

        if (markerNumber == 1) {
            return
        } else {
            setMarkerNumber(markerNumber - 1);
        }
    }

    const handlerMarkerNumberPlus = () => {

        if (markerNumber == arrMarker.length) {
            return
        } else {
            setMarkerNumber(markerNumber + 1);
        }
    }

    // useEffect(() => {
    //     axios.get(`http://localhost:8080/api/course/${travelcourseIdx}`)
    //         .then(response => {
    //             console.log(response);
    //             setCourse(response.data);

    //             setTravelcourseTitle(response.data.travelcoursetitle);
    //             setTravelcourseContents(response.data.travelcoursecontents);
    //         })
    //         .catch(error => console.log(error));
    // }, []);

    // const handlerClickUpdate = () => {
    //     axios.put(`http://localhost:8080/api/course/${travelcourseIdx}`,
    //         { 'travelcoursetitle': travelcourseTitle, 'travelcoursecontents': travelcourseContents })
    //         .then(response => {
    //             console.log(response);
    //             if (response.data === 1) {
    //                 alert('수정됨.');
    //             } else {
    //                 alert('수정안됨.');
    //                 return;
    //             }
    //         })
    //         .catch(error => {
    //             console.log(error);
    //             alert(`수정에 실패. (${error.message})`);
    //             return;
    //         });
    // };

    // const handlerClickDelete = () => {
    //     axios.delete(`http://localhost:8080/api/course/${travelcourseIdx}`)
    //         .then(response => {
    //             console.log(response);
    //             if (response.data === 1) {
    //                 alert('삭제됨');
    //                 navigate('/course');
    //                 return;
    //             }
    //         })
    //         .catch(error => {
    //             console.log(error);
    //             alert('삭제실패. (${error.message})');
    //             return;
    //         });
    // };

    let arrPlaceList = [];

    const getPlaceList = () => {
        let array = [];
        let strPlaceList = '';

        for (let i = 0; i < 필터day.length; i++) {
            for (let j = 0; j < 필터day[i].length; j++) {
                strPlaceList = strPlaceList + 필터day[i][j].placeName + " - ";

            }
            strPlaceList = strPlaceList.slice(0, -3);
            array.push(strPlaceList);
            strPlaceList = '';
        }

        return array;
    }

    arrPlaceList = getPlaceList();
    console.log(arrPlaceList);

    return (
        <CourseModal modal={modal} setModal={setModal} modalStateClose={modalStateClose}>
            <div className="container">
                <div id="mapdetail-wrap">
                    <span id="mapdetail-title">{title}</span>
                    {writer == userId &&
                        <>
                            <span id="mapdetail-edit-btn"><EditNoteOutlinedIcon /></span>
                            <span id="mapdetail-delete-btn"><DeleteForeverOutlinedIcon /></span>
                        </>
                    }
                    <div className="camera-black-line"></div>

                    <div id="camera-center-back">
                        <img id="mapdetail-userpic"
                            src="https://i.pinimg.com/564x/38/eb/7a/38eb7a74270f3e480224ffe26cb9d7d3.jpg" />
                        <span id="mapdetail-userid">{userNickname}</span>
                        <div id="mapdetail-img-list">
                            <NavigateBeforeRoundedIcon/>
                            <img src="https://i.pinimg.com/564x/46/c3/3e/46c33e15ecd057f3e80cf55ad3651ae8.jpg" />
                            <NavigateNextRoundedIcon/>
                        </div>
                        <MapDetailComment/>
                        <span id="mapdetail-date">{startDate}~{endDate}</span>
                    </div>

                    <div className="camera-black-line"></div>
                    <div id="mapdetail-course-list-wrap">
                        <div id="mapdetail-map">
                            <img src={googleMapURL} />
                            <div id="mapdetail-map-googlemap" >
                                <img style={{ width: "15px" }} src="https://play-lh.googleusercontent.com/Kf8WTct65hFJxBUDm5E-EpYsiDoLQiGGbnuyP6HBNax43YShXti9THPon1YKB6zPYpA" />
                                <span id="mapdetail-map-googlemap-btn" onClick={handlerMoveToGoogleMap}>구글맵에서 보기</span>
                                <span id="mapdetail-map-googlemap-pin">
                                    <ArrowLeftIcon onClick={() => handlerMarkerNumberMinus()} />
                                    {markerNumber}
                                    <ArrowRightIcon onClick={() => handlerMarkerNumberPlus()} />
                                </span>
                            </div>
                        </div>

                        <div id="mapdetail-course-list">

                            {/* day식별자로 중복제외한 day내용만 사용 */}
                            {day식별자 && day식별자.map((days, index) => (
                                <div onClick={() => handlerChangeMarkers(index)}>
                                    <div>
                                        <h2>DAY{days.day}</h2>
                                        <span>{days.dayDescription}</span>
                                    </div>
                                    <br />
                                    <p>{arrPlaceList[index]}</p>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>

        </CourseModal >
    );

}
export default MapDetail;