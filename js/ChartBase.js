var ChartBase = function(name,opts){
     
    var component = $('<div class="mychart_component">');
    var clz = 'mychart_' + opts.type
    component.addClass(clz);

    opts.width && component.width(opts.width);
    opts.height && component.height(opts.height);
    component.css(opts.css);
    component.text(name);

    component.on('onLeave',function(){
        component.removeClass(clz+'_in');
        component.addClass(clz+'_out');
        console.log(opts.type + 'leave');
        opts.animateOut && component.animate(opts.animateOut);
        return false;
    })
    component.on('onLoad',function(){
        component.removeClass(clz+'_out');
        component.addClass(clz+'_in');
        opts.animateIn && component.animate(opts.animateIn);
        return false;
    })

    return component;

}