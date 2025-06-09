// Интерфейс дороги
export interface IRoad {
  road_class: string;
  road_type: string;
  road_array: any[];
}

// Оценка дороги
export function road_assessment(param: IRoad) {
  let data: any[] = [];

  param.road_array.forEach((item) => {
    // Вычисляем среднее значение для оценки дороги
    const avg =
      ((item.road_defects_1 + item.road_defects_2) / 2 +
        c_score(item.road_grip_1, item.road_grip_2) +
        iri_score(
          param,
          item.flatness_road_lane_1,
          item.flatness_road_lane_2
        )) /
      3;

    data.push({
      AVG: avg.toFixed(2), // Средняя оценка
      IRI: iri_score(
        param,
        item.flatness_road_lane_1,
        item.flatness_road_lane_2
      ),
      J: (item.road_defects_1 + item.road_defects_2) / 2, // Среднее дефектности
      C: c_score(item.road_grip_1, item.road_grip_2), // Среднее сцепление
      recommendation: [], // Рекомендации
    });
  });

  return data;
}

// Функция для прогнозирования деградации дороги
export function road_degradation(param: any) {
  const { current_year, future_year } = param;
  const jobs = ['Ничего не делаем', 'Сценарий 1', 'Сценарий 2'];

  // Начальный элемент дерева
  const f_item = { name: 'Прогноз', children: [] };
  let nodes = [f_item];

  for (let i = current_year; i <= future_year; i++) {
    let newNodes: any[] = [];

    nodes.forEach((node) => {
      node.children = [];
      jobs.forEach((j) => {
        const new_item = { name: j, children: [] };
        node.children.push(new_item);
        newNodes.push(new_item);
      });
    });

    nodes = newNodes;
  }

  return f_item;
}

// Оценка сцепления (C)
function c_score(road_grip_1: number, road_grip_2: number): number {
  const C = (road_grip_1 + road_grip_2) / 2;

  if (C > 0.3) return 5;
  if (C <= 0.1) return 1;
  if (C <= 0.2) return 2;
  if (C <= 0.3) return 3;

  return 4;
}

// Оценка IRI (Ровность дороги)
function iri_score(
  param: IRoad,
  flatness_road_lane_1: number,
  flatness_road_lane_2: number
): number {
  const IRI = (flatness_road_lane_1 + flatness_road_lane_2) / 2;
  const { road_class, road_type } = param;

  let iri_score: number;

  if (road_type === 'true') {
    // Капитальный тип
    if (road_class === 'IA, IБ') {
      iri_score = IRI <= 2.6 ? 5 : IRI <= 3.1 ? 4 : IRI <= 3.7 ? 3 : 2;
    } else if (road_class === 'IB, II') {
      iri_score = IRI <= 3.1 ? 5 : IRI <= 3.6 ? 4 : IRI <= 4.2 ? 3 : 2;
    } else if (road_class === 'III') {
      iri_score = IRI <= 3.3 ? 5 : IRI <= 3.8 ? 4 : IRI <= 4.5 ? 3 : 2;
    } else {
      // IV
      iri_score = IRI <= 5 ? 3 : 2;
    }
  } else {
    // Облегченный тип
    if (road_class === 'III') {
      iri_score = IRI <= 3.5 ? 5 : IRI <= 4.5 ? 4 : IRI <= 5.5 ? 3 : 2;
    } else if (road_class === 'IV') {
      iri_score = IRI <= 2.5 ? 5 : IRI <= 4.5 ? 4 : IRI <= 6.5 ? 3 : 2;
    } else {
      // V
      iri_score = IRI <= 3.5 ? 5 : IRI <= 5.5 ? 4 : IRI <= 7.5 ? 3 : 2;
    }
  }

  return iri_score;
}
