import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './routes/Main';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Detail from './routes/Detail';
import Post from './routes/Post';
import Profile from './routes/Profile';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/post' element={<Post />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
