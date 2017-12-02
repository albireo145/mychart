var ChartBar = function( name,opts){

    var base = new ChartBase( name,opts);

    /**
     * item [Array]
     * item [0] name text
     * item [1] data per
     * item [2] background color
     */
    $.each(opts.data,function( index, item) {
        console.log(item);

        var line = $('<div class="line">');
        var name = $('<div class="name">')
        var rate = $('<div class="rate">')
        var per = $('<div class="per">')

        var width = item[1]*100 + '%';
        rate.css('width',width)
        var bgStyle = ''
        item[2] && (bgStyle = 'style="background:'+ item[2] +'"');
        rate.html('<div class="rate-bg" ' + bgStyle + ' ></div>')
        name.text( item[0] );
        per.text( width )
        line.append( name ).append(rate).append( per ); 
        base.append(line);
    });
    return base;
}