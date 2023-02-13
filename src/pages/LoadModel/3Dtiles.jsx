import {useEffect} from 'react';
import {useCesium} from '../../Cesium/context';
import * as Cesium from 'cesium';
import {useRef} from 'react';
import c from './index.module.less';
import {Cesium3DTileset, GeoJsonDataSource} from '../../Cesium';

export default function Tiles(props) {
    const {viewer} = useCesium();
    useEffect(() => {
        // Add Cesium OSM Buildings, a global 3D buildings layer.
        const buildingTileset = viewer.scene.primitives.add(Cesium.createOsmBuildings());
        // Hide individual buildings in this area using 3D Tiles Styling language.
        buildingTileset.style = new Cesium.Cesium3DTileStyle({
            // Create a style rule to control each building's "show" property.
            show: {
                conditions: [
                    // Any building that has this elementId will have `show = false`.
                    ['${elementId} === 332469316', false],
                    ['${elementId} === 332469317', false],
                    ['${elementId} === 235368665', false],
                    ['${elementId} === 530288180', false],
                    ['${elementId} === 530288179', false],
                    // If a building does not have one of these elementIds, set `show = true`.
                    [true, true],
                ],
            },
            // Set the default color style for this particular 3D Tileset.
            // For any building that has a `cesium#color` property, use that color, otherwise make it white.
            color: "Boolean(${feature['cesium#color']}) ? color(${feature['cesium#color']}) : color('#ffffff')",
        });
        // Fly the camera to Denver, Colorado at the given longitude, latitude, and height.
        viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(-104.9965, 39.74248, 4000),
        });
    }, []);
    function onLoad(dataSource) {
        console.log(dataSource);
        // By default, polygons in CesiumJS will be draped over all 3D content in the scene.
        // Modify the polygons so that this draping only applies to the terrain, not 3D buildings.
        for (const entity of dataSource.entities.values) {
            if (entity.polygon) {
                entity.polygon.classificationType = Cesium.ClassificationType.TERRAIN;
            }
        }
    }
    return <GeoJsonDataSource data="/public/geoJson1.json" onLoad={onLoad} />;
}
