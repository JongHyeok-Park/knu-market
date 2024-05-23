import { getCookie } from "../utils/cookieManage";

const searchProductApi = async (keyword, page) => {
  let res = await fetch(process.env.REACT_APP_API_URL + '/api/product/search/' + page + '?keyword=' + keyword);

  if (!res.ok) {
    let message = await res.text();
    throw new Error(message);
  }

  return res.json();
}

const deleteProductApi = async (id) => {
  let res = await fetch(process.env.REACT_APP_API_URL + '/api/product/' + id, {
    method: 'DELETE',
    headers: {
      authorization: 'Bearer ' + getCookie('accessToken')
    }
  })

  if (!res.ok) {
    let message = await res.text();
    throw new Error(message);
  }

  return res.json();
}

export { searchProductApi, deleteProductApi };