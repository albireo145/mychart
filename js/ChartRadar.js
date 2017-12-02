// 雷达图
var ChartRadar = function (name, opts) {
    var base = new ChartBase(name, opts);

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
    // 绘制网格层 分层绘制
    var canvas = document.createElement('canvas')
    var ctx = canvas.getContext('2d');
    base.append(canvas);

    canvas.width = w;
    canvas.height = h;


    var r = w > h ? h / 2 : w / 2;

    // ctx.beginPath();
    // ctx.arc(r, r, 5, 0, 2 * Math.PI);
    // ctx.stroke();

    // ctx.beginPath();
    // ctx.arc(r, r, r, 0, 2 * Math.PI);
    // ctx.stroke();

    var step = opts.data.length
    /**计算多边形顶点坐标 
     * 
     * 已知圆心坐标(a,b)、半径r、角度deg。
     * rad = (2*Math.PI / 360 ) * ( 360 / step)
     * x = a + Math.sin( rad ) * r;
     * y = b + Math.cos( rad ) * r;
    */
    for (var s = 10; s > 0; s--) {

        ctx.beginPath();
        for (var i = 0; i < step; i++) {
            var rad = (2 * Math.PI / 360) * (360 / step) * i
            var x = r + Math.sin(rad) * r * s / 10;
            var y = r + Math.cos(rad) * r * s / 10;
            ctx.lineTo(x, y);

        }
        ctx.closePath();
        ctx.fillStyle = s%2 == 0 ? '#99c0ff' : '#f1f9ff'
        ctx.fill();
    }

    // 绘制伞骨
    for (var index = 0; index < step; index++) {
        var rad = (2 * Math.PI / 360) * (360 / step) * index
        var x = r + Math.sin(rad) * r ;
        var y = r + Math.cos(rad) * r ;
        ctx.moveTo(r,r);
        ctx.lineTo(x,y);
        var textdom = $('<div class="text">')
        var text = opts.data[index][0];
        // textdom.css('left',x)
        // textdom.css('top',y)
        if ( x > w/2 ){
            textdom.css('left', x)
        }else{
            textdom.css('right', w - x)
        }
        if ( y > h/2 ){
            textdom.css('top', y)
        }else{
            textdom.css('bottom', h - y )
        }
        textdom.css('transition-delay', index*0.1+'s')
        textdom.css('opacity',0)
        textdom.text(text);
        base.append(textdom);
    }
    ctx.strokeStyle = "#e0e0e0";
    ctx.stroke();

    // 加入数据层
    var canvas = document.createElement('canvas')
    var ctx = canvas.getContext('2d');
    base.append(canvas);

    canvas.width = w;
    canvas.height = h;
    /**
     * 绘制数据
     * @param {*} per 0-1 绘制状态百分比
     */
    function draw(per) {

        if(per <=1){
            base.find('.text').css('opacity',0)
        }
        if(per >=1){
            base.find('.text').css('opacity',1)
        }
        // 清空画布
        ctx.clearRect(0, 0, w, h)
        // 输出数据折线
        ctx.beginPath();
        ctx.strokeStyle = "#f00"
        for(var i = 0; i < step;i++){
            var rad = (2 * Math.PI / 360) * (360 / step) * i
            var rate = opts.data[i][1] * per;
            var x = r + Math.sin(rad) * r * rate;
            var y = r + Math.cos(rad) * r * rate;
            ctx.lineTo(x,y);
        }
        ctx.closePath();
        ctx.stroke();

        // 输出数据的点 
        ctx.fillStyle = "#ff7676"
        for(var i = 0; i < step;i++){
            var rad = (2 * Math.PI / 360) * (360 / step) * i
            var rate = opts.data[i][1] * per;
            var x = r + Math.sin(rad) * r * rate;
            var y = r + Math.cos(rad) * r * rate;
            ctx.beginPath();
            ctx.arc(x,y,5,0,2*Math.PI)
            ctx.fill();
            ctx.closePath();
        }
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