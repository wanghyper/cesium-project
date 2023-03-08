import {Route, Routes} from 'react-router-dom';
import {Viewer} from '../../Cesium';
import Fly from './fly_model';
import Tiles from './3Dtiles';
import GeoJson from './GeoJson';
import GeometryInstance from './GeometryInstance';
import Terrain from './Terriain';
export default function LoadModal(props) {
    return (
        <Viewer options={{baseLayerPicker: true}}>
            <Routes>
                <Route path="fly" element={<Fly />} />
                <Route path="tiles" element={<Tiles />} />
                <Route path="geojson" element={<GeoJson />} />
                <Route path="GeometryInstance" element={<GeometryInstance />} />
                <Route path="terrain" element={<Terrain />} />
            </Routes>
        </Viewer>
    );
}
