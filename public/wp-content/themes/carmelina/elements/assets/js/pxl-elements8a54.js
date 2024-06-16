( function( $ ) {
    function carmelina_add_param_to_url( url, key, val ) {
        key = encodeURI( key );
        val = encodeURI( val );

        if ( '' !== val ) {
            var re = new RegExp( "([?&])" + key + "=.*?(&|$)", "i" );
            var separator = url.indexOf( '?' ) !== - 1 ? "&" : "?";

            // Update value if key exist.
            if ( url.match( re ) ) {
                url = url.replace( re, '$1' + key + "=" + val + '$2' );
            } else {
                url += separator + key + '=' + val;
            }
        } else {
            carmelina_remove_param_from_url( url, key );
        }

        return url;
    }

    function carmelina_remove_param_from_url( url, key ) {
        const params = new URLSearchParams( url );
        params.delete( key );
        return url;
    } 
    
    function carmelina_set_scroll_post_list($scope){
        if($scope.find('.pxl-post-list').hasClass('post-list-scroll')){
            var item_num = $('.post-list-scroll').attr('data-scroll-items');
            setTimeout(function(){
                var item_height = $('.grid-item:first-child').outerHeight(); 
                var total_height = parseInt(item_num)*item_height;
                total_height = total_height + ( parseInt(item_num - 1)*50);
                $('.post-list-scroll').css('max-height',total_height);
            }, 300);
        }
    }

    function carmelina_gallery_handler( $scope) {
        $scope.find('.pxl-gallery-grid .pxl-grid-masonry').imagesLoaded(function(){
            if($(document).find('.elementor-editor-active').length > 0){
                let oldHTMLElement = HTMLElement;
                window.HTMLElement = window.parent.HTMLElement;
                $scope.find('.pxl-grid-masonry').each(function () {    
                    var iso = new Isotope(this, {
                        itemSelector: '.grid-item',
                        layoutMode: $(this).closest('.pxl-grid').attr('data-layout-mode'),   
                        fitRows: {
                            gutter: 0
                        },
                        percentPosition: true,
                        masonry: {
                            columnWidth: '.grid-sizer',
                        },
                        containerStyle: null,
                        stagger: 30,
                        sortBy : 'name',
                    });
                });
                window.HTMLElement = oldHTMLElement;
            }else{
                $scope.find('.pxl-grid-masonry').each(function () {    
                    var iso = new Isotope(this, {
                        itemSelector: '.grid-item',
                        layoutMode: $(this).closest('.pxl-grid').attr('data-layout-mode'),   
                        fitRows: {
                            gutter: 0
                        },
                        percentPosition: true,
                        masonry: {
                            columnWidth: '.grid-sizer',
                        },
                        containerStyle: null,
                        stagger: 30,
                        sortBy : 'name',
                    });
                });
            }
        });

        var galleries = $scope.find(".pxl-gallery-grid"),
            data_show = galleries.data('show'),
            data_load = galleries.data('loadmore');
        galleries.find(".grid-item").slice(0, data_show).show();
        galleries.find('.pxl-gallery-load').on('click',  function(e) { // click event for load more
            e.preventDefault();
            galleries.find(".grid-item:hidden").slice(0, data_load).show(100); // select next 10 hidden divs and show them
            if (galleries.find(".grid-item:hidden").length == 0) { // check if any hidden divs still exist
                $(this).closest('.load-more-wrap').hide();
            } 
            setTimeout(function(){
                $scope.find('.pxl-grid-masonry').each(function () {    
                    var iso = new Isotope(this, {
                        itemSelector: '.grid-item',
                        layoutMode: $(this).closest('.pxl-grid').attr('data-layout-mode'),   
                        fitRows: {
                            gutter: 0
                        },
                        percentPosition: true,
                        masonry: {
                            columnWidth: '.grid-sizer',
                        },
                        containerStyle: null,
                        stagger: 30,
                        sortBy : 'name',
                    });
                });
            }, 100);
            
        });
    };
    
    function carmelina_instagram_gallery_handler($scope){
        $scope.find('.pxl-instagram-gallery-grid .pxl-grid-masonry').imagesLoaded(function(){
            if($(document).find('.elementor-editor-active').length > 0){
                let oldHTMLElement = HTMLElement;
                window.HTMLElement = window.parent.HTMLElement;
                $scope.find('.pxl-grid-masonry').each(function () {    
                    var iso = new Isotope(this, {
                        itemSelector: '.grid-item',
                        layoutMode: $(this).closest('.pxl-grid').attr('data-layout-mode'),   
                        fitRows: {
                            gutter: 0
                        },
                        percentPosition: true,
                        masonry: {
                            columnWidth: '.grid-sizer',
                        },
                        containerStyle: null,
                        stagger: 30,
                        sortBy : 'name',
                    });
                });
                window.HTMLElement = oldHTMLElement;
            }else{
                $scope.find('.pxl-grid-masonry').each(function () {    
                    var iso = new Isotope(this, {
                        itemSelector: '.grid-item',
                        layoutMode: $(this).closest('.pxl-grid').attr('data-layout-mode'),   
                        fitRows: {
                            gutter: 0
                        },
                        percentPosition: true,
                        masonry: {
                            columnWidth: '.grid-sizer',
                        },
                        containerStyle: null,
                        stagger: 30,
                        sortBy : 'name',
                    });
                });
            }
        });

        var galleries = $scope.find(".pxl-instagram-gallery-grid"),
            data_show = galleries.data('show'),
            data_load = galleries.data('loadmore');
        galleries.find(".grid-item").slice(0, data_show).show();
        galleries.find('.pxl-gallery-load').on('click',  function(e) { // click event for load more
            e.preventDefault();
            galleries.find(".grid-item:hidden").slice(0, data_load).show(100); // select next 10 hidden divs and show them
            if (galleries.find(".grid-item:hidden").length == 0) { // check if any hidden divs still exist
                $(this).closest('.load-more-wrap').hide();
            } 
            setTimeout(function(){
                $scope.find('.pxl-grid-masonry').each(function () {    
                    var iso = new Isotope(this, {
                        itemSelector: '.grid-item',
                        layoutMode: $(this).closest('.pxl-grid').attr('data-layout-mode'),   
                        fitRows: {
                            gutter: 0
                        },
                        percentPosition: true,
                        masonry: {
                            columnWidth: '.grid-sizer',
                        },
                        containerStyle: null,
                        stagger: 30,
                        sortBy : 'name',
                    });
                });
            }, 100);
            
        });
    }

    function carmelina_accordion_handler($scope){
        $scope.find(".pxl-accordion .ac-title").on("click", function(e){
            e.preventDefault();

            var target = $(this).closest('.ac-item').data("target");
            var parent = $(this).closest(".pxl-accordion");
            var active_items = parent.find(".ac-item.active");
            $.each(active_items, function (index, item) {
                var item_target = $(item).data("target");
                if(item_target != target){
                    $(item).removeClass("active");
                    $(item_target).slideUp(400);
                }
            });
            $(this).closest('.ac-item').toggleClass("active");
            $(target).slideToggle(400);
        });
    }

    function carmelina_fancy_box_handler($scope){
        if (!$scope.hasClass("pxl-svg-animated-true"))
            return;

        gsap.registerPlugin(ScrollTrigger);

        let elementSettings = {};
        const modelCID = $scope.data('model-cid');
        if($scope.hasClass('elementor-element-edit-mode')){
            const settings = elementorFrontend.config.elements.data[modelCID],
                attributes = settings.attributes;
            let type = attributes.widgetType || attributes.elType;

            if (attributes.isInner) {
                type = 'inner-' + type;
            }

            let settingsKeys = elementorFrontend.config.elements.keys[type];

            if (!settingsKeys) {
            settingsKeys = elementorFrontend.config.elements.keys[type] = [];
                jQuery.each(settings.controls, (name, control) => {
                    if (control.frontend_available) {
                        settingsKeys.push(name);
                    }
                });
            }

            jQuery.each(settings.getActiveControls(), function (controlKey) {
                if (-1 !== settingsKeys.indexOf(controlKey)) {
                    let value = attributes[controlKey];

                    if (value.toJSON) {
                        value = value.toJSON();
                    }

                    elementSettings[controlKey] = value;
                }
            });
        }else {
            elementSettings = $scope.data('settings') || {};
        }

        var elemID = $scope.data("id"),
            settings = get_setings_data(elementSettings),
            scrollTrigger = null;
 
        var timeLine = new TimelineMax({
            repeat: 0,
            yoyo: true,
            scrollTrigger: {
                trigger: '.elementor-element-' + elemID,
                toggleActions: "play",
                start: "top 70%",  
            }
        });

        var $paths = $scope.find("path, circle, rect, square, ellipse, polyline, line"),
            lastPathIndex = 0,
            startOrEndPoint = 0;

        $paths.each(function (pathIndex, path) {
            var $path = $(path);
            $path.attr("fill", "transparent");
            pathIndex = 0; 
            lastPathIndex = pathIndex;
            timeLine['from']($path, 1, {
                PaSvgDrawer: (startOrEndPoint || 0) + "% 0",
            }, pathIndex);

        });
          
         
        if (settings.animate_speed)
            timeLine.duration(settings.animate_speed);
        else
            timeLine.duration(8);

         
        $scope.hover(
            function () {
                timeLine.pause(0);
                timeLine.play();
                 
            },
            function () {
                //timeLine.pause();
            } 
        );
    }
    function get_setings_data(items, itemKey) {
        if (itemKey) {
            const keyStack = itemKey.split('.'),
            currentKey = keyStack.splice(0, 1);

            if (!keyStack.length) {
            return items[currentKey];
            }

            if (!items[currentKey]) {
            return;
            }

            return get_setings_data(items[currentKey], keyStack.join('.'));
        }

        return items;
    };

    function carmelina_links_anchor_handler($scope){
        $scope.on('click', '.anchor-yes a', function(e) { 
            var target = $(this).attr('href'); 
            if(target.includes('#')){
                e.preventDefault(); 
                if( $(target).length > 0 ){
                    var offset_top = $(target).offset().top;
                    $('html, body').stop().animate({ scrollTop: offset_top - 80 }, 1200);   
                }
            }
        });
   
    }

    function carmelina_room_price_filter($scope){
        var $price_range = $scope.find(".phb-price-filter");
        $price_range.slider({
            range: "min",
            min: 1,
            max: parseInt($price_range.attr('data-max')),
            value: parseInt($price_range.attr('data-max')),
            slide: function (event, ui) {
                var _p = $price_range.attr('data-price-format').replace('10', ui.value);
                $price_range.parent().find('.price-lbl-val').html(_p);
            },
            change: function (event, ui) {
                $price_range.parent().find('.phb-price-filter-val').val(ui.value);
                $(document).trigger("phb_price_filter_changed",[$scope]);

                var max_price = $scope.find('.phb-price-filter-val').val();
                var href = $scope.find('.current-page-url').val(); 
                href = carmelina_add_param_to_url( href, 'max_price', max_price );  
                carmelina_room_filter_grid_by_price( href );
            }
        });
    }

    function carmelina_room_filter_grid_by_price( url, args = {}){
        
        var $target_scope = $(document).find( '.pxl-post-list.post-room-list' );
        if( $target_scope.length <= 0 ) return false;

        url = decodeURIComponent( url );
        history.pushState( {}, null, url );
        var wg_id = $target_scope.attr('id'); 
        var offset_top = $target_scope.offset().top;
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'html',
            success: function( response ) {   
                var $response = $( response ); 
                $( 'html, body' ).animate( { scrollTop: offset_top - 150 }, 0 );
                
                var $new_items = $response.find( '#'+wg_id+'.post-room-list .pxl-grid-inner .grid-item' );
                var $pagin_response = $response.find( '#'+wg_id+'.post-room-list .pxl-grid-pagination' );
                var $loadmore_response = $response.find( '#'+wg_id+'.post-room-list .pxl-load-more' );

                $target_scope.find('.pxl-grid-inner').html($new_items);
                $target_scope.find(".post-room-list .pxl-grid-pagination").remove();
                $target_scope.find(".post-room-list").append($pagin_response);

                $target_scope.find(".post-room-list .pxl-load-more").remove();
                $target_scope.find(".post-room-list").append($loadmore_response);
                 
                $target_scope.find('.pxl-animate').each(function(){
                    var data = $(this).data('settings');
                    var cur_anm = $(this);
                    setTimeout(function () {  
                        $(cur_anm).removeClass('pxl-invisible').addClass('animated ' + data['animation']);
                    }, data['animation_delay']);

                });
  
            },
            beforeSend: function() {   
                $( 'body' ).removeClass( 'loaded' ).addClass( 'loading' );
            },
            complete: function() {
                $( 'body' ).removeClass( 'loading' ).addClass( 'loaded' ); 
            }
        });
    }

    function carmelina_room_single_tabs_handler($scope){
        $scope.on('click', '.tab-title', function(e) {
            var target = $(this).attr('data-target');
            $(this).closest('.item-title').siblings('.active ').removeClass('active');
            $(this).closest('.item-title').addClass('active');
            $(target).siblings('.active').removeClass('active');
            $(target).addClass('active');
        });
    }

    function carmelina_room_single_calendar($scope){
        $('.ui-datepicker .ui-datepicker-calendar td.unavailable > a').click(function(event){
            event.stopPropagation();
        });
        var $calendars = $scope.find('.pxl-room-datepick-calendar');

        if ( $scope.find('.pxl-room-datepick-calendar').length > 0 ) {
            $calendars.each(function(){  
                $(this).datepicker({
                    //defaultDate: '+1w',
                    minDate: new Date(),
                    //maxDate: "+6m +1w",
                    altFormat: 'M',
                    firstDay: 0,
                    dateFormat: 'mm/dd/yy',
                    monthNames: ['January','February','March','April','May','June', 'July','August','September','October','November','December'],
                    monthNamesShort: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
                    dayNamesMin: ['Su','Mo','Tu','We','Th','Fr', 'Sa'],
                    nextText: 'NEXT',
                    prevText: 'PREV',
                    changeMonth: false,
                    numberOfMonths: 2,
                     
                    onUpdateDatepicker : function() {
                        var calendar_room_type_data = main_data.calendar_room_type_data;
                        if( calendar_room_type_data.length <= 0)
                            return;

                        setTimeout(function() {
                            $(".ui-datepicker-calendar td").each(function(index, el) {
                                var $day_link = $(this).find('a');
                                if( $day_link.length > 0 ){  
                                    var year = $(this).attr('data-year');
                                    var month = parseInt($(this).attr('data-month')) + 1;
                                    if( month < 10) month = '0'+month;
                                    var dayorg = $(this).find('a').attr('data-date'); 
                                    var str_day = ( dayorg < 10) ? '0'+dayorg : dayorg;
                                     
                                    calendar_room_type_data.forEach((item, idx) => {
                                        if( item.year.toString() == year.toString() && item.month.toString() == month.toString() && item.day.toString() == str_day.toString()){
                                            $(this).addClass('unavailable');
                                        }
                                    }); 
                                }  
                            });
                        }, 300)
                    }
                });
            });
        }
    }

    function carmelina_insert_calendar_message() {
        clearTimeout(insertMessage.timer);

        if ($('#ui-datepicker-div .ui-datepicker-calendar').is(':visible'))
            $('#ui-datepicker-div').append('<div>foo</div>');
        else
            insertMessage.timer = setTimeout(insertMessage, 10);
    }

    function carmelina_booking_form_date_range($scope){
        $('.room-booking-form').each(function(index, el) {
            var $this = $(this);
            var rtl = $this.hasClass('isRTL') ? true : false;  
            $this.find('.date-checkin').datepicker({
                //defaultDate: '+1w',
                minDate: 0,
                //altField: '.date-checkin-month',
                altFormat: 'M',
                firstDay: 0,
                dateFormat: 'dd M yy', //mm/dd/yy
                monthNames: ['January','February','March','April','May','June', 'July','August','September','October','November','December'],
                monthNamesShort: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
                dayNamesMin: ['Su','Mo','Tu','We','Th','Fr', 'Sa'],
                nextText: 'NEXT',
                prevText: 'PREV',
                changeMonth: false,
                isRTL: rtl,
                //numberOfMonths: 2,
                beforeShow: function(input, inst) {
                    var rect = input.getBoundingClientRect();
                    var right_pos = $(window).width() - (rect.left + rect.width);
                    if(rect.left > ( $(window).width()/2 )){
                        setTimeout(function () {
                            inst.dpDiv.css({ left: 'auto', right: right_pos });
                        }, 10);
                        
                    }
                    if ($(window).width() < 576) {
                        inst.dpDiv.css({ 'min-width': rect.width});
                        return { numberOfMonths: 1 };
                    } else {
                        return { numberOfMonths: 2 };
                    }
                    
                },
                onClose: function() {   
                    var minDate = $(this).datepicker('getDate');
                    if( minDate != null ){
                        var newMin = new Date(minDate.setDate(minDate.getDate() + 1));
                        $this.find( '.date-checkout' ).datepicker( 'option', 'minDate', newMin );
                    }
                    //carmelina_booking_form_get_nights($this);
                    carmelina_booking_form_render_room_number($this);

                }
            });
            $this.find('.date-checkout').datepicker({
                //defaultDate: '+1w',
                //altField: '.date-checkout-month',
                altFormat: 'M',
                minDate: '+1d',
                monthNames: ['January','February','March','April','May','June', 'July','August','September','October','November','December'],
                monthNamesShort: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
                dayNamesMin: ['Su','Mo','Tu','We','Th','Fr', 'Sa'],
                nextText: 'NEXT',
                prevText: 'PREV',
                changeMonth: false,
                firstDay: 0,
                dateFormat: 'dd M yy', //mm/dd/yy
                isRTL: rtl,
                beforeShow: function(input, inst) {
                    var rect = input.getBoundingClientRect();
                    var right_pos = $(window).width() - (rect.left + rect.width);
                    if(rect.left > ( $(window).width()/2 )){
                        setTimeout(function () {
                            inst.dpDiv.css({ left: 'auto', right: right_pos });
                        }, 10);
                        
                    }
                    if ($(window).width() < 576) {
                        inst.dpDiv.css({ 'min-width': rect.width});
                        return { numberOfMonths: 1 };
                    } else {
                        return { numberOfMonths: 2 };
                    }
                },
                onClose: function() {   
                    carmelina_booking_form_render_room_number($this);
                }
            });
            $this.find('.date-checkin').datepicker('setDate', '+0');
            $this.find('.date-checkout').datepicker('setDate', '+1');
        });
    }

    function carmelina_available_form_date_range($scope){
        var rtl = $scope.find('.pxl-room-check-available-form-wg').hasClass('isRTL') ? true : false;  
        $scope.find('.date-checkin').datepicker({
            minDate: 0,
            altFormat: 'M',
            firstDay: 0,
            dateFormat: 'dd M yy', //mm/dd/yy
            monthNames: ['January','February','March','April','May','June', 'July','August','September','October','November','December'],
            monthNamesShort: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
            dayNamesMin: ['Su','Mo','Tu','We','Th','Fr', 'Sa'],
            nextText: 'NEXT',
            prevText: 'PREV',
            changeMonth: false,
            isRTL: rtl,
            beforeShow: function(input, inst) { 
                var rect = input.getBoundingClientRect();
                var right_pos = $(window).width() - (rect.left + rect.width);
                if(rect.left > ( $(window).width()/2 )){
                    setTimeout(function () {
                        inst.dpDiv.css({ left: 'auto', right: right_pos });
                    }, 10);
                    
                }
                if ($(window).width() < 576) {
                    inst.dpDiv.css({ 'min-width': rect.width});
                    return { numberOfMonths: 1 };
                } else {
                    return { numberOfMonths: 2 };
                }
            },
            onClose: function() { 
                var minDate = $(this).datepicker('getDate');
                if( minDate != null ){
                    var newMin = new Date(minDate.setDate(minDate.getDate() + 1));
                    $scope.find('.date-checkout').datepicker('setDate', newMin);
                }
            }
        });

        if( $scope.find('input[name="date_checkin"]').val() == ''){
            $scope.find('.date-checkin').datepicker("setDate", new Date());
        }

        $scope.find('.date-checkout').datepicker({
            altFormat: 'M',
            minDate: '+1d',
            monthNames: ['January','February','March','April','May','June', 'July','August','September','October','November','December'],
            monthNamesShort: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
            dayNamesMin: ['Su','Mo','Tu','We','Th','Fr', 'Sa'],
            nextText: 'NEXT',
            prevText: 'PREV',
            changeMonth: false,
            firstDay: 0,
            dateFormat: 'dd M yy', //mm/dd/yy
            isRTL: rtl,
            beforeShow: function(input, inst) {
                var rect = input.getBoundingClientRect();
                var right_pos = $(window).width() - (rect.left + rect.width);
                if(rect.left > ( $(window).width()/2 )){
                    setTimeout(function () {
                        inst.dpDiv.css({ left: 'auto', right: right_pos });
                    }, 10);
                    
                }
                if ($(window).width() < 576) {
                    inst.dpDiv.css({ 'min-width': rect.width});
                    return { numberOfMonths: 1 };
                } else {
                    return { numberOfMonths: 2 };
                }
            },
            onClose: function() {   
            }
        });

        if( $scope.find('input[name="date_checkout"]').val() == ''){
            var ck_date = new Date();
            ck_date.setDate(ck_date.getDate() + 1);
            $scope.find('.date-checkout').datepicker("setDate", ck_date);
        }
    }

    function carmelina_booking_form_render_room_number($this){
        var date_from = $this.find('.date-checkin').val();
        var date_to = $this.find('.date-checkout').val();
        var data_room_selected = $this.find('.data-room-selected').val();
        var datas = { 'date_from' : date_from, 'date_to' : date_to, 'room_type_id' : data_room_selected };
        
        $.ajax({
            url: main_data.ajax_url,
            type: 'POST',
            data: {
                action: 'phb_booking_form_render_room_number_handles',
                data: datas,
            },
            dataType: 'json',
            success: function( results ) {   
                if ( 'success' === results.status ) {
                    $this.find('.room-number-wrap').html(results.html);
                } 
                if ( results.num_room == 0 ) {
                    $this.find('.form-action-btn .btn-book-now').removeClass('pxl-btn').addClass('disabled').attr('disabled', 'disabled');
                    $this.find('.form-action-btn .btn-book-now .btn-text').html(main_data.btn_book_now_text_disable);
                }
                if ( results.num_room > 0 ) {
                    $this.find('.form-action-btn .btn-book-now').removeClass('disabled').addClass('pxl-btn').removeAttr('disabled');
                    $this.find('.form-action-btn .btn-book-now .btn-text').html(main_data.btn_book_now_text); 
                }  
                if ( 'false' === results.status ) {
                    $this.find('.room-number-wrap').html(results.message);
                } 
            },
            beforeSend: function () {
                $this.removeClass( 'loaded' ).addClass( 'loading' );
            },
            complete: function() {
                $this.removeClass( 'loading' ).addClass( 'loaded' ); 
                $this.find('select.nice-select').niceSelect();
            },
            error:  function( jqXHR, textStatus, errorThrown ) {
                $this.removeClass( 'loading' ).addClass( 'loaded' ); 
            }
        });
    }

    function carmelina_search_room_handler($scope){
        $scope.find('.room-check-available-form').on('submit', function (e) {
            var $form = $(this);
            if( $form.find('.date-checkin').val() == ''){
                $form.find('.date-checkin-wrap').trigger('click');
                return false;
            }
            if( $form.find('.date-checkout').val() == ''){
                $form.find('.date-checkout-wrap').trigger('click');
                return false;
            }
            if ( $form.hasClass('ajax') ) {
                e.preventDefault();

                var $target_scope = $(document).find( '.pxl-room-check-avaibility-wg' );
                var fragments = [
                    '.pxl-room-check-avaibility-wg',
                    '.pxl-rooms-selected-wg .rooms-selected-inner'
                ];

                var href = $form.attr('action');
                
                var elements = this.elements;
                
                for (var i = 0; i < elements.length; i++) {
                    var element = elements[i];
                    href = carmelina_add_param_to_url( href, element.name, element.value );  
                }

                carmelina_room_available_filter_add_selected_by_url( $form, $scope, $target_scope, fragments, href );
     
                return false;
            }
        });
    }

    function carmelina_field_number_click_handler($scope){
        $scope.on('click','.input-number-button', function () {
            var $this = $(this),
                wrap = $this.closest('.input-number-inner'),
                input = wrap.find('input[type="number"]'),
                step = input.attr('step'),
                min = input.attr('min'),
                max = input.attr('max'),
                value = parseInt(input.val());

            if(!value) value = 0;
            if(!step) step=1;
            step = parseInt(step);
            if (!min) min = 0;
            if( $this.hasClass('number-up')){
                if(!(max && value >= max))
                    input.val(value+step).change();
            }else{
                if (value > min)
                    input.val(value-step).change();
            }

            if(max && (parseInt(input.val()) > max))
                input.val(max).change();
            if(parseInt(input.val()) < min)
                input.val(min).change();
        });
    }
    
    function carmelina_add_selected_room_handler($scope){
        $( document.body ).on( 'click', '.add-selected-room', function( e ) {
            e.preventDefault();
            e.stopPropagation();
            var $this = $(this);
            var $target_scope = $(document).find( '.pxl-rooms-selected-wg' );
            var fragments = [
                '.pxl-room-check-avaibility-wg',
                '.pxl-rooms-selected-wg .rooms-selected-inner'
            ];
            
            var href = $this.attr('href');
            var room_id = parseInt($this.attr('data-id'));
            var data_selected = $this.attr('data-selected'); 
            var room_quantity = $this.closest('.item-action').find('select.rooms-quantity').val();
 
            var data_selecteds = [];
            if(data_selected != ''){
                data_selecteds = data_selected.split(',');
                for( var i = 0; i < data_selecteds.length; i++){ 
                    var str_ids = data_selecteds[i].split('-');
                    if ( parseInt(str_ids[0]) == room_id) { 
                        data_selecteds.splice(i, 1); 
                    }
                }
            }


            var room_datas = data_selecteds.length > 0 ? data_selecteds : []; // room_id+'-'+room_quantity;
            var room_data_selected = '';

            room_datas.push(room_id+'-'+room_quantity);
            room_data_selected = room_datas.join(',');
 
            href = carmelina_add_param_to_url( href, 'data_selected', room_data_selected );

            //flyto animation
            var eltoDrag = $this.closest('.room-item').find("img").eq(0);
            
            var top_pos = $target_scope.offset().top + $target_scope.height() - 150;
            if($target_scope.find('.item-room-'+room_id).length > 0)
                top_pos = $target_scope.find('.item-room-'+room_id).offset().top + 40;

            if (eltoDrag) {
                var imgclone = eltoDrag.clone()
                    .offset({
                        top: eltoDrag.offset().top,
                        left: eltoDrag.offset().left
                    })
                    .css({
                        'opacity': '0.5',
                        'position': 'absolute',
                        'transform': 'translateX(-50%)',
                        'height': eltoDrag.height() /2,
                        'width': eltoDrag.width() /2,
                        'z-index': '100'
                    })
                    .appendTo($('body'))
                    .animate({
                        'top': top_pos,
                        'left': $target_scope.offset().left + $target_scope.width()/2,
                        'height': eltoDrag.height() /2,
                        'width': eltoDrag.width() /2
                    }, 1000, 'easeInOutExpo');
                 
                imgclone.animate({
                    'width': 0,
                    'height': 0
                }, function () {
                    $(this).detach()
                });
            }
             
            carmelina_room_available_filter_add_selected_by_url( $this, $scope, $target_scope, fragments, href, { room_id: room_id, add_selected_room: 1, flyto: 1 } );
        });
 
    }

    function carmelina_remove_selected_item_room_handler($scope){
        $( document.body ).on( 'click', '.remove-item-selected', function( e ) {
            e.preventDefault();
            e.stopPropagation();
             
            var $this = $(this);
            var href = $this.attr('href');
            var room_id = parseInt($this.attr('data-id'));

            var fragments = [
                '.pxl-room-check-avaibility-wg',
                '.pxl-rooms-selected-wg .rooms-selected-inner'
            ];
           
            var data_selected = $this.closest('.rooms-selected-inner').find('.data-room-selected').val(); 
            
            var data_selecteds = [];
            if(data_selected != ''){
                data_selecteds = data_selected.split(',');
                for( var i = 0; i < data_selecteds.length; i++){ 
                    var str_ids = data_selecteds[i].split('-');
                    if ( parseInt(str_ids[0]) == room_id) { 
                        data_selecteds.splice(i, 1); 
                    }
                }
            }
 
            var room_data_selected = data_selecteds.join(',');
   
            href = carmelina_add_param_to_url( href, 'data_selected', room_data_selected );

            carmelina_room_available_filter_add_selected_by_url( $this, $scope, $scope, fragments, href );
        });
    }

    function carmelina_room_available_filter_add_selected_by_url($this, $scope, $target_scope, fragments, url, args = {}){
        if( $target_scope.length <= 0 ) return false;

        var settings = $.extend( true, {}, {
            room_id: 0,
            add_selected_room: 0,
            flyto: 0,
        }, args );

        url = decodeURIComponent( url );
        history.pushState( {}, null, url );

        var offset_top = $target_scope.offset().top;
        if(settings.flyto == 1){ 
            var offset_bottom = $target_scope.find('.button-action').offset().top;
            if( settings.room_id > 0 && $target_scope.find('.item-room-'+settings.room_id).length > 0)
                offset_bottom = $target_scope.find('.item-room-'+settings.room_id).offset().top + 200;
        }
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'html',
            success: function( response ) {   
                var $response = $( response ); 

                var total_ragments = fragments.length;
                for ( var i = 0; i < total_ragments; i ++ ) {
                    var key  = fragments[i],
                        $key = $( key );

                    if ( $key.length > 0 ) {
                        $key.empty();
                        var $new_lement = $response.find( key );
                        if ( $new_lement.length > 0 ) {
                            $key.html( $new_lement.html() );

                            $key.find( '.pxl-animate').each(function(){
                                var data = $(this).data('settings');
                                var cur_anm = $(this);
                                setTimeout(function () {  
                                    $(cur_anm).removeClass('pxl-invisible').addClass('animated ' + data['animation']);
                                }, data['animation_delay']);

                            });
                        }
                    }
                }
                
                $('select.nice-select').niceSelect();
            },
            beforeSend: function() {  
                if(settings.flyto == 1){ 
                    $( 'html, body' ).animate( { scrollTop: offset_bottom - 400 }, 500 );
                }else{
                    $( 'html, body' ).animate( { scrollTop: offset_top - 150 }, 0 );
                }
                if(settings.add_selected_room == 1){
                    $this.addClass('loading')
                }
                $scope.find('.btn-check-available').addClass('loading');
                $( 'body' ).removeClass( 'loaded' ).addClass( 'loading' );
                
            },
            complete: function() {
                if(settings.add_selected_room == 1){
                    $this.removeClass('loading');
                }
                $scope.find('.btn-check-available').removeClass('loading');
                $( 'body' ).removeClass( 'loading' ).addClass( 'loaded' ); 
                
            }
        });
    }

    function carmelina_room_checkout_handler($scope){
        var checkin_time = main_data.checkin_time;
        var checkin_times = checkin_time.split(':');
        var min_time = 24 - checkin_times[0];
       
        $scope.find('.timepicker').each(function(index, el) {
            $(this).timepicker({
                timeFormat: 'h:mm p',
                interval: 30,
                minTime: checkin_time,
                //maxTime: '6:00pm',
                //maxTime: '12:00pm',
                defaultTime: checkin_time,
                startTime: checkin_time,
                dynamic: false,
                dropdown: true,
                scrollbar: true
            });
        });

        //tabs
        $scope.on('click', '.tab-title-item', function(e) {
            var target = $(this).attr('data-target');
            $(this).siblings('.active ').removeClass('active');
            $(this).addClass('active');
            $(target).siblings('.active').removeClass('active');
            $(target).addClass('active');
        });

        // choose guest
        $scope.on('change', '.bk_checkout-guests-chooser.chooser-adults', function () {
            var $this = $(this);
            var adults_number = $this.val();
            var children_number = $this.closest('.select-guest-wrap').find('select.chooser-children').val();
            var price_format = $('.pxl-room-checkout-wg').attr('data-price-format');
            var currency = $('.pxl-room-checkout-wg').attr('data-currency');
            var day_stay = $('.pxl-checkout-content-wrap').attr('data-night');

            $this.closest('.room-item-selected').find('.bk-service-custom-adults').each(function () {
                $(this).find('option').removeAttr('selected');
                $(this).val(adults_number);
                $(this).find('option[value="'+adults_number+'"]').attr('selected','selected');
                var $parent = $(this).closest('.bk-service-custom-adults-wrap');
                var this_clone = $(this).clone();
                $(this).remove();
                $parent.html(this_clone);
                $parent.find('select.nice-select').niceSelect();
                this_clone.trigger('change');
            });

            //update tax amount, fees amount
            var room_item_idx = $this.closest('.room-item-selected').attr('data-room-idx');
            var tax_amount = 0;
            var flag1 = false;

            var fees_amount = 0;
            var flag2 = false;

            //update tax amount
            $('.bk_room_details-'+room_item_idx+'-tax-price').find('.tax-room-item').each(function(index, el) {
                var amount_adults = $(this).attr('data-amount-adults');
                var amount_children = $(this).attr('data-amount-children');
                if( parseFloat(amount_adults) > 0 || parseFloat(amount_children) > 0 ){
                    flag1 = true;
                }
                var tax_item_base_amount = $(this).find('.tax-room-amount').html().replace(currency, '');
                var tax_item_amount = 0;
                if( parseFloat(amount_adults) > 0){
                    var tax_adult_amount = parseFloat(amount_adults) * parseInt(adults_number) * parseInt(day_stay);
                    tax_item_amount = tax_item_amount + tax_adult_amount;
                    tax_amount = tax_amount + tax_adult_amount;
                }
                if( parseFloat(amount_children) > 0){
                    var tax_child_amount = parseFloat(amount_children) * parseInt(children_number) * parseInt(day_stay);
                    tax_item_amount = tax_item_amount + tax_child_amount;
                    tax_amount = tax_amount + tax_child_amount;
                }
                if( parseFloat(amount_adults) <= 0 && parseFloat(amount_children) <= 0 ){
                    tax_amount = tax_amount + parseFloat(tax_item_base_amount);
                }else{
                    var _tax_item_amount_p = price_format.replace('10', tax_item_amount);
                    $(this).find('.tax-room-amount').html(_tax_item_amount_p);
                }
            });
            if( flag1 ){
                var _tax_amount_p = price_format.replace('10', tax_amount);
                $('.bk_room_details-'+room_item_idx+'-tax-price .toogle-wrap').find('.amount').html(_tax_amount_p);
            }

            //update fees amount
            $('.bk_room_details-'+room_item_idx+'-fees-price').find('.fees-item').each(function(index, el) {
                var amount_adults = $(this).attr('data-amount-adults');
                var amount_children = $(this).attr('data-amount-children');
                if( parseFloat(amount_adults) > 0 || parseFloat(amount_children) > 0 ){
                    flag2 = true;
                }
                var fees_item_base_amount = $(this).find('.fees-item-amount').html().replace(currency, '');
                var fees_item_amount = 0;
                if( parseFloat(amount_adults) > 0){
                    var fees_adult_amount = parseFloat(amount_adults) * parseInt(adults_number) * parseInt(day_stay);
                    fees_item_amount = fees_item_amount + fees_adult_amount;
                    fees_amount = fees_amount + fees_adult_amount;
                }
                if( parseFloat(amount_children) > 0){
                    var fees_child_amount = parseFloat(amount_children) * parseInt(children_number) * parseInt(day_stay);
                    fees_item_amount = fees_item_amount + fees_child_amount;
                    fees_amount = fees_amount + fees_child_amount;
                }
                if( parseFloat(amount_adults) <= 0 && parseFloat(amount_children) <= 0 ){
                    fees_amount = fees_amount + parseFloat(fees_item_base_amount);
                }else{
                    var _fees_item_amount_p = price_format.replace('10', fees_item_amount);
                    $(this).find('.fees-item-amount').html(_fees_item_amount_p);
                }
            });
            if( flag2 ){
                var _fees_amount_p = price_format.replace('10', fees_amount);
                $('.bk_room_details-'+room_item_idx+'-fees-price .toogle-wrap').find('.amount').html(_fees_amount_p);
            }

            // update fees tax amount
            var fees_tax_amount = 0;
            $('.bk_room_details-'+room_item_idx+'-fees-tax-price').find('.fees-tax-item').each(function(index, el) {
                var data_percent = $(this).attr('data-percent');
                var fees_tax_item_amount = parseInt(data_percent) * fees_amount / 100; 
                var _fees_tax_item_amount_p = price_format.replace('10', fees_tax_item_amount);
                $(this).find('.fees-tax-amount').html(_fees_tax_item_amount_p);

                fees_tax_amount = fees_tax_amount + fees_tax_item_amount; 
            });
            var _fees_tax_amount_p = price_format.replace('10', fees_tax_amount.toFixed(2));
            $('.bk_room_details-'+room_item_idx+'-fees-tax-price .toogle-wrap').find('.amount').html(_fees_tax_amount_p);

            //update room subtotal , all subtotal, all tax, total price
            carmelina_update_summary_price_handler( $this, $scope); 

            //update checkout-rooms-details
            $('.bk-room-details-'+room_item_idx+'-adults').html(adults_number);
        });    
        
        $scope.on('change', '.bk_checkout-guests-chooser.chooser-children', function () {
            var $this = $(this);
            var children_number = $this.val();
            var adults_number = $this.closest('.select-guest-wrap').find('select.chooser-adults').val();
            var price_format = $('.pxl-room-checkout-wg').attr('data-price-format');
            var currency = $('.pxl-room-checkout-wg').attr('data-currency');
            var day_stay = $('.pxl-checkout-content-wrap').attr('data-night');

            //update tax amount, fees amount
            var room_item_idx = $this.closest('.room-item-selected').attr('data-room-idx');
            var tax_amount = 0;
            var flag1 = false;

            var fees_amount = 0;
            var flag2 = false;

            //update tax amount
            $('.bk_room_details-'+room_item_idx+'-tax-price').find('.tax-room-item').each(function(index, el) {
                var amount_adults = $(this).attr('data-amount-adults');
                var amount_children = $(this).attr('data-amount-children');
                if( parseFloat(amount_adults) > 0 || parseFloat(amount_children) > 0 ){
                    flag1 = true;
                }
                var tax_item_base_amount = $(this).find('.tax-room-amount').html().replace(currency, '');
                var tax_item_amount = 0;
                if( parseFloat(amount_adults) > 0){
                    var tax_adult_amount = parseFloat(amount_adults) * parseInt(adults_number) * parseInt(day_stay);
                    tax_item_amount = tax_item_amount + tax_adult_amount;
                    tax_amount = tax_amount + tax_adult_amount;
                }
                if( parseFloat(amount_children) > 0){
                    var tax_child_amount = parseFloat(amount_children) * parseInt(children_number) * parseInt(day_stay);
                    tax_item_amount = tax_item_amount + tax_child_amount;
                    tax_amount = tax_amount + tax_child_amount;
                }
                if( parseFloat(amount_adults) <= 0 && parseFloat(amount_children) <= 0 ){
                    tax_amount = tax_amount + parseFloat(tax_item_base_amount);
                }else{
                    var _tax_item_amount_p = price_format.replace('10', tax_item_amount);
                    $(this).find('.tax-room-amount').html(_tax_item_amount_p);
                }
            });
            if( flag1 ){
                var _tax_amount_p = price_format.replace('10', tax_amount);
                $('.bk_room_details-'+room_item_idx+'-tax-price .toogle-wrap').find('.amount').html(_tax_amount_p);
            }

            //update fees amount
            $('.bk_room_details-'+room_item_idx+'-fees-price').find('.fees-item').each(function(index, el) {
                var amount_adults = $(this).attr('data-amount-adults');
                var amount_children = $(this).attr('data-amount-children');
                if( parseFloat(amount_adults) > 0 || parseFloat(amount_children) > 0 ){
                    flag2 = true;
                }
                var fees_item_base_amount = $(this).find('.fees-item-amount').html().replace(currency, '');
                var fees_item_amount = 0;
                if( parseFloat(amount_adults) > 0){
                    var fees_adult_amount = parseFloat(amount_adults) * parseInt(adults_number) * parseInt(day_stay);
                    fees_item_amount = fees_item_amount + fees_adult_amount;
                    fees_amount = fees_amount + fees_adult_amount;
                }
                if( parseFloat(amount_children) > 0){
                    var fees_child_amount = parseFloat(amount_children) * parseInt(children_number) * parseInt(day_stay); 
                    fees_item_amount = fees_item_amount + fees_child_amount; 
                    fees_amount = fees_amount + fees_child_amount;
                }
                if( parseFloat(amount_adults) <= 0 && parseFloat(amount_children) <= 0 ){
                    fees_amount = fees_amount + parseFloat(fees_item_base_amount);
                }else{
                    var _fees_item_amount_p = price_format.replace('10', fees_item_amount);
                    $(this).find('.fees-item-amount').html(_fees_item_amount_p);
                } 
            });
            if( flag2 ){
                var _fees_amount_p = price_format.replace('10', fees_amount);
                $('.bk_room_details-'+room_item_idx+'-fees-price .toogle-wrap').find('.amount').html(_fees_amount_p);
            }

            // update fees tax amount
            var fees_tax_amount = 0;
            $('.bk_room_details-'+room_item_idx+'-fees-tax-price').find('.fees-tax-item').each(function(index, el) {
                var data_percent = $(this).attr('data-percent');
                var fees_tax_item_amount = parseInt(data_percent) * fees_amount / 100; 
                
                var _fees_tax_item_amount_p = price_format.replace('10', fees_tax_item_amount);
                $(this).find('.fees-tax-amount').html(_fees_tax_item_amount_p);

                fees_tax_amount = fees_tax_amount + fees_tax_item_amount; 
                
            });
             
            var _fees_tax_amount_p = price_format.replace('10', fees_tax_amount.toFixed(2));
            $('.bk_room_details-'+room_item_idx+'-fees-tax-price .toogle-wrap').find('.amount').html(_fees_tax_amount_p);

            //update room subtotal , all subtotal, all tax, total price
            carmelina_update_summary_price_handler( $this, $scope); 

            //update checkout-rooms-details
            $('.bk-room-details-'+room_item_idx+'-children').html(children_number);

        });  

        //service guest custom
        $scope.on('change', '.bk-service-custom-quantity', function () {
            var $this = $(this);
            var $service_item = $this.closest('.bk-service-item');
            var data_base_price = $service_item.attr('data-base-price');
            var quantity_number = $this.val();
            var result = parseFloat(data_base_price) * parseInt(quantity_number); 
            if( $service_item.find('.bk-service-custom-adults').length > 0){
                var guest_number = $service_item.find('.bk-service-custom-adults').val();
                result = result * parseInt(guest_number); 
            }
            if( $service_item.find('.sv-result').length > 0 ){
                var _p = $('.pxl-room-checkout-wg').attr('data-price-format').replace('10', result);
                $service_item.find('.sv-result').html(_p);
                $service_item.find('.sv-result').attr('data-result',result);
            }

            if( $this.closest('.bk-service-item').find('.bk-checkout-service').prop('checked')){
                carmelina_update_extra_services_price_handler( $this, $scope); 

                //update room subtotal , all subtotal, all tax, total price
                carmelina_update_summary_price_handler( $this, $scope); 
            }
        });

        $scope.on('change', '.bk-service-custom-adults', function () {
            var $this = $(this);
            var $service_item = $this.closest('.bk-service-item');
            var data_period = $service_item.attr('data-period');
            //var data_price_for = $service_item.attr('data_price_for');
            var data_base_price = $service_item.attr('data-base-price');
            var guest_number = $this.val();
            var result = parseFloat(data_base_price) * parseInt(guest_number); 
            if( data_period == 'custom' && $service_item.find('.bk-service-custom-quantity').length > 0){
                var quantity_number = $service_item.find('.bk-service-custom-quantity').val();
                result = result * parseInt(quantity_number); 
            }
            if( data_period == 'per_night' ){
                var data_night = $service_item.attr('data-night');
                result = result * parseInt(data_night); 
            }
            if( $service_item.find('.sv-result').length > 0 ){
                var _p = $('.pxl-room-checkout-wg').attr('data-price-format').replace('10', result);
                $service_item.find('.sv-result').html(_p);
                $service_item.find('.sv-result').attr('data-result',result);
            }

            if( $this.closest('.bk-service-item').find('.bk-checkout-service').prop('checked')){
                carmelina_update_extra_services_price_handler( $this, $scope); 

                //update room subtotal , all subtotal, all tax, total price
                carmelina_update_summary_price_handler( $this, $scope); 
            }
        });

        //change extra services
        $scope.on('change', 'input.bk-checkout-service', function () {
            var $this = $(this);
            carmelina_update_extra_services_price_handler( $this, $scope); 

            //update room subtotal , all subtotal, all tax, total price
            carmelina_update_summary_price_handler( $this, $scope); 
        });
        $scope.on('change', 'input.checkall-service', function () {
            var $this = $(this);
            var checked = $this.prop('checked');
            if( checked ){
                $this.closest('.room-item-extra-service').find('input.bk-checkout-service').each(function () {
                    $(this).prop('checked', true);
                });

            }else{
                $this.closest('.room-item-extra-service').find('input.bk-checkout-service').each(function () {
                    $(this).prop('checked', false);
                });
            }
            carmelina_update_extra_services_price_handler( $this, $scope); 

            //update room subtotal , all subtotal, all tax, total price
            carmelina_update_summary_price_handler( $this, $scope); 
        });

        $scope.on('click', '.toogle-wrap', function () {
            $(this).toggleClass("active");
            $(this).next('.toogle-content').slideToggle(400);
        });       
    }

    function carmelina_update_extra_services_price_handler( $this, $scope){
        var services_selected = [];
        var room_item_idx = $this.closest('.room-item-selected').attr('data-room-idx');
        var room_item_service_subtotal = 0;
        var room_item_service_tax_subtotal = 0;
        $this.closest('.room-item-extra-service').find('input.bk-checkout-service:checked').each(function () {
            var checked = $(this).prop('checked');
            var sv_result = 0;
            if( checked ){
                var $service_item = $(this).closest('.bk-service-item');
                var sv_result = $service_item.find('.sv-result').attr('data-result');
            } 
             
            room_item_service_subtotal = room_item_service_subtotal + parseFloat(sv_result); 
        });
        
        var price_format = $('.pxl-room-checkout-wg').attr('data-price-format');
         
        var _p = price_format.replace('10', room_item_service_subtotal);
        var $service_price = $('.checkout-summary-overview').find('.bk_room_details-'+room_item_idx+'-service-price');
        $service_price.html(_p);

        if( !$service_price.closest('.service-price').hasClass('active') && room_item_service_subtotal > 0){
            $service_price.closest('.service-price').addClass('active');
        }
        if(room_item_service_subtotal <= 0){
            $service_price.closest('.service-price').removeClass('active');
        }
        if( $service_price.closest('.item-content').find('.tax-service-item').length > 0 ){
            $service_price.closest('.item-content').find('.tax-service-item').each(function(index, el) {
                var data_sv_tax = $(this).attr('data-sv-tax');
                var sv_item_tax_amount = parseFloat(data_sv_tax) * room_item_service_subtotal / 100; 
                $(this).find('.tax-service-amount').html(price_format.replace('10', sv_item_tax_amount));
                room_item_service_tax_subtotal = room_item_service_tax_subtotal + sv_item_tax_amount;
            });
        }

        //service tax
        var $service_tax_price = $('.checkout-summary-overview').find('.bk_room_details-'+room_item_idx+'-service-tax-price');
        var _tax_p = price_format.replace('10', room_item_service_tax_subtotal);
        $service_tax_price.html(_tax_p);
        if( !$service_tax_price.closest('.service-tax-price').hasClass('active') && room_item_service_tax_subtotal > 0){
            $service_tax_price.closest('.service-tax-price').addClass('active');
        }
        if(room_item_service_tax_subtotal <= 0){
            $service_tax_price.closest('.service-tax-price').removeClass('active');
        }
 
    }

    function carmelina_update_summary_price_handler($this, $scope){
        //room subtotal , all subtotal, all tax, total price
        var price_format = $(document).find('.pxl-room-checkout-wg').attr('data-price-format');
        var currency = $(document).find('.pxl-room-checkout-wg').attr('data-currency');
        var all_room_subtotal = 0;
        var all_room_tax = 0;
         
        $(document).find('.bk-items-wrap .bk-room-item').each(function (index, el) {
            var room_base_subtotal = $(this).find('.room-base-subtotal').html().replace(currency, '');
            var room_service_amount = $(this).find('.service-price .amount').html().replace(currency, '');
            var room_fees_amount = $(this).find('.fees-price .amount').html().replace(currency, '');
            var room_tax_amount = $(this).find('.tax-price .amount').html().replace(currency, '');
            var room_service_tax_amount = $(this).find('.service-tax-price .amount').html().replace(currency, '');
            var room_fees_tax_amount = $(this).find('.fees-tax-price .amount').html().replace(currency, '');
             
            var room_subtotal = parseFloat(room_base_subtotal) + parseFloat(room_service_amount) + parseFloat(room_fees_amount) + parseFloat(room_tax_amount) + parseFloat(room_service_tax_amount) + parseFloat(room_fees_tax_amount);
            var _room_subtotal_p = price_format.replace('10', room_subtotal.toFixed(2));
            $(this).find('.room-subtotal').html(_room_subtotal_p);

            all_room_subtotal = all_room_subtotal + parseFloat(room_base_subtotal) + parseFloat(room_fees_amount) + parseFloat(room_service_amount); 
            all_room_tax = all_room_tax + parseFloat(room_tax_amount) + parseFloat(room_service_tax_amount) + parseFloat(room_fees_tax_amount);
            
        });
          
        var _all_room_subtotal_p = price_format.replace('10', all_room_subtotal.toFixed(2));
        $(document).find('.bk-items-summary .all-items-subtotal .amount').html(_all_room_subtotal_p);

        var _all_room_tax_p = price_format.replace('10', all_room_tax.toFixed(2));
        $(document).find('.bk-items-summary .all-items-taxes .amount').html(_all_room_tax_p);

        var bk_total_price = all_room_subtotal + all_room_tax;
        $(document).find('.bk-total-price .amount').html(bk_total_price.toFixed(2));
        $(document).find('input[name="phb_total_price"]').val(bk_total_price.toFixed(2));
    }

    function carmelina_spinner_handler($scope){
        var degreeToRadian = (angle) => {
          return angle * (Math.PI / 180);
        };

        var radius = 226;
        if ($(window).width() < 576) {
            radius = 168;
        }
        var diameter = radius * 2;

        var circle = document.querySelector(".pxl-circle-text");
        circle.style.width = `${diameter}px`;
        circle.style.height = `${diameter}px`;

        var text = circle.dataset.text;
        var characters = text.split("");

        var deltaAngle = 360 / characters.length;
        var characterOffsetAngle = 0;
        let currentAngle = -90;

        characters.forEach((character, index) => {
          var span = document.createElement("span");
          span.innerText = character;
          var xPos = radius * (1 + Math.cos(degreeToRadian(currentAngle)));
          var yPos = radius * (1 + Math.sin(degreeToRadian(currentAngle)));

          var transform = `translate(${xPos}px, ${yPos}px)`;
          var rotate = `rotate(${(index * deltaAngle) + characterOffsetAngle}deg)`;
          span.style.transform = `${transform} ${rotate}`;

          currentAngle += deltaAngle;
          circle.appendChild(span);
        });
    }

    function carmelina_tab_list_handler($scope){
        var $img_items = $scope.find('.content-img .img-item');
        var $cur_img_items = $scope.find('.content-img .img-item.active');
        gsap.set($img_items, {
            opacity: 0,
            ease: "circ.out"
        });
        gsap.set($cur_img_items, {
            opacity: 1,
            ease: "circ.out"
        });

        $scope.find(".pxl-tabs-list .content-item").on("click", function(e){
            e.preventDefault();
            var target = $(this).data("target");
            $(this).siblings('.active').removeClass('active').find('.content-wrap').slideUp(400);
            $(this).toggleClass("active");
            $(target).slideToggle(400);


            var item_img_cls = target.substring(1, target.length);
            var $prev_active = $('.pxl-tabs-list .content-img .'+item_img_cls).siblings('.active');
            $prev_active.removeClass('active');
            var $current_img = $('.pxl-tabs-list .content-img .'+item_img_cls).addClass('active');

            gsap.to( $prev_active, {
                opacity: 0,
                duration: 0.3,
            });
            gsap.to($current_img, {
                opacity: 1,
                duration: 0.8,
            });
             
        });
    }
    
    function carmelina_tabs_handler($scope){
        $scope.find(".pxl-tabs .tabs-title .tab-title").on("click", function(e){
            e.preventDefault();
            var target = $(this).data("target");
            $(this).addClass('active').siblings().removeClass('active');
            $(target).addClass('active').siblings().removeClass('active'); 
            $(target).siblings().find('.pxl-animate').each(function(){
                var data = $(this).data('settings');
                $(this).removeClass('animated '+data['animation']).addClass('pxl-invisible');
            });
            $(target).find('.pxl-animate').each(function(){
                var data = $(this).data('settings');
                var cur_anm = $(this);
                setTimeout(function () {  
                    $(cur_anm).removeClass('pxl-invisible').addClass('animated ' + data['animation']);
                }, data['animation_delay']);

            });
        });
    }

    function carmelina_restaurant_menu_handler( $scope) {
        var list_menu = $scope.find(".pxl-restautant-menu"),
            data_show = list_menu.data('show'),
            data_load = list_menu.data('loadmore');
            
        list_menu.find(".mn-item").slice(0, data_show).show();
        list_menu.find('.pxl-rm-load').on('click',  function(e) { // click event for load more
            e.preventDefault();
            list_menu.find(".mn-item:hidden").slice(0, data_load).show(100); // select next 10 hidden divs and show them
            if (list_menu.find(".mn-item:hidden").length == 0) { // check if any hidden divs still exist
                $(this).closest('.load-more-wrap').hide();
            } 
              
        });
    };
    // Make sure you run this code under Elementor.
    $( window ).on( 'elementor/frontend/init', function() {
         
        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_post_list.default', function( $scope ) {
            carmelina_set_scroll_post_list($scope);
        } );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_galleries.default', function( $scope ) {
            carmelina_gallery_handler($scope);
        } );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_instagram_galleries.default', function( $scope ) {
            carmelina_instagram_gallery_handler($scope);
        } );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_accordion.default', function( $scope ) {
            carmelina_accordion_handler($scope);
        } );

        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_fancy_box.default', function( $scope ) {
            carmelina_fancy_box_handler($scope);
        } );

        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_links.default', function( $scope ) {
            carmelina_links_anchor_handler($scope);
        } );

        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_room_price_filter.default', function( $scope ) {
            carmelina_room_price_filter($scope);
        } );

        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_room_single_details_tabs.default', function( $scope ) {
            carmelina_room_single_tabs_handler($scope);
        } );

        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_room_single_availability_calendar.default', function( $scope ) {
            carmelina_room_single_calendar($scope);
        } );

        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_room_single_booking_form.default', function( $scope ) {
            carmelina_booking_form_date_range($scope);
        } );

        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_room_check_available_form.default', function( $scope ) {
            elementorFrontend.waypoint($scope.find('.border-bottom'), function () {
                $(this).addClass('pxl-animated');
            });
            carmelina_available_form_date_range($scope);
            carmelina_search_room_handler($scope);
            carmelina_field_number_click_handler($scope);
        } );
 
        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_room_check_availability.default', function( $scope ) { 
            carmelina_add_selected_room_handler($scope);
        } );

        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_rooms_selected.default', function( $scope ) { 
            carmelina_remove_selected_item_room_handler($scope);
        } );

        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_room_checkout.default', function( $scope ) { 
            carmelina_room_checkout_handler($scope);
        } );

        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_spinner.default', function( $scope ) { 
            carmelina_spinner_handler($scope);
        } );

        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_tab_list.default', function( $scope ) {
            carmelina_tab_list_handler($scope);
        } );

        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_tabs.default', function( $scope ) {
            carmelina_tabs_handler($scope);
        } );

        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_restaurant_menu.default', function( $scope ) {
            carmelina_restaurant_menu_handler($scope);
        } ); 
    } );

    
    $( document ).ready( function() { 
        $('.ui-timepicker-wrapper').css('display', 'none');   
    });
    $(window).on('load', function () {
        carmelina_set_datepicker_wg_option();
    });
    $(window).on('resize', function () {
        carmelina_set_datepicker_wg_option();
    });

    function carmelina_set_datepicker_wg_option(){
        $('.pxl-room-datepick-calendar').each(function(index, el) {
            var $this = $(this);
            if ( $(window).outerWidth() < 992 ) {
                $this.datepicker('option', 'numberOfMonths', 1);
            }else {
                $this.datepicker('option', 'numberOfMonths', 2); 
            }
        });
    }

} )( jQuery );