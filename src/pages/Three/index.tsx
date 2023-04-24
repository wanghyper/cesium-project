import {Routes, Route, Navigate} from 'react-router-dom';
import Page1 from './Page1';
export default function Pages(props) {
    return (
        <Routes>
            <Route path="page1" element={<Page1 />} />
            <Route path="*" element={<Navigate replace to="page1" />} />
        </Routes>
    );
}
