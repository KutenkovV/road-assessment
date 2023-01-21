import { useEffect, useState } from 'react';
import './global.scss';
import Dropdown from './dropdown/Dropdown';
import Tabledata from './Table/Tabledata';
import { Link } from 'react-router-dom';
import ReactECharts from 'echarts-for-react';
import { road_assessment, IRoad } from '../logic';

function Upload() {
  const [items, setItems] = useState({});
  const [selected, setSelected] = useState('IA, IБ');
  const [filename, setFilename] = useState('');

  // обработка клика кнопки "Оценить"
  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const road: IRoad = {
      road_class: selected,
      road_type: document.querySelector('input[name="radio"]:checked').value,
      road_array: items,
    };

    setItems(road_assessment(road));
  };




  // функция выбирает и загружает файл
  async function selectFile(defaultPath: string, loadXls: any) {
    const file = await window.electron.openFile({
      defaultPath,
      filters: [{ name: '*.xlsx', extensions: ['xlsx'] }],
    });
    if (file) {
      let data = await window.electron.loadXls(file);
      console.log(data);
      setFilename(file);
      setItems(data);
    }
  }

  // ~Настройки Chart
  let option = {
    title: {
      text: 'Состояние дорог',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          items
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  return (
    <>
      <div className="form__input">
        <div className="input-file">
          <label>Выберите файл для загрузки</label>
          <input
            type="text"
            value={filename}
            placeholder="Нажмите, чтобы выбрать файл"
            onClick={() => selectFile(filename, setFilename)}
            onChange={(e) => setFilename(e.target.value)}
          />
        </div>
        <div className="input-settings">
          <div className="settings__road-type">
            <label>Выберите тип дорожной одежды</label>
            <div className="road-type__radio">
              <div className="radio-item">
                <input
                  id="r-1"
                  type="radio"
                  name="radio"
                  value="true"
                  defaultChecked
                />
                <label>Капитальный</label>
              </div>
              <div className="radio-item">
                <input id="r-1" type="radio" name="radio" value="false" />
                <label>Облегченный</label>
              </div>
            </div>
          </div>
          <div className="settings__road-class">
            <label>Выберите класс дороги</label>
            <Dropdown selected={selected} setSelected={setSelected} />
          </div>
        </div>
        <div className="input-button">
          {/* <Link className="navbar__item-link" to="/">
            <button onClick={onSubmit}>Оценить</button>
          </Link> */}
          <button onClick={onSubmit}>Оценить</button>
        </div>
      </div>
      <div className="form__warning">
        <label>Чтобы продолжить, загрузите данные и определите параметры</label>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32z" />
        </svg>
      </div>

      <div className="form__input">
        <ReactECharts
          className="card-chart"
          style={{ height: '300px' }}
          option={option}
        />
      </div>

      <div className="form__input">
        {/* <Tabledata data={items} /> */}
      </div>
    </>
  );
}

export default Upload;
