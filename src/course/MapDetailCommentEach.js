const MapDetailCommentEach = () => {
  return (
    <>
      <div className="map-comment-each">
        <div className="map-comment-profile-pic">
          <img src="https://i.pinimg.com/564x/71/10/89/71108955abeed08a9a3dde826c9cda3c.jpg" />
        </div>
        <div className="map-comment-content-wrap">
          <div className="map-comment-content-head">
            <span className="map-comment-content-nick">닉네임</span>
            <span className="map-comment-content-date">20min ago</span>
          </div>
          <div className="map-comment-content-body">댓글내용입니다!! 너무 좋아요!!</div>
          <div className="map-comment-content-foot">
            <div>수정</div>
            <div>삭제</div>
          </div>
        </div>
      </div>
    </>
  )
}
export default MapDetailCommentEach;