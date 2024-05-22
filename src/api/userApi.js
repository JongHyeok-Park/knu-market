const getUser = async (accessToken) => {
  let res = await fetch(process.env.REACT_APP_API_URL + '/api/user', 
    {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    });

  return res.json();
}

// 유저 정보 수정
const patchUser = async (name, image, accessToken) => {
  let res = await fetch(process.env.REACT_APP_API_URL + '/api/user?name=' + name, {
    method: 'PATCH',
    headers: {
      Authorization: 'Bearer ' + accessToken
    },
    body: image
  });

  return res.json();
}

// 닉네임 중복 확인
const userExist = async (name, accessToken) => {
  let res = await fetch(process.env.REACT_APP_API_URL + '/api/user/exist?name=' + name, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  });

  return res.json();
}

export { getUser, patchUser, userExist };