import { loginApi, reissueApi } from "../api/authApi"
import { getCookie, setCookie } from "../utils/cookieManage"

const reissue = () => {
  reissueApi(getCookie('refreshToken'))
    .then((data) => {
      setCookie('accessToken', data.accessToken, 2 * 60);
      setCookie('refreshToken', data.refreshToken, 7 * 60);
    })
    .catch((error) => {
      alert(error.message);
    });
}

const login = (code, setIsLogin) => {
  loginApi(code)
    .then((data) => {
      setCookie('accessToken', data.accessToken, 2 * 60);
      setCookie('refreshToken', data.refreshToken, 7 * 60);
      setIsLogin(true);
    })
    .catch((error) => {
      alert(error.message);
      throw new Error();
    })
}

export { reissue, login }