window.onload = function() {
    window.initdefault();
    var d = new Division({
        el: document.getElementsByClassName("container")[0],
        rows: 7,
        cols: 7,
        isEvents: true,
        isEventsSub: true
    });
    window.onresize = function() {
        window.initdefault();
        d.init();
    }

    console.log(d)

    // var reset = document.getElementsByClassName("reset")[0];
    var change = document.getElementsByClassName("change")[0];
    // var url = document.getElementsByClassName("url")[0];
    // var ok = document.getElementsByClassName("ok")[0];
    var img = document.getElementsByTagName("img")[0];
    // console.log(reset, change, url, ok, img)


    var imgURL = ['./src/img/1490073118356.jpg',
        './src/img/1490338321679.jpg',
        'http://img05.tooopen.com/images/20140404/sy_58241958989.jpg',
        'http://pic4.nipic.com/20091217/3885730_124701000519_2.jpg'
    ];
    var index = 0;
    change.onclick = function() {
        index++;
        if (index >= imgURL.length) {
            index = 0;
        }
        d.changeBgimg(imgURL[index]);
        img.src = imgURL[index];

    }








}