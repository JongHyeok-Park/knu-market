import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { login } from "../services/authService";
import { useEffect, useState } from "react";

function Redirect(props) {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const navigate = useNavigate();
  let [isLogin, setIsLogin] = useState(false);

  console.log(code);
  try {
    login(code, setIsLogin);
  } catch {
    navigate('/');
  }

  if (isLogin) {
    navigate('/');
  }

  return (
    <div className='detail-loading-wrapper'>
      <h3>잠시만 기다려주세요...</h3>
      <div className='spinner-icon'><img src={require('../image/spinner.png')} alt="spinner" /></div>
    </div>
  )
}

export default Redirect;