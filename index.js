var closeSideNav = false

$(document).ready(function () {
    toggleNavAndContent();

    // sideNavCollapse();
    $(window).scroll(function () {
        sideNavOnScroll();
    });

    $('.collapse-btn').click(function (){
        // sideNavCollapse();
        closeSideNav = true
        toggleNavAndContent(true);
    })
});

function sideNavOnScroll(){
    let sideNav = $('#side-nav');
    let sideContent = $('#side-content');
    let sideContentDistTop = sideContent.offset().top - $(window).scrollTop();


    if(0 < sideContentDistTop && sideContentDistTop < $(window).height() * 0.25 && ! closeSideNav && ! sideNav.is(':visible')){
        toggleNavAndContent();
    }

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

function toggleContent(){
    console.log('content')
    let sideContent = $('#side-content');
    sideContent.toggleClass('col-9');
    sideContent.toggleClass('col-12');
}

function toggleNav(){
    console.log('nav', closeSideNav)
    let sideNav = $('#side-nav');
    sideNav.toggle('col-3')
}

function toggleNavAndContent(delayContent=false){
    toggleNav();
    if (delayContent){
        setTimeout(toggleContent, 500);
    }
    else{
        toggleContent();
    }
}