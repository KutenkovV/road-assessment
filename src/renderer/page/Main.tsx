import '../App/logic';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import StepProgressBar from 'renderer/components/StepProgressBar';
import "../../styles/accordeon.scss"

/// Для тултипов (https://react-tooltip.com/docs/getting-started)
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
/// Для аккордеона (https://szhsin.github.io/react-accordion/docs/getting-started)
import { Accordion, AccordionItem as Item } from "@szhsin/react-accordion";
import chevronDown from "../chevron-down.svg";

///

import { set_progressBar, set_yearForecast, dataloadMain, recommendationsLoad } from '../store/MainStore';
import { useEffect, useState } from 'react';
import { prognoz } from '../App/prognoz'
import { recommendations } from 'renderer/App/recommendations';

function Main(this: any) {
  const AccordionItem = ({ header, ...rest }) => (
    <Item
      {...rest}
      header={
        <>
          {header}
          <img className="chevron-down" src={chevronDown} alt="Chevron Down" />
        </>
      }
    />
  );

  const navigate = useNavigate();
  var _ = require('lodash');

  const dispatch = useDispatch();
  const dataCount = useSelector((state: any) => state.data.value);
  const dataList = useSelector((state: any) => state.mainStore.data_list);
  const datares = useSelector((state: any) => state.mainStore.data);
  const rec_dat = useSelector((state: any) => state.mainStore.recommendation_data);

  const [year, setYear] = useState<any>(2);
  const [currentYear, setCurrentYear] = useState<any>(1);
  const [traffic_intensity_actual, setTraffic_intensity_actual] = useState<any>(12000);
  const [traffic_intensity_design, setTraffic_intensity_design] = useState<any>(14000);

  useEffect(() => {
    console.log(dataList);
  }), [];

  function Submit() {
    dispatch(dataloadMain(prognoz(year, currentYear, traffic_intensity_actual, traffic_intensity_design, dataCount)));
    dispatch(recommendationsLoad(recommendations(dataList)));

    console.log(rec_dat);


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

          <Tooltip className='tooltip-form' classNameArrow="tooltip-arrow"
            id="my-tooltip"
            render={({ activeAnchor }) => (
              <div>
                <p>Участок номер № - {activeAnchor?.getAttribute('data-some-relevant-attr') || 'not set'}</p>
                <p className='tooltip-avg-status'>Состояние (среднее): {activeAnchor?.getAttribute('data-avg') || 'not set'}
                  <div style={{ marginLeft: '0.45rem', width: '12px', height: '12px' }} id={activeAnchor?.getAttribute('data-avg-color') || 'not set'} />
                </p>
                <p>IRI (Ровность): {activeAnchor?.getAttribute('data-iri') || 'not set'}</p>
                <p>J (Дефектность): {activeAnchor?.getAttribute('data-j') || 'not set'}</p>
                <p>C (Сцепление): {activeAnchor?.getAttribute('data-c') || 'not set'}</p>
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
        <div>
          {rec_dat.map((el: any, index: number) => (
            <Accordion transition transitionTimeout={200}>
              <AccordionItem header={"Прогноз на " + (index) + " год"}>
                {el.item.map((node: any, i: number) => (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p id='rectangle_bad' style={{ marginRight: '0.45rem', width: '12px', height: '12px' }} /> {node.recommendation}
                  </div>
                ))}
              </AccordionItem>
            </Accordion>
          ))}
        </div>
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
            <input
              onChange={(e) => {
                setCurrentYear(e.target.value)
              }}
              value={currentYear}
              type="number" />
          </div>

          <div className='prognoz-form-item'>
            <p>Интенсивность движения фактическая</p>
            <input
              onChange={(e) => {
                setTraffic_intensity_actual(e.target.value)
              }}
              value={traffic_intensity_actual}
              type="number" />

          </div>

          <div className='prognoz-form-item'>
            <p>Интенсивность движения проектная</p>
            <input
              onChange={(e) => {
                setTraffic_intensity_design(e.target.value)
              }}
              value={traffic_intensity_design}
              type="number" />
          </div>

          <div className='prognoz-form-item'>
            <p>Определить стартовый бюджет</p>
            <input
              type="number" />
          </div>
        </div>
        <div className='prognoz-button'>
          <button style={{ marginTop: '1rem' }} onClick={Submit}>Сделать прогноз</button>
        </div>
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
