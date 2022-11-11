import './main.css';
import ReactECharts from 'echarts-for-react';
import data_chart from './flare.json';
import { useState } from 'react';

// Пока непонятная конструкция "Main: React.FC"
const Main: React.FC = () => {
  let data: { name: string; children: Map<any, any>[]; }[]=[];
  console.log(data_chart);

  var road_2 = {
    flatness_road_lane_1: 5,
    road_defects_1: 4.5,
    road_grip_1: 4.5,
    current_year: 5,
    future_year: 3,
  };

  function road_degradation(param: any) {
    let IRI = road_2.flatness_road_lane_1;
    let J = road_2.road_defects_1;
    let C = road_2.road_grip_1;

    let Tc = road_2.current_year;
    let Tf = road_2.future_year;

    type Data = {
      name: string;
      children: [
        {
          IRI: number;
          J: number;
          C: number;
        }
      ];
    };

    let array = new Map<any, any>();
    let array3 = {};


    for (let i = 1; i <= Tf; i++) {
      IRI **= 0.9;
      J **= 0.9;
      C **= 0.9;

      array3 = [{
        name: "IRI", value: IRI
      }, {
        name: "J", value: J
      }, {
        name: "C", value: C
      }]
    }

    let arr2 = {
      name: 'Ничего не делаем', 
      children: array3
    }

    console.log('See there');
    console.log(arr2);
    // data.push(array3);
    
    return arr2;
  }

  // ~Настройки Chart
  const options = {
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove',
    },
    series: [
      {
        type: 'tree',

        data: [road_degradation(road_2)],

        top: '1%',
        left: '7%',
        bottom: '1%',
        right: '20%',

        symbolSize: 12,

        label: {
          position: 'left',
          verticalAlign: 'middle',
          align: 'right',
          fontSize: 16,
        },

        leaves: {
          label: {
            position: 'right',
            verticalAlign: 'middle',
            align: 'left',
          },
        },

        emphasis: {
          focus: 'descendant',
        },

        expandAndCollapse: true,
        animationDuration: 550,
        animationDurationUpdate: 750,
      },
    ],
  };

  return (
    <>
      <div className="card-form">
        <div className="form-input">
          <label>Введите оценку IRI (Ровность)</label>
          <input type="number" />
        </div>
        <div className="form-input">
          <label>Введите оценку J (Дефектность)</label>
          <input type="number" />
        </div>
        <div className="form-input">
          <label>Введите оценку С (Сцепление)</label>
          <input type="number" />
        </div>
        <div className="form-input">
          <label>Введите текущий период эксплуатации</label>
          <input type="number" />
        </div>
        <div className="form-input">
          <label>Введите на сколько лет делать прогноз</label>
          <input type="number" />
        </div>

        {/* Кнопочка */}
        <div className="form-input">
          <button onClick={road_degradation}>Рассчитать</button>
        </div>
      </div>
      <div className="card">
        <ReactECharts style={{ height: '400px' }} option={options} />
      </div>
    </>
  );
};

export default Main;
