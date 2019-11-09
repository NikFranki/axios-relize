'use strict';

/**
 *
 *
 * @returns 获取正确的请求模块（请求适配器）
 */
function getDefaultAdapter() {
    var adapter;
    if (typeof XMLHttpRequest !== 'undefined') {
        // 浏览器端使用XMLHttpRequest
        adapter = require('./adapters/xhr');
    } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
        // node端使用http
        adapter = require('./adapters/http');
    }
    return adapter;
}

// config axios默认配置
var defaults = {
    adapter: getDefaultAdapter(),
    timeout: 0,
    headers: {
        common: {
            Accept: 'application/json, text/plain, */*'
        }
    }
};

module.exports = defaults;