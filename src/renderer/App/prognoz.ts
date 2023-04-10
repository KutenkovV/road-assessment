export function prognoz(year: any, data: any): any {
    console.log('Функция из прогноза!');
    // console.log(data);

    let iri = 4.5;
    const t0 = 1; // Текущий год эксплуатации
    const B = 1.87
    const n_iri = 6; // Параметр ресурса

    let items: { element: number; }[] = []
    let final_items = []

    for (let i = 1; i <= year; i++) {
        items = [];
        data.forEach((element: any) => {
            items.push({
                element: (element.value.IRI = element.value.IRI - (Math.E ** -((t0 / n_iri) ** B)) + (Math.E ** -((i / n_iri) ** B))).toFixed(2)
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

export function Degradation(data: any) {
}