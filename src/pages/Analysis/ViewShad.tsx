import {Viewer} from '../../Cesium';
import * as Cesium from 'cesium';
import ViewShedStage from '../../Cesium/ViewShad';
import {translate3dtiles, update3dtilesMaxtrix} from '@/Cesium/utils/transform';
import {useRef} from 'react';
export default function ViewShade() {
    const tileRef = useRef<any>();
    function init(viewer) {
        // 开启地形深度监测
        viewer.scene.globe.depthTestAgainstTerrain = true;

        // 加载3dtile模型
        const tileset = (tileRef.current = new Cesium.Cesium3DTileset({
            url: 'http://earthsdk.com/v/last/Apps/assets/dayanta/tileset.json',
            // show: false
        }));
        viewer.scene.primitives.add(tileset);
        tileset.readyPromise.then(function (argument) {
            console.log(tileset);
            tileset.modelMatrix = translate3dtiles({center: tileset.boundingSphere.center, height: -417});
            // 更改相机状态
            viewer.camera.flyToBoundingSphere(tileset.boundingSphere);
        });
        let viewshad: any = null;
        var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        handler.setInputAction(function (movement) {
            // // 椭球坐标
            // var position1 = viewer.scene.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);
            // console.log(position1);
            // // 加载地形后的坐标
            // var ray = viewer.camera.getPickRay(movement.position);
            // var position2 = viewer.scene.globe.pick(ray, viewer.scene);
            // console.log(position2);

            // 模型表面的位置
            var position3 = viewer.scene.pickPosition(movement.position);
            console.log(position3);
            var scene = viewer.scene;
            var pickedObject = scene.pick(movement.position); //判断是否拾取到模型
            if (scene.pickPositionSupported && Cesium.defined(pickedObject)) {
                var cartesian = viewer.scene.pickPosition(movement.position);
                if (Cesium.defined(cartesian)) {
                    var cartographic = Cesium.Cartographic.fromCartesian(cartesian); //根据笛卡尔坐标获取到弧度
                    var lng = Cesium.Math.toDegrees(cartographic.longitude); //根据弧度获取到经度
                    var lat = Cesium.Math.toDegrees(cartographic.latitude); //根据弧度获取到纬度
                    var height = cartographic.height; //模型高度
                    console.log(pickedObject, cartesian, lng, lat, height);
                }
                if (viewshad) {
                    viewshad.clear();
                }
                viewshad = new ViewShedStage(viewer, {
                    viewPosition: cartesian,
                });
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        document.addEventListener('keydown', e => {
            viewshad.updateLightCamera({
                viewPosition: viewshad.viewPosition,
                viewHeading: viewshad.viewHeading++,
                viewPitch: viewshad.viewPitch,
            });
        });
    }
    function setTilesHeight(e: {target: HTMLInputElement}) {
        console.log(e.target.value);
        const tileset = tileRef.current;
        tileset.modelMatrix = translate3dtiles({center: tileset.boundingSphere.center, height: Number(e.target.value)});
    }
    return (
        <Viewer onLoad={init}>
            <input
                style={{position: 'absolute', left: 20, top: 20}}
                type="range"
                min={-500}
                max={500}
                defaultValue={0}
                onChange={setTilesHeight}
            />
        </Viewer>
    );
}
