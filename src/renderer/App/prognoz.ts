export function prognoz(year: any, data: any) {
    console.log('Функция из прогноза!');
    console.log(data);

    for (let i = 0; i < year; i++) {
        Degradation(data);
    }
}

export function Degradation(data: any) {
    return console.log("Убивать!");
}