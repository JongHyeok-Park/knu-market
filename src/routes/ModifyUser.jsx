import { useEffect, useState } from 'react';
import './Profile.css';
import './ModifyUser.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser, patchUser } from '../api/userApi';
import { getCookie } from '../utils/cookieManage';
import { setUser } from '../store/userSlice';

function ModifyUser(props) {
  let user = useSelector(state => state.user);
  let [inputImage, setInputImage] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getValues = () => {
    let name = document.getElementById('name').value;
    let imageFile = document.getElementById('image-input').files[0];
    let uploadImage = new FormData();
    uploadImage.append('image', imageFile);
    
    return { name: name, image: uploadImage };
  }

  const getItem = () => {
    document.getElementById('name').value = user.name;
    setInputImage(user.imagePath);
  }

  useEffect(() => {
    getItem()
  }, [])


  return (
    <div className="profile">
      <div className="profile-inner">
        <div className='profile-header'>
          <div className='profile-image-wrapper'>
            <img className='profile-image' src={
              inputImage || require('../image/user_icon.png')
            } alt="profile" />
            <div id='upload-image' onClick={() => {
              let fileInput = document.getElementById('image-input');
              fileInput.click();
            }}>
              이미지 업로드
            </div>
          </div>
          <div className='profile-btn-container'>
            <button className='btn' id='save-btn' onClick={() => {
              let data = getValues();
              patchUser(data.name, data.image, getCookie('accessToken'))
                .then(() => {
                  getUser(getCookie('accessToken'))
                    .then((data) => {
                      dispatch(setUser({id: data.id, name: data.name, imagePath: data.imagePath, starScore: data.starScore}))
                      navigate('/profile');
                    })
                    .catch((error) => {
                      alert(error.message);
                    })
                })
                .catch((error) => {
                  alert(error.message);
                })
            }}>저장</button>
            <button className='btn' id='cancle-btn' onClick={() => {
              navigate('/profile');
            }}>취소</button>
          </div>
          <div className='profile-name-wrapper'>
            <input type="text" id="name"/>
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

export default ModifyUser;