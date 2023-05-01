import { concat } from "lodash";
import { recommendations } from "./recommendations";

export interface IForecastParameters {
    forecast_year: number, // На сколько лет делать прогноз
    current_year: number, // Текущий год эксплуатации
    traffic_intensity_actual: number, // Фактическая
    traffic_intensity_design: number, // Проектная
    data: []; // Объекты
}

export function prognoz(
    forecast_year: number,
    current_year: number,
    traffic_intensity_actual: number,
    traffic_intensity_design: number,
    data: any
): any {
    ///
    const t0 = current_year; //1; // Текущий год эксплуатации
    const B = traffic_intensity_actual / traffic_intensity_design; // 1.87

    // Взято из ТЗ
    const n_iri = 6; // Параметр ресурса
    const n_j = 7; // Параметр ресурса
    const n_c = 12; // Параметр ресурса
    ///

    let items: {}[] = []
    let final_items = []

    for (let i = 0; i <= forecast_year; i++) {
        items = [];
        let N = i + 1;
        data.forEach((item: any) => {
            items.push({
                // Очень тупая строчка, нужно переписать
                AVG: (((item.IRI - (Math.E ** -((t0 / n_iri) ** B)) + (Math.E ** -((N / n_iri) ** B))) +
                    (item.J - (Math.E ** -((t0 / n_j) ** B)) + (Math.E ** -((N / n_j) ** B))) +
                    (item.C - (Math.E ** -((t0 / n_c) ** B)) + (Math.E ** -((N / n_c) ** B)))) / 3).toFixed(2),

                // IRI(Ровность) берется среднее значение по двум полосам
                IRI: (item.IRI = item.IRI - (Math.E ** -((t0 / n_iri) ** B)) + (Math.E ** -((N / n_iri) ** B))).toFixed(2),
                // J(Дефектность) берется среднее значение по двум полосам
                J: (item.J = item.J - (Math.E ** -((t0 / n_j) ** B)) + (Math.E ** -((N / n_j) ** B))).toFixed(2),
                // С(Сцепление) берется среднее значение по двум полосам
                C: (item.C = item.C - (Math.E ** -((t0 / n_c) ** B)) + (Math.E ** -((N / n_c) ** B))).toFixed(2),
                // в AVG находим среднее оценок по дорогам (IRI+J+C / 3) на участок + округляем до сотых
                recommendations: generate_recommendation(item)
            })

        });

        final_items.push({
            items
        })
    }

    // recommendations(final_items);

    console.log('see here');
    console.log(final_items);
    return final_items
}

function generate_recommendation(item: any) {
    let rec = []
    if (item.IRI < 4.70) {
        rec.push('Необходимо приведение продольной ровности в соответствие нормативным требованиям при проведении работ по реконструкции')
    }
    if (item.J < 4.70) {
        rec.push('Необходимы ремонтые работы по устранению дефектов')
    }
    if (item.С < 4.90) {
        rec.push('Необходимо проведение работ по ремонту и содержанию дорог и улиц')
    }

    return rec;
}