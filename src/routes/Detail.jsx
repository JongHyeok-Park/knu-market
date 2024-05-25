import { useNavigate, useParams } from 'react-router-dom';
import './Detail.css';
import { useEffect, useState } from 'react';
import { deleteProductApi } from '../api/productApi';
import { useSelector } from 'react-redux';

function Detail(props) {
  const params = useParams('id');
  const navigate = useNavigate();
  let [productInfo, setProductInfo] = useState(null);
  let user = useSelector(state => state.user);

  const getDetailInfo = async () => {
    await fetch(process.env.REACT_APP_API_URL + '/api/product/' + params.id)
      .then(async res => {
        if (!res.ok) {
          let error = await res.text();
          throw new Error(error);
        }
        return res.json();
      })
      .then(result => {
        let date = new Date(result.createdAt);
        let formattedDate = date.getFullYear() + "-" + ("0" + date.getMonth()).slice(-2) + "-" + ("0" + date.getDay()).slice(-2);
        result.createdAt = formattedDate;
        setProductInfo(result);
        console.log(result);
      })
      .catch((err) => {
        alert(err.message)
        navigate('/');
      });
  };

  useEffect(() => {
    getDetailInfo();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="detail">
      {
        productInfo ? 
        (
          <div className='detail-inner'>
            {
              user.name && user.id === productInfo.userId ? (
                <div className='detail-manage-btn-container'>
                  <button id='edit-btn' className='btn' onClick={() => {
                    navigate('/modify/' + params.id);
                  }}>수정하기</button>
                  <button id='delete-btn' className='btn' onClick={() => {
                    deleteProductApi(params.id)
                    .then(() => {
                      navigate('/');
                    })
                    .catch((err) => {
                      alert(err.message);
                    })
                  }}>삭제하기</button>
                </div>
              ) : null
            }
            
            <div className='detail-info'>
              <div className='detail-info-left'>
                {
                  productInfo.imagePath ? 
                  <img src={productInfo.imagePath} alt="product" /> :
                  "이미지가 없어요"
                }
              </div>
              <div className='detail-info-right'>
                <div className='detail-product-info'>
                  <span className='info-date'>{productInfo.createdAt}</span>
                  <h2>{productInfo.title}</h2>
                  <h1>{Number(productInfo.price).toLocaleString()}원</h1>
                  <p>{productInfo.description}</p>
                </div>
                <div className='detail-info-user'>
                  <div className='top'>
                    <div className='user-image-wrapper'>
                      {
                        productInfo.userImagePath ?
                        <img src={productInfo.userImagePath} alt="user" /> :
                        <img src={require('../image/user_icon.png')} alt="user" />
                      }
                    </div>
                    <span>
                      <h3>{productInfo.userName}</h3>
                    </span>
                  </div>
                  <div className='bottom'>

                  </div>
                </div>
              </div>
            </div>
          </div>
        ) :
        (
          <div className='detail-loading-wrapper'>
            <h3>상품을 가져오고있어요..!</h3>
            <div className='spinner-icon'><img src={require('../image/spinner.png')} alt="spinner" /></div>
          </div>
        )
        
      }
    </div>
  )
}

export default Detail;