import './main.css';
import ReactECharts from 'echarts-for-react';
import data_chart from './flare.json';

// Пока непонятная конструкция "Main: React.FC"
const Main: React.FC = () => {
  
  // ~Настройки Chart
  const options = {
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove',
    },
    series: [
      {
        type: 'tree',

        data: [data_chart],

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
          <button>Рассчитать</button>
        </div>
      </div>
      <div className="card">
        <ReactECharts style={{ height: '400px' }} option={options} />
      </div>
    </>
  );
};

export default Main;
