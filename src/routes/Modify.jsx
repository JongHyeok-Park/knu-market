import { useNavigate, useParams } from 'react-router-dom';
import './Post.css';
import { getCookie } from '../utils/cookieManage';
import { useEffect, useState } from 'react';
import { modifyProductApi } from '../api/productApi';

function Modify(props) {
  const navigate = useNavigate();
  const params = useParams();
  let [inputImage, setInputImage] = useState();
  let [productInfo, setProductInfo] = useState({});
  
  const makeSendData = () => {
    let title = document.getElementById('title').value;
    let price = document.getElementById('price').value;
    let description = document.getElementById('description').value;
    let productImage = document.getElementById('image-input').files[0];
    let image = new FormData();
    image.append('image', productImage);


    return {
      title: title,
      price: price,
      description: description,
      image: image
    };
  };

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
        setProductInfo(result);
        setInputImage(result.imagePath);
      })
      .catch((err) => {
        alert(err.message)
        navigate('/');
      });
  };

  useEffect(() => {
    getDetailInfo();
  }, []);

  useEffect(() => {
    document.getElementById('title').value = productInfo.title;
    document.getElementById('price').value = productInfo.price;
    document.getElementById('description').innerHTML = productInfo.description;
    document.getElementById('')
  }, [productInfo]);

  return (
    <div className="post">
      <div className='post-inner'>
        <div className='post-info'>
          <div className='post-input-left'>
            {
              inputImage ? 
                <img className='input-image' src={inputImage} alt='input-img' /> :
                null
            }
            <div id='upload-image' onClick={() => {
              let fileInput = document.getElementById('image-input');
              fileInput.click();
            }}>
              이미지 업로드
            </div>
          </div>
          <div className='detail-input-right'>
            <div className='detail-product-info'>
              <div>
                <input type="text" id="title" placeholder='제목'/>
              </div>
              <div>
                <input type="text" id='price' onChange={(e) => {
                  if (isNaN(e.target.value)) {
                    e.preventDefault();
                  }
                }}/><span className='price-label'>원</span>
              </div>
              <textarea name="description" id="description" placeholder='상품 설명을 적어주세요.'></textarea>
            </div>
            <div className='product-btn-container'>
              <button id='submit' onClick={() => {
                let data = makeSendData();
                modifyProductApi(params.id, data.title, data.price, data.description, data.image)
                  .then(() => {
                    navigate('/');
                  })
                  .catch((error) => {
                    alert(error.message);
                  });
              }}>수정하기</button>
              <button id='cancle' onClick={() => {
                navigate('/');
              }}>취소하기</button>
            </div>
          </div>
        </div>
      </div>
      <input type="file" id='image-input' 
        accept='image/png, image/jpg, image/jpeg'
        onChange={(e) => {
          let file = e.target.files[0]
          let imgUrl = URL.createObjectURL(file);
          setInputImage(imgUrl);
        }}/>
    </div> 
  )
}

export default Modify;