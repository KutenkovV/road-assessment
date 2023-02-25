import '../logic';
import { useNavigate } from 'react-router-dom';
import { dataGet } from '../store/UploadStore';
import { useSelector, useDispatch } from 'react-redux';
import StepProgressBar from 'renderer/components/StepProgressBar';
import {  } from '../store/MainStore';
import { useState } from 'react';

function Main() {
  const navigate = useNavigate();

  const dataCount = useSelector((state: any) => state.data.value);
  // const dispatch = useDispatch();
  // const [items, setItems] = useState([]);

  const [yearForecast, setYearForecast] = useState<any>();

  const Submit = () => {
    // e.preventDefault();

    // setYearForecast(inputRef.current.value);
    console.log(yearForecast);
    // setItems(dataCount);
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
          {dataCount.map((item: any, index: number) => (
            <div id={roadStatus(item.value.IRI)} key={index}>
              {item.value.IRI}
            </div>
          ))}
        </div>
        <div className="form-switch">
          <label
            className="lbl-button"
            onClick={() => {
              navigate('/');
            }}
          >
            Изменить данные
          </label>
          <StepProgressBar />
          {/* <button onClick={Submit}>Получить данные</button> */}
        </div>
      </div>
      <div className="form__input">
        <div className="form-marker">
          <input id="years" onChange={(e) => {setYearForecast(e.target.value)}} type="number" />
          <button onClick={Submit}>Сделать прогноз</button>
        </div>
      </div>
    </>
  );
}

function roadStatus(IRI: number) {
  if (IRI === 5) {
    return 'rectangle_best';
  }
  if (IRI === 4) {
    return 'rectangle_good';
  } else return 'rectangle_bad';
}

export default Main;
