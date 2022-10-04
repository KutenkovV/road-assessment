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
            <th>Начало участка</th>
            <th>Конец участка</th>
            <th>Длина участка</th>
            <th>
              Ровность(IRI)
              <th>Полоса № 1</th>
              <th>Полоса № 2</th>
            </th>
            <th>
              Дефектность(J)
              <th>Полоса № 1</th>
              <th>Полоса № 2</th>
            </th>
            <th>
              Сцепление
              <th>Полоса № 1</th>
              <th>Полоса № 2</th>
            </th>
          </tr>
        </thead>
        <tbody>
          {slicedData.map((item) => (
            <tr key={item.start_road}>
              <td>{item.start_road}</td>
              <td>{item.end_road}</td>
              <td>{item.lenght_road}</td>
              <td>
                <td>{item.flatness_road_lane_1}</td>
                <td>{item.flatness_road_lane_2}</td>
              </td>
              <td>
                <td>{item.road_defects_1}</td>
                <td>{item.road_defects_2}</td>
              </td>
              <td>
                <td>{item.road_grip_1}</td>
                <td>{item.road_grip_2}</td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Tabledata;
