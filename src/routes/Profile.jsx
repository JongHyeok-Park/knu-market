import './Profile.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import StarScore from '../components/StarScore';
import Product from '../components/Product';
import { useEffect, useState } from 'react';
import { getMyProductListApi } from '../api/productApi';

function Profile(props) {
  let user = useSelector(state => state.user);
  const navigate = useNavigate();
  let [products, setProducts] = useState([]);
  let [page, setPage] = useState(0);
  let [showBtn, setShowBtn] = useState(true);

  const handleProductList = () => {
    getMyProductListApi(page)
      .then((data) => {
        if (data.length < 8) setShowBtn(false);

        if (page === 0) {
          setProducts(data);
        } else {
          let productsCopy = [...products];
          setProducts(productsCopy.concat(data));
        }
      })
      .catch((error) => {
        alert(error.message);
      })
  }

  useEffect(() => {
    handleProductList();
    // eslint-disable-next-line
  }, [page]);

  return (
    <div className="profile">
      <div className="profile-inner">
        <div className='profile-header'>
          <div className='profile-btn-container'>
            <button className='btn' id='modify-btn' onClick={() => {
              navigate('/modifyUser');
            }}>수정하기</button>
          </div>
          <div className='profile-image-wrapper'>
            <img className='profile-image' src={
              user.imagePath || require('../image/user_icon.png')
            } alt="profile" />
          </div>
          <div className='profile-name-wrapper'>
            <h1>{user.name}</h1>
          </div>
          <div className="star-score-section">
            <StarScore starScore={user.starScore} />
          </div>
        </div>
        <h3 className='my-products-title'>{user.name}님이 등록한 상품 목록</h3>
        <section className="my-products">
          {
            products.map((item) => {
              return (<Product product={item} key={item.id}/>)
            })
          }
        </section>
        <div className='more-btn-wrapper'>
          {
            showBtn ? <button id='more-btn' onClick={() => { setPage(page + 1) }}>더보기</button> : null
          }
        </div>
      </div>
    </div>
  )
}

export default Profile;