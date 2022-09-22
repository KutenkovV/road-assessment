import _, {Dictionary, round} from 'lodash';

import {makeAutoObservable, toJS} from 'mobx';
import {
  getNagruzkaLineTotal, NagruzkaConfig
} from '../types';

export default class NagruzkaStore {
  config: NagruzkaConfig = {
    filenameSem1: "",
    filenameSem2: "",
    lastTeacher: "",
    weeksCount: 0,
    changes: []
  };

  constructor() {
    makeAutoObservable(this);
  }

  async setConfig(value: NagruzkaConfig) {
    this.config = value;
    await window.electron.userWrite(value)
  }

  async loadConfigFromUser() {
    const config = await window.electron.userRead();
    this.config = config;
    this.selectedTeacher = config.lastTeacher;
  }

  setSelectedTeacher(value: string) {
    this.selectedTeacher = value
    this.setConfig({...this.config, lastTeacher: value});
  }

  setClickedPosition(value: { left: number, top: number } | null) {
    this.clickedPosition = value;
  }

  setClickedRow(value: NagruzkaLine | null) {
    this.clickedRow = value;
  }

  setMoveCellInfo(value: MoveCellInfo | null) {
    this.moveCellInfo = value;
  }

  setHoveredCellType(value: NagruzkaCellType) {
    this.hoveredCellType = value
  }

  setHoveredRow(value: NagruzkaLine) {
    this.hoveredRow = value;
  }

  setSelectedSem(value: number) {
    this.selectedSem = value
  }

  moveNagruzkaRow(row: NagruzkaLine, hours: number, cellType: NagruzkaCellType, type: NagruzkType, teacher: string) {
    let toRow = _.find(this.nagruzka, x =>
      x.type === type && x.sem === row.sem && x.teacher === teacher && row.title === x.title
    );
    (row as any)[`h${cellType}`] -= hours;
    if (!toRow) {
      toRow = {
        title: row.title,
        students: row.students,
        faculty: row.faculty,
        hLect: 0,
        hPrac: 0,
        hLab: 0,
        hCons: 0,
        hExam: 0,
        hZach: 0,
        hKursR: 0,
        hKursP: 0,
        hDip: 0,
        hUchPr: 0,
        hPrPr: 0,
        hGEK: 0,
        hRGR: 0,
        hZachOc: 0,
        hKontr: 0,
        hAsp: 0,
        hMag: 0,
        sem: row.sem,
        teacher,
        type,
      }
      this.nagruzka.push(toRow);
    }

    if (toRow) {
      this.nagruzka = this.nagruzka.map(x => {
        if (x.type === (toRow as NagruzkaLine).type
          && x.teacher === (toRow as NagruzkaLine).teacher
          && x.sem === (toRow as NagruzkaLine).sem
          && x.title === (toRow as NagruzkaLine).title) {
          (x as any)[`h${cellType}`] += hours;
        }
        return x
      }).filter(x => getNagruzkaLineTotal(x) > 0)
    }
    this.moveCellInfo = null;
  }

  async loadSemesters() {
    const itemsSem1 = await window.electron.loadXls(this.config.filenameSem1, 1);
    const itemsSem2 = await window.electron.loadXls(this.config.filenameSem2, 2);
    this.nagruzka = [...itemsSem1, ...itemsSem2];
    this.baseNagruzka = _.cloneDeep(this.nagruzka);
  }

  async fixNagruzka() {
    const f = await window.electron.openFile({});
    if (f) {
      window.electron.saveNagruzka(f, toJS(this.nagruzka))
    }
  }

  setBaseNagruzka(value: Array<NagruzkaLine>) {
    this.baseNagruzka = value;
  }

  get nagruzkaDiff(): Array<{
    key: number,
    diff: number,
    title: number,
    sem: number,
    type: NagruzkType,
    teacher: string,
  }> {
    let items: Array<{
      key: number,
      diff: number,
      title: number,
      sem: number,
      type: NagruzkType,
      teacher: string,
    }> = [];
    this.baseNagruzka.forEach(x1 => {
      const x2 = this.nagruzka.find(y => {
        return x1.type === y.type && x1.teacher === y.teacher && x1.sem === y.sem && x1.title === y.title
      })
      if (x2) {
        const subItems: Array<any> = [
          'hLect', 'hPrac', 'hLab', 'hCons', 'hExam', 'hZach', 'hKursR', 'hKursP',
          'hDip', 'hUchPr', 'hPrPr', 'hGEK', 'hRGR', 'hZachOc', 'hKontr', 'hAsp', 'hMag'
        ].filter(k => {
          return (x1 as any)[k] !== (x2 as any)[k]
        }).map((k) => {
          return {
            "key": k,
            "diff": (x2 as any)[k] - (x1 as any)[k],
            "title": x1.title,
            "sem": x1.sem,
            "type": x1.type !== x2.type ? `${GetNagruzkTypeInfo(x1.type).title} -> ${GetNagruzkTypeInfo(x2.type).title}` : '',
            "teacher": x1.teacher
          }
        });
        items = [...items, ...subItems];
      }
    })
    return items;
  }

  get teachers(): Array<string> {
    return _(this.nagruzka)
      .map((x) => x.teacher)
      .uniq()
      .sort()
      .value();
  }

  get selectedNagruzka(): Array<NagruzkaLine> {
    return _(this.nagruzka)
      .filter((x) => x.teacher === this.selectedTeacher)
      .orderBy((x) => x.title)
      .value();
  }

  totalBySem(sem: number): { total: number; auditory: number; sovmeshenie: number; shtat: number; chasovik: number } {
    const sovmeshenie = round(_(this.selectedNagruzka).filter((x) =>
      x.sem === sem && x.type === NagruzkType.Sovmeshenie
    ).sumBy(getNagruzkaLineTotal), 2)
    const chasovik = round(_(this.selectedNagruzka).filter((x) =>
      x.sem === sem && x.type === NagruzkType.Chasovik
    ).sumBy(getNagruzkaLineTotal), 2)
    const shtat = round(_(this.selectedNagruzka).filter((x) =>
      x.sem === sem && x.type === NagruzkType.Shtat
    ).sumBy(getNagruzkaLineTotal), 2)
    const auditory = round(_(this.selectedNagruzka).filter((x) =>
      x.sem === sem && !x.title.includes('(ПД)')
    ).sumBy(x => x.hLect + x.hLab + x.hPrac), 2)
    return {
      total: round(sovmeshenie + chasovik + shtat, 2),
      sovmeshenie,
      chasovik,
      shtat,
      auditory
    }
  }

  get totalBySem1(): { total: number; sovmeshenie: number; shtat: number; chasovik: number; auditory: number; } {
    return this.totalBySem(1)
  }

  get totalBySem2(): { total: number; sovmeshenie: number; shtat: number; chasovik: number; auditory: number; } {
    return this.totalBySem(2)
  }

  get selectedNagruzkaGroupedByType(): Dictionary<{ items: Array<NagruzkaLine>, total: number }> {
    return _(this.selectedNagruzka).filter((x) => x.sem === this.selectedSem)
      .groupBy((x: NagruzkaLine) => x.type).map((items, key) => {
        const total = round(_.sumBy(items, getNagruzkaLineTotal), 2)
        return [key, {
          items,
          total
        }]
      }).fromPairs().value();
  }
}
