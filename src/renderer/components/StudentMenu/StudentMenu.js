import { useEffect, useRef, useState } from "react";
import "./StudentMenu.css";

function StudentMenu() {
  const [selected, setSelected] = useState();

  const btnRef = useRef();
  const [isActive, setIsActive] = useState();

  // Обрабатываем мисклик
  useEffect(() => {
    const handler = (event) => {
      if (btnRef.current && !btnRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const onSubmit = (e) => {
    console.log('aboba');
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="studentMenu">
        {isActive && (
          <div ref={btnRef} className="studentMenu-content">
            жопа 1
            <div className="studentMenu-define">
              <button className="btn btn-primary">Определить</button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}

export default StudentMenu;
