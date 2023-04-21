import { useSelector, useDispatch } from 'react-redux';
/// Для тултипов (https://react-tooltip.com/docs/getting-started)
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip';
///

function ItemRoad(iri: any, key: any) {

    // const i = iri;
    // const k = key;
    console.log(iri.iri.element);

    return (
        <>
            <div id={roadStatus(iri.iri.element)}>
                <a className='my-tooltip'>{iri.iri.element}</a>
                <Tooltip anchorSelect="my-tooltip">
                    <div>Оценка IRI: {iri.iri.element}</div>
                </Tooltip>
            </div>
        </>
    );
}

function roadStatus(IRI: number) {
    if (IRI >= 4.5) {
        return 'rectangle_best';
    }
    if (IRI >= 4) {
        return 'rectangle_good';
    } else return 'rectangle_bad';
}


export default ItemRoad;

