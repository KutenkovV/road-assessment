import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useSelector, useDispatch } from 'react-redux';
import { dataMain } from '../store/MainStore';

function StepProgressBar(this: any) {
  const dispatch = useDispatch();
  var items = useSelector((state: any) => state.mainStore.value);
  let yearForecast = useSelector((state: any) => state.mainStore.yearForecast);
  var data_final = useSelector((state: any) => state.mainStore.data_list);

  const style = { width: 200, margin: 0 };

  // Тут получаем текущее значение в ProgressBar
  function log(value: any) {
    dispatch(dataMain(data_final[value].items));
  }

  return (
    <>
      <div>
        <Slider
          style={style}
          range
          min={0}
          max={yearForecast}
          marks={items}
          onChange={log}
          step={1}
          included={false}
          defaultValue={0}
        />
      </div>
    </>
  );
}

export default StepProgressBar;

