import {createWorldTerrain} from 'cesium';
import {Route, Routes} from 'react-router-dom';
import {Viewer} from '../../Cesium';
import Fly from './fly_model';
import Tiles from './3Dtiles';
import GeoJson from './GeoJson';
import GeometryInstance from './GeometryInstance';
// import BaiduImageryProvider from '@dvgis/cesium-map/src/imagery/baidu/BaiduImageryProvider';
export default function LoadModal(props) {
    return (
        <Viewer
            options={{
                terrainProvider: createWorldTerrain(),
                // imageryProvider: new  BaiduImageryProvider({
                //     style: 'normal', // style: img、vec、normal、dark
                //     crs: 'WGS84', // 使用84坐标系，默认为：BD09
                // }),
            }}
        >
            <Routes>
                <Route path="fly" element={<Fly />} />
                <Route path="tiles" element={<Tiles />} />
                <Route path="geojson" element={<GeoJson />} />
                <Route path="GeometryInstance" element={<GeometryInstance />} />
            </Routes>
        </Viewer>
    );
}
