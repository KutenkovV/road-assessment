import './App.css';
import Main from '../Main';
import Navbar from 'renderer/components/navbar/Navbar';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import WIP from 'renderer/components/WIP';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/load' element={<WIP />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
