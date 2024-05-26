import { useNavigate, useParams } from 'react-router-dom';
import './Detail.css';
import { useEffect, useState } from 'react';
import { deleteProductApi } from '../api/productApi';
import { useSelector } from 'react-redux';
import { getComment, postComment } from '../api/commentApi';
import Comment from '../components/Comment';
import StarScore from '../components/StarScore';
import { getRequest, postRequest } from '../api/requestApi';
import Request from '../components/Request';

function Detail(props) {
  const params = useParams();
  const navigate = useNavigate();
  let [productInfo, setProductInfo] = useState(null);
  let [commentList, setCommentList] = useState([]);
  let [requstList, setRequestList] = useState([]);
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
      })
      .catch((err) => {
        alert(err.message)
        navigate('/');
      });
  };

  const getCommentList = () => {
    getComment(params.id)
      .then((data) => {
        setCommentList(data.reverse());
      })
      .catch((error) => {
        alert(error.message);
      })
  }

  const comment = () => {
    let commentContent = document.getElementById('comment-input');
    postComment(params.id, commentContent.value, false)
      .then(() => {
        getCommentList();
        commentContent.value = '';
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  const requestPurchase = () => {
    postRequest(params.id)
      .then(() => {
        loadRequests();
      })
      .catch((error) => {
        alert(error.message)
      });
  }

  const loadRequests = () => {
    getRequest(params.id)
      .then((data) => {
        setRequestList(data);
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  useEffect(() => {
    getDetailInfo();
    getCommentList();
    loadRequests();
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
                  <div className='product-star-score-wrapper'>
                      <StarScore />
                  </div>
                </div>
              </div>
            </div>
            <section className='bottom'>
              <div className='comment-container'>
                <h3 className='comment-title'>댓글 {commentList.length}개</h3>
                {
                  user.id ? (<div className='comment-input-container'>
                    <img src={user.imagePath} alt="user-profile" />
                    <textarea id='comment-input'></textarea>
                    <button id='comment-submit-btn' onClick={() => {
                      comment();
                    }}>작성</button>
                  </div>) : null
                }
                {
                  commentList.map((item, i) => {
                    if (!item.isSecret) {
                      return (
                        <Comment 
                          id={item.id}
                          userName={item.userName}
                          userImagePath={item.userImagePath}
                          createdAt={item.createdAt}
                          content={item.content}
                          getCommentList={getCommentList}
                          key={i} />
                      )
                    }
                    return null;
                  })
                }
              </div>
              <div className='purchase-wrapper'>
                {
                  user.id && Number(user.id) !== Number(productInfo.userId) ? (
                    <button id='purchase-request' onClick={() => {
                      requestPurchase();
                    }}>구매 요청</button>
                  ) : null
                }
                <div className='request-list-container'>
                  {
                    requstList.length > 0 ? 
                    <h4 className='request-list-title'>제가 사고시퍼요..!</h4> : null
                  }
                  {
                    requstList.map((item, i) => {
                      return (
                        <Request 
                          postUser={productInfo.userId}
                          id={item.id}
                          name={item.userName}
                          imagePath={item.userImagePath}
                          createdAt={item.createdAt}
                          loadRequests={loadRequests}
                          key={i}
                        />
                      )
                    })
                  }
                </div>
              </div>
            </section>
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