/*

    @TODO: Save settings to cookies
    @TODO: Add hash tag links
    @TODO: Allow imgur ids as images
    @TODO: Fix compatibility issues
    @TODO: Add random X change
    @TODO: Add scroll wheel or keys X change
    @TODO: Rotational offset

*/

(function($) {

    var $path = $('#path'),
        $slices = $('#slices');

    $(this).on('mousemove', function(e)
    {
        if (K.mouseControl === true)
            K.$sliceElements.css({backgroundPositionX: e.pageX+"px"});
    });

    $path.on('change keyup', function() {
        K.changeBackground($path.val());
    });

    $path.on('click', function() {
        this.focus();
        this.select()
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

    $('#controls input').on('blur', function() {
        $('#controls').toggleClass('hidden');
    });

    // Click to animate, click again to stop
    $('#kContainer').on('click', function() {
        K.toggleMouse();
    });

    K.init();

})(jQuery);