import _ from 'lodash';
import { useEffect, useState } from 'react';

const Tabledata = ({ data }) => {
  console.log('Данные в таблице!');
  console.log(data);

  const [slicedData, setSlicedData] = useState([...data]);
  
  useEffect(() => {
    setSlicedData(data);
  }), [];

  console.log('Данные в slicedData!');
  console.log(slicedData);
  

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Начало_участка_км</th>
            <th>Конец_участка_км</th>
            <th>Длина_участка_км</th>
            <th>Ровность(IRI),м/км_полоса1</th>
            <th>Ровность(IRI),м/км_полоса2</th>
            <th>Дефектность(J)_полоса1</th>
            <th>Дефектность(J)_полоса2</th>
            <th>Сцепление_полоса1</th>
            <th>Сцепление_полоса2</th>
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
