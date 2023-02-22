import { useState } from 'react';
import '../logic';
import { useNavigate } from 'react-router-dom';
import { dataGet } from '../store/data';
import { useSelector, useDispatch } from 'react-redux';

function Main() {
  const navigate = useNavigate();

  const dataCount = useSelector((state) => state.data.value);
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);

  const Submit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(dataCount);
    setItems(dataCount);
  };

  return (
    <>
      <div className="form__input">
        <div className="form-marker">
          <div className="marker-item">
            <div id="rectangle_best"></div>
            <p>Ремонт не требуется</p>
          </div>
          <div className="marker-item">
            <div id="rectangle_good" />
            <p>Требуется ремонт</p>
          </div>
          <div className="marker-item">
            <div id="rectangle_bad" />
            <p>Требуется Капитальный ремонт</p>
          </div>
        </div>
        <div className="form-view">
          {items.map((item) => (
            <div id={roadStatus(item.value.IRI)}>{item.value.IRI}</div>
          ))}
        </div>
        <div>
          <label
            className="lbl-button"
            onClick={() => {
              navigate('/');
            }}
          >
            Изменить данные
          </label>
          <button onClick={Submit}>Получить данные</button>
        </div>
      </div>
    </>
  );
}

function roadStatus(IRI: string) {
  if (IRI === 5) {
    return 'rectangle_best';
  }
  if (IRI === 4) {
    return 'rectangle_good';
  } else return 'rectangle_bad';
}

export default Main;
