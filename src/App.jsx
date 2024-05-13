import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './routes/Main';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Main />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
