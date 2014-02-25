$(document).ready(function() {

    $(this).on('mousemove', function(e) {
        $(".kal_cont .ksc").css({backgroundPosition: e.pageX+"px "+e.pageY+"px"});
    });

    K.resizeCanvas();
    K.changeBackground($('#path').val());
    K.generateLayout(20);

    $('#path').on('change', function() {
        K.changeBackground($(this).val());
    });

    $(window).on('resize', function() {
        K.resizeCanvas();
    });
});

var K = {};

// Resize kaleidoscope to fit the window
K.resizeCanvas = function () {
    var maxHeight = $(window).height();
    $('.kal_main').height(maxHeight);
}

// Change background image
K.changeBackground = function(path)
{
    $('.kal_cont .ksc').css({"background-image": 'url('+path+')'});
}

// Generate kaleidoscope layout with number of "slices"
K.generateLayout = function(numberOfElements)
{
    var html = [],
        degreeOffset = 360 / (numberOfElements*2);

    for (var x=1; x <= numberOfElements*2; x++)
    {
        var elClass = (x%2==0) ? 'even' : 'odd',
            rotate = degreeOffset * (x - (x%2) - 1),
            classes = ['ks', 'kSlice', elClass, 's'+x];

        var elStyle = '-webkit-transform: rotateZ('+rotate+'deg)';

        // HTML generation
        html.push('<div class="'+classes.join(" ")+'" style="'+elStyle+'"><div class="ksc"></div></div>');
    }

    // Populate the container
    document.getElementById('kContainer').innerHTML = html.join('');

    // Adding mirror effect to every other slice
    $('.ks.even').each(function() {
        var style = $(this).attr('style');
        $(this).attr('style', style + ' matrix(-1, 0, 0, 1, 0, 0)');
    });

    // Move slices into correct positions
    $('.kal_cont .ksc').css({'-webkit-transform' : 'rotateZ('+degreeOffset+'deg)'});
}