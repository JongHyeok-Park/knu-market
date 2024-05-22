import { useState } from 'react';
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import AlarmItem from './AlarmItem';
import { useSelector } from 'react-redux';

function Navbar() {
  let user = useSelector(state => state.user);
  let [openAlarm, setOpenAlarm] = useState(false);
  const navigate = useNavigate();

  return (
    <nav>
      <div className='nav-wrapper'>
        <Link className="logo" to={'/'}>
          <span>
            크누장터
          </span>
        </Link>
        <ul className="right-menus">
          {
            user.name ? (
              <li id='profile-info' onClick={() => {
                navigate('/profile');
              }}><img className='user-image' src={user.imagePath ? user.imagePath : require('../image/user_icon.png')} alt='profile' />{user.name}</li>
            ) : <li id='login'>로그인</li> 
          }
          {
            user ? (
              <li>
                <button id='alarm' onClick={() => {
                  setOpenAlarm(!openAlarm);
                }}>
                  <img src={require('../image/ph_bell.png')} alt="ph_bell" />
                </button>
                {
                  openAlarm ? (
                    <div className='alarm-list'>
                      <ul>
                        <AlarmItem />
                        <hr />
                        <AlarmItem />
                        <hr />
                        <AlarmItem />
                      </ul>
                      </div>
                  ) : null
                }
              </li>) : null
            
          }
          
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;