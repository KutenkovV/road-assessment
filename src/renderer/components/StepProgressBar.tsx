import { last } from 'lodash';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useSelector } from 'react-redux';
import { set_progressBar } from '../store/MainStore';

function StepProgressBar() {
  const items = useSelector((state: any) => state.mainStore.value);
  const style = { width: 200, margin: 0 };

  let marks = {
    0: 0,
  }

  const markss = {
    '-10': '-10°C',
    0: <strong>0°C</strong>,
    26: '26°C',
    37: '37°C',
    50: '50°C',
  };

  function log(value: any) {
    console.log(value);
    console.log(items);
    console.log(markss);
  }

  return (
    <>
      <div>
        <Slider
          style={style}
          range
          max={2}
          marks={markss}
          onChange={log}
          step={null}
          included={false}
          defaultValue={0}
          // allowCross={false}
        />
      </div>
    </>
  );
}

export default StepProgressBar;
