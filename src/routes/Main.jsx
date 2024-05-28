import { useEffect, useState } from 'react';
import Product from '../components/Product';
import './Main.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { searchProductApi } from '../api/productApi';

function Main() {
  let [products, setProducts] = useState([]);
  let [page, setPage] = useState(0);
  let [showBtn, setShowBtn] = useState(true);
  let [searchMode, setSearchMode] = useState(false);
  let [keyword, setKeyword] = useState('');
  let user = useSelector(state => state.user);
  const navigate = useNavigate();

  const getProducts = async () => {
    await fetch(process.env.REACT_APP_API_URL + '/api/product/list/' + page)
    .then(async res => {
      if (res.ok) {
        return res.json();
      } else {
        let error = await res.text();
        throw new Error(error);
      }
    })
    .then(data => {
      if (data.length < 8) setShowBtn(false);
      if (page === 0) {
        setProducts(data);
      } else {
        let productsCopy = [...products];
        let newProducts = productsCopy.concat(data);
        setProducts(newProducts);
      }
    })
    .catch(err => {
      if (err.message) {
        alert(err.message);
      } else {
        alert('서버 오류입니다.')
      }
    })
  };

  const getSearchProducts = async () => {
    searchProductApi(keyword, page)
      .then((data) => {
        if (data.length < 8) setShowBtn(false);
        if (page === 0) {
          setProducts(data);
        } else {
          let productsCopy = [...products];
          let newProducts = productsCopy.concat(data);
          setProducts(newProducts);
        }
      })
      .catch(err => {
        if (err.message) {
          alert(err.message);
        } else {
          alert('서버 오류입니다.')
        }
      })
  };

  useEffect(() => {
    if (!searchMode) {
      getProducts();
    } else {
      getSearchProducts();
    }
    // eslint-disable-next-line
  }, [page, keyword]);

  return (
    <div className="main">
      <div className='main-wrapper'>
        <div className='search-input-wrapper'>
          <form>
            <img className='search-icon' src={require('../image/search_icon.png')} alt="search_icon" />
            <input type="text" id='search-input' placeholder='키워드를 입력해보세요.' onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                console.log(e.key);
                setKeyword(e.currentTarget.value)
                setPage(0);
                setShowBtn(true);
                setSearchMode(true);
              }
            }}/>
          </form>
        </div>
        <section className='product-section'>
          {
            user.name ? (
              <div className='product-button-wrapper'>
                <button id='add-product-btn' onClick={() => {
                  navigate('/post');
                }}>
                  상품등록
                </button>
              </div>
            ) : 
            null
          }
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