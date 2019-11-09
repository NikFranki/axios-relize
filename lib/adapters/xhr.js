/**
 *
 * xhr 请求模块
 * @param {*} config
 * @returns
 */
module.exports = function xhrAdapter(config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
        var requestData = config.data;
        var requestHeaders = config.headers;

        var request = new XMLHttpRequest();

        request.open(config.method.toUpperCase(), config.url);

        request.timeout = config.timeout;

        request.onreadystatechange = function handleOnload() {
            if (!request || request.readyState !== 4) {
                return;
            }

            var responseData =
                request.responseType === 'text'
                    ? request.responseText
                    : request.response;
            var response = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: requestHeaders,
                config: config,
                request: request
            };

            resolve(response);

            // clean up request 清空request
            request = null;
        };

        // send the request
        request.send(requestData);
    });
};
