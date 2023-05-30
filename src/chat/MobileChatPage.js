import "./Chat.css";
import './MobileChatPage.css';
import Frame from "../main/Frame";
import Chatroom from './Chatroom';
import ChattingWindow from './ChattingWindow';
import { useRef, useState } from "react";
import jwt_decode from 'jwt-decode';


const MobileChatPage = () => {

    let nickName = null;
    let jwtToken = null;
    if (sessionStorage.getItem('token') != null) {
        jwtToken = sessionStorage.getItem('token');
        nickName = jwt_decode(jwtToken).nickname;
    }

    const header = {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
    };


    const [isChatroom, setIsChatroom] = useState(true);

    //상위컴포넌트에 올려서 버튼 누르면 true로 바꿔줘야됨.
    const [isGlobal, setIsGlobal] = useState(true);          //글로벌 채팅이면 true
    const [isAccompany, setIsAccompany] = useState(false);     //동행 채팅이면 true

    const [userId, setUserId] = useState(jwt_decode(sessionStorage.getItem('token')).sub);

    const [chatHistory, setChatHistory] = useState([]);

    const [동행글Idx, set동행글Idx] = useState(0);

    const stompClient = useRef(null);   //stomp를 바라보게 해둠. 하위컴포넌트로 props로 전달 함.

    //{핸들러: 글로벌채팅으로 ON}
    const handlerGlobalChat = () => {
        setIsGlobal(true);
        setIsAccompany(false);
        console.log("accompany", isAccompany);
        console.log("global", isGlobal);
    }

    //{핸들러: 동행채팅으로 ON}
    const handlerAccompanyChat = () => {
        setIsAccompany(true);
        setIsGlobal(false);
        console.log("accompany", isAccompany);
        console.log("global", isGlobal);
    }

    //{콜백함수: 구독 메시지 수신시}
    const onMessageReceived = payload => {
        const message = JSON.parse(payload.body);

        //수신된 메시지가 type이 JOIN이면서, 메시지의 sender와 sender가 같다면
        //IsJoin을 true로 설정하고, 채팅내역을 반영해줌.
        //아니면 채팅내역만 반영해줌.
        if (message.type === 'JOIN' && message.userId === userId) {
            // setIsJoin(true);
            message.history.map(msg => setChatHistory(chatHistory => [...chatHistory, msg]))

        } else {
            setChatHistory(chatHistory => [...chatHistory, message]);

        }
    };

    //뒤로 가기
    const handlerArrowBack = () => {
        setIsChatroom(true);
    }


    const handler동행글Idx = (e) => {
        set동행글Idx(e.target.value);
        console.log(e.target.value);
    }

    return (
        <Frame>


            <div id="mobilechat-wrap">
                <div id="chatTitle">
                    <em>Chat Room</em>
                </div>

                <button type="button" onClick={handlerGlobalChat}>글로벌채팅방</button>
                <button type="button" onClick={handlerAccompanyChat}>동행채팅방</button>
                {isChatroom ? <Chatroom
                    stompClient={stompClient}
                    userId={userId}
                    isGlobal={isGlobal}
                    isAccompany={isAccompany}
                    header={header}
                    nickName={nickName}
                    동행글Idx={동행글Idx}
                    handler동행글Idx={handler동행글Idx}
                    chatHistory={chatHistory}
                    setChatHistory={setChatHistory}
                    onMessageReceived={onMessageReceived}
                    isChatroom={isChatroom}
                    setIsChatroom={setIsChatroom} />
                    : <ChattingWindow
                        stompClient={stompClient}
                        userId={userId}
                        isGlobal={isGlobal}
                        isAccompany={isAccompany}
                        header={header}
                        nickName={nickName}
                        동행글Idx={동행글Idx}
                        handler동행글Idx={handler동행글Idx}
                        chatHistory={chatHistory}
                        setChatHistory={setChatHistory}
                        onMessageReceived={onMessageReceived}
                        isChatroom={isChatroom}
                        setIsChatroom={setIsChatroom} />}
            </div>
        </Frame>
    )
}
export default MobileChatPage;