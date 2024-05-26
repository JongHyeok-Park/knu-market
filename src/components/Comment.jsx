import { useState } from 'react';
import './Comment.css';
import { useSelector } from 'react-redux';
import { deleteComment, patchComment } from '../api/commentApi';

function Comment(props) {
  const today = new Date();
  const uploadedDate = new Date(props.createdAt);
  let timeGap = today.getTime() - uploadedDate.getTime();
  let [isModify, setIsModify] = useState(false);
  let user = useSelector(state => state.user);

  const modify = () => {
    let commentContent = document.getElementById('modify-input').value;
    patchComment(props.id, commentContent)
      .then(() => {
        props.getCommentList();
        setIsModify(false);
      })
      .catch((error) => {
        alert(error.message);
      })
  }

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
      {
        isModify ? (<div className='comment-input-container'>
            <img src={user.imagePath} alt="user-profile" />
            <textarea id='modify-input'>{props.content}</textarea>
            <div className='comment-modify-btn-container'>
              <button id='comment-modify-btn' onClick={() => {
                modify();
              }}>수정</button>
              <button id='comment-cancle-btn' onClick={() => {
                setIsModify(false);
              }}>취소</button>
            </div>
          </div>) : (
            <div className="comment">
            <div className="comment-user-image-wrapper"> 
              <img src={props.userImagePath} alt="user-profile" />
            </div>
            <div className='comment-user-wrapper'>
              <div className="comment-header">
                <span className="comment-user-name">{props.userName}</span>
                <span className="commnet-date">{date} 전</span>
                {
                  props.userName === user.name ? (
                    <>
                      <button className='comment-modify comment-btn' onClick={() => {
                        setIsModify(true);
                      }}>수정</button>
                      <button className="commnet-delete comment-btn" onClick={() => {
                        deleteComment(props.id)
                          .then(() => {
                            props.getCommentList();
                          })
                          .catch((error) => {
                            alert(error.message);
                          })
                      }}>삭제</button>
                    </>
                  ) : null
                }
                
              </div>
              <div>
                <p className="comment-content">
                  {props.content}
                </p>
              </div>
            </div>
          </div>
          )
      }
    </div>
  );
}

export default Comment;