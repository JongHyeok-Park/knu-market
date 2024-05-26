import { useSelector } from "react-redux"
import './StarScore.css';

function StarScore(props) {
  let user = useSelector(state => state.user);

  return (
    <div className='star-score-wrapper'>
      <h4>별자리 점수</h4>
      <span id='score-value'>{Number(user.starScore).toLocaleString()}점</span>
      <div className='star-score'>
        <div id='score' style={{width: (user.starScore / 30000 * 100) + '%'}}></div>
      </div>
    </div>
  )
}

export default StarScore;