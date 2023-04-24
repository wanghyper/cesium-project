import {Matrix3, Matrix4, Math, Cartesian3, Transforms, Cartographic} from 'cesium';

export function translate3dtiles(params: {height: number; center: Cartesian3}) {
    const {height, center} = params;
    const cartographic = Cartographic.fromCartesian(center);
    const surface = Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
    const offset = Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, height);
    const translation = Cartesian3.subtract(offset, surface, new Cartesian3());
    return Matrix4.fromTranslation(translation);
}
