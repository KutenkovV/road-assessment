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
        // data.name = data.name - (Math.E ** -((t0 / n_iri) ** B)) + (Math.E ** -((i / n_iri) ** B))
        // items.push({
        //     data.na
        // })
        items = [];
        data.forEach((element: any) => {
            // element.value.IRI = element.value.IRI - (Math.E ** -((t0 / n_iri) ** B)) + (Math.E ** -((i / n_iri) ** B))
            // console.log('see there');
            // console.log(element.value.IRI);

            items.push({
                element: element.value.IRI = element.value.IRI - (Math.E ** -((t0 / n_iri) ** B)) + (Math.E ** -((i / n_iri) ** B))
            })
        });

        final_items.push({
            items
        })



        // Degradation(data);
    }

    console.log('smotri suda');
    console.log(items);
    console.log(final_items);
    return final_items
}

export function Degradation(data: any) {
}