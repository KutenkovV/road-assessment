import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useSelector, useDispatch } from 'react-redux';
import { dataMain, set_currentYear } from '../store/MainStore';

function StepProgressBar(this: any) {
  const dispatch = useDispatch();
  var marks_item = useSelector((state: any) => state.mainStore.marks_item);
  var yearForecast = useSelector((state: any) => state.mainStore.yearForecast);
  var data_final = useSelector((state: any) => state.mainStore.data_list);

  const style = { width: 200, margin: 0 };

  function set_data(value: any) {
    dispatch(dataMain(data_final[value].items));
    dispatch(set_currentYear(value[0]));
  }

  return (
    <>
      <div>
        <Slider
          style={style}
          range
          min={0}
          max={yearForecast}
          marks={marks_item}
          onChange={set_data}
          step={1}
          included={false}
          defaultValue={0}
        />
      </div>
    </>
  );
}

export default StepProgressBar;

