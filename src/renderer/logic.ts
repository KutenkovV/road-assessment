export interface IRoad {
  flatness_road_lane: number;
  road_defects: number;
  road_grip: number;
  current_year: number;
  future_year: number;
  road_class: string;
  road_type: boolean;
}

export function road_degradation(param: any) {

  console.log('IRI see there:');
  let IRI = iri_score(param)
  console.log(IRI);
  
  // let J = param.road_defects;
  // let C = param.road_grip;

  // console.log('Param in function');
  // console.log(param);

  // let Tf = 3;

  // let array1;
  // let array2;
  // let array3;

  // let e1 = 0.7;
  // let e2 = 0.9;
  // let e3 = 0.8;

  // for (let i = 1; i <= Tf; i++) {
  //   // array1 = inaction(IRI, J, C);
  //   // array2 = work_1(IRI, J, C);
  //   // array3 = work_2(IRI, J, C);

  //   array1 = [
  //     {
  //       name: 'IRI',
  //       value: (IRI **= e1),
  //     },
  //     {
  //       name: 'J',
  //       value: (J **= e1),
  //     },
  //     {
  //       name: 'C',
  //       value: (C **= e1),
  //     },
  //   ];

  //   array2 = [
  //     {
  //       name: 'IRI',
  //       value: (IRI **= e2),
  //     },
  //     {
  //       name: 'J',
  //       value: (J **= e2),
  //     },
  //     {
  //       name: 'C',
  //       value: (C **= e3),
  //     },
  //   ];

  //   array3 = [
  //     {
  //       name: 'IRI',
  //       value: (IRI **= e3),
  //     },
  //     {
  //       name: 'J',
  //       value: (J **= e3),
  //     },
  //     {
  //       name: 'C',
  //       value: (C **= e3),
  //     },
  //   ];

  //   console.log(array2);
  // }

  // let data = {
  //   name: 'Прогноз',
  //   children: [
  //     { name: 'Ничего не делаем', children: array1 },
  //     { name: 'Вид работ 1', children: array2 },
  //     { name: 'Вид работ 2', children: array3 },
  //   ],
  // };

  // console.log('See there');
  // console.log(data);

  // return data;
}

function iri_score(param: any) {
  let IRI = param.flatness_road_lane;
  let r_class = param.road_class
  let r_type = param.road_type; // true - Капитальный false - Облегченный

  console.log(IRI + ' ' + r_class + ' ' + r_type);
  
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
