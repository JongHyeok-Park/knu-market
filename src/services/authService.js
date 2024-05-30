import { Navigate } from "react-router-dom";
import { loginApi, reissueApi } from "../api/authApi"
import { deleteCookie, getCookie, setCookie } from "../utils/cookieManage"

const reissue = async () => {
  reissueApi(getCookie('refreshToken'))
    .then((data) => {
      setCookie('accessToken', data.accessToken, 2 * 60);
      setCookie('refreshToken', data.refreshToken, 7 * 24 * 60);
    })
    .catch((error) => {
      deleteCookie('refreshToken');
    });
}

const login = async (code) => {
  loginApi(code)
    .then((data) => {
      setCookie('accessToken', data.accessToken, 2 * 60);
      setCookie('refreshToken', data.refreshToken, 7 * 24 * 60);
    })
    .catch((error) => {
      alert(error.message);
      throw new Error();
    })
}

export { reissue, login }