var MyChart = function(){
    this.id = (('mychart_'+Math.random()).replace('.',''));
    this.el = $('<div class="mychart" id="' + this.id +'">').hide();
    this.page = [];
    $('body').append( this.el );
    /**
     * 新增页
     * @param {string} name 组件名称
     * @param {string} text 页内文本
     * @return {MyChart} MyChart对象
     * 
     */

    this.addPage = function(name,text){
        var page = $('<div class="mychart_page">');
        name && page.addClass('mychart_'+name);
        text && page.text(text);
        page.addClass('section')
        this.el.append( page );
        this.page.push( page );
        return this;
    }

    this.addComponent = function(name,opts){
        opts = $.extend({
            type:'base'
        },opts);
        var page = this.page.slice(-1)[0];

        var component;
        switch(opts.type ){
            case 'base':
                component = new ChartBase(name,opts);
                break;
            case 'bar':
                component = new ChartBar(name,opts);
                break;
            case 'polyline':
                component = new ChartPolyline(name,opts);
                break;
            case 'radar':
                component = new ChartRadar(name,opts);
                break;
            default:
                ;
        }
        page.append(component);
        return this;
    }

    this.loader = function(opts){
        this.el.fullpage({
            onLeave:function( index , nextIndex, direction){
                $(this).find('.mychart_component').trigger("onLeave");
            },
            afterLoad:function( anchorLink , index){
                $(this).find('.mychart_component').trigger("onLoad");
            }
        });
        this.page[0].trigger('onLoad');
        this.el.show(); 
    }

    return this;
}