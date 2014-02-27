/*

    @TODO: Save settings to cookies
    @TODO: Add hash tag links
    @TODO: Allow imgur ids as images

*/

(function($) {

    // Technically "ready" isn't needed, but it I'll get round it later
    $(document).ready(function() {

        var $path = $('#path'),
            $slices = $('#slices');

        $(this).on('mousemove', function(e)
        {
            // @TODO: Figure out why cached selector doesn't work
            if (K.mouseControl === true)
                $('#kContainer .ksc').css({backgroundPositionX: e.pageX+"px"});
        });

        $path.on('change keyup', function() {
            K.changeBackground($path.val());
        });

        $slices.on('change keyup', function() {
            K.generateLayout($slices.val());
            K.changeBackground($path.val());
        });

        $(window).on('resize', function() {
            K.resizeCanvas();
        });

        $('#toggleControls').on('click', function() {
            $('#controls').toggleClass('hidden');
        });

        // Click to animate, click again to stop
        $('#kContainer').on('click', function() {
            K.toggleMouse();
        });

        K.init();

    });

})(jQuery);

var K = {

    mouseControl: true,

    init : function()
    {
        this.resizeCanvas();
        this.generateLayout(14);
    },

    toggleMouse: function() {
        this.mouseControl = this.mouseControl === false;
    },

    // Resize kaleidoscope to fit the window
    resizeCanvas : function ()
    {
        var maxHeight = $(window).height(),
            maxWidth = $(window).width();
        //noinspection JSSuspiciousNameCombination
        $('#kContainer').css({
            height : maxWidth, // it's a circle shape, height is width
            top : maxWidth / 2 * -1 + (maxHeight / 2)
        });
        $('#kWrapper').css({
            height: maxHeight
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