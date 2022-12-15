$(document).ready(function () {
    // sideNavCollapse();
    $(window).scroll(function () {
        sideNavOnScroll();
    });
    // add tool tips on image
    $('[data-toggle="tooltip"]').tooltip();

    $(window).on('load', function (){
        $('.loader-wrapper').slideUp('slow')
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