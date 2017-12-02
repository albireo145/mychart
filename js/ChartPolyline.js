var ChartPolyline = function (name, opts) {
    var base = new ChartBase(name, opts);

    /**
     * 绘制网格线
     */
    var w;
    var h;
    if (typeof (opts.width) == 'string') {
        w = $(window).width() * (parseInt(opts.width) / 100);
        h = $(window).height() * (parseInt(opts.height) / 100);
    }
    else if (typeof (opts.width) == 'number') {
        w = opts.width;
        h = opts.height;
    }
    // 加入网格层
    var canvas = document.createElement('canvas')
    var ctx = canvas.getContext('2d');
    base.append(canvas);

    canvas.width = w;
    canvas.height = h;

    /**水平线数量 */
    var step = 10;
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#aaa';


    for (var i = 0; i < step + 1; i++) {
        var y = (h / step) * i
        ctx.moveTo(0, y)
        ctx.lineTo(w, y);
        ctx.stroke();
    }

    /**垂直线数量 */

    step = opts.data.length + 1;
    var text_w = w / step >> 0;

    for (var i = 0; i < step + 1; i++) {
        var x = (w / step) * i
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h);
        if (opts.data[i]) {
            var textdom = $('<div class="text">')
            var text = opts.data[i][0];
            textdom.css('width', text_w);
            textdom.css('left', text_w * i + text_w)
            textdom.text(text);
            base.append(textdom);
        }
    }
    ctx.stroke();


    /**绘制折线数据 */
    // 加入折线层
    var canvas = document.createElement('canvas')
    var ctx = canvas.getContext('2d');
    base.append(canvas);


    canvas.width = w;
    canvas.height = h;



    /**
     * 绘制折线 数据 阴影
     * @param {*} per 0-1 绘制状态百分比
     */
    function draw( per ) {
        // 清空画布
        ctx.clearRect(0,0,w,h)

        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#ff8888';

        step = opts.data.length;

        var x = 0;
        var y = 0;
        // ctx.moveTo(10,10);
        // ctx.arc(10,10,5,0,2*Math.PI)
        var row_w = (w / (step + 1))
        for (var i = 0; i < step; i++) {
            var item = opts.data[i];
            x = row_w * (i + 1)
            y = h - item[1] * h  * per;
            ctx.moveTo(x, y);
            ctx.arc(x, y, 5, 0, 2 * Math.PI)
        }

        // 移动画笔到第一个点
        ctx.moveTo(row_w, h - opts.data[0][1] * h * per)

        for (var i = 0; i < step; i++) {
            var item = opts.data[i];
            x = row_w * (i + 1)
            y = h - item[1] * h  * per;
            ctx.lineTo(x, y);
        }
        // 绘制阴影
        ctx.stroke();
        ctx.strokeStyle = "rgba(0,0,0,0)"
        ctx.lineTo(x, h);
        ctx.lineTo(row_w, h);
        ctx.fillStyle = 'rgba(255,118,118,0.25)'
        ctx.fill();

        // 绘制文字
        for (var i = 0; i < step; i++) {
            var item = opts.data[i];
            x = row_w * (i + 1)
            y = h - item[1] * h * per;
            ctx.fillStyle = item[2] ? item[2] : '#111'
            ctx.fillText((item[1] * 100 >> 0) + "%", x - 10, y - 10)
        }

        ctx.stroke();
    }

    
    base.on('onLoad', function () {
        // 折线生长动画
        var s = 0
        for( i=0;i<100;i++){
            setTimeout(function(){
                s+=.01;
                draw(s);
            },i*10)
        }
    })

    base.on('onLeave', function () {
        // 折线退场动画
        var s = 1
        for( i=0;i<100;i++){
            setTimeout(function(){
                s-=.01;
                draw(s);
            },i*10)
        }
    })
    return base;
}