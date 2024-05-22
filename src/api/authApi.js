// 로그인 api
const loginApi = async (code) => {
  let res = await fetch(process.env.REACT_APP_API_URL + '/api/auth/login?code=' + code);
  return res.json();
}

// 토큰 갱신 api
const reissueApi = async (refreshToken) => {
  let res = await fetch(process.env.REACT_APP_API_URL + '/api/auth/login', {
    method: 'PATCH',
    headers: {
      authorization: 'Bearer ' + refreshToken
    }
  })

  return res.json();
}

export { loginApi, reissueApi };