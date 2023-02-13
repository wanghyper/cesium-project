import {Routes, Route, HashRouter} from 'react-router-dom';
import Model from './LoadModel';
export default function Pages(props) {
    return (
        <HashRouter>
            <Routes>
                <Route path="model/*" element={<Model />} />
            </Routes>
        </HashRouter>
    );
}
