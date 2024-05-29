import { useEffect, useState } from 'react';
import './AlarmItem.css'
import { getProductInfoApi } from '../api/productApi';
import formatDate from '../utils/formatDate';
import { deleteAlarmApi } from '../api/alarmApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setEval } from '../store/evaluateSlice';

function AlarmItem(props) {
  let [productInfo, setProductInfo] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let message;

  switch (props.type) {
    case 0:
      message = '님이 댓글을 달았어요.'
      break;
    case 1:
      message = '님이 구매 요청했어요.'
      break;
    case 2:
      message = '님이 구매 수락했어요.'
      break;
    default:
      break;
  }

  const getProductInfo = () => {
    getProductInfoApi(props.productId)
      .then((data) => {
        setProductInfo(data);
      })
      .catch((error) => {
        alert(error.message);
      })
  }

  const checkAlarm = () => {
    if (props.type === 0 || props.type === 1) {
      deleteAlarmApi(props.id)
        .then(() => {
          props.setOpenAlarm(false);
          props.getAlarm();
          navigate('/detail/' + props.productId);
        })
        .catch((error) => {
          alert(error.message);
        })
    }

    else if (props.type === 2) {
      props.setOpenAlarm(false);
      props.getAlarm();
      dispatch(setEval({id: props.id, name: props.senderName}));
      props.setOpenModal(true);
    }
  }

  useEffect(() => {
    getProductInfo();
    // eslint-disable-next-line
  }, [])

  return (
    <li className="alarm-item" onClick={() => {
      checkAlarm();
    }}>
      <span className="alarm-date">{formatDate(props.createdAt)} 전</span>
      <span className="alarm-title">{props.senderName + message}</span>
      <div className="alarm-product">
        <div className="alarm-image">
          {
            productInfo.imagePath ? 
              <img src={productInfo.imagePath} alt="alarm" /> : null
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