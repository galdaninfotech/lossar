(function ($) {
	$(document).on("click", ".password_preview", function (e) {
		e.preventDefault();
		 
		var current_task = $(this).hasClass("dashicons-hidden") ? "show" : "hide";
		var $password_field = $(this).closest(".pu-form-item").find('input[name="password"]');

		// Hide/show password for user registration form
		if ($password_field.length === 0) {
			$password_field = $(this).closest(".user_pass_field").find('input[name="user_pass"]');
		}
		if ($password_field.length === 0) {
			$password_field = $(this).closest(".user_confirm_password_field").find('input[name="user_confirm_password"]');
		}

		// Hide/show password for edit password form
		if ($password_field.length === 0) {
			$password_field = $(this).closest(".pu-form-item").find('input[name="password_current"]');
		}
		if ($password_field.length === 0) {
			$password_field = $(this).closest(".pu-form-item").find('input[name="password_1"]');
		}
		if ($password_field.length === 0) {
			$password_field = $(this).closest(".pu-form-item").find('input[name="password_2"]');
		}
		if ($password_field.length === 0) {
			$password_field = $(this).closest(".field-password").find(".input-password");
		}

		if ($password_field.length > 0) {
			switch (current_task) {
				case "show":
					$password_field.attr("type", "text");
					$(this).removeClass("dashicons-hidden").addClass("dashicons-visibility");
					$(this).attr("title", pu_frontend_params.hide_password_title);
					break;
				case "hide":
					$password_field.attr("type", "password");
					$(this).removeClass("dashicons-visibility").addClass("dashicons-hidden");
					$(this).attr("title", pu_frontend_params.show_password_title);
					break;
			}
		}
	});
	$(document).on("click", ".reg-link-form a[data-target]", function (e) {
		e.preventDefault();
		var target = $(this).attr('data-target');
		$(this).closest('.pxl-login-form').toggleClass('active');
		
		if($(this).closest('.pxl-login-reg-form').length > 0)
			$(this).closest('.pxl-login-reg-form').find(target).toggleClass('active');
		else
			$(target).toggleClass('active');

	});
	$(document).on("click", ".log-link-form a[data-target]", function (e) {
		e.preventDefault();
		var target = $(this).attr('data-target');
		$(this).closest('.pxl-register-form').toggleClass('active');
		
		if($(this).closest('.pxl-login-reg-form').length > 0)
			$(this).closest('.pxl-login-reg-form').find(target).toggleClass('active');
		else
			$(target).toggleClass('active');
	});

	$(document).on("click", ".pxl-pu-my-account-wrap a[data-target]", function (e) {
		e.preventDefault();
		var target = $(this).attr('data-target');
		 
		$(target).toggleClass('open');
	});
	 
	$(document).on('click','.pu-close',function(e){
        e.preventDefault();
        e.stopPropagation();
        $(this).closest('.pu-profile-popup-form').toggleClass('open');
        //$('.btn-nav-mobile').removeClass('cliked');
        //$('body').removeClass('pos-full').toggleClass('side-panel-open');
    });
})(jQuery);