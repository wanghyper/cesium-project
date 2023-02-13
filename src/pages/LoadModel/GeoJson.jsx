import {GeoJsonDataSource, useCesium} from '../../Cesium';
import {Cartesian3} from 'cesium';

export default function GeoJson() {
    const {viewer} = useCesium();
    function onLoad() {
        console.log('loaded');
        viewer.camera.flyTo({
            destination: Cartesian3.fromDegrees(-104.9965, 39.74248, 4000),
        });
    }
    return <GeoJsonDataSource data="/public/geoJson1.json" onLoad={onLoad} show={true} />;
}
