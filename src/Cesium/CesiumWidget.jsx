import {CesiumWidget as CesiumCesiumWidget, Ion} from 'cesium';
import {Provider} from './context';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import React, {useEffect, useRef, useState} from 'react';

export default function CesiumWidget(props) {
    const {options = {}, children, style = {}, onLoad} = props;
    const idRef = useRef(Date.now() + '' + Math.random());
    const [provided, setProvided] = useState({});
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        if (!provided.viewer) {
            const viewer = new CesiumCesiumWidget(idRef.current, options);
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
