import { useNavigate } from 'react-router-dom';
import './Post.css';
import { getCookie } from '../utils/cookieManage';
import { useState } from 'react';

function Post(props) {
  const navigate = useNavigate();
  let [inputImage, setInputImage] = useState();
  
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

  const submitProduct = async () => {
    const data = makeSendData();
    console.log(data);
    if (data.title && data.price && data.description) {
      console.log(data.image.get('image'));
      let res = await fetch(process.env.REACT_APP_API_URL + `/api/product?title=${data.title}&price=${data.price}&description=${data.description}`, 
      {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + getCookie('accessToken')
        },
        body: data.image
      });

      if (!res.ok) {
        alert('서버 오류입니다. 잠시 후 다시 시도해주세요.');
        return;
      }

      navigate('/');
    }
  }

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
                  console.log(e.target.value)
                  if (isNaN(e.target.value)) {
                    e.preventDefault();
                  }
                }}/><span className='price-label'>원</span>
              </div>
              <textarea name="description" id="description" placeholder='상품 설명을 적어주세요.'></textarea>
            </div>
            <div className='product-btn-container'>
              <button id='submit' onClick={() => {
                submitProduct();
              }}>작성하기</button>
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

export default Post;