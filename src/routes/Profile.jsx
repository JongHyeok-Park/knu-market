import { useState } from 'react';
import './Profile.css';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/userSlice';

function Profile(props) {
  let [modifyMode, setModifyMode] = useState(false)
  let user = useSelector(state => state.user);


  return (
    <div className="profile">
      <div className="profile-inner">
        <div className='profile-header'>
          <div className='profile-image-wrapper'>
            <img className='profile-image' src="https://avatars.githubusercontent.com/u/147706431?v=4" alt="profile" />
          </div>
          <div className='profile-btn-container'>
            {
              modifyMode ? 
                <>
                  <button className='btn' id='save-btn'>저장</button>
                  <button className='btn' id='cancle-btn' onClick={() => {
                    setModifyMode(false);
                  }}>취소</button>
                </>  
                :
              <button className='btn' id='modify-btn' onClick={() => {
                setModifyMode(true);
              }}>수정하기</button>
            }
          </div>
          <div className='profile-name-wrapper'>
            <h1>{user.name}</h1>
          </div>
          <div className='star-score-wrapper'>
            <h4>별자리 점수</h4>
            <span id='score-value'>1,200점</span>
            <div className='star-score'>
              <div id='score'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;