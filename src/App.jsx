import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Main from './routes/Main';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Detail from './routes/Detail';
import Post from './routes/Post';
import Profile from './routes/Profile';
import Redirect from './routes/Redirect';
import { useEffect, useState } from 'react';
import { getCookie } from './utils/cookieManage';
import { reissue } from './services/authService';
import { getUser } from './api/userApi';
import { useDispatch } from 'react-redux';
import { setUser } from './store/userSlice';
import Modify from './routes/Modify';
import ModifyUser from './routes/ModifyUser';
import ChatBot from './components/ChatBot';
import EvaluationModal from './components/EvaluationModal';

function App() {
  let dispatch = useDispatch();
  let location = useLocation();
  let [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (getCookie('refreshToken') && !getCookie('accessToken')) {
      reissue()
        .then(() => {
          setTimeout(() => {
            getUser(getCookie('accessToken'))
              .then((data) => {
                dispatch(setUser({id: data.id, name: data.name, imagePath: data.imagePath, starScore: data.starScore}))
              })
              .catch((error) => {
                alert(error.message);
              })
          }, 500);
        });
      
    } else if (getCookie('accessToken')) {
      getUser(getCookie('accessToken'))
        .then((data) => {
          dispatch(setUser({id: data.id, name: data.name, imagePath: data.imagePath, starScore: data.starScore}))
        })
        .catch((error) => {
          alert(error.message);
        })
    }
    // eslint-disable-next-line
  }, [location]);

  return (
    <div className="App">
      <Navbar setOpenModal={setOpenModal}/>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/post' element={<Post />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/redirect' element={<Redirect />} />
        <Route path='/modify/:id' element={<Modify />} />
        <Route path='/modifyUser' element={<ModifyUser />} />
        <Route path='*' element={(<div>존재하지 않는 페이지입니다.</div>)} />
      </Routes>
      {
        openModal ? <EvaluationModal setOpenModal={setOpenModal} /> : null
      }
      <ChatBot />
      <Footer />
    </div>
  );
}

export default App;
