import { useState } from 'react';
import './Navbar.css'
import { Link } from 'react-router-dom';

function Navbar() {
  let [userInfo, setUserInfo] = useState(null);

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
            userInfo ? <li>유저프로필</li> : <li id='login'>로그인</li> 
          }
          <li>
            <button id='alarm'>
              <img src={require('../image/ph_bell.png')} alt="ph_bell" />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;