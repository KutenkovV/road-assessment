import '../styles/App.scss';
import '../styles/global.scss';
import '../styles/accordeon.scss';

import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Titlebar from 'renderer/components/titlebar/Titlebar';
import Upload from 'renderer/page/Upload';
import Main from 'renderer/page/Main';

function App() {
  return (
    <>
      <Router>
        <header style={{ zIndex: '1' }}>
          <Titlebar />
        </header>
        <div className="container">
          <Routes>
            <Route path="/" element={<Upload />} />
            <Route path="/second" element={<Main />} />
          </Routes>
        </div>
      </Router >
    </>
  );
}

export default App;
