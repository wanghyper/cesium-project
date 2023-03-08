import { useContext } from 'react';
import {createContext} from 'react';

export const CesiumContext = createContext({});
export const {Provider, Consumer} = CesiumContext;

export function useCesium() {
    const context: any = useContext(CesiumContext);
    return context
}