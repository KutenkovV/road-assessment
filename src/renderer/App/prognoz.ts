export function prognoz(year: any, data: any): any {
    console.log('Функция из прогноза!');

    ///
    const t0 = 1; // Текущий год эксплуатации
    const B = 1.87

    // Взято из ТЗ
    const n_iri = 6; // Параметр ресурса
    const n_j = 7; // Параметр ресурса
    const n_c = 12; // Параметр ресурса
    ///

    let items: {}[] = []
    let final_items = []

    for (let i = 0; i <= year; i++) {
        items = [];
        let N = i + 1;
        data.forEach((item: any) => {
            // console.log(item);
            items.push({
                // в AVG находим среднее оценок по дорогам (IRI+J+C / 3) на участок + округляем до сотых
                AVG: ((item.IRI + item.J + item.C) / 3).toFixed(2),
                // IRI(Ровность) берется среднее значение по двум полосам
                IRI: (item.IRI = item.IRI - (Math.E ** -((t0 / n_iri) ** B)) + (Math.E ** -((N / n_iri) ** B))).toFixed(2),
                // J(Дефектность) берется среднее значение по двум полосам
                J: (item.J = item.J - (Math.E ** -((t0 / n_j) ** B)) + (Math.E ** -((N / n_j) ** B))).toFixed(2),
                // С(Сцепление) берется среднее значение по двум полосам
                C: (item.C = item.C - (Math.E ** -((t0 / n_c) ** B)) + (Math.E ** -((N / n_c) ** B))).toFixed(2)
            })
        });

        final_items.push({
            items
        })
    }

    console.log('smotri suda');
    console.log(items);
    console.log(final_items);
    return final_items
}