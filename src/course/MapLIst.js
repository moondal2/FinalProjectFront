import './MapList.css';
import { useEffect, useState } from "react"
import axios from "axios";
import jwt_decode from 'jwt-decode';
import Frame from "../main/Frame";
import MapEach from "./MapEach";
import Button from '@mui/material/Button';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import MapDetail from './MapDetail';


const MapList = () => {

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

    //모달을 배열로 변경
    const [modalState, setModalState] = useState([]);
    const [modal, setModal] = useState(false);
    const modalOpen = (index) => {
        let updateArray = [...modalState];
        updateArray[index] = true;
        console.log('몇번째 모달 켜진거지?', updateArray)
        setModalState(updateArray);
    }

    const modalStateClose = (index) => {
        let updateArray = [...modalState];
        updateArray[index] = false;
        setModalState(updateArray);
        document.body.style.cssText = `
        position: static;`
    }
    const [datas, setDatas] = useState([]);
    const [filterDatas, setFilterDatas] = useState([]);
    const [days, setDays] = useState([]);

    //시작하면 리스트 가져오는 함수
    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_JKS_IP}:8080/api/course`, 
        // { headers: header }
        )
            .then(response => {
                console.log(response);
                let array = response.data;
                array = removeDuplicates(array, "travelcourseIdx");
                setFilterDatas(array);

                //모달배열만들기 ( 글 개수만큼 )
                let updateModalArray = [...array];
                for (let i = 0; i < array.length; i++) {
                    updateModalArray[i] = false;
                }
                console.log(updateModalArray);
                setModalState(updateModalArray);

                console.log(array);
                setDatas(response.data);
                let 데이정보 = 객체배열담기(array, response.data);
                console.log(데이정보);
                setDays(데이정보);
            })
    }, []);

    const 객체배열담기 = (filter, origin) => {
        const 필터배열 = filter;
        const 원본배열 = origin;
        const 담을배열 = [];
        let 임시객체 = [];

        for (let i = 0; i < 필터배열.length; i++) {
            for (let j = 0; j < 원본배열.length; j++) {
                if (필터배열[i].travelcourseIdx == 원본배열[j].travelcourseIdx) {
                    임시객체 = [
                        ...임시객체, {
                            travelcourseIdx: 원본배열[j].travelcourseIdx,
                            day: 원본배열[j].day,
                            dayDescription: 원본배열[j].dayDescription,
                            lat: 원본배열[j].lat,
                            lng: 원본배열[j].lng,
                            orders: 원본배열[j].orders,
                            placeName: 원본배열[j].placeName
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


    //중복제거 함수
    const removeDuplicates = (array, key) => {
        const uniqueArray = [];
        const uniqueKeys = [];

        array.forEach((item) => {
            const value = item[key];
            if (!uniqueKeys.includes(value)) {
                uniqueKeys.push(value);
                uniqueArray.push(item);
            }
        });

        return uniqueArray;
    };


    return (
        <Frame>
            <div id="travelcourse-list-img">
                <img src="https://hearthookhome.com/wp-content/uploads/2018/08/How-to-make-a-travel-map-with-pins-1024x683.jpg" />
            </div>
            <div id='travelcourse-list-wrap'>
                <div id="travelcourse-list-title">여행코스</div>
                <div id="travelcourse-list-write">
                    <Link to="/course/mapwrite">
                        <Button variant="contained">WRITE</Button>
                    </Link>
                </div>
                <div id="travelcourse-list-lists">
                    {filterDatas && filterDatas.map((course, index) => (
                        <>
                            <MapEach
                                modalOpen={() => modalOpen(index)}
                                userNickname={course.userNickname}
                                startDate={course.travelcourseStartDate.substr(0, 10)}
                                endDate={course.travelcourseEndDate.substr(0, 10)}
                                title={course.travelcourseTitle}
                                days={days[index]}
                                modal={modal}
                                setModal={setModal}
                            />
                            {modalState[index] &&
                                <MapDetail
                                    modal={modal}
                                    setModal={setModal}
                                    userId={course.userId}
                                    userNickname={course.userNickname}
                                    startDate={course.travelcourseStartDate.substr(0, 10)}
                                    endDate={course.travelcourseEndDate.substr(0, 10)}
                                    title={course.travelcourseTitle}
                                    days={days[index]}
                                    modalStateClose={() => modalStateClose(index)}
                                    removeDuplicates={removeDuplicates}
                                />
                            }
                        </>
                    ))}
                </div>
                {
                    datas.length === 0 && (
                        <div>
                            <span> 데이터가 없다.</span>
                        </div>
                    )
                }
            </div>
        </Frame>
    );
};

export default MapList;