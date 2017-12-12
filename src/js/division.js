/**
 * 背景分裂效果
 * 作者：Saber
 * 时间：2017/11/23
 */
(function(_global, undefined) {
    "use strict"
    // var _global;

    var version = '1.0.5';
    var getProto = Object.getPrototypeOf;



    var el,
        totalNum,
        rows,
        cols,
        isEvents,
        isEventsSub,
        totalWidth, // 盒子的宽度
        totalHeight, // 盒子的高度
        subWidth, // 每一小块儿的宽度
        subHeight, // 每一小块儿的高度
        offsetsX,
        offsetsY,
        oDivs = [];

    var Division = function(opt) {
        // console.log(this.hasBorder(el))
        this._init(opt);
    }
    Division.prototype = {
        constructor: _global,
        _init: function(opt) {
            var def = {
                el: document.documentElement,
                rows: 4,
                cols: 1,
                isEvents: false,
                isEventsSub: true
            }

            this.def = this.extend(def, opt); //配置参数
            this.version = version;
            el = this.def.el; //盒子元素
            rows = this.def.rows > 1 ? this.def.rows : 1; // 行数
            cols = this.def.cols > 1 ? this.def.cols : 1; // 列数
            isEvents = this.def.isEvents ? 1 : 0;
            isEventsSub = this.def.isEventsSub ? 1 : 0;
            totalNum = this.def.rows * this.def.cols;
            totalWidth = parseFloat(Division.fetchComputedStyle(el, 'width')) - this.hasBorder(el) * 2; // 盒子的宽度
            totalHeight = parseFloat(Division.fetchComputedStyle(el, 'height')) - this.hasBorder(el) * 2; // 盒子的高度
            subWidth = totalWidth / cols; // 每一小块儿的宽度
            subHeight = totalHeight / rows; // 每一小块儿的高度
            offsetsX = 0;
            offsetsY = 0;
            oDivs = [];
            this._render();
            isEvents === 0 || Division.events();
            // isEventsSub === 0 || this.subDivision();
        },
        _render: function() {
            for (var i = 0; i < totalNum; i++) {
                oDivs.push(document.createElement("div"));
            }
            /* 每次渲染都要重新计算 盒子的宽度和高度 */
            totalWidth = parseFloat(Division.fetchComputedStyle(el, 'width')); // 盒子的宽度
            totalHeight = parseFloat(Division.fetchComputedStyle(el, 'height')); // 盒子的高度
            subWidth = totalWidth / cols; // 每一小块儿的宽度
            subHeight = totalHeight / rows; // 每一小块儿的高度
            for (var i = 0; i < totalNum; i++) {
                // offsetsX = Math.floor(Math.random() * 200 - 100);

                this.css.call(oDivs[i], {
                    // width: subWidth + "px",
                    // height: subHeight + "px",
                    // top: offsetsX + "px",
                    // left: offsetsY + "px",
                    backgroundSize: totalWidth + "px " + totalHeight + "px"
                });
                if (cols === 1 && rows !== 1) {
                    this.css.call(oDivs[i], {
                        backgroundPosition: 0 + "px " + -Math.floor(i / rows) * subHeight + "px"
                    });
                } else if (cols !== 1 && rows === 1) {
                    this.css.call(oDivs[i], {
                        backgroundPosition: -i % cols * subWidth + "px " + 0 + "px"
                    });

                } else {
                    this.css.call(oDivs[i], {
                        backgroundPosition: -i % cols * subWidth + "px " + -Math.floor(i / rows) * subHeight + "px"
                    });

                }
                oDivs[i].className = "inner";
                Division.effect(oDivs[i]);
                el.appendChild(oDivs[i]);
            }
        },


        css: function(styleObj) {
            for (var prop in styleObj) {
                var attr = prop.replace(/[A-Z]/g, function(word) {
                    return '-' + word.toLowerCase();
                });
                this.style[attr] = styleObj[prop];
            }
            return this;
        },

        changeBgimg: function(url) {
            for (var i = 0; i < totalNum; i++) {
                oDivs[i].style.backgroundImage = 'url(' + url + ')'; // background-image: url("../img/1490073118356.jpg");
            }
        },

        hasBorder: function(el) {
            return parseInt(Division.fetchComputedStyle(el, 'borderWidth'))
        },
        randomSplit: function(callback) {
            for (var i = 0; i < totalNum; i++) {
                offsetsX = Math.floor(Math.random() * 2 * subWidth - subWidth);
                offsetsY = Math.floor(Math.random() * 2 * subHeight - subHeight);
                this.css.call(oDivs[i], {
                    top: offsetsX + "px",
                    left: offsetsX + "px"
                });
            };
            !callback || callback(this);
            return this;
        },

        resize: function() {
            this._render()
        }


    }


    // 工具函数
    // 对象合并
    Division.extend = Division.prototype.extend = function() {
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
        if (typeof target !== "object" && !Division.isFunction(target)) {
            target = {};
        }

        // Extend Division itself if only one argument is passed
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
                    if (deep && copy && (Division.isPlainObject(copy) ||
                            (copyIsArray = Array.isArray(copy)))) {

                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && Array.isArray(src) ? src : [];

                        } else {
                            clone = src && Division.isPlainObject(src) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[name] = Division.extend(deep, clone, copy);

                        // Don't bring in undefined values
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }

        return target;
    }

    Division.extend({
        expando: "Division" + (version + Math.random()).replace(/\D/g, ""),
        isReady: true,
        isFunction: function(obj) {
            return Division.type(obj) === "function";
        },
        type: function(obj) {
            if (obj == null) {
                return obj + "";
            }

            // Support: Android <=2.3 only (functionish RegExp)
            return typeof obj === "object" || typeof obj === "function" ?
                class2type[toString.call(obj)] || "object" :
                typeof obj;
        },
        isPlainObject: function(obj) {
            var proto, Ctor;

            // Detect obvious negatives
            // Use toString instead of Division.type to catch host objects
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
        merge: function(o, n, override) {
            for (var key in n) {
                if (n.hasOwnProperty(key) && (!o.hasOwnProperty(key) || override)) {
                    o[key] = n[key];
                }
            }
            return o;
        },
        fetchComputedStyle: function(obj, property) {
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
        },
        reset: function() {
            for (var i = 0; i < totalNum; i++) {
                oDivs[i].style.top = 0 + "px";
                oDivs[i].style.left = 0 + "px";
            }
        },
        subReset: function() {
            for (var i = 0; i < totalNum; i++) {
                oDivs[i].style.top = 0 + "px";
                oDivs[i].style.left = 0 + "px";
            }
        },
        /* 分裂的触发事件 */
        events: function(callback) {

            el.onmouseenter = () => {
                randomSplit();
            }
            el.onmouseleave = () => {
                Division.reset();

            };
            !callback || callback(this);
            return this;
        },


    })


    // 图片切换效果
    Division.extend({
        effect:function(el){
            var html = document.createElement('div');
            html.className = "one";
            var html2 = document.createElement('div')
            html2.className = "two";
            el.appendChild(html);
            el.appendChild(html2)
        }
    })

    

    Division.on = Division.prototype.on = function(callback) {
        callback && callback(this)
    }


    var randomSplit = (callback) => {
        for (var i = 0; i < totalNum; i++) {
            offsetsX = Math.floor(Math.random() * 2 * subWidth - subWidth);
            offsetsY = Math.floor(Math.random() * 2 * subHeight - subHeight);
            oDivs[i].style.top = offsetsX + "px";
            oDivs[i].style.left = offsetsX + "px";
        };
    }

    // 最后将插件对象暴露给全局对象

    if (typeof module !== "undefined" && module.exports) {
        module.exports = Division;
    } else
    if (typeof define === "function" && define.amd) {
        define(function() { return Division; });
    } else {
        !('Division' in _global) && (_global.Division = Division);
    }
})(typeof window !== "undefined" ? window : this);