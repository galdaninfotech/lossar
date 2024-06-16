jQuery( function( $ ) {

	$( 'body' ).on( 'click', '.phb-stars a', function() {
		var $star   	= $( this ),
			$rating 	= $( this ).closest( '.phb-stars' ).find( '.phb-rating-value' ),
			$container 	= $( this ).closest( '.phb-stars' );

		$rating.val( $star.text() );
		$star.siblings( 'a' ).removeClass( 'active' );
		$star.addClass( 'active' );
		$container.addClass( 'selected' );
		return false;
	} );
  
	$('.phb-review-form').on('submit', function (e) {
		e.preventDefault();
			 
		var $this = $(this);  
		  
		var rating = $this.find( '.phb-rating-value' ).val();
			 
		if ( ! rating ) {
			var error_msg_dom = '<label class="phb-error rating-error">' +phb_js_params.rating_required + "</label>";
			$this.find(".review-rating").after(error_msg_dom);
			return false;
		}

		var form_data;

		try {
			var elements = this.elements;
	        var data     = {};
	        for (var i = 0; i < elements.length; i++) {
	            var element        = elements[i];
	            data[element.name] = element.value;
	        }
	         
			form_data = JSON.stringify(data);
		} catch (ex) {
			form_data = "";
		}

        var data = {
			action: "phb_review_form_submit",
			form_data: form_data,
		};

		$.ajax({
			url: phb_js_params.ajax_url,
			data: data,
			dataType: 'json',
			type: "POST",
			async: true,
			success: function( response ) {
				 
				if ( ! response ) {
                    $this.find(".phb-review-fields").after('<span class="error">'+phb_js_params.review_false+'</span>');
                    return false;
                }

                if ( response.success == false ) {
                	$this.find(".phb-review-fields").after('<span class="phb-error review-error">'+response.data.message+'</span>');
                    return false;
                }
				if ( response.success == true ) {
                	$this.find(".phb-review-fields").after('<span class="phb-success review-success">'+response.data.message+'</span>');
                } 
			},
			beforeSend: function() { 
				$this.find('.phb-rv-submit').addClass("loading");
				$this.find('.review-error').remove();
            },
			complete: function(response) {
				var response_value = JSON.parse(response.responseText);
				$this.find('.phb-rv-submit').removeClass("loading");
				if(response_value.success == false)
					return false;

				var redirect_url = $this.find('input[name="_wp_http_referer"]').val();
				$this[0].reset();
				window.setTimeout(
					function () {
						window.location = redirect_url;
					},
					1000
				);  
			},
			error: function() {
				$this.find(".phb-review-fields").after('<span class="error">'+phb_js_params.review_false+'</span>');
                    return false;
            }
		});
		return false;
	});
  
} );