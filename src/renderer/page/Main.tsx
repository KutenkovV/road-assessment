import '../App/logic';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import StepProgressBar from 'renderer/components/StepProgressBar';

/// Для тултипов (https://react-tooltip.com/docs/getting-started)
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
///

import { set_progressBar, set_yearForecast, dataloadMain } from '../store/MainStore';
import { useEffect, useState } from 'react';
import { prognoz } from '../App/prognoz'

function Main(this: any) {
  const navigate = useNavigate();
  var _ = require('lodash');

  const dataCount = useSelector((state: any) => state.data.value);
  const dataList = useSelector((state: any) => state.mainStore.data_list);
  const datares = useSelector((state: any) => state.mainStore.data);
  const yearForecast = useSelector((state: any) => state.mainStore.yearForecast);
  const dispatch = useDispatch();
  const [year, setYear] = useState<any>(0);

  useEffect(() => {
    console.log(dataList);
  }), [];

  function Submit() {
    dispatch(dataloadMain(prognoz(year, dataCount)));
    // dispatch(dataloadMain(dataList[0].items));
    console.log('see bl suda');
    console.log(datares);

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
          {datares.map((item: any, index: number) => (
            // <ItemRoad iri={item.element} key={index} />
            <div
              data-tooltip-id='my-tooltip'
              data-avg={item.AVG}
              data-avg-color={roadStatus(item.AVG)}
              data-iri={item.IRI}
              data-j={item.J}
              data-c={item.C}
              data-some-relevant-attr={index + 1}
              id={roadStatus(item.AVG)} key={index}>
              <a>{item.AVG}</a>
            </div>
          ))}

          <Tooltip
            className='tooltip-form'
            id="my-tooltip"
            render={({ activeAnchor }) => (
              <div>
                <p>Участок номер № - {activeAnchor?.getAttribute('data-some-relevant-attr') || 'not set'}</p>
                <p className='tooltip-avg-status'>Состояние(среднее): {activeAnchor?.getAttribute('data-avg') || 'not set'}
                  <div style={{ marginLeft: '0.45rem', width: '12px', height: '12px' }} id={activeAnchor?.getAttribute('data-avg-color') || 'not set'} />
                </p>
                <p>Оценка IRI: {activeAnchor?.getAttribute('data-iri') || 'not set'}</p>
                <p>Оценка J: {activeAnchor?.getAttribute('data-j') || 'not set'}</p>
                <p>Оценка C: {activeAnchor?.getAttribute('data-c') || 'not set'}</p>
              </div>
            )}
          />
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
        <div className="prognoz-form">
          <div className='prognoz-form-item'>
            <p>На сколько лет делать прогноз</p>
            <input
              id="years"
              onChange={(e) => {
                setYear(e.target.value)
              }}
              value={year}
              type="number"
            />
          </div>

          <div className='prognoz-form-item'>
            <p>Текущий год эксплуатации</p>
            <input type="number" />
          </div>

          <div className='prognoz-form-item'>
            <p>Интенсивность движения фактическая</p>
            <input type="number" />

          </div>

          <div className='prognoz-form-item'>
            <p>Интенсивность движения проектная</p>
            <input type="number" />
          </div>

        </div>
        <button style={{ marginTop: '1rem' }} onClick={Submit}>Сделать прогноз</button>
      </div>
    </>
  );
}

function roadStatus(IRI: number) {
  if (IRI >= 4.5) {
    return 'rectangle_best';
  }
  if (IRI >= 4) {
    return 'rectangle_good';
  } else return 'rectangle_bad';
}

export default Main;
