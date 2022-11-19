import './App.css';
import Main from '../page/Main';
import Navbar from 'renderer/components/navbar/Navbar';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Upload from 'renderer/page/Upload';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/load' element={<Upload />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
