import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {

  const location = useLocation();
  const isActive = location.pathname;

  return (
    <header>
      <div className="navbar">
        <div className="navbar__item">
          <Link to="/load">
            <label>Загрузка списков</label>
          </Link>
        </div>
        <div className="navbar__item">
          <Link to="/">
            <label>Ручной расчет</label>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
