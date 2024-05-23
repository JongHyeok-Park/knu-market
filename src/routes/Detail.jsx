import { useNavigate, useParams } from 'react-router-dom';
import './Detail.css';
import { useEffect, useState } from 'react';

function Detail(props) {
  const params = useParams('id');
  const navigate = useNavigate();
  let [productInfo, setProductInfo] = useState(null);

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