$(document).ready(function() {

    $(this).mousemove(function(e) {
        $(".kal_cont .ksc").css({backgroundPosition: e.pageX+"px "+e.pageY+"px"});
    });

    resizeCanvas();
    K.changeBackground($('#path').val());

    $('#path').on('change', function() {
        K.changeBackground($(this).val());
    });

    $(window).on('resize', function() {
        resizeCanvas();
    });
});

function resizeCanvas () {
    var maxHeight = $(window).height();
    $('.kal_main').height(maxHeight);
}

var K = {};


K.changeBackground = function(path) {
    $('.kal_cont .ksc').css({"background-image": 'url('+path+')'});
}