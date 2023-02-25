import { last } from 'lodash';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

function StepProgressBar() {
  const style = { width: 200, margin: 0 };

  const marks = {
    0: 0,
    1: 1,
    2: 2,
  };

  const markss = {
    '-10': '-10°C',
    0: <strong>0°C</strong>,
    26: '26°C',
    37: '37°C',
    50: '50°C',
    100: {
      style: {
        color: 'red',
      },
      label: <strong>100°C</strong>,
    },
  };

  function log(value: any) {
    console.log(value); //eslint-disable-line
  }

  return (
    <>
      <div>
        <Slider
          style={style}
          range
          max={2}
          marks={marks}
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
