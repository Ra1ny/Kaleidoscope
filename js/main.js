/*

@TODO: Save settings to cookies
@TODO: Switch to angular?
@TODO: Add bootstrap
@TODO: Add ability to hide control panel
@TODO: Format control panel properly, add labels

 */

(function($) {

    $(document).ready(function() {

        $(this).on('mousemove', function(e)
        {
            if (K.animated === false)
                $(".kal_cont .ksc").css({backgroundPosition: e.pageX+"px "+e.pageY+"px"});
        });

        var $path = $('#path'),
            $slices = $('#slices');

        K.resizeCanvas();
        K.generateLayout($slices.val());

        $path.on('change', function() {
            K.changeBackground($(this).val());
        });

        $slices.on('change', function() {
            K.generateLayout($(this).val());
        });

        $(window).on('resize', function() {
            K.resizeCanvas();
        });

        // Click to animate, click again to stop
        $(this).on('click', function(e) {

            if (K.animated === false) {
                K.animated = true;
                $(".kal_cont .ksc").animate({
                    'backgroundPositionX': '+=2500',
                    'backgroundPositionY': '+=500'
                }, {
                    duration: 60000,
                    easing: 'linear',
                    done: function() {
                        K.animated = false;
                    }
                });
            } else {
                $(".kal_cont .ksc").stop();
                K.animated = false;
            }
        });

    });

})(jQuery);

var K = {};
K.animated = false;

// Resize kaleidoscope to fit the window
K.resizeCanvas = function ()
{
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