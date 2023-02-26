import { last } from 'lodash';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useSelector } from 'react-redux';
import { set_progressBar } from '../store/MainStore';

function StepProgressBar() {
  var _ = require('lodash');
  const items = useSelector((state: any) => state.mainStore.value);
  const yearForecast = useSelector((state: any) => state.mainStore.yearForecast);

  const style = { width: 200, margin: 0 };



  const marks = {
    0: 0,
    50: 1,
    100: 2,
  }

  function log() {

    
    // console.log(value);
    console.log(yearForecast);
    console.log(items);
    // console.log(markss);
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
          // allowCross={false}
        />
        <button onClick={log}>Кнопка</button>
      </div>
    </>
  );
}

export default StepProgressBar;
