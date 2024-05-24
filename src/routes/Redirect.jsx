import { useNavigate, useParams } from "react-router-dom";
import { login } from "../services/authService";
import { useEffect, useState } from "react";

function Redirect(props) {
  const params = new URL(document.location).searchParams;
  const code = params.get("code");
  const navigate = useNavigate();
  let [isLogin, setIsLogin] = useState(false);

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