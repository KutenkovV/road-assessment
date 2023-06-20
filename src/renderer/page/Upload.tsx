import Dropdown from '../components/dropdown/Dropdown';
import { useNavigate } from 'react-router-dom';
import { road_assessment, IRoad } from '../App/logic';
import { useDispatch, useSelector } from 'react-redux';
import { dataload, setFile, dataloadRAW, set_radio_type } from '../store/UploadStore';

/**
 * Функция возвращает интерфейс для загрузки файла в систему и настройки параметров для формирования дальнейшей оценки
 * @param this 
 * @returns 
 */

function Upload(this: any) {
  const selected = useSelector((state: any) => state.uploadStore.road_class);
  const filename = useSelector((state: any) => state.uploadStore.file);
  const items = useSelector((state: any) => state.uploadStore.valueRAW);
  const radio_selected = useSelector((state: any) => state.uploadStore.radio_type);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // обработка клика кнопки "Оценить"
  /**
   * Обработчик кнопки
   * @param e 
   */
  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const road: IRoad = {
      road_class: selected,
      road_type: radio_selected,
      road_array: items,
    };

    // Загружаем в store наши данные
    dispatch(dataload(road_assessment(road)));
    console.log(items);

    // Переходим на другую страницу
    navigate('/second');
  };

  /**
   * функция выбирает и загружает файл
   * @param defaultPath 
   */
  // функция выбирает и загружает файл
  async function selectFile(defaultPath: string) {
    const file = await window.electron.openFile({
      defaultPath,
      filters: [{ name: '*.xlsx', extensions: ['xlsx'] }],
    });
    console.log(file);
    if (file) {
      let data = await window.electron.loadXls(file);
      dispatch(setFile(file));
      dispatch(dataloadRAW(data));
    }
  }

  function radio(event: any) {
    dispatch(set_radio_type(event.target.value))
  }

  return (
    <>
      <div className="form__input">
        <div className="input-file">
          <label style={{ paddingBottom: '0.5rem' }}>Выберите файл для загрузки</label>
          <input
            type="text"
            value={filename}
            readOnly
            placeholder="Нажмите, чтобы выбрать файл"
            onClick={() => selectFile(filename)}
          />
        </div>

        <div className="input-settings">
          <div className="settings__road-type">
            <label>Выберите тип дорожной одежды</label>
            <div className="road-type__radio">
              <div onChange={radio} className="radio-item">
                <input style={{ cursor: 'pointer' }}
                  id="r-1"
                  type="radio"
                  readOnly
                  value="true"
                  checked={radio_selected === 'true'}
                  name='name'
                />
                <label>Капитальный</label>
              </div>
              <div className="radio-item">
                <input style={{ cursor: 'pointer' }} id="r-1" type="radio" value="false" checked={radio_selected === 'false'} onChange={radio} name='name' />
                <label>Облегченный</label>
              </div>
            </div>
          </div>
          <div style={{ width: '100%' }} className="settings__road-class">
            <label>Выберите класс дороги</label>
            <Dropdown selected={selected} />
          </div>
        </div>
        <div className="input-button prognoz-button" style={{ paddingTop: "1rem" }}>
          <button onClick={onSubmit}>Оценить</button>
        </div>
      </div>
    </>
  );
}

export default Upload;
