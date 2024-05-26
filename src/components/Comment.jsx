import './Comment.css';

function Comment(props) {
  const today = new Date();
  const uploadedDate = new Date(props.createdAt);
  let timeGap = today.getTime() - uploadedDate.getTime();

  const sec = 1000;
  const min = sec * 60;
  const hour = min * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 31;
  const year = day * 365;
  
  let date;
  if (timeGap < min) {
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
    <div className="comment-wrapper">
      <div className="comment">
        <div className="comment-user-image-wrapper"> 
          <img src={props.userImagePath} alt="user-profile" />
        </div>
        <div className='comment-user-wrapper'>
          <div className="comment-header">
            <span className="comment-user-name">{props.userName}</span>
            <span className="commnet-date">{date} 전</span>
            <button className="commnet-delete">삭제</button>
          </div>
          <div>
            <p className="comment-content">
              {props.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;