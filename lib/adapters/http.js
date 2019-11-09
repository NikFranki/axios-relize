/**
 *
 *  http 请求模块
 * @param {*} config
 * @returns
 */
module.exports = function httpAdapter(config) {
    // 创建一个http request
    var http = require('http');
    return new Promise(function dispatchHttpRequest(
        resovlePromise,
        rejectPromise
    ) {
        console.log(config, typeof config);
        var options = {
            path: config.url,
            method: config.method
        };
        var req = http.request(options, function handleResponse(res) {
            var stream = res;
            var response = {
                status: res.statusCode,
                statusText: res.statusMessage,
                headers: res.headers,
                config: config
            };
            if (config.responseType === 'stream') {
                response.data = stream;
            } else {
                response.data = res;
            }
        });
        return resovlePromise('httpAdapter');
    });
};
