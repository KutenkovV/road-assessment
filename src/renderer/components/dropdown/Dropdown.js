import './Dropdown.css';
import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { selected_check } from '../../store/UploadStore';

function Dropdown({ selected }) {
  const btnRef = useRef();
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();

  const options = ['IA, IБ', 'IB, II', 'III', 'IV', 'V'];

  //обработка мисклилка для скрытия дроплиста
  useEffect(() => {
    const closeContent = (e) => {
      if (e.path[1] !== btnRef.current) {
        setIsActive(false);
      }
    };

    document.body.addEventListener('click', closeContent);
    return () => document.body.removeEventListener('click', closeContent);
  }, []);

  return (
    <div className="dropdown">
      <div
        className="dropdown-btn"
        ref={btnRef}
        onClick={() => setIsActive(!isActive)}
      >
        <b tabIndex={0}>{selected}</b>
      </div>

      {isActive && (
        <div className="dropdown-content">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                setIsActive(false);
                dispatch(selected_check(option));
              }}
              className="dropdown-item"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
