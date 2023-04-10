import '../App/logic';
import { useNavigate } from 'react-router-dom';
import { dataload } from '../store/UploadStore';
import { useSelector, useDispatch } from 'react-redux';
import StepProgressBar from 'renderer/components/StepProgressBar';
import { set_progressBar, set_yearForecast, dataloadMain } from '../store/MainStore';
import { useEffect, useState } from 'react';
import { prognoz } from '../App/prognoz'

function Main(this: any) {
  const navigate = useNavigate();
  var _ = require('lodash');

  const dataCount = useSelector((state: any) => state.data.value);
  const dataList = useSelector((state: any) => state.mainStore.data_list);
  const yearForecast = useSelector((state: any) => state.mainStore.yearForecast);
  const dispatch = useDispatch();
  const [year, setYear] = useState<any>(0);

  const [items, setItems] = useState();


  // setItems(dataCount);
  useEffect(() => {
    console.log('опа');
    setItems(dataList)
  }), [];

  const onOpa = () => {
    console.log(dataList);
  }
  const Submit = () => {
    console.log('абоба');
    // let opa = prognoz(year, dataCount)
    // setItems(prognoz(year, dataCount));
    dispatch(dataloadMain(prognoz(year, dataCount)));
    // dispatch(dataloadMain(dataC);
    // prognoz(year, dataCount)


    // Ниже магнум опус, его не трогаем!!!
    let data: {
      index: number
      value: any
    }[] = [];

    for (let i = 0; i <= year; i++) {
      data.push({
        index: i,
        value: i
      })
    }

    dispatch(set_yearForecast(year));
    dispatch(set_progressBar(_.mapValues(_.keyBy(data, 'index'), 'value')));
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
          {/* {dataList.map((item: any) => (
            <div>1</div>
          ))} */}
          {dataList.map((item: any, index: number) => (
            <div id={roadStatus(item.value)} key={index}>
              {item.value}
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
        </div>
      </div>
      <div className="form__input">
        <div className="form-marker">
          <input
            id="years"
            onChange={(e) => {
              setYear(e.target.value)
            }}
            value={year}
            type="number"
          />
          <button onClick={Submit}>Сделать прогноз</button>
          <button onClick={onOpa}>Тык</button>
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
