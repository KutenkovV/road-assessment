import ExcelJS, { Row } from 'exceljs';
import { Road_line } from '../types';

function processRow(row: Row): Road_line {
  return {
    start_road: row.getCell(1).value as number,
    end_road: row.getCell(2).value as number,
    lenght_road: row.getCell(3).value as number,
    flatness_road_lane_1: row.getCell(4).value as number,
    flatness_road_lane_2: row.getCell(5).value as number,
    road_defects_1: row.getCell(6).value as number,
    road_defects_2: row.getCell(7).value as number,
    road_grip_1: row.getCell(8).value as number,
    road_grip_2: row.getCell(9).value as number,
  };
}

export async function loadXls(filename: string): Promise<Road_line[]> {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filename);
  const worksheet = workbook.getWorksheet('Лист1');

  const items: Road_line[] = [];

  worksheet.eachRow((row, rowNumber) => {
    const firstCell = row.getCell(1).value;
    if (typeof firstCell === 'number') {
      items.push(processRow(row));
    }
  });

  return items;
}
