/*

    @TODO: Save settings to cookies
    @TODO: Switch to angular?
    @TODO: Add hash tag links
    @TODO: Concept - Animation speed varies the further mouse pointer is from centre OR
    @TODO: Concept - Animation speed varies with scroll wheel (Check solutions for mobiles as well)
    @TODO: Concept - Constant animation, alter X position with scroll wheel and/or arrow keys and/or controls

*/

(function($) {

    // Technically "ready" isn't needed, but it I'll get round it later
    $(document).ready(function() {

        $(this).on('mousemove', function(e)
        {
            if (K.animated === false)
                $(".kal_cont .ksc").css({backgroundPositionX: e.pageX+"px"});
        });

        var $path = $('#path'),
            $slices = $('#slices');

        $path.on('change', function() {
            K.changeBackground($path.val());
        });

        $slices.on('change', function() {
            K.generateLayout($slices.val());
            K.changeBackground($path.val());
            K.restartAnimation();
        });

        $(window).on('resize', function() {
            K.resizeCanvas();
        });

        $('#toggleControls').on('click', function() {
            $('#controls').toggleClass('hidden');
        });

        // Click to animate, click again to stop
        $('#kContainer').on('click', function(e) {
            K.toggleAnimation();
        });

        $('#reverse').on('click', function() {
            K.toggleDirection();
            K.restartAnimation();
        });

        K.init();

    });

})(jQuery);

var K = {

    animated: false,
    animation: {
        direction : '+=',
        speed : '300000'
    },

    init : function()
    {
        this.resizeCanvas();
        this.generateLayout(14);
        this.restartAnimation();
    },

    toggleDirection: function()
    {
        if (K.animation.direction === '+=') {
            K.animation.direction = '-=';
        } else {
            K.animation.direction = '+=';
        }
    },

    toggleAnimation: function()
    {
        if (K.animated === false) {
            K.restartAnimation();
        } else {
            K.stopAnimation();
        }
    },

    restartAnimation : function()
    {
        K.stopAnimation();

        if (K.animated === false) {
            K.animated = true;
            $(".kal_cont .ksc").animate({
                'backgroundPositionY': K.animation.direction + K.animation.speed
            }, {
                duration: 7500000, // or (K.animation.speed * 25) for a constant speed
                easing: 'linear',
                done: function() {
                    K.animated = false;
                }
            });
        }
    },

    stopAnimation : function() {
        $(".kal_cont .ksc").stop();
        K.animated = false;
    },

    // Resize kaleidoscope to fit the window
    resizeCanvas : function ()
    {
        var maxHeight = $(window).height(),
            maxWidth = $(window).width();
        $('.kal_cont').css({
            height : maxWidth,
            top : maxWidth / 2 * -1 + (maxHeight / 2)
        });
    },

    // Change background image
    changeBackground : function(path)
    {
        $('.kal_cont .ksc').css({"background-image": 'url('+path+')'});
    },

    // Generate kaleidoscope layout with number of "slices"
    generateLayout : function(numberOfElements)
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
};