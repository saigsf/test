/*
* @Author: saigsf<qq: 2270029397 email: sai_gsf@163.com>
* @Date:   2017-12-26
* @Last Modified by:   M S I
* @Last Modified time: 2017-12-28
* @Title: 数字滚动
*/

; (function ($) {
  $.fn.numberAnimate = function (setting) {
    var defaults = {
      speed: 1000,//动画速度
      num: null, //初始化值
      iniAnimate: true, //是否要初始化动画效果
      symbol: '',//默认的分割符号，千，万，千万
      dot: 0, //保留几位小数点
      isTime: false
    }
    //如果setting为空，就取default的值
    var setting = $.extend(defaults, setting);

    //如果对象有多个，提示出错
    if ($(this).length > 1) {
      alert("just only one obj!");
      return;
    }

    //如果未设置初始化值。提示出错
    if (!setting.num) {
      alert("must set a num!");
      return;
    }
    var nHtml = '<div class="mt-number-animate-dom" data-num="{{num}}">\
            <span class="mt-number-animate-span">0</span>\
            <span class="mt-number-animate-span">1</span>\
            <span class="mt-number-animate-span">2</span>\
            <span class="mt-number-animate-span">3</span>\
            <span class="mt-number-animate-span">4</span>\
            <span class="mt-number-animate-span">5</span>\
            <span class="mt-number-animate-span">6</span>\
            <span class="mt-number-animate-span">7</span>\
            <span class="mt-number-animate-span">8</span>\
            <span class="mt-number-animate-span">9</span>\
            <span class="mt-number-animate-span">.</span>\
          </div>';

    //数字处理
    var numToArr = function (num) {
      // console.log(setting.isTime)
      num = setting.isTime ? secondFormat(num) : parseFloat(num).toFixed(setting.dot);

      if (typeof (num) == 'number') {
        var arrStr = num.toString().split("");
      } else {
        var arrStr = num.split("");
      }
      return arrStr;
    }

    // 时间格式转换
    var secondFormat = function (second) {
      var h = parseInt(second / 60 / 60),
        m = parseInt(second / 60) % 60,
        s = second % 60;

      if (h < 10) {
        h = '0' + h
      }
      if (m < 10) {
        m = '0' + m
      }
      if (s < 10) {
        s = '0' + s
      }
      return '' + h + m + s;

    }

    //设置DOM symbol:分割符号
    var setNumDom = function (arrStr) {
      // console.log(arrStr)
      var shtml = '<div class="mt-number-animate">';
      for (var i = 0, len = arrStr.length; i < len; i++) {
        if (setting.isTime) {
          if (i != 0 && (len - i) % 2 == 0 && setting.symbol != "" && arrStr[i] != ".") {
            shtml += '<div class="mt-number-animate-dot">' + setting.symbol + '</div>' + nHtml.replace("{{num}}", arrStr[i]);
          } else {
            shtml += nHtml.replace("{{num}}", arrStr[i]);
          }
        } else {
          if (i != 0 && (len - i) % 3 == 0 && setting.symbol != "" && arrStr[i] != ".") {
            shtml += '<div class="mt-number-animate-dot">' + setting.symbol + '</div>' + nHtml.replace("{{num}}", arrStr[i]);
          } else {
            shtml += nHtml.replace("{{num}}", arrStr[i]);
          }
        }
      }
      shtml += '</div>';
      return shtml;
    }

    //执行动画
    var runAnimate = function ($parent) {
      $parent.find(".mt-number-animate-dom").each(function () {
        var num = $(this).attr("data-num");
        num = (num == "." ? 10 : num);
        var spanHei = $(this).height() / 11; //11为元素个数
        var thisTop = -num * spanHei + "px";
        // if (thisTop != $(this).css("top")) {
          if (setting.iniAnimate) {
            //HTML5不支持
            if (!window.applicationCache) {
              $(this).animate({
                top: thisTop
              }, setting.speed);
            } else {
              $(this).css({
                'transform': 'translateY(' + thisTop + ')',
                '-ms-transform': 'translateY(' + thisTop + ')',   /* IE 9 */
                '-moz-transform': 'translateY(' + thisTop + ')',  /* Firefox */
                '-webkit-transform': 'translateY(' + thisTop + ')', /* Safari 和 Chrome */
                '-o-transform': 'translateY(' + thisTop + ')',
                '-ms-transition': setting.speed / 1000 + 's',
                '-moz-transition': setting.speed / 1000 + 's',
                '-webkit-transition': setting.speed / 1000 + 's',
                '-o-transition': setting.speed / 1000 + 's',
                'transition': setting.speed / 1000 + 's'
              });
            }
          } else {
            setting.iniAnimate = true;
            $(this).css({
              top: thisTop
            });
          }
        // }else {
        //   console.log('数据不变')
        // }
      });
    }

    //初始化
    var init = function ($parent) {
      // console.log($parent)
      //初始化
      $parent.html(setNumDom(numToArr(setting.num)));
      runAnimate($parent);
    };

    //重置参数
    this.resetData = function (num) {
      var newArr = numToArr(num);
      var $dom = $(this).find(".mt-number-animate-dom");
      // console.log(newArr)
      if ($dom.length < newArr.length) {
        $(this).html(setNumDom(newArr));
      } else {
        var length = $dom.length - newArr.length;
        // console.log(length)
        for (let i = 0; i < length; i++) {
          newArr.unshift('0');
        }
        // console.log(newArr)
        $dom.each(function (index, el) {
          $(this).attr("data-num", newArr[index]);
        });
      }
      runAnimate($(this));
    }
    //init
    init($(this));
    return this;
  }
})(jQuery);
