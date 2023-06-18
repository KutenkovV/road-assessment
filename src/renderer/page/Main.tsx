import '../App/logic';
import { useEffect, useRef, useState } from 'react';
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
import { dataMain, set_dataRemont, set_remontList } from 'renderer/store/MainStore';
import { data } from 'renderer/store/UploadStore';
import StudentMenu from 'renderer/components/StudentMenu/StudentMenu';

function Main(this: any) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0)
  const dataCount = useSelector((state: any) => state.uploadStore.value);


  // Объекты цветной матрицы
  const datares = useSelector((state: any) => state.mainStore.data);
  const rec_dat = useSelector((state: any) => state.mainStore.recommendation_data);
  var current_year = useSelector((state: any) => state.mainStore.current_year);
  var data_remont = useSelector((state: any) => state.mainStore.data_remont);
  var remont_list = useSelector((state: any) => state.mainStore.remont_list);

  useEffect(() => {
    dispatch(dataMain(dataCount));
    console.log(datares);
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

  function OnSubOptimization() {
    console.log('год прогноза: ' + current_year);
    console.log('индекс участка: ' + index);

    remont(index, current_year, data_remont)
    console.log(remont_list);
  }

  function remont(index: number, current_year: number, data: any) {
    let remont_data: {}[] = []
    let remont_items: {}[] = []
    let remont_final: {}[] = []

    data.forEach((element: any, i: number) => {
      element.item.forEach((el: any, idx: number) => {
        remont_items.push({
          index: idx,
          remont: el.remont
        })
        if (i === current_year && idx === index) {
          remont_items.push({
            index: index,
            remont: 'капитальный ремонт: ' + index
          })
        }
      });

      remont_data.push({
        item: remont_items
      })

      remont_final.push({
        item: remont_items.filter((item: any) => item.remont.length !== 0)
      })

      remont_items = [];
    });

    dispatch(set_dataRemont(remont_data));
    dispatch(set_remontList(remont_final))
    return remont_final;
  }

  const [isOpen, setIsOpen] = useState(false)
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
            <div onMouseEnter={() => setIsOpen(true)} onClick={() => (setIndex(index), setIsOpen(!isOpen))} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              data-tooltip-id='my-tooltip'
              data-avg={item.AVG}
              data-avg-color={roadStatus(item.AVG)}
              data-iri={item.IRI.toFixed(2)}
              data-j={item.J.toFixed(2)}
              data-c={item.C.toFixed(2)}
              data-recommendation={[{name: 'one'}, {name: 'two'}]}
              // data-tooltip-html={rem_gen(item.recommendation)}
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
                <hr />
                <p>{activeAnchor?.getAttribute('data-recommendation') || 'Рекомендаций нет'}</p>
              </div>
            )}
          />

          <Tooltip
            clickable={true}
            id="my-tooltip"
            events={['click']}
            className='tooltip-form'
            classNameArrow="tooltip-arrow"
            render={({ activeAnchor }) => (
              <div className='remont-item'>
                <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.50043 1.5C9.50043 2.32812 8.82855 3 8.00043 3C7.1723 3 6.50043 2.32812 6.50043 1.5C6.50043 0.671875 7.1723 0 8.00043 0C8.82855 0 9.50043 0.671875 9.50043 1.5ZM0.306677 6.2125C0.466052 5.83125 0.903552 5.65 1.28793 5.80937L1.8973 6.0625L2.61293 4.87187C3.1223 4.01875 4.04105 3.5 5.03168 3.5C6.63793 3.5 8.06293 4.52812 8.5723 6.05312L9.65355 9.29375L12.1317 10.3281L13.2004 8.90312C13.4004 8.6375 13.7192 8.4875 14.0504 8.50313C14.3817 8.51875 14.6848 8.70312 14.8567 8.9875L17.8567 13.9875C18.041 14.2969 18.0473 14.6812 17.8692 14.9937C17.691 15.3062 17.3598 15.5 17.0004 15.5H9.00043C8.65355 15.5 8.33168 15.3219 8.15043 15.025C7.96918 14.7281 7.95043 14.3625 8.10668 14.0531L8.60668 13.0531C8.77543 12.7156 9.1223 12.5 9.50043 12.5H10.5004L11.2036 11.5625L0.712927 7.19375C0.331677 7.03437 0.150427 6.59688 0.309802 6.2125H0.306677ZM2.89418 9.08125L6.39418 10.5813C6.76293 10.7375 7.00043 11.1 7.00043 11.5V14.5C7.00043 15.0531 6.55355 15.5 6.00043 15.5C5.4473 15.5 5.00043 15.0531 5.00043 14.5V12.1594L3.10668 11.3469L1.95043 14.8156C1.77543 15.3406 1.2098 15.6219 0.684802 15.4469C0.159802 15.2719 -0.121448 14.7063 0.0504268 14.1844L1.55043 9.68437L1.89418 8.65312L2.89418 9.08125Z" fill="#646464" />
                </svg>
                <p>{activeAnchor?.getAttribute('data-recommendation') || 'Рекомендаций нет'}</p>
                <button>Назначить</button>
              </div>
            )}
          />

        </div>

        {/* <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.50043 1.5C9.50043 2.32812 8.82855 3 8.00043 3C7.1723 3 6.50043 2.32812 6.50043 1.5C6.50043 0.671875 7.1723 0 8.00043 0C8.82855 0 9.50043 0.671875 9.50043 1.5ZM0.306677 6.2125C0.466052 5.83125 0.903552 5.65 1.28793 5.80937L1.8973 6.0625L2.61293 4.87187C3.1223 4.01875 4.04105 3.5 5.03168 3.5C6.63793 3.5 8.06293 4.52812 8.5723 6.05312L9.65355 9.29375L12.1317 10.3281L13.2004 8.90312C13.4004 8.6375 13.7192 8.4875 14.0504 8.50313C14.3817 8.51875 14.6848 8.70312 14.8567 8.9875L17.8567 13.9875C18.041 14.2969 18.0473 14.6812 17.8692 14.9937C17.691 15.3062 17.3598 15.5 17.0004 15.5H9.00043C8.65355 15.5 8.33168 15.3219 8.15043 15.025C7.96918 14.7281 7.95043 14.3625 8.10668 14.0531L8.60668 13.0531C8.77543 12.7156 9.1223 12.5 9.50043 12.5H10.5004L11.2036 11.5625L0.712927 7.19375C0.331677 7.03437 0.150427 6.59688 0.309802 6.2125H0.306677ZM2.89418 9.08125L6.39418 10.5813C6.76293 10.7375 7.00043 11.1 7.00043 11.5V14.5C7.00043 15.0531 6.55355 15.5 6.00043 15.5C5.4473 15.5 5.00043 15.0531 5.00043 14.5V12.1594L3.10668 11.3469L1.95043 14.8156C1.77543 15.3406 1.2098 15.6219 0.684802 15.4469C0.159802 15.2719 -0.121448 14.7063 0.0504268 14.1844L1.55043 9.68437L1.89418 8.65312L2.89418 9.08125Z" fill="#646464" />
        </svg> */}
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
      </div >

      <div className="form__input">
        <div>
          {rec_dat.map((el: any, index: number) => (
            <Accordion key={index} transition transitionTimeout={200}>
              <AccordionItem header={"Прогноз на " + (indexCheck(index)) + " год"}>
                {rec_dat[index].item.length === 0 ? (<div>Рекомендации отсутствуют</div>)
                  : <>
                    {el.item.map((node: any, i: number) => (
                      node.recommendation.map((el: any) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                          <p id='rectangle_bad' style={{ marginRight: '0.45rem', width: '12px', height: '12px' }} />
                          {el}
                        </div>
                      ))
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

function indexCheck(index: number) {
  if (index === 0) return 'текущий'
  else return index;
}

function rem_gen(item: any) {
  let a = (
    <>
      <div id="my-div">
        <h4>This is a heading tag.</h4>
        <p>This is a paragraph.</p>
      </div>
      <div id="output"></div>
    </>
  )
}

export default Main;
