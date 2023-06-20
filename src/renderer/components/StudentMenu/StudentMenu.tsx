import { useEffect, useRef, useState } from "react";
import { dataMain, set_dataRemont, set_remontList } from 'renderer/store/MainStore';
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import "../../../styles/global.scss"

function StudentMenu(onChange: any ,itemm: any, indexx: any, isActivee: any) {
  const dispatch = useDispatch();
  const [index, setIndex] = useState(indexx)

  var current_year = useSelector((state: any) => state.mainStore.current_year);
  var data_remont = useSelector((state: any) => state.mainStore.data_remont);
  var remont_list = useSelector((state: any) => state.mainStore.remont_list);
  const btnRef = useRef();
  const [isActive, setIsActive] = useState(isActivee);
  const [item, setItem] = useState(itemm);

  useEffect(() => {
    console.log(item);
    setItem(item)
    onChange(itemm);
  }, [item])

  // Обрабатываем мисклик
  useEffect(() => {
    const handler = (event: any) => {
      //@ts-ignore
      if (btnRef.current && !btnRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  function OnSubOptimization(remont_recommendation: any) {
    console.log('год прогноза: ' + current_year);
    console.log('индекс участка: ' + index);

    console.log(item);

    console.log(remont_recommendation);
    remont(index, current_year, data_remont, remont_recommendation)
    console.log(remont_list);
  }

  function remont(index: number, current_year: number, data: any, remont_recommendation: any) {
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
            remont: remont_recommendation
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

  return (
    <>
      {isActive && (
        //@ts-ignore
        <div ref={btnRef} className="studentMenu-content">
          {
            item.length === 0 ? (<div>Назначать нечего</div>) : (
              <>
                {item.map((element: any, index: number) => (
                  <div tabIndex={index} className='studentMenu-item'>
                    {element}
                  </div>
                ))}
                <div className="studentMenu-define">
                  <button onClick={() => { OnSubOptimization(item) }} className="btn btn-primary">Определить</button>
                </div>
              </>
            )
          }
        </div>
      )}
    </>
  );
}

export default StudentMenu;

