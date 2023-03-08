import {Viewer} from '../../Cesium';
import * as Cesium from 'cesium';
import ViewShedStage from '../../Cesium/ViewShad';
export default function ViewShade() {
    function init(viewer) {
        // 开启地形深度监测
        viewer.scene.globe.depthTestAgainstTerrain = true;

        // 加载3dtile模型
        var tileset = new Cesium.Cesium3DTileset({
            url: 'http://earthsdk.com/v/last/Apps/assets/dayanta/tileset.json',
            // show: false
        });
        viewer.scene.primitives.add(tileset);
        tileset.readyPromise.then(function (argument) {
            console.log(argument);
            // 更改相机状态
            viewer.camera.flyToBoundingSphere(tileset.boundingSphere);
        });
        let viewshad = null;
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
    }
    return <Viewer onLoad={init}></Viewer>;
}

/**
 * Returns an object containing the first object intersected by the ray and the position of intersection,
 * or <code>undefined</code> if there were no intersections. The intersected object has a <code>primitive</code>
 * property that contains the intersected primitive. Other properties may be set depending on the type of primitive
 * and may be used to further identify the picked object. The ray must be given in world coordinates.
 * <p>
 * This function only picks globe tiles and 3D Tiles that are rendered in the current view. Picks all other
 * primitives regardless of their visibility.
 * </p>
 *
 * @private
 *
 * @param {Ray} ray The ray.
 * @param {Object[]} [objectsToExclude] A list of primitives, entities, or features to exclude from the ray intersection.
 * @returns {Object} An object containing the object and position of the first intersection.
 *
 * @exception {DeveloperError} Ray intersections are only supported in 3D mode.
 */
// Scene.prototype.pickFromRay = function(ray, objectsToExclude) {

/**
 * Returns a list of objects, each containing the object intersected by the ray and the position of intersection.
 * The intersected object has a <code>primitive</code> property that contains the intersected primitive. Other
 * properties may also be set depending on the type of primitive and may be used to further identify the picked object.
 * The primitives in the list are ordered by first intersection to last intersection. The ray must be given in
 * world coordinates.
 * <p>
 * This function only picks globe tiles and 3D Tiles that are rendered in the current view. Picks all other
 * primitives regardless of their visibility.
 * </p>
 *
 * @private
 *
 * @param {Ray} ray The ray.
 * @param {Number} [limit=Number.MAX_VALUE] If supplied, stop finding intersections after this many intersections.
 * @param {Object[]} [objectsToExclude] A list of primitives, entities, or features to exclude from the ray intersection.
 * @returns {Object[]} List of objects containing the object and position of each intersection.
 *
 * @exception {DeveloperError} Ray intersections are only supported in 3D mode.
 */
//Scene.prototype.drillPickFromRay = function(ray, limit, objectsToExclude) {
