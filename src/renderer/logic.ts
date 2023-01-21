import { number } from 'echarts';

// Интерфейс дороги
export interface IRoad {
  road_class: string;
  road_type: string;
  road_array: [];
}

export function road_assessment(param: any) {
  console.log('it is work!');

  let data_score = [];
  console.log(param);
  param.road_array.forEach((item) => {
    data_score.push({
      IRI: iri_score(param, item.flatness_road_lane_1),
      J: item.road_defects_1,
      C: c_score(item.road_grip_1)
    });
  });
  console.log(data_score);
}

export function road_degradation1(param: any) {
  console.log('IRI see there:');

  // Оцениваем IRI & C
  let IRI = iri_score(param);
  let C = c_score(param);
  let J = param.road_defects; // J уже идёт с оценкой

  // console.log('Оценка ровность: ' + IRI);
  // console.log('Оценка сцепление: ' + C);
  // console.log('Оценка дефектность: ' + J);

  console.log(param);

  let Tc = param.current_year;
  let Tf = param.future_year;

  let f_item = {
    name: 'Прогноз',
    children: [],
  };

  let nodes = [f_item];
  let jobs = ['Ничего не делаем', 'Сценарий 1', 'Сценарий 2'];

  for (let i = 1; i <= Tf; i++) {
    let newNodes = [];

    nodes.forEach((node) => {
      node.children = [];
      jobs.forEach((j) => {
        let new_item = {
          name: j,
          children: [],
        };
        node.children.push(new_item);
        newNodes.push(new_item);
      });
    });

    nodes = newNodes;
    console.log(f_item);

    console.log(nodes);
  }

  return f_item;
}

// Оценка C
function c_score(param: any) {
  let C = param;
  console.log(param);
  

  if (C >= 0.3) C = 5;
  else if (C < 0.1) C = 1;
  else if (C = 0.1) C = 2;
  else if (C <= 0.2) C = 3;
  else if (C <= 0.3) C = 4;

  return C;
}

// Оценка IRI
function iri_score(param: any, item: any) {
  let IRI = item;
  let r_class = param.road_class;
  let r_type = param.road_type; // true - Капитальный false - Облегченный

  // console.log(IRI + ' ' + r_class + ' ' + r_type);

  let iri_score;

  // Оцениваю без округлений, строго по табличным значениям
  // КАПИТАЛЬНЫЙ
  if (r_type === 'true') {
    if (r_class === 'IA, IБ') {
      if (IRI <= 2.6) iri_score = 5;
      else if (IRI <= 3.1) iri_score = 4;
      else if (IRI <= 3.7) iri_score = 3;
      else iri_score = 2;
    }

    if (r_class === 'IB, II') {
      if (IRI <= 3.1) iri_score = 5;
      else if (IRI <= 3.6) iri_score = 4;
      else if (IRI <= 4.2) iri_score = 3;
      else iri_score = 2;
    }

    if (r_class === 'III') {
      if (IRI <= 3.3) iri_score = 5;
      else if (IRI <= 3.8) iri_score = 4;
      else if (IRI <= 4.5) iri_score = 3;
      else iri_score = 2;
    }

    if (r_class === 'IV') {
      if (IRI <= 5) iri_score = 3;
      else iri_score = 2;
    }

    // ОБЛЕГЧЕННЫЙ
  } else {
    if (r_class === 'III') {
      if (IRI <= 3.5) iri_score = 5;
      else if (IRI <= 4.5) iri_score = 4;
      else if (IRI <= 5.5) iri_score = 3;
      else iri_score = 2;
    }

    if (r_class === 'IV') {
      if (IRI <= 2.5) iri_score = 5;
      else if (IRI <= 4.5) iri_score = 4;
      else if (IRI <= 6.5) iri_score = 3;
      else iri_score = 2;
    }

    if (r_class === 'V') {
      if (IRI <= 3.5) iri_score = 5;
      else if (IRI <= 5.5) iri_score = 4;
      else if (IRI <= 7.5) iri_score = 3;
      else iri_score = 2;
    }
  }

  return iri_score;
}

// Вариант бездействия
function inaction(IRI: any, J: any, C: any) {
  const e = 0.7;

  let array = [
    {
      name: 'IRI',
      value: (IRI **= e),
    },
    {
      name: 'J',
      value: (J **= e),
    },
    {
      name: 'C',
      value: (C **= e),
    },
  ];

  return array;
}

function work_1(IRI: any, J: any, C: any) {
  const e = 0.9;

  let array = [
    {
      name: 'IRI',
      value: (IRI **= e),
    },
    {
      name: 'J',
      value: (J **= e),
    },
    {
      name: 'C',
      value: (C **= e),
    },
  ];

  return array;
}

function work_2(IRI: any, J: any, C: any) {
  const e = 0.8;

  let array = [
    {
      name: 'IRI',
      value: (IRI **= e),
    },
    {
      name: 'J',
      value: (J **= e),
    },
    {
      name: 'C',
      value: (C **= e),
    },
  ];

  return array;
}
