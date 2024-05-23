import { deleteProductApi } from "../api/productApi"

const deleteProduct = async (id) => {
  await deleteProductApi(id)
    .then(() => {
      alert('상품이 삭제됐습니다.');
    })
    .catch((err) => {
      alert(err.message);
    })
}