// 댓글 작성
const postComment = () => {

}

// 댓글 삭제
const deleteComment = () => {

}

// 댓글 수정
const patchComment = () => {

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