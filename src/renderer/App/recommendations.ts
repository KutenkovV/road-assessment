export function recommendations(data: any) {
    let recommendations_data: {}[] = []
    let recommendations_items: {}[] = []

    data.forEach((element: any) => {
        element.items.forEach((el: any) => {
            recommendations_items.push({
                recommendation: generate_recommendation(el)
            })
        });;
        recommendations_data.push({
            item: recommendations_items,
        })
        recommendations_items = [];
    });

    return recommendations_data;
}


function generate_recommendation(item: any) {
    let rec = []
    if (item.IRI < 4.50) {
        // rec.push('Необходимо приведение продольной ровности в соответствие нормативным требованиям при проведении работ по реконструкции')
        rec.push('Капитальный ремонт по IRI')
    }
    if (item.J < 4.50) {
        // rec.push('Необходимы ремонтые работы по устранению дефектов')
        rec.push('Капитальный ремонт по J')
    }
    if (item.C < 4.90) {
        // rec.push('Необходимо проведение работ по ремонту и содержанию дорог и улиц')
        rec.push('Капитальный ремонт по C')
    }
    else {
        rec.push('всё хорошо')
    }

    return rec;
}