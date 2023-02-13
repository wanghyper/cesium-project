import {useEffect, useRef} from 'react';
import {useCesium} from './context';
import {Cesium3DTileset as CesiumCesium3DTileset, Cesium3DTileStyle} from 'cesium';

export default function Cesium3DTileset(props) {
    const {viewer} = useCesium();
    const ref = useRef();
    useEffect(() => {
        if (!props.url) {
            return;
        }
        if (ref.current) {
            viewer.scene.primitives.remove(ref.current);
        }
        ref.current = new CesiumCesium3DTileset(props);
        viewer.scene.primitives.add(ref.current);
        if (props.onReady) {
            ref.current.readyPromise.then(props.onReady);
        }
    }, [props.url]);
    useEffect(() => {
        if (!ref.current) {
            return;
        }
        ref.current.style = new Cesium3DTileStyle({
            color: {
                conditions: [
                    ['${Height} >= 100', 'color("purple", 0.5)'],
                    ['${Height} >= 50', 'color("red")'],
                    ['true', 'color("blue")'],
                ],
            },
            show: '${Height} > 0',
            meta: {
                description: '"Building id ${id} has height ${Height}."',
            },
        });
    }, [props.style]);
}
