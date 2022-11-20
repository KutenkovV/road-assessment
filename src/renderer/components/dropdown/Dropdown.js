import "./Dropdown.css";
import { useState, useRef, useEffect } from "react";

function Dropdown({selected, setSelected}) {
  
  const btnRef = useRef();
  const [isActive, setIsActive] = useState(false);

  // нужно сделать переключение активности при мисклике
  // https://www.youtube.com/watch?v=pE4bwPykUF4

  const options = [
    "IA, IБ",
    "IB, II",
    "III",
    "IV",
    "V"
  ];

  //обработка мисклилка для скрытия дроплиста
  useEffect(() => {
    const closeContent = e => {
      if (e.path[1] !== btnRef.current) {
        setIsActive(false);
      }
    };

    document.body.addEventListener('click', closeContent);
    return () => document.body.removeEventListener('click', closeContent);
  }, []);

  return (
    <div className="dropdown">
      <div className="dropdown-btn" ref={btnRef} onClick={() => setIsActive(!isActive)}>
        <b tabIndex={0}>{selected}</b>
      </div>

      {isActive && (
        <div className="dropdown-content">
          {options.map((option) => (
            <div key={option}
              onClick={() => {
                setSelected(option);
                setIsActive(false);
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
