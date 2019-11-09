const InterceptorManager = require('./InterceptorManager');
const dispatchRequest = require('./dispatchRequest');
const defaults = require('../defaults');

/**
 *
 * @param {Object} instanceConfig instance实例配置
 */
function Axios(instanceConfig) {
    this.defaults = instanceConfig;
    // 重头戏来了，拦截器（分为请求拦截器和响应拦截器）
    this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
    };
}

// dispatch a request 分发一个请求
// 返回一个promise
// 讲解一下： 这里首先把promise初始化为配置的promise,在then之后的第一个参数（函数），可以获取上一个的配置，即是config
Axios.prototype.request = function request(config) {
    config = config || {};

    function mergeConfig(config1, config2) {
        for (let key in config2) {
            config1[key] = config2[key];
        }
        return config1;
    }

    config = mergeConfig(config, defaults);

    // hook up interceptors middleware hook中间件
    var chain = [dispatchRequest, undefined];
    var promise = Promise.resolve(config);

    // request 的 interceptor{fulfilled, rejected} 应该放置在前面执行
    this.interceptors.request.forEach(function unshiftRequestInterceptors(
        interceptor
    ) {
        chain.unshift(interceptor.fulfilled, interceptor.rejected);
    });

    // response 的 interceptor{fulfilled, rejected} 应该放置在后面执行
    this.interceptors.response.forEach(function pushResponseInterceptors(
        interceptor
    ) {
        chain.push(interceptor.fulfilled, interceptor.rejected);
    });

    while (chain.length) {
        promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
};

module.exports = Axios;