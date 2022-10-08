import _ from 'lodash';
import { useEffect, useState } from 'react';

const Tabledata = ({ data }) => {
  console.log('Данные в таблице!');
  console.log(data);

  const [slicedData, setSlicedData] = useState([...data]);

  useEffect(() => {
    setSlicedData(data);
  }),
    [];

  console.log('Данные в slicedData!');
  console.log(slicedData);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th rowSpan={2}>Начало участка</th>
            <th rowSpan={2}>Конец участка</th>
            <th rowSpan={2}>Длина участка</th>
            <th colSpan={2}>Ровность(IRI)</th>
            <th colSpan={2}>Дефектность(J)</th>
            <th colSpan={2}>Сцепление</th>
          </tr>
          <tr>
            <th>Полоса № 1</th>
            <th>Полоса № 2</th>
            <th>Полоса № 1</th>
            <th>Полоса № 2</th>
            <th>Полоса № 1</th>
            <th>Полоса № 2</th>
          </tr>
        </thead>
        <tbody>
          {slicedData.map((item) => (
            <tr key={item.start_road}>
              <td>{item.start_road}</td>
              <td>{item.end_road}</td>
              <td>{item.lenght_road}</td>
              <td>{item.flatness_road_lane_1}</td>
              <td>{item.flatness_road_lane_2}</td>
              <td>{item.road_defects_1}</td>
              <td>{item.road_defects_2}</td>
              <td>{item.road_grip_1}</td>
              <td>{item.road_grip_2}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Tabledata;
