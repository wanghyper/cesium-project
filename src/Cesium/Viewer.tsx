import {Viewer as CesiumViewer, CameraEventType, KeyboardEventModifier} from 'cesium';
import {Provider} from './context';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import React, {useEffect, useRef, useState} from 'react';

export default function Viewer(props: {
    options?: Record<string, any>;
    children?: React.ReactElement;
    style?: Record<string, any>;
    onLoad?: (viewer: any) => void;
}) {
    const {options = {}, children, style = {}, onLoad} = props;
    const idRef = useRef(Date.now() + '' + Math.random());
    const [provided, setProvided] = useState<any>({});
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!provided.viewer) {
            const viewer = new CesiumViewer(idRef.current, {
                animation: false, // 动画小组件
                baseLayerPicker: false, // 底图组件，选择三维数字地球的底图（imagery and terrain）。
                fullscreenButton: false, // 全屏组件
                vrButton: false, // VR模式
                geocoder: false, // 地理编码（搜索）组件
                homeButton: false, // 首页，点击之后将视图跳转到默认视角
                infoBox: false, // 信息框
                sceneModePicker: false, // 场景模式，切换2D、3D 和 Columbus View (CV) 模式。
                selectionIndicator: false, //是否显示选取指示器组件
                timeline: false, // 时间轴
                navigationHelpButton: false, // 帮助提示，如何操作数字地球。
                // 如果最初应该看到导航说明，则为true；如果直到用户明确单击该按钮，则该提示不显示，否则为false。
                navigationInstructionsInitiallyVisible: false,
                ...options,
            });
            //设置中键放大缩小
            viewer.scene.screenSpaceCameraController.zoomEventTypes = [
                CameraEventType.WHEEL,
                CameraEventType.MIDDLE_DRAG,
                CameraEventType.PINCH,
            ];
            //设置右键旋转
            viewer.scene.screenSpaceCameraController.tiltEventTypes = [
                CameraEventType.RIGHT_DRAG,
                CameraEventType.PINCH,

                {
                    eventType: CameraEventType.RIGHT_DRAG,
                    modifier: KeyboardEventModifier.CTRL,
                },

                {
                    eventType: CameraEventType.MIDDLE_DRAG,
                    modifier: KeyboardEventModifier.CTRL,
                },
            ];
            // 隐藏logo
            viewer.cesiumWidget.creditContainer.style.display = 'none';
            provided.viewer = viewer;
            setProvided({...provided});
            setLoaded(true);
            onLoad && onLoad(viewer);
        }
    }, []);
    return (
        <Provider value={provided}>
            <div id={idRef.current} style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...style}}>
                {loaded && children}
            </div>
        </Provider>
    );
}
