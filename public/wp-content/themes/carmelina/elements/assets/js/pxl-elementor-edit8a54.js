( function( $ ) {
    
    function carmelina_section_start_render(){
        var _elementor = typeof elementor != 'undefined' ? elementor : elementorFrontend;
        _elementor.hooks.addFilter( 'pxl_section_start_render', function( html, settings, el ) {
            if(typeof settings.pxl_parallax_bg_img != 'undefined' && settings.pxl_parallax_bg_img.url != ''){
                html += '<div class="pxl-section-bg-parallax-outer"><div class="pxl-section-bg-parallax"></div></div>';
            }
            if(typeof settings.pxl_bg_ken_burns_bg_img != 'undefined' && settings.pxl_bg_ken_burns_bg_img.url != ''){
                html += '<div class="pxl-section-bg-ken-burns"></div>';
            }
            if(typeof settings.pxl_divider_top_img != 'undefined' && settings.pxl_divider_top_img.url != ''){
                html += '<div class="pxl-section-divider-top-img"></div>';
            }
            if(typeof settings.pxl_divider_bot_img != 'undefined' && settings.pxl_divider_bot_img.url != ''){
                html += '<div class="pxl-section-divider-bot-img"></div>';
            }
            if(typeof settings.pxl_section_shape_anm != 'undefined' && settings.pxl_section_shape_anm.length >0){
                for (var i = 0; i < settings.pxl_section_shape_anm.length; i++) {
                    html += '<span class="pxl-section-shape-item elementor-repeater-item-'+settings.pxl_section_shape_anm[i]['_id']+' '+settings.pxl_section_shape_anm[i]['shape_animate']+'"><img src="'+settings.pxl_section_shape_anm[i]['shape_img']['url']+'" alt="'+settings.pxl_section_shape_anm[i]['shape_title']+'"/></span>';
                }
                
            }
             
            return html;
        } );
    } 
    function carmelina_section_before_render(){
        var _elementor = typeof elementor != 'undefined' ? elementor : elementorFrontend;
        _elementor.hooks.addFilter( 'pxl-custom-section/before-render', function( html, settings, el ) {
            return html;
        } );
    } 
     
    // add custom section class
    function carmelina_custom_section_classes(){
        var _elementor = typeof elementor != 'undefined' ? elementor : elementorFrontend;
        _elementor.hooks.addFilter( 'pxl-custom-section-classes', function( settings ) {
            let custom_classes = [];
            if(typeof settings.custom_style != 'undefined' && settings.custom_style != ''){
                custom_classes.push('style-' + settings.custom_style);
            }
            return custom_classes;
        } );
    }

    function carmelina_column_before_render(){
        var _elementor = typeof elementor != 'undefined' ? elementor : elementorFrontend;
        _elementor.hooks.addFilter( 'pxl-custom-column/before-render', function( html, settings, el ) {
            if(typeof settings.pxl_parallax_col_bg_img != 'undefined' && settings.pxl_parallax_col_bg_img.url != ''){
                html += '<div class="pxl-column-bg-parallax-outer"><div class="pxl-column-bg-parallax"></div></div>';
            }
            return html;
        } );
    }
    // add custom columns class
    function carmelina_custom_column_classes(){
        var _elementor = typeof elementor != 'undefined' ? elementor : elementorFrontend;
        _elementor.hooks.addFilter( 'pxl-custom-column-classes', function( settings ) {
            let custom_classes = [];
            if(typeof settings.custom_style != 'undefined' && settings.custom_style != ''){
            custom_classes.push('style-' + settings.custom_style);
            }
            return custom_classes;
        } );
         
    }
       
    $( window ).on( 'elementor/frontend/init', function() {
     
        carmelina_section_start_render();
        carmelina_section_before_render();
        carmelina_custom_section_classes();

        carmelina_column_before_render();
        carmelina_custom_column_classes();
 
    } );
     
} )( jQuery );


 