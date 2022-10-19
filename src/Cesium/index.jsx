import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import {useEffect} from 'react';

Cesium.Ion.defaultAccessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiMGU0MDExMi0wZGQyLTRmZDQtYTM2Yi0xOTdhYTA2MmI1N2EiLCJpZCI6MTEwOTYzLCJpYXQiOjE2NjU2MzMyMjN9.QNOFtQbwSrvJxkK8inVPW20NldXeVHfOfAAbI7HtVLo';
window.CESIUM_BASE_URL = '/public/Cesium/';
export default function CesiumComponent(props) {
    useEffect(() => {
        // Initialize the Cesium Viewer in the HTML element with the "cesiumContainer" ID.
        const viewer = new Cesium.Viewer('cesiumContainer', {
            terrainProvider: Cesium.createWorldTerrain(),
        });
        // Add Cesium OSM Buildings, a global 3D buildings layer.
        const buildingTileset = viewer.scene.primitives.add(Cesium.createOsmBuildings());
        // Fly the camera to San Francisco at the given longitude, latitude, and height.
        viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(-122.4175, 37.655, 400),
            orientation: {
                heading: Cesium.Math.toRadians(0.0),
                pitch: Cesium.Math.toRadians(-15.0),
            },
        });
    }, []);

    return <div id="cesiumContainer"></div>;
}
