import {useEffect} from 'react';
import {useCesium} from '../../Cesium/context';
import * as Cesium from 'cesium';
import {useRef} from 'react';
import c from './index.module.less';
import {Cesium3DTileset} from '../../Cesium/index';

export default function Tiles(props) {
    const {viewer} = useCesium();
    useEffect(() => {
        
    }, []);
    function onReady(dataSource) {
        console.log(dataSource);
        viewer.flyTo(dataSource);
    }
    return (
        <Cesium3DTileset
            url="http://earthsdk.com/v/last/Apps/assets/dayanta/tileset.json"
            onReady={onReady}
        />
    );
}
