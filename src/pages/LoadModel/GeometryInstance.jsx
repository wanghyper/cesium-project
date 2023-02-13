import {useEffect, useState} from 'react';
import {useCesium} from '../../Cesium/context';
import * as Cesium from 'cesium';
import {useRef} from 'react';
import {Primitive} from '../../Cesium';
import c from './index.module.less';

export default function GeometryInstance(props) {
    const [data, setData] = useState();
    // In this tileset every feature has an "element" property which is a global ID.
    // This property is used to associate features across different tiles and LODs.
    // Workaround until 3D Tiles has the concept of global batch ids: https://github.com/CesiumGS/3d-tiles/issues/265
    useEffect(() => {
        setData(
            new Cesium.GeometryInstance({
                geometry: new Cesium.EllipsoidGeometry({
                    radii: new Cesium.Cartesian3(500000.0, 500000.0, 1000000.0),
                    vertexFormat: Cesium.VertexFormat.POSITION_AND_NORMAL,
                }),
                modelMatrix: Cesium.Matrix4.multiplyByTranslation(
                    Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(-95.59777, 40.03883)),
                    new Cesium.Cartesian3(0.0, 0.0, 500000.0),
                    new Cesium.Matrix4()
                ),
                id: 'ellipsoid',
                attributes: {
                    color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.AQUA),
                },
            })
        );
        // viewer.camera.flyTo({
        //     destination: Cesium.Cartesian3.fromDegrees(-104.9965, 39.74248, 10000),
        // });
    }, []);

    function instances() {
        const rectangleInstance = new Cesium.GeometryInstance({
            geometry: new Cesium.RectangleGeometry({
                rectangle: Cesium.Rectangle.fromDegrees(-140.0, 30.0, -100.0, 40.0),
                vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
            }),
            id: 'rectangle',
            attributes: {
                color: new Cesium.ColorGeometryInstanceAttribute(0.0, 1.0, 1.0, 0.5),
            },
        });
        const ellipsoidInstance = new Cesium.GeometryInstance({
            geometry: new Cesium.EllipsoidGeometry({
                radii: new Cesium.Cartesian3(500000.0, 500000.0, 1000000.0),
                vertexFormat: Cesium.VertexFormat.POSITION_AND_NORMAL,
            }),
            modelMatrix: Cesium.Matrix4.multiplyByTranslation(
                Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(-95.59777, 40.03883)),
                new Cesium.Cartesian3(0.0, 0.0, 500000.0),
                new Cesium.Matrix4()
            ),
            id: 'ellipsoid',
            attributes: {
                color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.AQUA),
            },
        });
    }

    function onReady(checked) {
        console.log('onready');
    }
    return (
        <>
            <Primitive
                geometryInstances={data}
                onReady={onReady}
                appearance={
                    new Cesium.EllipsoidSurfaceAppearance({
                        material: Cesium.Material.fromType('Color'),
                    })
                }
            />
        </>
    );
}
