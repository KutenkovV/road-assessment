export enum AssessmentCellType {
  All = 'All',
  Lect = 'Lect',
  Prac = 'Prac',
  Lab = 'Lab',
  Cons = 'Cons',
  Exam = 'Exam',
  Zach = 'Zach',
  KursR = 'KursR',
  KursP = 'KursP',
  Dip = 'Dip',
  UchPr = 'UchPr',
  PrPr = 'PrPr',
  GEK = 'GEK',
  RGR = 'RGR',
  ZachOc = 'ZachOc',
  Kontr = 'Kontr',
  Asp = 'Asp',
  Mag = 'Mag',
}

export interface NagruzkaLine {
  title: string;
  students: number;
  faculty: string;
  hLect: number;
  hPrac: number;
  hLab: number;
  hCons: number;
  hExam: number;
  hZach: number;
  hKursR: number;
  hKursP: number;
  hDip: number;
  hUchPr: number;
  hPrPr: number;
  hGEK: number;
  hRGR: number;
  hZachOc: number;
  hKontr: number;
  hAsp: number;
  hMag: number;
  teacher: string;
  sem: number;
}
