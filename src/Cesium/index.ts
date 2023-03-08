import {Ion} from 'cesium';
import * as Cesium from 'cesium';
Ion.defaultAccessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiMGU0MDExMi0wZGQyLTRmZDQtYTM2Yi0xOTdhYTA2MmI1N2EiLCJpZCI6MTEwOTYzLCJpYXQiOjE2NjU2MzMyMjN9.QNOFtQbwSrvJxkK8inVPW20NldXeVHfOfAAbI7HtVLo';
window.Cesium = Cesium;
window.CESIUM_BASE_URL = '/public/Cesium/';

export {default as Viewer} from './Viewer';
export {default as CesiumWidget} from './CesiumWidget';
export {default as GeoJsonDataSource} from './GeoJsonDataSource';
export {default as Primitive} from './Primitive';
export {default as Cesium3DTileset} from './Cesium3DTileset';
export {default as TDTImageryProvider} from './TDTImageryProvider';
export {default as Terrain} from './Terrain';

export {CesiumContext, Provider as CesiumProvider, Consumer as CesiumConsumer, useCesium} from './context';
