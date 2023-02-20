import { useState } from 'react';
import Dropdown from '../components/dropdown/Dropdown';
import Tabledata from '../components/Table/Tabledata';
import { useNavigate } from 'react-router-dom';
import ReactECharts from 'echarts-for-react';
import { road_assessment, IRoad } from '../logic';

import { useDispatch, useSelector } from 'react-redux';
import { dataload, setFile, fileGet } from '../store/data';

function Upload() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState('IA, IБ');
  const filename = useSelector((state) => state.data.file)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // обработка клика кнопки "Оценить"
  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const road: IRoad = {
      road_class: selected,
      road_type: document.querySelector('input[name="radio"]:checked').value,
      road_array: items,
    };

    setItems(road_assessment(road));

    // Загружаем в store наши данные
    dispatch(dataload(items));
    // Переходим на другую страницу 
    navigate('/second');
  };

  // функция выбирает и загружает файл
  async function selectFile(defaultPath: string) {
    const file = await window.electron.openFile({
      defaultPath,
      filters: [{ name: '*.xlsx', extensions: ['xlsx'] }],
    });
    if (file) {
      let data = await window.electron.loadXls(file);
      console.log(data);
      dispatch(setFile(file));
      setItems(data);
    }
  }

  return (
    <>
      <div className="form__input">
        <div className="input-file">
          <label>Выберите файл для загрузки</label>
          <input
            type="text"
            value={filename}
            placeholder="Нажмите, чтобы выбрать файл"
            onClick={() => selectFile(filename)}
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
          <button onClick={onSubmit}>Оценить</button>
        </div>
      </div>
    </>
  );
}

export default Upload;
