const transformData = require('./transformData');
const Util = require('../utils');

/**
 *
 *
 * @param {*} config 请求config
 * 使用正确的请求模块适配器去发送请求
 */
module.exports = function dispatchRequest(config) {
    config = config || {};
    config.headers = config.headers || {};

    // transform request data
    config.data = transformData(
        config.data,
        config.headers,
        config.transformRequest
    );

    // flatten headers
    config.headers = Util.merge(
        config.headers.common || {},
        config.headers[config.method] || {},
        config.headers || {}
    );

    // 设置正确的请求adapter
    var adapter = config.adapter || defaults.adapter;
    return adapter(config).then(
        function onAdapterResolution(response) {
            return response;
        },
        function onAdapterRejection(reason) {
            return Promise.reject(reason);
        }
    );
};
