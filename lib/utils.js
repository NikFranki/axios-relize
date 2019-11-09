module.exports = {
    /**
     *
     * @param {*} fn 将要被执行的函数
     * @param {*} thisArgs fn函数的上下文(this 指向)
     * @returns fn执行后返回的结果
     */
    bind: function(fn, thisArgs) {
        return function wrap() {
            return fn.apply(thisArgs, arguments);
        };
    },
    forEach: function(obj, fn) {
        if (obj === null || typeof obj === 'undefined') {
            return;
        }

        if (typeof obj !== 'object') {
            obj = [obj];
        }

        if (Array.isArray(obj)) {
            for (let i = 0; i < obj.length; i++) {
                fn.call(null, obj[i], i, obj);
            }
        } else {
            for (let key in obj) {
                fn.call(null, obj[key], key, obj);
            }
        }
    },
    extend: function(a, b, thisArgs) {
        var that = this;
        // extend object
        this.forEach(b, function assignValue(val, key) {
            if (thisArgs && typeof val === 'function') {
                a[key] = that.bind(val, thisArgs);
            } else {
                a[key] = val;
            }
        });
        return a;
    },
    merge: function() {
        // 合并对象，输出平铺对象
        var result = {};
        var that = this;
        function assignValue(val, key) {
            if (typeof result[key] === 'object' && typeof val === 'object') {
                result[key] = that.merge(result[key], val);
            } else {
                result[key] = val;
            }
        }
        for (let i = 0; i < arguments.length; i++) {
            that.forEach(arguments[i], assignValue);
        }
        return result;
    },
    deepMerge: function() {
        // 深拷贝
        var result = {};
        var that = this;
        function assignValue(val, key) {
            if (typeof result[key] === 'object' && typeof val === 'object') {
                result[key] = that.deepMerge(result[key], val);
            } else if (typeof val === 'object') {
                result[key] = that.deepMerge({}, val);
            } else {
                result[key] = val;
            }
        }
        for (let i = 0; i < arguments.length; i++) {
            that.forEach(arguments[i], assignValue);
        }
        return result;
    }
};