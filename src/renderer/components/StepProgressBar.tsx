import { last } from 'lodash';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useSelector, useDispatch } from 'react-redux';
import { set_progressBar, dataloadMain } from '../store/MainStore';
import { dataGet } from 'renderer/store/UploadStore';

function StepProgressBar(this: any) {
  var _ = require('lodash');
  const dispatch = useDispatch();
  const items = useSelector((state: any) => state.mainStore.value);
  const yearForecast = useSelector((state: any) => state.mainStore.yearForecast);
  const data = useSelector((state: any) => state.data.value);
  const data_final = useSelector((state: any) => state.mainStore.data_list);

  const style = { width: 200, margin: 0 };

  // Тут получаем текущее значение в ProgressBar
  function log(value: any) {
    console.log('value of data');
    console.log(data[value].items);
    // console.log(_.values(data_final[value]));
    // console.log(_.mapValues(_.keyBy(data_final, 'element')));
    dispatch(dataloadMain(data[value].items));
    console.log(data_final);
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
          step={null}
          included={false}
          defaultValue={0}
        />
      </div>
    </>
  );
}

export default StepProgressBar;
// function dispatch(_arg0: any) {
//   throw new Error('Function not implemented.');
// }

