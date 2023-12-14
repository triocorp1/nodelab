/*--------------------------
    Project Name: Provetta
    Version: 1.0
    Author: 7oorof
    Relase Date: Deceber 2022
---------------------------*/
/*---------------------------
      Table of Contents
    --------------------
    01- Pre Loading
    02- Mobile Menu
    03- Sticky Navbar
    04- Scroll Top Button
    05- Set Background-img to section 
    06- Add active class to accordions
    07- Open and Close Popup
    08- Increase and Decrease Input Value
    09- Load More Items
    10- Contact Form validation
    11- Slick Carousel
    12- Popup Video
    13- NiceSelect Plugin
    14- Range Slider
    15- image zoom
    16- counterUp
    17- portfolio Filtering and Sorting
      
 ----------------------------*/

$(function () {

    "use strict";

    // Global variables
    var $win = $(window);

    /*==========  Pre Loading   ==========*/
    setTimeout(function () {
        $(".preloader").remove();
    }, 0);

    /*==========   Mobile Menu   ==========*/
    $('.navbar-toggler').on('click', function () {
        $('.navbar-collapse').addClass('menu-opened');
    })

    $('.close-mobile-menu').on('click', function (e) {
        $('.navbar-collapse').removeClass('menu-opened');
    });

    /*==========   Sticky Navbar   ==========*/
    $win.on('scroll', function () {
        if ($win.width() >= 992) {
            var $stickyNavbar = $('.sticky-navbar');
            if ($win.scrollTop() > 150) {
                $stickyNavbar.addClass('is-sticky');
            } else {
                $stickyNavbar.removeClass('is-sticky');
            }
        }
    });

    /*==========   Scroll Top Button   ==========*/
    var $scrollTopBtn = $('#scrollTopBtn');
    // Show Scroll Top Button
    $win.on('scroll', function () {
        if ($(this).scrollTop() > 700) {
            $scrollTopBtn.addClass('actived');
        } else {
            $scrollTopBtn.removeClass('actived');
        }
    });
    // Animate Body after Clicking on Scroll Top Button
    $scrollTopBtn.on('click', function () {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });

    /*==========   Set Background-img to section   ==========*/
    $('.bg-img').each(function () {
        var imgSrc = $(this).children('img').attr('src');
        $(this).parent().css({
            'background-image': 'url(' + imgSrc + ')',
            'background-size': 'cover',
            'background-position': 'center',
        });
        $(this).parent().addClass('bg-img');
        if ($(this).hasClass('background-size-auto')) {
            $(this).parent().addClass('background-size-auto');
        }
        $(this).remove();
    });

    /*==========   Add active class to accordions   ==========*/
    $('.accordion-header').on('click', function () {
        $(this).parent('.accordion-item').toggleClass('opened');
        $(this).parent('.accordion-item').siblings().removeClass('opened');
    })
    $('.accordion-title').on('click', function (e) {
        e.preventDefault()
    });

    /*==========  Open and Close Popup   ==========*/
    // open Mini Popup
    function openMiniPopup(popupTriggerBtn, popup, cssClass) {
        $(popupTriggerBtn).on('click', function (e) {
            e.preventDefault();
            $(this).toggleClass(cssClass);
            $(popup).toggleClass(cssClass);
        });
    }
    // open Popup
    function openPopup(popupTriggerBtn, popup, addedClass, removedClass) {
        $(popupTriggerBtn).on('click', function (e) {
            e.preventDefault();
            $(popup).toggleClass(addedClass, removedClass).removeClass(removedClass);
        });
    }
    // Close Popup
    function closePopup(closeBtn, popup, addedClass, removedClass) {
        $(closeBtn).on('click', function () {
            $(popup).removeClass(addedClass).addClass(removedClass);
        });
    }
    // close popup when clicking on an other place on the Document
    function closePopupFromOutside(popup, stopPropogationElement, popupTriggerBtn, removedClass, addedClass) {
        $(document).on('mouseup', function (e) {
            if (!$(stopPropogationElement).is(e.target) && !$(popupTriggerBtn).is(e.target) && $(stopPropogationElement).has(e.target).length === 0 && $(popup).has(e.target).length === 0) {
                $(popup).removeClass(removedClass).addClass(addedClass);
            }
        });
    }
    openMiniPopup('#miniPopup-departments-trigger-icon', '#miniPopup-departments', 'active') // Open miniPopup-language

    openPopup('.action-btn-search', '.search-popup', 'active', 'inActive') // Open sidenav popup
    closePopup('.search-popup-close', '.search-popup', 'active', 'inActive') // Close sidenav popup
    openPopup('.action-btn-cart', '.cart-minipopup', 'active', 'inActive') // Open Search popup
    closePopupFromOutside('.cart-minipopup', '.cart-minipopup', '.action-btn-cart', 'active');  // close popup when clicking on an other place on the Document

    /*==========   Increase and Decrease Input Value   ==========*/
    // Increase Value
    $('.increase-qty').on('click', function () {
        var $qty = $(this).parent().find('.qty-input');
        var currentVal = parseInt($qty.val());
        if (!isNaN(currentVal)) {
            $qty.val(currentVal + 1);
        }
    });
    // Decrease Value
    $('.decrease-qty').on('click', function () {
        var $qty = $(this).parent().find('.qty-input');
        var currentVal = parseInt($qty.val());
        if (!isNaN(currentVal) && currentVal > 1) {
            $qty.val(currentVal - 1);
        }
    });
    /*==========   Load More Items  ==========*/
    function loadMore(loadMoreBtn, loadedItem) {
        $(loadMoreBtn).on('click', function (e) {
            e.preventDefault();
            $(this).fadeOut();
            $(loadedItem).fadeIn();
        })
    }
    loadMore('#loadMoreTestimonials', '.testimonial-hidden > .testimonial-item');

    /*==========  Contact Form validation  ==========*/
    var contactForm = $("#contactForm"),
        contactResult = $('.contact-result');
    contactForm.validate({
        debug: false,
        submitHandler: function (contactForm) {
            $(contactResult, contactForm).html('Please Wait...');
            $.ajax({
                type: "POST",
                url: "assets/php/contact.php",
                data: $(contactForm).serialize(),
                timeout: 20000,
                success: function (msg) {
                    $(contactResult, contactForm).html('<div class="alert alert-success" role="alert"><strong>Thank you. We will contact you shortly.</strong></div>').delay(3000).fadeOut(2000);
                },
                error: $('.thanks').show()
            });
            return false;
        }
    });

    /*==========   Slick Carousel ==========*/
    $('.slick-carousel').slick();

    $('.slider-has-navs').slick({
        autoplay: false,
        slidesToScroll: 1,
        slidesToShow: 1,
        arrows: true,
        dots: false,
        asNavFor: '.slider-nav-thumbnails',
    });

    $('.slider-nav-thumbnails').slick({
        autoplay: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        asNavFor: '.slider-has-navs',
        dots: true,
        focusOnSelect: true,
        variableWidth: true
    });

    /*==========  Popup Video  ==========*/
    $('.popup-video').magnificPopup({
        mainClass: 'mfp-fade',
        removalDelay: 0,
        preloader: false,
        fixedContentPos: false,
        type: 'iframe',
        iframe: {
            markup: '<div class="mfp-iframe-scaler">' +
                '<div class="mfp-close"></div>' +
                '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                '</div>',
            patterns: {
                youtube: {
                    index: 'youtube.com/',
                    id: 'v=',
                    src: '//www.youtube.com/embed/%id%?autoplay=1'
                }
            },
            srcAction: 'iframe_src',
        }
    });
    $('.popup-gallery-item').magnificPopup({
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1]
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
        }
    });

    /*==========  NiceSelect Plugin  ==========*/
    $('select').niceSelect();

    /*==========   Range Slider  ==========*/
    var $rangeSlider = $("#rangeSlider"),
        $rangeSliderResult = $("#rangeSliderResult");
    $rangeSlider.slider({
        range: true,
        min: 0,
        max: 300,
        values: [50, 200],
        slide: function (event, ui) {
            $rangeSliderResult.val("$" + ui.values[0] + " - $" + ui.values[1]);
        }
    });
    $rangeSliderResult.val("$" + $rangeSlider.slider("values", 0) + " - $" + $rangeSlider.slider("values", 1));

    /*==========  image zoom  ==========*/
    // [Zoom Effect on Hovering]
    $(".zoomin").imagezoomsl();


    /*==========   counterUp  ==========*/
    $(".counter").counterUp({
        delay: 10,
        time: 4000
    });

    /*========== portfolio Filtering and Sorting  ==========*/
    $("#filtered-items").mixItUp();
    $(".list-filter .filter").on("click", function (e) {
        e.preventDefault();
    });

});