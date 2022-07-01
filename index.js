$(document).ready(function (){
    $(window).scroll(function (){
        let sideNav = $('#side-nav');
        let sideContent = $('#side-content')
        let sideContentDistTop = sideContent.offset().top - $(window).scrollTop();
        if (sideContentDistTop <= 0){
            sideNav.addClass('fixed-top');
            sideNav.addClass('side-nav-fixed-top');
            sideContent.addClass('offset-3')
        }
        else{
            sideNav.removeClass('fixed-top');
            sideNav.removeClass('side-nav-fixed-top');
            sideContent.removeClass('offset-3')
        }
        console.log(sideContentDistTop);
    });
});