import { loginApi, reissueApi } from "../api/authApi"
import { getCookie, setCookie } from "../utils/cookieManage"

const reissue = async () => {
  reissueApi(getCookie('refreshToken'))
    .then((data) => {
      setCookie('accessToken', data.accessToken, 2 * 60);
      setCookie('refreshToken', data.refreshToken, 7 * 60);
    })
    .catch((error) => {
      alert(error.message);
    });
}

const login = async (code) => {
  loginApi(code)
    .then((data) => {
      setCookie('accessToken', data.accessToken, 2 * 60);
      setCookie('refreshToken', data.refreshToken, 7 * 60);
    })
    .catch((error) => {
      alert(error.message);
      throw new Error();
    })
}

export { reissue, login }