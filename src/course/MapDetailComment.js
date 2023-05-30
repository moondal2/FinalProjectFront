import './MapDetailComment.css';
import MapDetailCommentEach from './MapDetailCommentEach';
import CreateIcon from '@mui/icons-material/Create';

const A = [1, 2, 3, 4, 5, 6, 7];

const MapDetailComment = () => {


  return (
    <>
      <div id="mapdetail-comment-container">
        <div id="mapdetail-comment-wrap">
          {A && A.map(a => (
            <MapDetailCommentEach />
          ))}
        </div>
        <div id="mapdetail-comment-write">
          <input id="mapdetail-comment-write-input" placeholder='댓글 작성 칸'></input>
          <button id="mapdetail-comment-write-btn"><CreateIcon/></button>
        </div>
      </div>
    </>
  )
}

export default MapDetailComment;