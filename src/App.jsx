import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './routes/Main';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Main />} />
      </Routes>
      <footer>
        <div className='footer-inner'>

        </div>
      </footer>
    </div>
  );
}

export default App;
