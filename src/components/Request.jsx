import { useSelector } from 'react-redux';
import './Request.css';
import { deleteRequest } from '../api/requestApi';

function Request(props) {
  const today = new Date();
  const uploadedDate = new Date(props.createdAt);
  let timeGap = today.getTime() - uploadedDate.getTime();
  let user = useSelector(state => state.user);

  if (timeGap < 0) {
    timeGap = 0;
  }

  const sec = 1000;
  const min = sec * 60;
  const hour = min * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 31;
  const year = day * 365;
  
  let date;
  if (timeGap < (10 * sec)) {
    date = '방금'
  } else if (timeGap < min) {
    date = timeGap / sec;
    date = date.toFixed(0);
    date = date + '초';
  } else if (timeGap < hour) {
    date = timeGap / min; 
    date = date.toFixed(0);
    date = date + '분';
  } else if (timeGap < day) {
    date = timeGap / hour;
    date = date.toFixed(0);
    date = date + '시간';
  } else if (timeGap < week) {
    date = timeGap / day;
    date = date.toFixed(0);
    date = date + '일';
  } else if (timeGap < month) {
    date = timeGap / week;
    date = date.toFixed(0)
    date = date + '주';
  } else if (timeGap < year) {
    date = timeGap / month;
    date = date.toFixed(0)
    date = date + '달';
  } 

  return (
    <div className="request-wrapper">
      <img src={props.imagePath} alt="user" />
      <div className='request-info'>
        <h3 className='request-name'>{props.name}</h3>
        <span className='request-date'>{date} 전</span>
      </div>
      {
        Number(props.postUser) === Number(user.id) && props.name !== user.name ? (
          <button className='request-approve-btn'>거래하기</button>
        ) : null
      }
      {
        props.name === user.name ? (
          <button className='request-cancle-btn' onClick={() => {
            deleteRequest(props.id)
              .then(() => {
                props.loadRequests();
              })
              .catch((error) => {
                alert(error.message);
              })
          }}>취소하기</button>
        ) : null
      }
    </div>
  )
}

export default Request