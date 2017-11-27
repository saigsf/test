/**
 * 获取窗口信息
 * 作者： Saber
 * 时间：2017/11/21
 */
(function() {
    var getInfo = function(opt) {
        var winW = document.documentElement.clientWidth;
        var winH = document.documentElement.clientHeight;
        var viewportW = document.documentElement.clientWidth;
        var viewportH = document.documentElement.clientHeight;
        return {
            winW: winW,
            winH: winH
        }
    }
    window.getInfo = getInfo;
})();

/**
 * 节流函数
 * 作者： Saber
 * 时间：2017/11/21
 */

(function() {
    var lock = false;
    var throttle = function(timeout, callback) {
        if (lock) {
            return;
        }
        callback();
        lock = true;
        setTimeout(function() {
            lock = false;
        }, timeout);
    }
    window.throttle = throttle;
})();

/**
 * 数组的相关操作
 * 兼容处理，判断是否支持indexof，如果不支持则添加indexof方法
 * 作者：Saber
 * 时间：2017/11/23
 */
(function() {
    if (!Array.prototype.indexOf) {
        // 新增indexOf方法 
        Array.prototype.indexOf = function(item) {
            var result = -1,
                a_item = null;
            if (this.length == 0) {
                return result;
            }
            for (var i = 0, len = this.length; i < len; i++) {
                a_item = this[i];
                if (a_item === item) {
                    result = i;
                    break;
                }
            }
            return result;
        }
    }
    Array.prototype.unique = function() {　　
        var newArr = [this[0]];　　

        for (var i = 1; i < this.length; i++) {　　　　
            if (newArr.indexOf(this[i]) === -1) {　　
                newArr.push(this[i]);　　
            }
        }
        return newArr;
    }
})();

/**
 * 字符串相关操作 
 * 参数：p起始位置 ，l长度
 * 1、strSubRev：字符串截取并倒置
 * 2、strSplit：字符串分割成数组
 * 3、strRev：字符串倒置
 * 4、strUnique：字符串去重
 */
(function() {
    String.prototype.strOperations = function(p, l) {
        p = p ? p : 0;
        l = l ? l : 0;
        return {
            strSplit: () => {
                return this.split('')
            },
            strRev: () => {
                return this.split('').reverse().join('')
            },
            strSubRev: () => {
                return this.substr(p, l).split('').reverse().join('')
            },

            strUnique: () => {
                return this.split('').unique()
            }
        }
    };
    var str = "123789045789067890";
    // console.log(str.strOperations(2, 3).strUnique());
})();



/**
 * 原生js
 * 9/16框,自适应定比例放缩，使用rem布局实现内部等比率放缩
 * 作者：Saber
 * 时间：2017/11/21
 */
(function() {
    var htmlBox = document.documentElement;
    var WIDTH_HEIGHT_RATE = parseInt(9 / 16 * 1000) / 1000;
    var MAX_WIDTH = 1920; //以1920*1080为标准
    var MAX_FONT_SIZE = 64; // 与MAX_WIDTH对应的HTML的font-size
    // 大屏展示
    var initbig = function() {
        var viewport = window.getInfo();
        var ratio = parseInt(viewport.winH / viewport.winW * 1000) / 1000;

        if (ratio > WIDTH_HEIGHT_RATE) {
            htmlBox.style.fontSize = viewport.winW * MAX_FONT_SIZE / MAX_WIDTH + "px";
            htmlBox.style.width = viewport.winW + "px";
            htmlBox.style.height = viewport.winW * WIDTH_HEIGHT_RATE + "px";
        } else if (ratio < WIDTH_HEIGHT_RATE) {
            htmlBox.style.fontSize = viewport.winH / WIDTH_HEIGHT_RATE * MAX_FONT_SIZE / MAX_WIDTH + "px";
            htmlBox.style.width = viewport.winH / WIDTH_HEIGHT_RATE + "px";
            htmlBox.style.height = viewport.winH + "px";
        } else {
            htmlBox.style.fontSize = viewport.winW * MAX_FONT_SIZE / MAX_WIDTH + "px";
            htmlBox.style.width = viewport.winW + "px";
            htmlBox.style.height = viewport.winH + "px";
        }
    }
    var initdefault = function() {
        var viewport = window.getInfo();
        var ratio = parseInt(viewport.winH / viewport.winW * 1000) / 1000;

        if (ratio > WIDTH_HEIGHT_RATE) {
            htmlBox.style.fontSize = viewport.winW * MAX_FONT_SIZE / MAX_WIDTH + "px";
            htmlBox.style.width = viewport.winW + "px";
        } else {
            htmlBox.style.fontSize = viewport.winW * MAX_FONT_SIZE / MAX_WIDTH + "px";
            htmlBox.style.width = '100 %';
        }
    }
    window.initsize = initbig;
    window.initdefault = initdefault;
})();

/**
 * 计算后样式
 * 作者：Saber
 * 时间：2017/11/23
 */
(function() {
    var fetchComputedStyle = function(obj, property) {
        //能力检测
        if (window.getComputedStyle) {
            //现在要把用户输入的property中检测一下是不是驼峰，转为连字符写法
            //强制把用户输入的词儿里面的大写字母，变为小写字母加-
            //paddingLeft  →  padding-left
            property = property.replace(/([A-Z])/g, function(match, $1) {
                return "-" + $1.toLowerCase();
            });

            return window.getComputedStyle(obj)[property];
        } else {
            //IE只认识驼峰，我们要防止用户输入短横，要把短横改为大写字母
            //padding-left  → paddingLeft 
            property = property.replace(/\-([a-z])/g, function(match, $1) {
                return $1.toUpperCase();
            });

            return obj.currentStyle[property];
        }
    }
    window.fetchComputedStyle = fetchComputedStyle;
})();

/* jQuery 插件模式 */
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else {
        // Browser globals
        factory(jQuery);
    }
})(function($) {
    $.fn.extend({
            // Division: window.Division
        })
        // console.log($.fn)
})

/**
 * 不依赖环境的插件
 */

;
(function(undefined) {
    "use strict"
    var _global;
    var jSaber = {

    };

    // 最后将插件对象暴露给全局对象
    _global = (function() { return this || (0, eval)('this'); }());
    if (typeof module !== "undefined" && module.exports) {
        module.exports = jSaber;
    } else if (typeof define === "function" && define.amd) {
        define(function() { return jSaber; });
    } else {
        !('jSaber' in _global) && (_global.jSaber = jSaber);
    }

}());