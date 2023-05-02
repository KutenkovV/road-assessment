export function recommendations(data: any) {
    let recommendations_data: {}[] = []
    let recommendations_items: {}[] = []

    data.forEach((element: any) => {
        element.items.forEach((el: any, index: number) => {
            recommendations_items.push({
                recommendation: generate_recommendation(el, index)
            })
        });;
        recommendations_data.push({
            item: recommendations_items,
        })
        recommendations_items = [];
    });

    console.log(recommendations_data);
    return recommendations_data;
}


function generate_recommendation(item: any, index: number) {
    let rec = [];

    if (item.IRI <= 2.00) {
        // rec.push('Необходимо приведение продольной ровности в соответствие нормативным требованиям при проведении работ по реконструкции')
        rec.push('Участку № ' + (index + 1) + ' Капитальный ремонт по IRI')
    }
    if (item.J < 2.00) {
        // rec.push('Необходимы ремонтые работы по устранению дефектов')
        rec.push('Участку № ' + (index + 1) + ' Капитальный ремонт по J')
    }
    if (item.C < 2.00) {
        // rec.push('Необходимо проведение работ по ремонту и содержанию дорог и улиц')
        rec.push('Участку № ' + (index + 1) + ' Капитальный ремонт по C')
    }

    return rec;
}