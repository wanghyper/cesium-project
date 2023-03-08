import {Terrain, useCesium} from '../../Cesium';
import {
    Cartesian3,
    createWorldTerrain,
    UrlTemplateImageryProvider,
    WebMercatorTilingScheme,
    CesiumTerrainProvider,
} from 'cesium';
import {useEffect, useRef} from 'react';

export default function _Terrain() {
    const {viewer} = useCesium();
    function onLoad() {
        console.log('loaded');
        viewer.camera.flyTo({
            destination: Cartesian3.fromDegrees(-104.9965, 39.74248, 4000),
        });
    }
    useEffect(() => {
        // const imageryProvider = new UrlTemplateImageryProvider({
        //     url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        //     subdomains: ['0', '1', '2', '3'],
        //     tilingScheme: new WebMercatorTilingScheme(),
        // });
        // viewer.imageryProvider = imageryProvider;
        const terrainProvider = new CesiumTerrainProvider({
            url: '/server',
        });
        viewer.terrainProvider = terrainProvider;
        const x = 103.86125,
            y = 35.3754;
        viewer.camera.flyTo({
            destination: Cartesian3.fromDegrees(x, y, 3000),
        });
    }, []);
    return null;
}
