import { useEffect, useState } from 'react';
import './AlarmItem.css'
import { getProductInfoApi } from '../api/productApi';
import formatDate from '../utils/formatDate';

function AlarmItem(props) {
  let [productInfo, setProductInfo] = useState();

  const getProductInfo = () => {
    getProductInfoApi(props.productId)
      .then((data) => {
        setProductInfo(data);
      })
      .catch((error) => {
        alert(error.message);
      })
  }

  useEffect(() => {
    getProductInfo();
  }, [])

  return (
    <li className="alarm-item">
      <span className="alarm-date">{formatDate(props.createdAt)} 전</span>
      <span className="alarm-title">한승규님이 구매요청했어요!</span>
      <div className="alarm-product">
        <div className="alarm-image">
          {
            productInfo ? 
              <img src={productInfo.imagePath} alt="alarm-image" /> : null
          }
        </div>
        <div className="alarm-product-content">
          <span className="alarm-product-title">
            {productInfo ? productInfo.title : null}
          </span>
          <span className="alarm-product-price">
          {productInfo ? Number(productInfo.price).toLocaleString() : '0'} 원
          </span>
          <span className="alarm-product-date">
            {productInfo ? formatDate(productInfo.createdAt) : null} 전
          </span>
        </div>
      </div>
    </li>
  )
}

export default AlarmItem;