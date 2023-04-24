import {Routes, Route, HashRouter} from 'react-router-dom';
import Model from './LoadModel';
import Test from './Test';
import Analysis from './Analysis';
import Three from './Three';
export default function Pages(props) {
    return (
        <HashRouter>
            <Routes>
                <Route path="model/*" element={<Model />} />
                <Route path="test/*" element={<Test />} />
                <Route path="analysis/*" element={<Analysis />} />
                <Route path="three/*" element={<Three />} />
            </Routes>
        </HashRouter>
    );
}
