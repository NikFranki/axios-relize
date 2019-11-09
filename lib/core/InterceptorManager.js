const Util = require('../utils');

/**
 *
 * 拦截器管理
 */
function InterceptorManager() {
    this.handlers = [];
}

// add a interceptor to stack
// fulfilled handle then for a promise
// rejected handle reject for a promise
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
    this.handlers.push({
        fulfilled: fulfilled,
        rejected: rejected
    });
    return this.handlers.length - 1;
};

// 拦截器的遍历方法
InterceptorManager.prototype.forEach = function forEach(fn) {
    Util.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
            fn(h);
        }
    });
};

module.exports = InterceptorManager;