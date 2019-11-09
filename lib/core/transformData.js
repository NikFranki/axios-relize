const Util = require('../utils');

/**
 * transform the data for a request or a response
 *
 * @param {*} data
 * @param {*} headers
 * @param {*} fns
 */
module.exports = function transformData(data, headers, fns) {
    Util.forEach(fns, function transform(fn) {
        fn(data, headers);
    });
};
