// 로그인 api
const loginApi = async (code) => {
  let res = await fetch(process.env.REACT_APP_API_URL + '/api/auth/login?code=' + code);

  if (!res.ok) {
    let message = await res.text();
    throw new Error(message);
  }

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

  if (!res.ok) {
    let message = await res.text();
    throw new Error(message);
  }

  return res.json();
}

export { loginApi, reissueApi };