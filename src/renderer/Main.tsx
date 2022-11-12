import './main.css';
import ReactECharts from 'echarts-for-react';
import data_chart from './flare.json';

// Пока непонятная конструкция "Main: React.FC"
const Main: React.FC = () => {
  console.log(data_chart);

  var road_2 = {
    flatness_road_lane_1: 5,
    road_defects_1: 4.5,
    road_grip_1: 4.3,
    current_year: 5,
    future_year: 3,
  };

  function road_degradation(param: any) {
    let IRI = road_2.flatness_road_lane_1;
    let J = road_2.road_defects_1;
    let C = road_2.road_grip_1;

    let Tc = road_2.current_year;
    let Tf = road_2.future_year;

    let array1;
    let array2;
    let array3;

    let e1 = 0.7;
    let e2 = 0.9;
    let e3 = 0.8;

    for (let i = 1; i <= Tf; i++) {
      // array1 = inaction(IRI, J, C);
      // array2 = work_1(IRI, J, C);
      // array3 = work_2(IRI, J, C);

      array1 = [
        {
          name: 'IRI',
          value: (IRI **= e1),
        },
        {
          name: 'J',
          value: (J **= e1),
        },
        {
          name: 'C',
          value: (C **= e1),
        },
      ];

      console.log(array1);
      

      array2 = [
        {
          name: 'IRI',
          value: (IRI **= e2),
        },
        {
          name: 'J',
          value: (J **= e2),
        },
        {
          name: 'C',
          value: (C **= e3),
        },
      ];

      array3 = [
        {
          name: 'IRI',
          value: (IRI **= e3),
        },
        {
          name: 'J',
          value: (J **= e3),
        },
        {
          name: 'C',
          value: (C **= e3),
        },
      ];
    }

    let data = {
      name: 'Прогноз',
      children: [
        { name: 'Ничего не делаем', children: array1 },
        { name: 'Вид работ 1', children: array2 },
        { name: 'Вид работ 2', children: array3 },
      ],
    };

    console.log('See there');
    console.log(data);

    return data;
  }

  // Вариант бездействия
  function inaction(IRI: any, J: any, C: any) {
    const e = 0.7;

    let array = [
      {
        name: 'IRI',
        value: (IRI **= e),
      },
      {
        name: 'J',
        value: (J **= e),
      },
      {
        name: 'C',
        value: (C **= e),
      },
    ];

    return array;
  }

  function work_1(IRI: any, J: any, C: any) {
    const e = 0.9;

    let array = [
      {
        name: 'IRI',
        value: (IRI **= e),
      },
      {
        name: 'J',
        value: (J **= e),
      },
      {
        name: 'C',
        value: (C **= e),
      },
    ];

    return array;
  }

  function work_2(IRI: any, J: any, C: any) {
    const e = 0.8;

    let array = [
      {
        name: 'IRI',
        value: (IRI **= e),
      },
      {
        name: 'J',
        value: (J **= e),
      },
      {
        name: 'C',
        value: (C **= e),
      },
    ];

    return array;
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
          <input placeholder='Оценка IRI' type="number" />
        </div>
        <div className="form-input">
          <label>Введите оценку J (Дефектность)</label>
          <input placeholder='Оценка J' type="number" />
        </div>
        <div className="form-input">
          <label>Введите оценку С (Сцепление)</label>
          <input placeholder='Оценка C' type="number" />
        </div>
        <div className="form-input">
          <label>Введите текущий период эксплуатации</label>
          <input placeholder='Год' type="number" />
        </div>
        <div className="form-input">
          <label>Введите на сколько лет делать прогноз</label>
          <input placeholder='Год' type="number" />
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
