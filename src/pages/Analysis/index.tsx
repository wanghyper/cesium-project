import {Route, Routes} from 'react-router-dom';
import ViewShad from './ViewShad';
export default function Analysis(props) {
    return (
            <Routes>
                <Route path="viewshad" element={<ViewShad/>} />
            </Routes>
    );
}
