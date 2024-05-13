import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './routes/Main';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Detail from './routes/Detail';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/detail/:id' element={<Detail />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
