import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './routes/Main';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Detail from './routes/Detail';
import Post from './routes/Post';
import Profile from './routes/Profile';
import Redirect from './routes/Redirect';
import { useEffect } from 'react';
import { getCookie } from './utils/cookieManage';
import { reissue } from './services/authService';
import { getUser } from './api/userApi';
import { useDispatch } from 'react-redux';
import { setUser } from './store/userSlice';
import Modify from './routes/Modify';

function App() {
  let dispatch = useDispatch();

  useEffect(() => {
    if (getCookie('refreshToken') && !getCookie('accessToken')) {
      reissue()
        .then(() => {
          getUser(getCookie('accessToken'))
            .then((data) => {
              dispatch(setUser({id: data.id, name: data.name, imagePath: data.imagePath, starScore: data.starScore}))
              console.log(data);
            })
            .catch((error) => {
              alert(error.message);
            })
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
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/post' element={<Post />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/redirect' element={<Redirect />} />
        <Route path='/modify/:id' element={<Modify />} />
        <Route path='*' element={(<div>존재하지 않는 페이지입니다.</div>)} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
