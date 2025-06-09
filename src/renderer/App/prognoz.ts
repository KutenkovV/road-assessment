import { concat, get } from 'lodash';
import { recommendations } from './recommendations';

export interface IForecastParameters {
  forecast_year: number; // На сколько лет делать прогноз
  current_year: number; // Текущий год эксплуатации
  traffic_intensity_actual: number; // Фактическая
  traffic_intensity_design: number; // Проектная
  data: any[]; // Объекты
}

const B = 0.857;
const n_iri = 6;
const n_j = 7;
const n_c = 12;

export function prognoz(
  forecast_year: number,
  current_year: number,
  traffic_intensity_actual: number,
  traffic_intensity_design: number,
  data: any[],
  callback: (final_items: any[]) => void
): any[] {
  const t0 = 1; // Текущий год эксплуатации

  let items: any[] = [];
  let itemss: any[] = [];
  let final_items: any[] = [];

  // В расчётах каждый участок
  data.forEach((item, index) => {
    let N = 1;

    // Рассчитываем начальные значения для каждого объекта
    const avg = calculateAverage(item, N);
    itemss.push({
      AVG: avg.toFixed(2),
      IRI: calculateIRI(item, N),
      J: calculateJ(item, N),
      C: calculateC(item, N),
      recommendation: generate_recommendation(item.IRI, item.J, item.C, index),
    });
  });

  // Прогнозируем на несколько лет вперед
  for (let i = 0; i <= forecast_year; i++) {
    items = [];
    let N = i + 1;
    data.forEach((item, index) => {
      items.push({
        AVG: calculateAverage(item, N).toFixed(2),
        IRI: (itemss[index].IRI = calculateIRI(itemss[index], N)),
        J: (itemss[index].J = calculateJ(itemss[index], N)),
        C: (itemss[index].C = calculateC(itemss[index], N)),
        recommendation: generate_recommendation(
          itemss[index].IRI,
          itemss[index].J,
          itemss[index].C,
          index
        ),
      });
    });

    final_items.push({ items });
  }

  console.log(final_items);
  callback(final_items);
  return final_items;
}

// Функции для расчета каждого параметра

function calculateAverage(item: any, N: number) {
  return (
    (calculateIRI(item, N) + calculateJ(item, N) + calculateC(item, N)) / 3
  );
}

function calculateIRI(item: any, N: number) {
  return (
    item.IRI -
    Math.E ** -(1 * (N / n_iri) ** B) +
    Math.E ** -(1 * (1 / n_iri) ** B)
  );
}

function calculateJ(item: any, N: number) {
  return (
    item.J - Math.E ** -(1 * (N / n_j) ** B) + Math.E ** -(1 * (1 / n_j) ** B)
  );
}

function calculateC(item: any, N: number) {
  return (
    item.C - Math.E ** -(1 * (N / n_c) ** B) + Math.E ** -(1 * (1 / n_c) ** B)
  );
}

// Генерация рекомендаций для каждого участка
function generate_recommendation(
  IRI: number,
  J: number,
  C: number,
  index: number
) {
  let recommendation: string[] = [];
  const i = index + 1;

  if (IRI <= 2.0) {
    recommendation.push(
      `Участку № ${i} - назначить: Капитальный ремонт по IRI`
    );
  }
  if (J <= 2.0) {
    recommendation.push(`Участку № ${i} - назначить: Капитальный ремонт по J`);
  }
  if (C <= 2.0) {
    recommendation.push(`Участку № ${i} - назначить: Капитальный ремонт по C`);
  }

  return recommendation;
}
