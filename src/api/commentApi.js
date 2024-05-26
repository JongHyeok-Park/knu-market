import { getCookie } from "../utils/cookieManage"

// 댓글 작성
const postComment = async (id, comment, isSecret) => {
  let res = await fetch(process.env.REACT_APP_API_URL + '/api/comment', {
    method: 'POST',
    headers: {
      authorization: 'Bearer ' + getCookie('accessToken'),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      productId: Number(id),
      isSecret: isSecret,
      content: comment
    })
  })

  if (!res.ok) {
    let message = await res.text();
    throw new Error(message);
  }

  return res.text();
}

// 댓글 삭제
const deleteComment = async (id) => {
  let res = await fetch(process.env.REACT_APP_API_URL + '/api/comment/' + id, {
    method: 'DELETE',
    headers: {
      authorization: 'Bearer ' + getCookie('accessToken')
    }
  });

  if (!res.ok) {
    let message = await res.text();
    throw new Error(message);
  }

  return res.text();
}

// 댓글 수정
const patchComment = async (id, comment) => {
  let res = await fetch(process.env.REACT_APP_API_URL + `/api/comment/${id}?content=${comment}`, {
    method: 'PATCH',
    headers: {
      'Authorization': 'Bearer ' + getCookie('accessToken')
    }
  });

  if (!res.ok) {
    let message = await res.text();
    throw new Error(message);
  }

  return res.text();
}

// 댓글 조회
const getComment = async (id) => {
  let res = await fetch(process.env.REACT_APP_API_URL + '/api/comment/' + id);

  if (!res.ok) {
    let message = await res.text();
    throw new Error(message);
  }

  return res.json();
}

export { postComment, deleteComment, patchComment, getComment };