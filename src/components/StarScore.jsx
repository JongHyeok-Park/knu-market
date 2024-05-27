import { useSelector } from "react-redux"
import './StarScore.css';

function StarScore(props) {

  return (
    <div className='star-score-wrapper'>
      <h4>별자리 점수</h4>
      <span id='score-value'>{Number(props.starScore).toLocaleString()}점</span>
      <div className='star-score'>
        <div id='score' style={{width: (props.starScore / 30000 * 100) + '%'}}></div>
      </div>
    </div>
  )
}

export default StarScore;