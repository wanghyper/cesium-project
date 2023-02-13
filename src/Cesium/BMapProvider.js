import * as Cesium from 'cesium';
const BaiduImageryProvider = function (options) {
    this._errorEvent = new Cesium.Event();
    this._tileWidth = 256;
    this._tileHeight = 256;
    this._maximumLevel = 18;
    this._minimumLevel = 1;
    let southwestInMeters = new Cesium.Cartesian2(-33554054, -33746824);
    let northeastInMeters = new Cesium.Cartesian2(33554054, 33746824);
    this._tilingScheme = new Cesium.WebMercatorTilingScheme({
        rectangleSouthwestInMeters: southwestInMeters,
        rectangleNortheastInMeters: northeastInMeters,
    });
    this._rectangle = this._tilingScheme.rectangle;
    this._resource = Cesium.Resource.createIfNeeded(options.url);
    this._tileDiscardPolicy = undefined;
    this._credit = undefined;
    this._readyPromise = undefined;
};

Object.defineProperties(Cesium.gm.BaiduImageryProvider.prototype, {
    url: {
        get: function () {
            return this._resource.url;
        },
    },
    proxy: {
        get: function () {
            return this._resource.proxy;
        },
    },
    tileWidth: {
        get: function () {
            if (!this.ready) {
                throw new Cesium.DeveloperError('tileWidth must not be called before the imagery provider is ready.');
            }
            return this._tileWidth;
        },
    },

    tileHeight: {
        get: function () {
            if (!this.ready) {
                throw new Cesium.DeveloperError('tileHeight must not be called before the imagery provider is ready.');
            }
            return this._tileHeight;
        },
    },

    maximumLevel: {
        get: function () {
            if (!this.ready) {
                throw new Cesium.DeveloperError(
                    'maximumLevel must not be called before the imagery provider is ready.'
                );
            }
            return this._maximumLevel;
        },
    },

    minimumLevel: {
        get: function () {
            if (!this.ready) {
                throw new Cesium.DeveloperError(
                    'minimumLevel must not be called before the imagery provider is ready.'
                );
            }
            return this._minimumLevel;
        },
    },

    tilingScheme: {
        get: function () {
            if (!this.ready) {
                throw new Cesium.DeveloperError(
                    'tilingScheme must not be called before the imagery provider is ready.'
                );
            }
            return this._tilingScheme;
        },
    },

    tileDiscardPolicy: {
        get: function () {
            if (!this.ready) {
                throw new Cesium.DeveloperError(
                    'tileDiscardPolicy must not be called before the imagery provider is ready.'
                );
            }
            return this._tileDiscardPolicy;
        },
    },

    rectangle: {
        get: function () {
            if (!this.ready) {
                throw new Cesium.DeveloperError('rectangle must not be called before the imagery provider is ready.');
            }
            return this._rectangle;
        },
    },

    errorEvent: {
        get: function () {
            return this._errorEvent;
        },
    },
    ready: {
        get: function () {
            return this._resource;
        },
    },
    readyPromise: {
        get: function () {
            return this._readyPromise;
        },
    },
    credit: {
        get: function () {
            if (!this.ready) {
                throw new Cesium.DeveloperError('credit must not be called before the imagery provider is ready.');
            }
            return this._credit;
        },
    },
});

BaiduImageryProvider.prototype.requestImage = function (x, y, level, request) {
    let xTileCount = this._tilingScheme.getNumberOfXTilesAtLevel(level);
    let yTileCount = this._tilingScheme.getNumberOfYTilesAtLevel(level);
    let url = this.url
        .replace('{x}', x - xTileCount / 2)
        .replace('{y}', yTileCount / 2 - y - 1)
        .replace('{z}', level)
        .replace('{s}', Math.floor(10 * Math.random()));
    console.log('zxy:' + level + ', ' + x + ', ' + y + '; ' + url);
    return Cesium.ImageryProvider.loadImage(this, url);
};

export default BaiduImageryProvider;
