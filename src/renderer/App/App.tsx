import './App.scss';
import Main from '../page/Main';
import Navbar from 'renderer/components/navbar/Navbar';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import wUpload from 'renderer/page/Upload';
import Titlebar from 'renderer/components/titlebar/Titlebar';
import Upload from 'renderer/components/Upload';

function App() {
  return (
    <>
      <Router>
        <header>
          <Titlebar />
          {/* <Navbar /> */}
        </header>
        <div className="container">
          <Routes>
            <Route path="/" element={<Upload />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
