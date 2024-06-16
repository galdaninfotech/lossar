;(function ($) {
    "use strict";
    var scroll_top;
    var window_height;
    var window_width;
    var scroll_status = '';
    var lastScrollTop = 0;
     
    $( document ).ready( function() {
        window_width = $(window).outerWidth();
        carmelina_events_handler();
        carmelina_header_sticky();
        carmelina_mega_menu_style();
        carmelina_nice_select();
        carmelina_scroll_to_top();
        carmelina_footer_fixed();
        carmelina_pu_tabs();
        carmelina_pu_update_auto_fill();
        carmelina_pu_update_new_promotion();
        carmelina_pu_reservation_accordion();
    });
    
    $(window).on('load', function () {
        if($(document).find('.pxl-loader').length > 0){
            $(".pxl-loader").fadeOut("slow");
        }
    });

    $(window).on('resize', function () {
        window_width = $(window).outerWidth();
        carmelina_mega_menu_style();
        carmelina_footer_fixed();
    });

    $(window).on('scroll', function () {
        scroll_top = $(window).scrollTop();
        window_height = $(window).height();
        window_width = $(window).outerWidth();
        if (scroll_top < lastScrollTop) {
            scroll_status = 'up';
        } else {
            scroll_status = 'down';
        }
        lastScrollTop = scroll_top;
        
        if( window_width <= 600 && $('#wpadminbar').length > 0 ){
            if(scroll_top > 46){
                $('.pxl-hidden-template').css({
                    top: 0,
                    height: '100%'
                });
            }else{
                $('.pxl-hidden-template').css({
                    top: '46px',
                    height: 'calc(100% - 46px)'
                });
            }
        }
        
        carmelina_header_sticky();
        carmelina_scroll_to_top();
    });
   
    function carmelina_events_handler(){
        'use strict';

        $('.main-menu-toggle').on('click', function () {
            $(this).toggleClass('open');
            $(this).parent().find('> .sub-menu').toggleClass('submenu-open');
            $(this).parent().find('> .sub-menu').slideToggle();
        });
       
        $('.pxl-canvas-menu .menu-item-has-children > a').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).closest('.menu-item').toggleClass('active');
            $(this).closest('.menu-item').siblings('.active').toggleClass('active');
            $(this).closest('.menu-item').siblings().find('.submenu-open').toggleClass('submenu-open').slideToggle();
            $(this).siblings('.sub-menu').toggleClass('submenu-open').slideToggle();
        });
        $('.pxl-canvas-menu .menu-item').each(function(index, el) {
            if( $(this).hasClass('current-menu-parent') || $(this).hasClass('current-menu-ancestor') ){
                $(this).addClass('active');
                $(this).find('>.sub-menu').addClass('submenu-open').slideToggle();
            }
        });

        $(document).on('click','.pxl-cart-toggle',function(e){
            e.preventDefault();
            e.stopPropagation();
            var target = $(this).attr('data-target');
            $(this).toggleClass('cliked');
            $(target).toggleClass('open');
            $('.pxl-page-overlay').toggleClass('active');
        });

        $(document).on('click','.pxl-anchor.side-panel',function(e){
            e.preventDefault();
            e.stopPropagation();
            var target = $(this).attr('data-target');
            $(this).toggleClass('cliked');
            $(target).toggleClass('open');
            $('.pxl-page-overlay').toggleClass('active');  
            var attr = $(this).attr('data-form-type');
            if (typeof attr !== 'undefined' && attr == 'login') {
                $('.pxl-register-form').removeClass('active');
                $('.pxl-login-form').addClass('active');
            }
            if (typeof attr !== 'undefined' && attr == 'reg') {
                $('.pxl-login-form').removeClass('active');
                $('.pxl-register-form').addClass('active');
            }
             
        });
 
        $(document).on('click','.pxl-close',function(e){
            e.preventDefault();
            e.stopPropagation();
            $(this).closest('.pxl-hidden-template').toggleClass('open');
            $('.pxl-page-overlay').removeClass('active');
        });

        $(document).on('click',function (e) {
            var target = $(e.target);
            var check = '.pxl-anchor.side-panel, .pxl-anchor-cart.pxl-anchor, .mfp-woosq .mfp-close, .woosw-popup .woosw-popup-close';
            
            if (!(target.is(check)) && target.closest('.pxl-hidden-template').length <= 0 && $('.pxl-page-overlay').hasClass('active')) { 
                $('.pxl-hidden-template').removeClass('open');
                $('.pxl-page-overlay').removeClass('active');
            }
            if (!(target.is('.review-btn-anchor.pxl-anchor')) && target.closest('.pxl-hidden-template-wrap').length <= 0 && $('.pxl-page-overlay').hasClass('active')) { 
                $('.pxl-hidden-template').removeClass('open');
                $('.pxl-page-overlay').removeClass('active');

            }
        });

        $('.pxl-scroll-top').click(function(e) {
            e.preventDefault();
            e.stopPropagation();
            var _target = $(this).attr('data-target');
            $('html, body').stop().animate({ scrollTop: $(_target).offset().top }, 1000);   
        });

        $('.pxl-mobile-menu .is-one-page').on('click', function(e) {
            $(document).trigger('click');
        });

        //* Menu Dropdown back  
        $('.pxl-primary-menu li').each(function () {
            var $submenu = $(this).find('> ul.sub-menu');
            if ($submenu.length == 1) {
                $(this).hover(function () {
                    if ($submenu.offset().left + $submenu.width() > $(window).width()) {
                        $submenu.addClass('back');
                    } else if ($submenu.offset().left < 0) {
                        $submenu.addClass('back');
                    }
                }, function () {
                    $submenu.removeClass('back');
                });
            }
        });
    }
 
    function carmelina_header_sticky() {
        'use strict';
        
        if($(document).find('.pxl-header-sticky').length > 0 && window_width >= 1200){
            var header_height = $('.pxl-header-desktop').outerHeight();
            var header_transparent_height = $('.pxl-header-transparent').outerHeight();

            var offset_top_nimation = (header_height + header_transparent_height);
            if( scroll_status == 'down' && $('.pxl-header').hasClass('sticky-direction-scroll-down') && scroll_top > offset_top_nimation ){
                $(document).find('.pxl-header-sticky').addClass('h-fixed');
            }else if( scroll_status == 'up' && $('.pxl-header').hasClass('sticky-direction-scroll-up') && scroll_top > offset_top_nimation ){
                $(document).find('.pxl-header-sticky').addClass('h-fixed');
            }else{
                $(document).find('.pxl-header-sticky').removeClass('h-fixed');
            } 
            
        } 
        if($(document).find('.pxl-header-main-sticky').length > 0 && window_width >= 1200){
            let tl = gsap.timeline({
                defaults: {
                    duration: 0.2
                }
            });
            var header_height = $('.pxl-header-desktop').outerHeight();
            var main_sticky_height = $('.pxl-header-main-sticky').outerHeight();
            if( scroll_top > (header_height + main_sticky_height) ){    
                if (scroll_status == 'down' && $('.pxl-header').hasClass('sticky-direction-scroll-down') ) {
                    $(document).find('.pxl-header-main-sticky').addClass('h-fixed');
                    tl.to('.pxl-header-main-sticky', {
                        y: 0
                    });
                }else if( scroll_status == 'up' && $('.pxl-header').hasClass('sticky-direction-scroll-up') ){
                    $(document).find('.pxl-header-main-sticky').addClass('h-fixed');
                    tl.to('.pxl-header-main-sticky', {
                        y: 0
                    });
                }else{
                    tl.to('.pxl-header-main-sticky', {
                        y: (main_sticky_height * -1)
                    });
                }
            }else{
                $(document).find('.pxl-header-main-sticky').removeClass('h-fixed');
                tl.to('.pxl-header-main-sticky', {
                    y: 0
                });
            }
        } 


        if ( $(document).find('.pxl-header-mobile-sticky').length > 0 && window_width < 1200  ) {
            var offset_top = $('.pxl-header-mobile').outerHeight();
            offset_top = $('.pxl-header-mobile-transparent').length > 0 ? (offset_top + $('.pxl-header-mobile-transparent').outerHeight()) : offset_top;
            if (scroll_status == 'down' && $('.pxl-header').hasClass('sticky-direction-scroll-down') && scroll_top > offset_top) {
                $(document).find('.pxl-header-mobile-sticky').addClass('mh-fixed');
            }else if (scroll_status == 'up' && $('.pxl-header').hasClass('sticky-direction-scroll-up') && scroll_top > offset_top) {
                $(document).find('.pxl-header-mobile-sticky').addClass('mh-fixed');
            }else{
                $(document).find('.pxl-header-mobile-sticky').removeClass('mh-fixed');
            }
        }
        if ( $(document).find('.pxl-header-mobile-main-sticky').length > 0 && window_width < 1200  ) {
           
            let timel = gsap.timeline({
                defaults: {
                    duration: 0.2
                }
            });
            var offset_top = $('.pxl-header-mobile').outerHeight();
            var mobile_main_sticky_height = $('.pxl-header-mobile-main-sticky').outerHeight();
            if( scroll_top > (offset_top + mobile_main_sticky_height) ){    
                if (scroll_status == 'down' && $('.pxl-header').hasClass('sticky-direction-scroll-down')) {
                    $(document).find('.pxl-header-mobile-main-sticky').addClass('mh-fixed');
                    timel.to('.pxl-header-mobile-main-sticky', {
                        y: 0
                    });
                }else if( scroll_status == 'up' && $('.pxl-header').hasClass('sticky-direction-scroll-up') ){
                    $(document).find('.pxl-header-mobile-main-sticky').addClass('mh-fixed');
                    timel.to('.pxl-header-mobile-main-sticky', {
                        y: 0
                    });    
                }else{
                    timel.to('.pxl-header-mobile-main-sticky', {
                        y: (mobile_main_sticky_height * -1)
                    });
                }
            }else{
                $(document).find('.pxl-header-mobile-main-sticky').removeClass('mh-fixed');
                timel.to('.pxl-header-mobile-main-sticky', {
                    y: 0
                });
            }
        } 

        if ( $(document).find('.pxl-header-mobile-transparent-sticky').length > 0 && window_width < 1200  ) {
            let timel = gsap.timeline({
                defaults: {
                    duration: 0.2
                }
            });
            var offset_top = $('.pxl-header-mobile').outerHeight();
            var mobile_main_sticky_height = $('.pxl-header-mobile-transparent-sticky').outerHeight();
            if( scroll_top > (offset_top + mobile_main_sticky_height + 1) ){    
                if (scroll_status == 'down' && $('.pxl-header').hasClass('sticky-direction-scroll-down')) {
                    $(document).find('.pxl-header-mobile-transparent-sticky').addClass('mh-fixed');
                    timel.to('.pxl-header-mobile-transparent-sticky', {
                        y: 0
                    });
                }else if( scroll_status == 'up' && $('.pxl-header').hasClass('sticky-direction-scroll-up') ){
                    $(document).find('.pxl-header-mobile-transparent-sticky').addClass('mh-fixed');
                    timel.to('.pxl-header-mobile-transparent-sticky', {
                        y: 0
                    });     
                }else{
                    timel.to('.pxl-header-mobile-transparent-sticky', {
                        y: (mobile_main_sticky_height * -1)
                    });
                }
            }else{
                $(document).find('.pxl-header-mobile-transparent-sticky').removeClass('mh-fixed');
                timel.to('.pxl-header-mobile-transparent-sticky', {
                    y: 0
                });
            }
        }
    }

    function carmelina_mega_menu_style(){
        if($(document).find('.pxl-mega-menu').length > 0){
            if($(window).outerWidth() < 1200 ){
                $('.pxl-mega-menu').closest("li.pxl-megamenu").css('position', 'relative');    
                $('.pxl-mega-menu').closest(".elementor-widget").css('position', 'relative');    
                $('.pxl-mega-menu').closest(".elementor-container").css('position', 'relative');    
                $('.pxl-mega-menu').closest(".elementor-widget-wrap").css('position', 'relative');    
                $('.pxl-mega-menu').closest(".elementor-column").css('position', 'relative');
            }else{
                $('.pxl-mega-menu').closest("li.pxl-megamenu").css('position', 'static');    
                $('.pxl-mega-menu').closest(".elementor-widget").css('position', 'static');    
                $('.pxl-mega-menu').closest(".elementor-container").css('position', 'static');    
                $('.pxl-mega-menu').closest(".elementor-widget-wrap").css('position', 'static');    
                $('.pxl-mega-menu').closest(".elementor-column").css('position', 'static');
            }
        }
    }

    function carmelina_nice_select(){
        $('select.nice-select').niceSelect();
    }
  
    function carmelina_scroll_to_top() {
        if (scroll_top < window_height) {
            $('.pxl-scroll-top').addClass('off').removeClass('on');
        }
        if (scroll_top > window_height) {
            $('.pxl-scroll-top').addClass('on').removeClass('off');
        }
    }
    function carmelina_footer_fixed() {
        if($('.footer-fixed').length <= 0) return;
        setTimeout(function(){
            var h_footer = $('.pxl-footer-fixed').outerHeight() - 1;
            $('.footer-fixed .pxl-main').css('margin-bottom', h_footer + 'px');
        }, 600);
    }

    function carmelina_pu_tabs(){
        $(document).on('click','.pu-tabs li a', function(e){
            e.preventDefault();
            var tab_target = $(this).attr('data-tab');
            $(this).closest('.pu-tabs').find('li.active').removeClass('active');
            $(this).closest('li').addClass('active');
            $('.pu-profile-tabs .tab-content.active').removeClass('active');
            $(tab_target).toggleClass('active');
        });
    }

    function carmelina_pu_update_auto_fill(){
        $(document).on('click','.auto-fill-info-wrap .pu-switch-input', function(e){
            var data = $(this).closest('form').serialize(); 
            var url = main_data.ajax_url + "?action=update_user_auto_fill&" + data;
            var loading_wrap = $(this).closest('.pu-control-input-wrapper');
            loading_wrap.addClass('loading');
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json',
                success: function(data) {
                    if ( typeof data.success !== "undefined" && data.success === true)  
                        loading_wrap.removeClass('loading');
                }
            }); 
        });
    }
    function carmelina_pu_update_new_promotion(){
        $(document).on('click','.receive-promotions-wrap .pu-switch-input', function(e){
            var data = $(this).closest('form').serialize(); 
            var url = main_data.ajax_url + "?action=update_user_new_promotion&" + data;
            var loading_wrap = $(this).closest('.pu-control-input-wrapper');
            loading_wrap.addClass('loading');
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json',
                success: function(data) {
                    if ( typeof data.success !== "undefined" && data.success === true)  
                        loading_wrap.removeClass('loading');
                }
            }); 
        });
    }

    function carmelina_pu_reservation_accordion(){
        $(document).on('click','.room-user-booked-wrap .ac-heading-toggle', function(e){
            var target = $(this).data("target");
            var parent = $(this).closest(".room-user-booked-wrap");
            var active_items = parent.find(".ac-heading-toggle.active");
            $.each(active_items, function (index, item) {
                var item_target = $(item).data("target");
                if(item_target != target){
                    $(item).removeClass("active");
                    $(item).closest('.booking-item').find('.bk-heading-content-'+item_target).slideUp(400);
                    $(item).closest('.booking-item').find('.bk-content-'+item_target).slideUp(400);
                }
            });
            $(this).toggleClass("active");
            $(this).closest('.booking-item').find('.bk-heading-content-'+target).slideToggle(400);
            $(this).closest('.booking-item').find('.bk-content-'+target).slideToggle(400);
        });
    }
    
    
})(jQuery);
