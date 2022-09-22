import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Upload from '../components/Upload';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Upload />} />
      </Routes>
    </Router>
  );
}

export default App;
