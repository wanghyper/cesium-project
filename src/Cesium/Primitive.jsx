import {useEffect, useRef} from 'react';
import {useCesium} from './context';
import {Primitive as CesiumPrimitive} from 'cesium';

export default function Primitive(props) {
    const {viewer} = useCesium();
    const ref = useRef();
    useEffect(() => {
        if (!props) {
            return;
        }
        if (ref.current) {
            viewer.scene.primitives.remove(ref.current);
        }
        ref.current = new CesiumPrimitive(props);
        viewer.scene.primitives.add(ref.current);
        if (props.onReady) {
            ref.current.readyPromise.then(props.onReady);
        }
    }, [props]);
}
