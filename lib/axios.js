const defaults = require('./defaults');
const Axios = require('./core/Axios');
const Util = require('./utils');

/**
 * 
 * @param {Object} defaultConfig 默认配置
 * @return {Axios} 返回的是一个Axios的实例instance
 */
function createInstance(defaultConfig) {
    var context = new Axios(defaultConfig);
    var instance = Util.bind(Axios.prototype.request, context);
    
    // copy axios.prototype to instance
    Util.extend(instance, Axios.prototype, context);

    // copy context to instance
    Util.extend(instance, context);
    console.dir(instance);

    return instance;
}

var axios = createInstance(defaults);

axios.Axios = Axios;

module.exports = axios;

window.axios = axios;

module.exports.defaults = axios;