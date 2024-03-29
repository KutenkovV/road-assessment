import { useState } from "react";
import { Accordion, AccordionItem as Item, useAccordionState } from "@szhsin/react-accordion";
import chevronDown from "../chevron-down.svg";
import { useDispatch, useSelector } from "react-redux";
import { set_progressBar, set_yearForecast, dataloadMain, recommendationsLoad, set_dataRemont, set_currentYear, set_remontList } from '../store/MainStore';
import { prognoz } from '../App/prognoz'
import { recommendations } from 'renderer/App/recommendations';

function PrognozItem(this: any) {
    var _ = require('lodash');
    const dispatch = useDispatch();
    const [year, setYear] = useState<any>(2);
    const [currentYear, setCurrentYear] = useState<any>(1);
    const [traffic_intensity_actual, setTraffic_intensity_actual] = useState<any>(12000);
    const [traffic_intensity_design, setTraffic_intensity_design] = useState<any>(14000);

    var dataCount = useSelector((state: any) => state.uploadStore.value);

    // Для аккордеона
    /* @ts-ignore */
    const AccordionItem = ({ header, ...rest }) => (
        <Item
            {...rest}
            header={
                <>
                    {header}
                    <img className="chevron-down" src={chevronDown} alt="Chevron Down" />
                </>
            }
        />
    );

    function Submit() {
        dispatch(dataloadMain(prognoz(year, currentYear, traffic_intensity_actual, traffic_intensity_design, dataCount, (items: any) => {
            dispatch(recommendationsLoad(recommendations(items)));

            // Ниже магнум опус, его не трогаем!!!
            var data: {
                index: number
                value: any
            }[] = [];

            for (let i = 0; i <= year; i++) {
                data.push({
                    index: i,
                    value: i
                })
            }

            dispatch(set_yearForecast(year));
            dispatch(set_progressBar(_.mapValues(_.keyBy(data, 'index'), 'value')));

            // для ремонта
            let remont_item: {}[] = []
            let items_remont: {}[] = []
            let remont_final: {}[] = []

            items.forEach((el: any, index: number) => {
                el.items.forEach(() => {
                    remont_item.push({
                        index: index,
                        remont: []
                    })
                })

                items_remont.push({
                    item: remont_item
                })

                remont_final.push({
                    item: remont_item.filter((item: any) => item.remont.length !== 0)
                })

                remont_item = []
            })

            console.log(remont_final);
            dispatch(set_remontList(remont_final))
            dispatch(set_dataRemont(items_remont))
        })));
    };

    return (
        <>
            <Accordion className='prognoz-accordeon' initialEntered allowMultiple transition transitionTimeout={200}>
                <AccordionItem header='Сделать прогноз'>
                    <div className="prognoz-form">
                        <div className='prognoz-form-item'>
                            <p>На сколько лет делать прогноз</p>
                            <input
                                id="years"
                                value={year}
                                onChange={(e) => {
                                    setYear(e.target.value)
                                }}
                                type="number"
                            />
                        </div>

                        <div className='prognoz-form-item'>
                            <p>Текущий год эксплуатации</p>
                            <input
                                onChange={(e) => {
                                    setCurrentYear(e.target.value)
                                }}
                                value={currentYear}
                                type="number" />
                        </div>

                        <div className='prognoz-form-item'>
                            <p>Интенсивность движения фактическая</p>
                            <input
                                onChange={(e) => {
                                    setTraffic_intensity_actual(e.target.value)
                                }}
                                value={traffic_intensity_actual}
                                type="number" />

                        </div>

                        <div className='prognoz-form-item'>
                            <p>Интенсивность движения проектная</p>
                            <input
                                onChange={(e) => {
                                    setTraffic_intensity_design(e.target.value)
                                }}
                                value={traffic_intensity_design}
                                type="number" />
                        </div>

                        <div className='prognoz-form-item'>
                            <p>Определить стартовый бюджет</p>
                            <input
                                type="number" />
                        </div>
                    </div>
                    <div className='prognoz-button'>
                        <button style={{ marginTop: '1rem' }} onClick={Submit}>Сделать прогноз</button>
                    </div>
                    {/* <div className='prognoz-button'>
                        <button onClick={OnSubOptimization} style={{ marginTop: '1rem' }}>Оптимизировать</button>
                    </div> */}
                </AccordionItem >
            </Accordion>
        </>
    );
}

export default PrognozItem;

