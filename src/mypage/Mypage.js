import './Mypage.css';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import EditNoteIcon from '@mui/icons-material/EditNote';
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';
import { useEffect, useState } from 'react';
import Frame from '../main/Frame';
import ProfileModifier from './ProfileModifier';
import NicknameModifier from './NicknameModifier';
import AddIcon from '@mui/icons-material/Add';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

const Mypage = () => {


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

    //모달 관련 변수, 핸들러
    const [modal1, setModal1] = useState(false);
    const [modal2, setModal2] = useState(false);

    const [user, setUser] = useState({});

    //게시글 관련 변수
    const [accompanyList, setAccompanyList] = useState([]);
    const [idealrealList, setIdealrealList] = useState([]);
    const [travelcourseList, setTravelcourseList] = useState([]);
    const [triedList, setTriedList] = useState([]);


    //{핸들러}프사 변경 모달
    const modal1Open = () => {
        setModal1(true);
    }
    //{핸들러}닉넴 변경 모달
    const modal2Open = () => {
        setModal2(true);
    }

    //프로필 이미지 미리보기 필요
    


    //페이지 접속시, 회원정보, 게시글 조회 필요
    useEffect(()=>{

        axios.get(`http://${process.env.REACT_APP_JKS_IP}:8080/api/mypage`, 
        { params: {userId: encodeURI(userId)}, headers: header}
        )
        .then((response)=>{
            console.log(response);
            const {accompany, idealreal, travelcourse, tried, user} = response.data;
            setAccompanyList(accompany);
            setIdealrealList(idealreal);
            setTravelcourseList(travelcourse);
            setTriedList(tried);
            setUser(user);
        })
        .catch((error)=>{
            console.log(error);
        })

    },[])


    //조회된 게시글이 4개 이상이면 4개로 줄이는 함수
    const arrUnder4List = (array) => {
        let TempArrList = [];
        if(array.length > 4) {
            TempArrList = array.slice(0,4)
        } else {
            TempArrList = array;
        } 
        
        return TempArrList;
    }



    const profileImg = `http://${process.env.REACT_APP_JKS_IP}:8080/api/getimage/${user.userImg}`;
    // 여행코스는 어떻게 해야 하지??


    return (
        <Frame>
            <div id="profile-wrap">
                <div id="profile-title">
                    My Page
                </div>
                <div id="profile">
                    <img src={profileImg}></img>
                    <p>{user.userNickname}</p>
                    <span className="modifier" onClick={modal1Open}><FlipCameraIosIcon />프로필 사진 변경</span>
                    <span className="modifier" onClick={modal2Open}><EditNoteIcon />닉네임 변경</span>
                </div>
                <div id="profile-recent-list">최근 작성글 목록</div>
                <div id="profile-board-wrap">
                    <div className="profile-board-list">
                        <div className="profile-board-title"><div>여행코스</div><AddIcon/></div>
                        { travelcourseList.length == 0 && <div className='profile-board-cont'>현재 작성한 글이 없습니다</div>}
                        { travelcourseList && arrUnder4List(travelcourseList).map((post, id)=>(
                            <div className='profile-board-cont'>{post.travelcourseTitle}</div>
                        ))}
                    </div>
                    <div className="profile-board-list">
                        <div className="profile-board-title"><div>어디까지</div><AddIcon/></div>
                        { triedList.length == 0 && <div className='profile-board-cont'>현재 작성한 글이 없습니다</div>}
                        { triedList && arrUnder4List(triedList).map((post, id)=>(
                            <div className='profile-board-cont'>{post.triedTitle}</div>
                        ))}
                    </div>
                    <div className="profile-board-list">
                        <div className="profile-board-title"><div>여행친구</div><AddIcon/></div>
                        { accompanyList.length == 0 && <div className='profile-board-cont'>현재 작성한 글이 없습니다</div>}
                        { accompanyList && arrUnder4List(accompanyList).map((post, id)=>(
                            <div className='profile-board-cont'>{post.accompanyTitle}</div>
                        ))}
                    </div>
                    <div className="profile-board-list">
                        <div className="profile-board-title"><div>이상과현실</div><AddIcon/></div>
                        { idealrealList.length == 0 && <div className='profile-board-cont'>현재 작성한 글이 없습니다</div>}
                        { idealrealList && arrUnder4List(idealrealList).map((post, id)=>(
                            <div className='profile-board-cont'>{post.idealrealTitle}</div>
                        ))}
                    </div>
                </div>
            </div>
            {modal1 && <ProfileModifier modal1={modal1} setModal1={setModal1} userId={userId} header={header} jwtToken={jwtToken} userImg={profileImg}/>}
            {modal2 && <NicknameModifier modal2={modal2} setModal2={setModal2} userId={userId} header={header} jwtToken={jwtToken} userNickname={user.userNickname}/>}
        </Frame>
    )
}

export default Mypage;