import { concat, get } from "lodash";
import { recommendations } from "./recommendations";
import { number } from "echarts";
export interface IForecastParameters {
    forecast_year: number, // На сколько лет делать прогноз
    current_year: number, // Текущий год эксплуатации
    traffic_intensity_actual: number, // Фактическая
    traffic_intensity_design: number, // Проектная
    data: []; // Объекты
}

/**
 * 
 * @param forecast_year 
 * @param current_year 
 * @param traffic_intensity_actual 
 * @param traffic_intensity_design 
 * @param data 
 * @param callback 
 * @returns final_items
 */
export function prognoz(
    forecast_year: number,
    current_year: number,
    traffic_intensity_actual: number,
    traffic_intensity_design: number,
    data: any,
    callback: any,
    // remonts: {
    //     [year_index: number]: {
    //         [uchastok_id: number]: {
    //             fix_iri: boolean,
    //             fix_j: boolean,
    //             fix_c: boolean,
    //         }
    //     }
    // }
): any {
    ///
    const t0 = 1; //1; // Текущий год эксплуатации
    const B = 0.857; // 1.87

    const n_iri = 6; // Параметр ресурса
    const n_j = 7; // Параметр ресурса
    const n_c = 12; // Параметр ресурса

    let items: {}[] = []
    let itemss: {}[] = []


    let final_items = []
    // var array = [...data];
    var _ = require('lodash');

    data.forEach((item: any) => {
        let N = 1;
        itemss.push({
            AVG: (((item.IRI - (Math.E ** - ((t0 / n_iri) ** B)) + (Math.E ** - ((N / n_iri) ** B))) +
                (item.J - (Math.E ** - ((t0 / n_j) ** B)) + (Math.E ** - ((N / n_j) ** B))) +
                (item.C - (Math.E ** - ((t0 / n_c) ** B)) + (Math.E ** - ((N / n_c) ** B)))) / 3).toFixed(2),

            IRI: item.IRI = (item.IRI - (Math.E ** - ((t0 / n_iri) ** B)) + (Math.E ** - ((N / n_iri) ** B))),
            J: (item.J = item.J - (Math.E ** - ((t0 / n_j) ** B)) + (Math.E ** - ((N / n_j) ** B))),
            C: (item.C = item.C - (Math.E ** - ((t0 / n_c) ** B)) + (Math.E ** - ((N / n_c) ** B))),
        })
    });

    for (let i = 0; i <= forecast_year; i++) {
        items = [];
        let N = i + 1;
        data.forEach((item: any, index: number) => {
            // let remont = _.get(remonts, `${i}.${item.index}`, {})
            items.push({
                // Очень тупая строчка, нужно переписать
                // в AVG находим среднее оценок по дорогам (IRI+J+C / 3) на участок + округляем до сотых
                AVG: (((item.IRI - (Math.E ** -((t0 / n_iri) ** B)) + (Math.E ** -((N / n_iri) ** B))) +
                    (item.J - (Math.E ** -((t0 / n_j) ** B)) + (Math.E ** -((N / n_j) ** B))) +
                    (item.C - (Math.E ** -((t0 / n_c) ** B)) + (Math.E ** -((N / n_c) ** B)))) / 3).toFixed(2),

                // IRI(Ровность) берется среднее значение по двум полосам
                // IRI: remont.fix_iri ? 5 : (item.IRI = item.IRI - (Math.E ** -((t0 / n_iri) ** B)) + (Math.E ** -((N / n_iri) ** B))).toFixed(2),
                IRI: itemss[index].IRI = (itemss[index].IRI - (Math.E ** - ((t0 / n_iri) ** B)) + (Math.E ** - ((N / n_iri) ** B))),
                // J(Дефектность) берется среднее значение по двум полосам
                J: (item.J = item.J - (Math.E ** -((t0 / n_j) ** B)) + (Math.E ** - ((N / n_j) ** B))),
                // С(Сцепление) берется среднее значение по двум полосам
                C: (item.C = item.C - (Math.E ** -((t0 / n_c) ** B)) + (Math.E ** - ((N / n_c) ** B))),
                // recommendations: generate_recommendation(item.IRI, item.J, item.C)
            })

            console.log(itemss[index].IRI);
            // itemss[index].IRI = iri_p;
        });

        final_items.push({
            items
        })
    }

    console.log(final_items);
    callback(final_items);
    return final_items
}