import {Route, Routes} from 'react-router-dom';
import SimpleCanvas from './SimpleCanvas';
export default function LoadModal(props) {
    return (
            <Routes>
                <Route path="simpleCanvas" element={<SimpleCanvas/>} />
            </Routes>
    );
}
