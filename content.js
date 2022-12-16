let timeout = false

setTimeout(function (){
    $('.loader-wrapper').slideUp('slow')
    timeout = true
}, 3600)

$(document).ready(function () {
    // sideNavCollapse();
    $(window).scroll(function () {
        sideNavOnScroll();
    });
    // add tool tips on image
    $('[data-toggle="tooltip"]').tooltip();

    $(window).on('load', function (){
        $('.loader-wrapper').slideUp('slow')
        if (timeout){
            window.scrollTo(0, 0)
        }
    })
});

function sideNavOnScroll(){
    let sideNav = $('#side-nav');
    let sideContent = $('#side-content');
    let sideContentDistTop = sideContent.offset().top - $(window).scrollTop();

    // fix the side navbar on the top
    if (sideContentDistTop <= 0){
        sideNav.addClass('fixed-top');
        sideNav.addClass('side-nav-fixed-top');
        if (sideNav.is(':visible')){
            sideContent.addClass('offset-3')
        }
    }
    else{
        sideNav.removeClass('fixed-top');
        sideNav.removeClass('side-nav-fixed-top');
        if (sideNav.is(':visible')){
            sideContent.removeClass('offset-3')
        }
    }
}