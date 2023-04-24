import {useEffect} from 'react';
import './index.less';
import * as Cesium from 'cesium';
import * as THREE from 'three';
export default function Integrating() {
    useEffect(() => {
        init();
    }, []);
    function init() {
        // three对象
        let three: any = {
            renderer: null,
            camera: null,
            scene: null,
        };

        //cesium对象
        let cesium: any = {
            viewer: null,
        };
        let ce: any = null;
        // 模型定位范围
        let minWGS84 = [115.56936458615716, 39.284100766866445];
        let maxWGS84 = [117.10745052365716, 41.107831235616445];

        // cesium 容器
        let cesiumContainer = document.getElementById('cesiumContainer') as HTMLDivElement;
        let _3Dobjects: any[] = []; //Could be any Three.js object mesh

        // three对象
        function _3DObject(this: any): any {
            //THREEJS 3DObject.mesh
            this.threeMesh = null;
            //location bounding box
            this.minWGS84 = null;
            this.maxWGS84 = null;
        }

        // 初始化地球
        function initCesium() {
            cesium.viewer = new Cesium.Viewer(cesiumContainer, {
                useDefaultRenderLoop: false, // 关掉默认的渲染
                selectionIndicator: false,
                homeButton: false,
                sceneModePicker: false,
                infoBox: false,
                navigationHelpButton: false,
                navigationInstructionsInitiallyVisible: false,
                animation: false,
                timeline: false,
                fullscreenButton: false,
                allowTextureFilterAnisotropic: false,
                baseLayerPicker: false,
                contextOptions: {
                    webgl: {
                        alpha: false,
                        antialias: true,
                        preserveDrawingBuffer: true,
                        failIfMajorPerformanceCaveat: false,
                        depth: true,
                        stencil: false,
                        anialias: false,
                    },
                },

                targetFrameRate: 60,
                resolutionScale: 0.1,
                orderIndependentTranslucency: true,
                //加载底图
                // imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
                //     url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer',
                // }),
                geocoder: false,
                automaticallyTrackDataSourceClocks: false,
                dataSources: null,
                clock: null,
                terrainShadows: Cesium.ShadowMode.DISABLED,
            });
            let center = Cesium.Cartesian3.fromDegrees(
                (minWGS84[0] + maxWGS84[0]) / 2,
                (minWGS84[1] + maxWGS84[1]) / 2 - 1,
                200000
            );
            ce = center;
            cesium.viewer.camera.flyTo({
                destination: center,
                orientation: {
                    heading: Cesium.Math.toRadians(0),
                    pitch: Cesium.Math.toRadians(-60),
                    roll: Cesium.Math.toRadians(0),
                },
                duration: 3,
            });
        }

        //初始化three
        function initThree() {
            let fov = 45;
            let width = window.innerWidth;
            let height = window.innerHeight;
            let aspect = width / height;
            let near = 1;
            let far = 10 * 1000 * 1000;
            three.scene = new THREE.Scene();
            three.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
            three.renderer = new THREE.WebGLRenderer({alpha: true});
            three.renderer.setSize(width, height);
            const canvas = three.renderer.domElement;
            canvas.style.position = 'absolute';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.pointerEvents = 'none';
            let Amlight = new THREE.AmbientLight(0xffffff, 2);
            three.scene.add(Amlight);
            // 注意这里，直接把three容器（canvas 添加到 cesium中，在cesium的canvas之下），
            // 这样的话，两个canvas才会重叠起来。
            cesium.viewer.cesiumWidget.canvas.parentElement.appendChild(three.renderer.domElement);
            // cesiumContainer.appendChild(three.renderer.domElement);
        }

        //创建 cesium 图形，跟three无关
        function createPolygon() {
            let entity = {
                name: 'Polygon',
                polygon: {
                    hierarchy: Cesium.Cartesian3.fromDegreesArray([
                        minWGS84[0],
                        minWGS84[1],
                        maxWGS84[0],
                        minWGS84[1],
                        maxWGS84[0],
                        maxWGS84[1],
                        minWGS84[0],
                        maxWGS84[1],
                    ]),
                    material: Cesium.Color.BLUE.withAlpha(0.4),
                },
            };
            let Polygon = cesium.viewer.entities.add(entity);
        }

        // 加载three模型
        function getModel() {
            const geometry = new THREE.DodecahedronGeometry();
            const material = new THREE.MeshBasicMaterial({color: 0x0000ff});
            let dodecahedronMesh = new THREE.Mesh(geometry, material);
            // let dodecahedronMesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
            dodecahedronMesh.scale.set(5000, 5000, 5000); //scale object to be visible at planet scale
            dodecahedronMesh.position.z += 25000.0; // translate "up" in Three.js space so the "bottom" of the mesh is the handle
            dodecahedronMesh.rotation.x = Math.PI / 2; // rotate mesh for Cesium's Y-up system
            let dodecahedronMeshYup = new THREE.Group();
            dodecahedronMeshYup.add(dodecahedronMesh);
            three.scene.add(dodecahedronMeshYup); // don’t forget to add it to the Three.js scene manually
            //Assign Three.js object mesh to our object array
            let _3DOB = new _3DObject();
            _3DOB.threeMesh = dodecahedronMeshYup;
            _3DOB.minWGS84 = minWGS84;
            _3DOB.maxWGS84 = maxWGS84;
            _3Dobjects.push(_3DOB);
        }

        // 加载three立方体模型
        function cube() {
            let doubleSideMaterial = new THREE.MeshNormalMaterial({
                side: THREE.DoubleSide,
            });

            const geometry = new THREE.SphereGeometry(1, 32, 32);
            let sphere = new THREE.Mesh(
                geometry,
                new THREE.MeshPhongMaterial({color: 0xffffff, side: THREE.DoubleSide})
            ); //12面体
            // sphere.scale.set(5000,5000,5000);
            // sphere.position.z+=15000;
            // translate "up" in Three.js space so the "bottom" of the mesh is the handle
            sphere.scale.set(5000, 5000, 5000);
            sphere.uuid = 'sphere';
            var sphereYup = new THREE.Group();
            sphereYup.add(sphere);
            three.scene.add(sphereYup); // don’t forget to add it to the Three.js scene manually
            sphereYup.position.set(ce.x, ce.y, ce.z);
            let _3DOB = new _3DObject();
            _3DOB.threeMesh = sphereYup;
            _3DOB.minWGS84 = minWGS84;
            _3DOB.maxWGS84 = maxWGS84;
            _3Dobjects.push(_3DOB);
            const geometry1 = new THREE.DodecahedronGeometry();
            let dodecahedronMesh = new THREE.Mesh(geometry1, new THREE.MeshNormalMaterial()); //12面体
            dodecahedronMesh.scale.set(5000, 5000, 5000);
            dodecahedronMesh.position.z += 15000;
            // translate "up" in Three.js space so the "bottom" of the mesh is the handle
            dodecahedronMesh.rotation.x = Math.PI / 2; // rotate mesh for Cesium's Y-up system
            dodecahedronMesh.uuid = '12面体';
            var dodecahedronMeshYup = new THREE.Group();
            dodecahedronMeshYup.add(dodecahedronMesh);
            three.scene.add(dodecahedronMeshYup); // don’t forget to add it to the Three.js scene manually
            dodecahedronMeshYup.position.set(ce.x, ce.y, ce.z);
            //    Assign Three.js object mesh to our object array
            _3DOB = new _3DObject();
            _3DOB.threeMesh = dodecahedronMeshYup;
            _3DOB.minWGS84 = minWGS84;
            _3DOB.maxWGS84 = maxWGS84;
            _3Dobjects.push(_3DOB);
            //添加灯光
            //添加点光源
            var spotLight = new THREE.SpotLight(0xffffff);
            spotLight.position.set(0, 0, 50000);
            spotLight.castShadow = true; //设置光源投射阴影
            spotLight.intensity = 1;
            sphereYup.add(spotLight);
            //添加环境光
            var hemiLight = new THREE.HemisphereLight(0xff0000, 0xff0000, 1);
            sphereYup.add(hemiLight);
        }

        // 创建three 对象
        function createThreeObject() {
            getModel();
            cube();
        }

        // 初始化模型
        function init3DObject() {
            //Cesium entity
            createPolygon();
            //Three.js Objects
            createThreeObject();
        }

        // cesium 渲染
        function renderCesium() {
            cesium.viewer.render();
        }

        function renderThree() {
            var width = cesiumContainer.clientWidth;
            var height = cesiumContainer.clientHeight;
            three.renderer.setSize(width, height);
            three.renderer.render(three.scene, three.camera);
        }
        function renderCamera() {
            // register Three.js scene with Cesium
            three.camera.fov = Cesium.Math.toDegrees(cesium.viewer.camera.frustum.fovy); // ThreeJS FOV is vertical
            three.camera.updateProjectionMatrix();
            let cartToVec = function (cart) {
                return new THREE.Vector3(cart.x, cart.y, cart.z);
            };
            // Configure Three.js meshes to stand against globe center position up direction
            for (let id in _3Dobjects) {
                minWGS84 = _3Dobjects[id].minWGS84;
                maxWGS84 = _3Dobjects[id].maxWGS84;
                // convert lat/long center position to Cartesian3
                let center = Cesium.Cartesian3.fromDegrees(
                    (minWGS84[0] + maxWGS84[0]) / 2,
                    (minWGS84[1] + maxWGS84[1]) / 2
                );
                // get forward direction for orienting model
                let centerHigh = Cesium.Cartesian3.fromDegrees(
                    (minWGS84[0] + maxWGS84[0]) / 2,
                    (minWGS84[1] + maxWGS84[1]) / 2,
                    1
                );
                // use direction from bottom left to top left as up-vector
                let bottomLeft = cartToVec(Cesium.Cartesian3.fromDegrees(minWGS84[0], minWGS84[1]));
                let topLeft = cartToVec(Cesium.Cartesian3.fromDegrees(minWGS84[0], maxWGS84[1]));
                let latDir = new THREE.Vector3().subVectors(bottomLeft, topLeft).normalize();
                // configure entity position and orientation
                _3Dobjects[id].threeMesh.position.copy(center);
                _3Dobjects[id].threeMesh.lookAt(centerHigh.x, centerHigh.y, centerHigh.z);
                _3Dobjects[id].threeMesh.up.copy(latDir);
            }

            // Clone Cesium Camera projection position so the
            // Three.js Object will appear to be at the same place as above the Cesium Globe

            three.camera.matrixAutoUpdate = false;
            var cvm = cesium.viewer.camera.viewMatrix;
            var civm = cesium.viewer.camera.inverseViewMatrix;
            three.camera.lookAt(0, 0, 0);
            three.camera.matrixWorld.set(
                civm[0],
                civm[4],
                civm[8],
                civm[12],
                civm[1],
                civm[5],
                civm[9],
                civm[13],
                civm[2],
                civm[6],
                civm[10],
                civm[14],
                civm[3],
                civm[7],
                civm[11],
                civm[15]
            );
            three.camera.matrixWorldInverse.set(
                cvm[0],
                cvm[4],
                cvm[8],
                cvm[12],
                cvm[1],
                cvm[5],
                cvm[9],
                cvm[13],
                cvm[2],
                cvm[6],
                cvm[10],
                cvm[14],
                cvm[3],
                cvm[7],
                cvm[11],
                cvm[15]
            );

            var width = cesiumContainer.clientWidth;
            var height = cesiumContainer.clientHeight;
            var aspect = width / height;
            three.camera.aspect = aspect;
            three.camera.updateProjectionMatrix();
        }

        // 同步
        function loop() {
            requestAnimationFrame(loop);
            renderCesium();
            renderThree();
            renderCamera();
        }

        initCesium(); // Initialize Cesium renderer
        initThree(); // Initialize Three.js renderer
        init3DObject(); // Initialize Three.js object mesh with Cesium Cartesian coordinate system
        loop(); // Looping renderer
    }
    return (
        <div className="container">
            <div className="viewer" id="cesiumContainer"></div>
        </div>
    );
}
