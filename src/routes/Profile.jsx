import './Profile.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Profile(props) {
  let user = useSelector(state => state.user);
  const navigate = useNavigate();


  return (
    <div className="profile">
      <div className="profile-inner">
        <div className='profile-header'>
          <div className='profile-image-wrapper'>
            <img className='profile-image' src={
              user.imagePath || require('../image/user_icon.png')
            } alt="profile" />
          </div>
          <div className='profile-btn-container'>
            <button className='btn' id='modify-btn' onClick={() => {
              navigate('/modifyUser');
            }}>수정하기</button>
          </div>
          <div className='profile-name-wrapper'>
            <h1>{user.name}</h1>
          </div>
          <div className='star-score-wrapper'>
            <h4>별자리 점수</h4>
            <span id='score-value'>{Number(user.starScore).toLocaleString()}점</span>
            <div className='star-score'>
              <div id='score' style={{width: (user.starScore / 30000 * 100) + '%'}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;