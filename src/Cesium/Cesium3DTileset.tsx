import {useEffect, useRef} from 'react';
import {useCesium} from './context';
import {Cesium3DTileset as CesiumCesium3DTileset, Cesium3DTileStyle} from 'cesium';

export default function Cesium3DTileset(props) {
    const {viewer} = useCesium();
    const ref = useRef<any>();
    useEffect(() => {
        if (!props.url) {
            return;
        }
        ref.current = new CesiumCesium3DTileset(props);
        const tilesets = viewer.scene.primitives.add(ref.current);
        if (props.onReady) {
            ref.current.readyPromise.then(props.onReady);
        }
        return () => {
            viewer.scene.primitives.remove(ref.current);
        };
    }, [props.url]);
    useEffect(() => {
        if (!ref.current) {
            return;
        }
    }, [props.style]);

    return null
}
