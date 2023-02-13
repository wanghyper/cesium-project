import {useEffect} from 'react';
import {useCesium} from './context';

export default function Scene(props) {
    const {onLoad} = props;
    const {viewer} = useCesium();
    useEffect(() => {
        if (!viewer || !viewer.scene) {
            return;
        }
        const scene = viewer.scene;
        onLoad && onLoad(scene);
    }, [viewer]);
}
