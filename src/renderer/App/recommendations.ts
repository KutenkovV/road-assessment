export function recommendations(data: any) {
    let recommendations_data: {}[] = []
    let recommendations_items: {}[] = []

    data.forEach((element: any) => {
        element: element.items.forEach((el: any) => {
            recommendations_items.push({
                el: generate_recommendation(el)
            })
        });;
        recommendations_data.push({
            element: recommendations_items,
        })
    });

    console.log('Very important string!!!');
    console.log(recommendations_data);
}


function generate_recommendation(item: any) {
    if (item.IRI <= 4.50) {
        return 'Капитальный ремонт'
    }
}