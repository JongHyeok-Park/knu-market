import './Profile.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import StarScore from '../components/StarScore';

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
          <div className="star-score-section">
            <StarScore />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;