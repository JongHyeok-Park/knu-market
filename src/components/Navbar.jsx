import { useEffect, useState } from 'react';
import './Navbar.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AlarmItem from './AlarmItem';
import { useSelector } from 'react-redux';
import { getCookie } from '../utils/cookieManage';
import { getAlarmApi } from '../api/alarmApi';

function Navbar() {
  let user = useSelector(state => state.user);
  let [openAlarm, setOpenAlarm] = useState(false);
  let [alarmList, setAlarmList] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const getAlarm = () => {
    getAlarmApi()
      .then((data) => {
        setAlarmList(data.reverse());
      })
      .catch((error) => {
        alert(error.message);
      })
  }

  useEffect(() => {
    if (user.id && getCookie('accessToken')) {
      getAlarm();
    }
    // eslint-disable-next-line
  }, [location])

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
            ) : <li id='login'>
              <a href="https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=7e83cd7e8b53aa9771020e70b3097d37&redirect_uri=https://knu-market.vercel.app/redirect">로그인</a>
            </li> 
          }
          {
            user.name ? (
              <li>
                <button id='alarm' onClick={() => {
                  setOpenAlarm(!openAlarm);
                }}>
                  <img src={require('../image/ph_bell.png')} alt="ph_bell" />
                  {
                    alarmList.length > 0 ?
                      <div className='has-alarm'></div> :
                      null
                  }
                </button>
                {
                  openAlarm ? (
                    <div className='alarm-list'>
                      <ul>
                        {
                          alarmList.length > 0 ?
                            alarmList.map((item, i) => {
                              return (<AlarmItem 
                                productId={item.productId}
                                type={item.type}
                                createdAt={item.createdAt}
                                key={i}
                                /> )
                            }) :
                            <div className='no-alarm'>
                              <span>알림이 없습니다.</span>
                            </div>
                        }
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