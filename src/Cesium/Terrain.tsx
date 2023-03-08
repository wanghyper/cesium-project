import { EllipsoidTerrainProvider } from 'cesium';
import {useEffect, useRef} from 'react';
import {useCesium} from './context';

export default function Terrain(props) {
    const {viewer} = useCesium();
    useEffect(() => {
        return () => {
            if (viewer.terrainProvider === props.data) {
                viewer.terrainProvider = new EllipsoidTerrainProvider();
            }
        };
    }, []);
    useEffect(() => {
        if (!props.data) {
            return;
        }
        viewer.terrainProvider = props.data;
    }, [props.data]);

    return null;
}
