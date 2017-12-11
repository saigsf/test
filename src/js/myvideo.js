/**
 * 不依赖环境的插件
 * myvideo
 */

;
(function (_global,undefined) {
    "use strict"
    // var _global;

    var version = '1.0.0';
    var getProto = Object.getPrototypeOf;


    var MyVideo =function (opt) {
        return new MyVideo.fn._init(opt)
    };

    MyVideo.fn = MyVideo.prototype ={
        MyVideo: version,
        constructor: MyVideo,
        _init: function (opt) {
            
            var def = {
                elem: '<div class="container"></div>',
                type: 'default'
            }

            def = MyVideo.extend(def, opt);
            console.log(def);
            createElem(def);
        }
    }

    function createElem(opt) {
        console.log(typeof opt.elem)
        if(typeof opt.elem === "string"){
            console.log("这是一个字符串")
        }else{
            var html = '';
            html += '<video id="media" src="'+opt.url+'"></video>';
            opt.elem.innerHTML=html;
        }
    }


    // 工具函数
    // 对象合并
    MyVideo.extend = MyVideo.prototype.extend = function () {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if (typeof target === "boolean") {
            deep = target;

            // Skip the boolean and the target
            target = arguments[i] || {};
            i++;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if (typeof target !== "object" && !MyVideo.isFunction(target)) {
            target = {};
        }

        // Extend MyVideo itself if only one argument is passed
        if (i === length) {
            target = this;
            i--;
        }

        for (; i < length; i++) {

            // Only deal with non-null/undefined values
            if ((options = arguments[i]) != null) {

                // Extend the base object
                for (name in options) {
                    src = target[name];
                    copy = options[name];

                    // Prevent never-ending loop
                    if (target === copy) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if (deep && copy && (MyVideo.isPlainObject(copy) ||
                        (copyIsArray = Array.isArray(copy)))) {

                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && Array.isArray(src) ? src : [];

                        } else {
                            clone = src && MyVideo.isPlainObject(src) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[name] = MyVideo.extend(deep, clone, copy);

                        // Don't bring in undefined values
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }

        return target;
    }

    MyVideo.extend({
        expando: "MyVideo" + (version + Math.random()).replace(/\D/g, ""),
        isReady: true,
        isFunction: function (obj) {
            return MyVideo.type(obj) === "function";
        },
        type: function (obj) {
            if (obj == null) {
                return obj + "";
            }

            // Support: Android <=2.3 only (functionish RegExp)
            return typeof obj === "object" || typeof obj === "function" ?
                class2type[toString.call(obj)] || "object" :
                typeof obj;
        },
        isPlainObject: function (obj) {
            var proto, Ctor;

            // Detect obvious negatives
            // Use toString instead of MyVideo.type to catch host objects
            if (!obj || toString.call(obj) !== "[object Object]") {
                return false;
            }

            proto = getProto(obj);

            // Objects with no prototype (e.g., `Object.create( null )`) are plain
            if (!proto) {
                return true;
            }

            // Objects with prototype are plain iff they were constructed by a global Object function
            Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
            return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
        },
        merge: function (o, n, override) {
            for (var key in n) {
                if (n.hasOwnProperty(key) && (!o.hasOwnProperty(key) || override)) {
                    o[key] = n[key];
                }
            }
            return o;
        },
        fetchComputedStyle: function (obj, property) {
            //能力检测
            if (window.getComputedStyle) {
                //现在要把用户输入的property中检测一下是不是驼峰，转为连字符写法
                //强制把用户输入的词儿里面的大写字母，变为小写字母加-
                //paddingLeft  →  padding-left
                property = property.replace(/([A-Z])/g, function (match, $1) {
                    return "-" + $1.toLowerCase();
                });

                return window.getComputedStyle(obj)[property];
            } else {
                //IE只认识驼峰，我们要防止用户输入短横，要把短横改为大写字母
                //padding-left  → paddingLeft 
                property = property.replace(/\-([a-z])/g, function (match, $1) {
                    return $1.toUpperCase();
                });

                return obj.currentStyle[property];
            }
        },
        


    })

    // 最后将插件对象暴露给全局对象
    _global = (function () { return this || (0, eval)('this'); }());
    if (typeof module !== "undefined" && module.exports) {
        module.exports = MyVideo;
    } else if (typeof define === "function" && define.amd) {
        define(function () { return MyVideo; });
    } else {
        !('MyVideo' in _global) && (_global.MyVideo = MyVideo);
    }

}(typeof window !== "undefined" ? window : this));