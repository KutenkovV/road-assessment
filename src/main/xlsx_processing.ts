import ExcelJS, { Row } from 'exceljs';
import { NagruzkaLine } from '../types';

function processRow(
  row: Row,
  teacher: string,
  sem: number,
): NagruzkaLine {
  return {
    title: row.getCell(1).value as string,
    students: row.getCell(2).value as number,
    faculty: row.getCell(3).value as string,
    hLect: row.getCell(4).value as number,
    hPrac: row.getCell(5).value as number,
    hLab: row.getCell(6).value as number,
    hCons: row.getCell(7).value as number,
    hExam: row.getCell(8).value as number,
    hZach: row.getCell(9).value as number,
    hKursR: row.getCell(10).value as number,
    hKursP: row.getCell(11).value as number,
    hDip: row.getCell(12).value as number,
    hUchPr: row.getCell(13).value as number,
    hPrPr: row.getCell(14).value as number,
    hGEK: row.getCell(15).value as number,
    hRGR: row.getCell(16).value as number,
    hZachOc: row.getCell(17).value as number,
    hKontr: row.getCell(18).value as number,
    hAsp: row.getCell(19).value as number,
    hMag: row.getCell(20).value as number,
    sem,
    teacher,
  };
}

function processRowWrapperFunc(teacher: string, sem:number) {
  return (x: Row) => processRow(x, teacher, sem);
}

// eslint-disable-next-line import/prefer-default-export
export async function loadXls(filename: string, sem: number): Promise<Array<NagruzkaLine>> {
  const workBook = new ExcelJS.Workbook();
  await workBook.xlsx.readFile(filename);
  const sheet = workBook.getWorksheet('Sheet1');

  let items: Array<NagruzkaLine> = [];

  let teacher = '';
  let rows: Array<Row> = [];

  const prepRegex = new RegExp('Преподаватель (.*)');
  for (let i = 1; i <= sheet.rowCount; i += 1) {
    const row = sheet.getRow(i);
    const firstCell = row.getCell(1);
    if (typeof firstCell.value === 'string') {
      const match = prepRegex.exec(firstCell.value);
      if (match) {
        [, teacher] = match;
        console.log(`${i} ${teacher}`)

        rows = [];
        i += 3;
      } else if (firstCell.value.includes('Итого по ставке Совмещение')) {
        items = items.concat(
          rows.map(processRowWrapperFunc(teacher, NagruzkType.Sovmeshenie, sem))
        );
        rows = [];
      } else if (firstCell.value.includes('Итого по ставке Совместитель')) {
        items = items.concat(
          rows.map(processRowWrapperFunc(teacher, NagruzkType.Sovmeshenie, sem))
        );
        rows = [];
      } else if (firstCell.value.includes('Итого по ставке Часовик')) {
        items = items.concat(
          rows.map(processRowWrapperFunc(teacher, NagruzkType.Chasovik, sem))
        );
        rows = [];
      } else if (firstCell.value.includes('Итого по ставке Штатный')) {
        items = items.concat(
          rows.map(processRowWrapperFunc(teacher, NagruzkType.Shtat, sem))
        );
        rows = [];
      } else if (firstCell.value.includes('Итого')) {
        rows = [];
      } else {
        console.log(firstCell.value)
        rows.push(row);
      }
    }
  }

  return new Promise((resolve) => {
    return resolve(items);
  });
}
