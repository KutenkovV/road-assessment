import '../App/logic';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import StepProgressBar from 'renderer/components/StepProgressBar';
import PrognozItem from 'renderer/components/PrognozItem';
import "../../styles/accordeon.scss"
import "./Main.scss"

/// Для тултипов (https://react-tooltip.com/docs/getting-started)
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
/// Для аккордеона (https://szhsin.github.io/react-accordion/docs/getting-started)
import { Accordion, AccordionItem as Item } from "@szhsin/react-accordion";
import chevronDown from "../chevron-down.svg";
import { dataMain } from 'renderer/store/MainStore';

function Main(this: any) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataCount = useSelector((state: any) => state.uploadStore.value);


  // Объекты цветной матрицы
  const datares = useSelector((state: any) => state.mainStore.data);
  const rec_dat = useSelector((state: any) => state.mainStore.recommendation_data);

  useEffect(() => {
    dispatch(dataMain(dataCount));
    console.log(dataCount);
  }, [])


  /* @ts-ignore */
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
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              data-tooltip-id='my-tooltip'
              data-avg={item.AVG}
              data-avg-color={roadStatus(item.AVG)}
              data-iri={item.IRI.toFixed(2)}
              data-j={item.J.toFixed(2)}
              data-c={item.C.toFixed(2)}
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
                  <label style={{ marginLeft: '0.45rem', width: '12px', height: '12px' }} id={activeAnchor?.getAttribute('data-avg-color') || 'not set'} />
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
            <Accordion key={index} transition transitionTimeout={200}>
              <AccordionItem header={"Прогноз на " + (indexChech(index)) + " год"}>
                {rec_dat[index].item.length === 0 ? (<div>Рекомендации отсутствуют</div>)
                  : <>
                    {el.item.map((node: any, i: number) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                        <p id='rectangle_bad' style={{ marginRight: '0.45rem', width: '12px', height: '12px' }} /> {node.recommendation}
                      </div>
                    ))}
                  </>
                }
              </AccordionItem>
            </Accordion>
          ))}
        </div>
        <PrognozItem />
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

function indexChech(index: number) {
  if (index === 0) return 'текущий'
  else return index;
}

export default Main;
