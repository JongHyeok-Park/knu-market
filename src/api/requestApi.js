import { getCookie } from "../utils/cookieManage"

// 구매 요청 조회
const getRequest = async (id) => {
  let res = await fetch(process.env.REACT_APP_API_URL + '/api/request/' + id);

  if (!res.ok) {
    let message = await res.text();
    throw new Error(message);
  }

  return res.json();
}

// 상품 구매 요청
const postRequest = async (id) => {
  let res = await fetch(process.env.REACT_APP_API_URL + '/api/request/' + id, {
    method: 'POST',
    headers: {
      'authorization': 'Bearer ' + getCookie('accessToken')
    }
  });

  if (!res.ok) {
    let message = await res.text();
    throw new Error(message);
  }

  return res.text();
}

// 구매 요청 삭제
const deleteRequest = async (id) => {
  let res = await fetch(process.env.REACT_APP_API_URL + '/api/request/' + id, {
    method: 'DELETE',
    headers: {
      'authorization': 'Bearer ' + getCookie('accessToken')
    }
  })

  if (!res.ok) {
    let message = await res.text();
    throw new Error(message);
  }

  return res.text();
}

// 구매 요청 수락
const patchRequest = () => {

}

export { getRequest, postRequest, deleteRequest, patchRequest };