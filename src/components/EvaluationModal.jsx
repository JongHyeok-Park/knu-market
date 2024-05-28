import { useSelector } from 'react-redux';
import './EvaluationModal.css';
import { postEvaluate } from '../api/evaluateApi';
import { deleteAlarmApi } from '../api/alarmApi';

function EvaluationModal(props) {
  let evaluate = useSelector(state => state.evaluate);

  const getValue = () => {
    let value = null;
    const inputs = document.getElementsByName('score');
    inputs.forEach((item) => {
      if (item.checked) {
        value = item.value
      }
    });

    return value;
  }

  const handleSubmit = () => {
    const val = getValue();

    if (!val) {
      alert('만족도를 체크해주세요.');
      return
    }

    postEvaluate(evaluate.id, val)
      .then(() => {
        deleteAlarmApi(evaluate.id)
          .then(() => {
            props.setOpenModal(false);
          })
          .catch((error) => {
            alert(error.message);
          })
      })
      .catch((error) => {
        alert(error.message);
        if (error.message === '중복된 요청입니다.') {
          deleteAlarmApi(evaluate.id)
            .then(() => {
              props.setOpenModal(false);
            })
            .catch((error) => {
              alert(error.message);
            })
        }
      })
  }

  return (
    <div className="evaluation">
      {
        evaluate?.name ? <h3 className='evaluation-title'>{evaluate.name}님과의 거래는 어땠나요?</h3> : null
      }
      <div className="score-options">
        <div className='score-options-item'>
          <label htmlFor="worst">매우 별로</label>
          <input type="radio" name="score" id="worst" value={-2}/>
        </div>
        <div className='score-options-item'>
          <label htmlFor="worst">별로</label>
          <input type="radio" name="score" id="bad" value={-1}/>
        </div>
        <div className='score-options-item'>
          <label htmlFor="worst">보통</label>
          <input type="radio" name="score" id="normal" value={0}/>
        </div>
        <div className='score-options-item'>
          <label htmlFor="worst">좋음</label>
          <input type="radio" name="score" id="good" value={1}/>
        </div>
        <div className='score-options-item'>
          <label htmlFor="worst">매우 좋음</label>
          <input type="radio" name="score" id="best" value={2}/>
        </div>
      </div>
      <div className='score-submit-btn-wrapper'>
        <button onClick={() => {
          handleSubmit();
        }}>제출</button>
      </div>
    </div>
  )
}

export default EvaluationModal;