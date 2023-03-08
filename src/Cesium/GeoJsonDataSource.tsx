import {GeoJsonDataSource as CesiumGeoJsonDataSource} from 'cesium';
import {useEffect, useRef} from 'react';
import {useCesium} from './context';

export default function GeoJsonDataSource(props) {
    const {name, show, data, options = {}, onLoad} = props;
    const {viewer} = useCesium();
    const ref = useRef();
    useEffect(() => {
        if (!ref.current) {
            ref.current = new CesiumGeoJsonDataSource(name);
            viewer.dataSources.add(ref.current);
        }

        return () => {
            if (viewer.dataSources && !viewer.dataSources.isDestroyed()) {
                viewer.dataSources.remove(ref.current);
            }
        };
    }, []);
    useEffect(() => {
        if (!ref.current) {
            return;
        }
        if (typeof show === 'boolean') {
            ref.current.show = show;
        } else {
            ref.current.show = true;
        }
    }, [show]);
    useEffect(() => {
        if (!ref.current) {
            return;
        }
        process(data);
    }, [data]);
    async function process(data) {
        if (data) {
            const dataSource = await ref.current.load(data, {clampToGround: true, ...options});
            onLoad && onLoad(dataSource);
        } else {
            ref.current.show = false;
        }
    }
}
