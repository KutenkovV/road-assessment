import ExcelJS, { Row } from 'exceljs';
import { Road_line } from '../types';


function processRow(
  row: Row,
): Road_line {
  return {
    start_road: row.getCell(1).value as number,
    end_road: row.getCell(2).value as number,
    lenght_road: row.getCell(3).value as number,
    flatness_road_lane_1: row.getCell(4).value as number,
    flatness_road_lane_2: row.getCell(5).value as number,
    road_defects_1: row.getCell(6).value as number,
    road_defects_2: row.getCell(7).value as number,
    road_grip_1: row.getCell(8).value as number,
    road_grip_2: row.getCell(9).value as number
  };
}

function processRowWrapperFunc() {
  return (x: Row) => processRow(x);
}

export async function loadXls(filename: string): Promise<Array<Road_line>> {
  let workBook = new ExcelJS.Workbook(); // Создаем книгу
  await workBook.xlsx.readFile(filename); // Читаем файл
  let worksheet = workBook.getWorksheet('Лист1');

  let items: Array<Road_line> = [];
  let rows: Array<Row> = [];

  for (let i = 0; i <= worksheet.rowCount; i++) {

    const row = worksheet.getRow(i);
    
    const firstCell = row.getCell(1);

    if (typeof firstCell.value === 'number') {
      console.log(row.values)
      rows.push(row);
      items = rows.map(processRowWrapperFunc());
    }
  }

  return new Promise((resolve) => {
    return resolve(items);
  });
}
