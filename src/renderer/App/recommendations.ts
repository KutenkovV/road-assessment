export function recommendations(data: any) {
    let recommendations_data: {}[] = []
    let recommendations_items: {}[] = []

    data.forEach((element: any) => {
        element.items.forEach((el: any, index: number) => {
            recommendations_items.push({
                index: index,
                recommendation: generate_recommendation(el, index)
            })
        });
        recommendations_data.push({
            // Фильтруем на пустые значения
            item: recommendations_items.filter((node: any) => node.recommendation.length !== 0),
        })
        recommendations_items = [];
    });

    console.log(recommendations_data);
    return recommendations_data;
}



function generate_recommendation(item: { IRI: number; J: number; C: number; }, index: number) {
    let recommendation: {}[] = [];
    let i = index + 1;

    if (item.IRI <= 2.00) {
        // rec.push('Необходимо приведение продольной ровности в соответствие нормативным требованиям при проведении работ по реконструкции')
        recommendation.push('Участку № ' + (i) + ' - назначить: Капитальный ремонт по IRI')
    }
    if (item.J <= 2.00) {
        // recommendation.push('Необходимы ремонтые работы по устранению дефектов')
        recommendation.push('Участку № ' + (i) + ' - назначить: Капитальный ремонт по J')
    }
    if (item.C <= 2.00) {
        // recommendation.push('Необходимо проведение работ по ремонту и содержанию дорог и улиц')
        recommendation.push('Участку № ' + (i) + ' - назначить: Капитальный ремонт по C')
    }

    return recommendation;
}