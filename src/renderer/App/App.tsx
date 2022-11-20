import './App.css';
import Main from '../page/Main';
import Navbar from 'renderer/components/navbar/Navbar';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Upload from 'renderer/page/Upload';
import Titlebar from 'renderer/components/titlebar/Titlebar';

function App() {
  return (
    <>
      <Router>
        <header>
          <Titlebar />
          <Navbar />
        </header>
        <div className="container">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/load" element={<Upload />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
