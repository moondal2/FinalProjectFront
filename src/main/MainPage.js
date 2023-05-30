import React from 'react';
import Frame from './Frame';
import useScrollFadeIn from './useScrollFadeIn';
import './MainPage.css';

const MainPage = () => {
  // useScrollFadeIn 훅을 사용하여 애니메이션 효과를 적용
  const koreaIssueAnimation = useScrollFadeIn('up', 1, 0);
  const accompanyAnimation = useScrollFadeIn('up', 1, 0);
  const noticeAnimation = useScrollFadeIn('up', 1, 0);

  return (
    <Frame>
      <div id="main-page">
        <div id="main-koreaissue" ref={koreaIssueAnimation.ref} style={koreaIssueAnimation.style}>
          <p>지금 한국은</p>
          <ul id="main-koreaissue-ul">
            <li className="main-koreaissue-li">1번박스</li>
            <li className="main-koreaissue-li">2번박스</li>
            <li className="main-koreaissue-li">3번박스</li>
            <li className="main-koreaissue-li">4번박스</li>
          </ul>
        </div>
        <div id="main-accompany" ref={accompanyAnimation.ref} style={accompanyAnimation.style}>
          <p>동행찾기</p>
          <ul id="main-accompany-ul">
            <li className="main-accompany-li">1번박스</li>
            <li className="main-accompany-li">2번박스</li>
            <li className="main-accompany-li">3번박스</li>
            <li className="main-accompany-li">4번박스</li>
          </ul>
        </div>
        <div id="main-notice" ref={noticeAnimation.ref} style={noticeAnimation.style}>
          <p>공지사항</p>
          <ul id="main-notice-ul">
            <li className="main-notice-li">1번박스</li>
            <li className="main-notice-li">2번박스</li>
          </ul>
        </div>
      </div>
    </Frame>
  );
};

export default MainPage;