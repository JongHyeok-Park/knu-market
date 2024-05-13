import { useState } from 'react';
import './Navbar.css'
import { Link } from 'react-router-dom';
import AlarmItem from './AlarmItem';
import { useSelector } from 'react-redux';

function Navbar() {
  let user = useSelector(state => state.user);
  let [openAlarm, setOpenAlarm] = useState(false);

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
            user ? (
              <li>유저프로필</li>
            ) : <li id='login'>로그인</li> 
          }
          {
            userInfo ? (
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