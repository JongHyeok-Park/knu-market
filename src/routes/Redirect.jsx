import { useNavigate, useSearchParams } from "react-router-dom";
import { login } from "../services/authService";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { getUser } from "../api/userApi"
import { getCookie } from "../utils/cookieManage";

function Redirect(props) {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    login(code)
      .then(() => {
        setIsLogin(true);
      })
      .catch(() => {
        navigate('/');
      });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isLogin) {
      setTimeout(() => {
        getUser(getCookie('accessToken'))
          .then((data) => {
            dispatch(setUser({id: data.id, name: data.name, imagePath: data.imagePath, starScore: data.starScore}));
            navigate('/');
          });
      }, 500);
    }
  }, [isLogin])  

  return (
    <div className='detail-loading-wrapper'>
      <h3>잠시만 기다려주세요...</h3>
      <div className='spinner-icon'><img src={require('../image/spinner.png')} alt="spinner" /></div>
    </div>
  )
}

export default Redirect;