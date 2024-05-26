import { Link } from 'react-router-dom';
import './Footer.css';
import { deleteCookie, getCookie } from '../utils/cookieManage';
import { useDispatch, useSelector } from 'react-redux';

function Footer(params) {
  let user = useSelector(state => state.user);
  let dispatch = useDispatch();

  return (
    <footer>
      <div className='footer-inner'>
        <div className='footer-link-container'>
          <Link>개인정보처리방침</Link><span> | </span>
          <Link>고객센터</Link>
          {
            user.id ? (<><span> | </span><Link onClick={() => {
              deleteCookie('accessToken');
              deleteCookie('refreshToken');
              dispatch({
                id: null,
                name: null,
                imagePath: null,
                starScore: null
              });
            }}>로그아웃</Link></>) : null
          }
          
        </div>
        <div className='footer-info-container'>
          <p>상호명: 크누장터(주)</p>
          <p>대표: 이시은</p>
          <p>사업자번호: 850-58-00615</p>
          <p>소재지: 대구광역시 북구 대학로 80</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;