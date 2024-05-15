import { useEffect, useState } from 'react';
import Product from '../components/Product';
import './Main.css';
import { useNavigate } from 'react-router-dom';

function Main() {
  let [products, setProducts] = useState([]);
  let [page, setPage] = useState(0);
  let [showBtn, setShowBtn] = useState(true);
  const navigate = useNavigate();

  const getProducts = async () => {
    await fetch(process.env.REACT_APP_API_URL + '/api/product/list/' + page)
    .then(res => res.json())
    .then(result => {
      if (result.length < 8) setShowBtn(false);
      let productsCopy = [...products];
      let newProducts = productsCopy.concat(result);
      setProducts(newProducts);
    });
  } 

  useEffect(() => {
    getProducts();
  }, [page]);

  return (
    <div className="main">
      <div className='main-wrapper'>
        <div className='search-input-wrapper'>
          <form>
            <img className='search-icon' src={require('../image/search_icon.png')} alt="search_icon" />
            <input type="text" id='search-input' placeholder='키워드를 입력해보세요.'/>
          </form>
        </div>
        <section className='product-section'>
          <div className='product-button-wrapper'>
            <button id='add-product-btn' onClick={() => {
              navigate('/post');
            }}>
              상품등록
            </button>
          </div>
          <div className='products-container'>
            {
              products.map((item) => {
                return (<Product product={item} key={item.id}/>)
              })
            }
          </div>
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

export default Main;