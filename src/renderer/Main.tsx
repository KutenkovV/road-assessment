import './main.css';
import ReactECharts from 'echarts-for-react';
import { useState } from 'react';
import Dropdown from './components/dropdown/Dropdown';
import './logic';
import { road_degradation, IRoad } from './logic';

// Пока непонятная конструкция "Main: React.FC"
const Main: React.FC = () => {
  const [selected, setSelected] = useState('IA');
  const [item, setItem] = useState({});

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const road: IRoad = {
      flatness_road_lane: document.getElementById('IRI').value,
      road_defects: document.getElementById('J').value,
      road_grip: document.getElementById('C').value,
      current_year: document.getElementById('year_current').value,
      future_year: document.getElementById('future_year').value,
      road_class: selected,
      road_type: document.querySelector('input[name="radio"]:checked').value,
    };

    setItem(road_degradation(road));
  };

  // ~Настройки Chart
  const options = {
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove',
    },
    series: [
      {
        type: 'tree',

        data: [item],

        top: '1%',
        left: '7%',
        bottom: '1%',
        right: '20%',

        symbolSize: 12,

        label: {
          position: 'right',
          verticalAlign: 'middle',
          align: 'left',
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
          <label>Выберите класс дороги</label>
          <Dropdown selected={selected} setSelected={setSelected} />
        </div>

        {/* Радиобаттоны */}
        <div className="form-radio">
          <label>Выберите тип дорожной одежды</label>
          <div>
            <input
              id="r-1"
              type="radio"
              name="radio"
              value="true"
              defaultChecked
            />
            <label>Капитальный</label>
          </div>
          <div>
            <input id="r-1" type="radio" name="radio" value="false" />
            <label>Облегченный</label>
          </div>
        </div>

        {/* Инпуты */}
        <div className="form-input">
          <label>Введите оценку IRI (Ровность)</label>
          <input id="IRI" step={0.1} placeholder="Оценка IRI" type="number" />
        </div>
        <div className="form-input">
          <label>Введите оценку J (Дефектность)</label>
          <input id="J" step={0.1} placeholder="Оценка J" type="number" />
        </div>
        <div className="form-input">
          <label>Введите оценку С (Сцепление)</label>
          <input id="C" step={0.1} placeholder="Оценка C" type="number" />
        </div>
        <div className="form-input">
          <label>Введите текущий период эксплуатации</label>
          <input id="year_current" placeholder="Год" type="number" />
        </div>
        <div className="form-input">
          <label>Введите на сколько лет делать прогноз</label>
          <input id="future_year" placeholder="Год" type="number" />
        </div>

        {/* Кнопочка */}
        <div className="form-input">
          <button onClick={onSubmit}>Рассчитать</button>
        </div>
      </div>
      <div className="card">
        <ReactECharts
          className="card-chart"
          style={{ height: '600px' }}
          option={options}
        />
      </div>
    </>
  );
};

export default Main;
