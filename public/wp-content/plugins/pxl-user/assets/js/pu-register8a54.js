
(function ($) {

	var user_registration_form_init = function () {
		$.fn.pu_form_submission = function () {
			var form = {
				init: function () {},
				show_message: function (message,type,$submit_node,position) {
					$submit_node.closest(".pu-reg-form").find(".pu-message").remove();
					$submit_node.closest(".pxl-pu-my-account-wrap").find(".pu-message").remove();

					// Check if the form is edit-profile form.
					if ($(".pxl-frontend-form").find("form.edit-profile").hasClass("pu-edit-profile-form")) {
						var wrapper = $('<div class="pu-message pu-' + type + '"/>');
						wrapper.append(message);
						$(".pxl-frontend-form").prepend(wrapper);
					} else {
						var wrapper = $('<div class="pu-message pu-' + type + '" id="pu-submit-message-node"></div>');
						wrapper.append(message);

						// Check the position set by the admin and append message accordingly.
						if ("1" === position) {
							$submit_node.append(wrapper);
						} else {
							$submit_node.prepend(wrapper);
						}
					}
				}
			};
			var events = {
				init: function () {
					this.form_submit_event();
					this.edit_profile_event();
				},
				form_submit_event: function () {
					var register_form = $('.pu-reg-form');
					register_form.on('submit', function (e) {
						e.preventDefault();
						var $this = $(this);  
						$.extend($.validator.messages, {
							required: pu_reg_params.message_required_fields,
							email: pu_reg_params.message_email_fields,
							confirmpassword: pu_reg_params.message_confirm_password_fields,
						});
						if ( $this.find(".pu-password-strength").length > 0 ) {
							var current_strength = $this.find(".pu-password-strength").attr("data-current-strength");
							var min_strength = $this.find(".pu-password-strength").attr("data-min-strength");

							if ( parseInt(current_strength, 0) < parseInt(min_strength, 0)) {  
								if ($this.find(".user_pass").val() != "") {
									$this.find(".user_pass_error").remove();
									var error_msg_dom = '<label class="pu-error user_pass_error" for="user_pass">' +pu_reg_params.password_strength_error + ".</label>";
									$this.find(".pu-password-hint").after(error_msg_dom);
									$this.find(".user_pass").attr("aria-invalid", true);
									$this.find(".user_pass").trigger("focus");
								}
								return false;
							}
						}
						$(document).trigger(
							"pu_frontend_validate_before_form_submit",
							[$this]
						);

						if (!$this.valid()) {
							return;
						}
						$this.find(".pu-submit-button").prop("disabled", true);

						var form_data;
						var form_nonce = "0";
						var captcha_response = ""; 
						if ("hcaptcha" === pu_reg_params.recaptcha_type) {
							captcha_response = $this.find('[name="h-captcha-response"]').val();
						} else {
							captcha_response = $this.find('[name="g-recaptcha-response"]').val();
						}

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

						if ($this.find('input[name="pu-reg-form-nonce"]').length === 1) {
							form_nonce = $this.find('input[name="pu-reg-form-nonce"]').val();
						}

						var data = {
							action: "pu_user_form_submit",
							security:pu_reg_params.pu_reg_form_data_save,
							form_data: form_data,
							captcha_response: captcha_response,
							pu_form_nonce: form_nonce,
						};
						var $error_message = {};
						if ( "undefined" !== typeof $error_message.message && "" !== $error_message.message) {
							form.show_message("<p>" + $error_message.message + "</p>", "error", $this, "1");
							$this.find(".pu-submit-button").prop("disabled", false);
							return;
						}
						$this.find(".pu-submit-button").addClass("loading");

						$.ajax({
							url: pu_reg_params.ajax_url,
							data: data,
							dataType: 'json',
							type: "POST",
							async: true,
							complete: function (ajax_response) { 
								var ajax_flag = [];
								ajax_flag["status"] = true;
								$(document).trigger("pu_frontend_before_ajax_complete_success_message",[ajax_response, ajax_flag, $this] );
								if (ajax_flag["status"]) {
									$this.find(".pu-submit-button").removeClass("loading");
									var redirect_url = $this.find('input[name="pu-redirect-url"]').val();
									var message = $('<ul/>');
									var type = "error";
									try{
										var response = JSON.parse(ajax_response.responseText);
										var timeout = response.data.redirect_timeout ? response.data.redirect_timeout : 2000;
										if ( typeof response.success !== "undefined" && response.success === true) {
											type = "message";
										}
										if (type === "message") {
											$this.find(".pu-password-hint").remove();
											$this.find(".pu-password-strength").remove();
											if (response.data.form_login_option == "admin_approval") {
												message.append("<li>" + pu_reg_params.user_under_approval + "</li>");
											} else if (response.data.form_login_option == "email_confirmation" || response.data.form_login_option == "admin_approval_after_email_confirmation") {
												message.append("<li>" + pu_reg_params.user_email_pending +"</li>");
											} else {
												message.append("<li>" + (typeof response.data.message === "undefined") ? pu_reg_params.user_successfully_saved : response.data.message + "</li>");
											}
											$this[0].reset();
											if ("undefined" !== typeof response.data.role_based_redirect_url) {
												redirect_url = response.data.role_based_redirect_url;
											}
											if ("undefined" !== typeof redirect_url && redirect_url !== "") {
												$(document).trigger("pu_frontend_before_redirect_url",[redirect_url]);
												window.setTimeout(
													function () {
														window.location = redirect_url;
													},
													timeout
												);
											} else {
												if (typeof response.data.auto_login !== "undefined" && response.data.auto_login) {
													$(document).trigger("pu_frontend_before_auto_login");
													window.setTimeout(
														function () {
															location.reload();
														},
														timeout
													);
												}
											}
										} else if (type === "error" ) {
											if (typeof response.data.message === "object") {
												$.each(response.data.message,function (index, value) {
													message.append("<li>" + value + "</li>");
												});
											} else {
												message.append("<li>" + response.data.message +"</li>");
											}
										}

									} catch (e) {
										message.append("<li>" + e.message + "</li>");
									}
									var success_message_position = JSON.parse(ajax_response.responseText).data.success_message_positon;
									form.show_message(message, type, $this, success_message_position); // 0 = top, 1 = bottom
									$(window).scrollTop($this.closest(".pxl-frontend-form").offset().top);
									$(document).trigger("pu_frontend_after_ajax_complete",[ajax_response.responseText,type,$this]);
									$this.find(".pu-submit-button").prop("disabled", false);
								}
							},
						});
						
					});
				},
				edit_profile_event: function () {
					$("form.pu-edit-profile-form").on("submit", function (e) {
						e.preventDefault();
						var $this = $(this); 
						console.log($this);
						$.extend($.validator.messages, {
							required: pu_reg_params.message_required_fields,
							email: pu_reg_params.message_email_fields,
						});
						if (!$this.valid()) {
							return;
						}
						$this.find(".pu-edit-submit-button").prop("disabled", true);
						
						var form_data = {};
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
							action: "pu_update_profile_details",
							security: pu_reg_params.pu_profile_details_save,
							form_data: form_data,
						};

						$this.find(".pu-edit-submit-button").addClass("loading"); 
						$.ajax({
							type: "POST",
							url: pu_reg_params.ajax_url,
							dataType: "JSON",
							data: data,
							complete: function (ajax_response) { 
								$this.find(".pu-edit-submit-button").removeClass("loading");
								$this.closest(".pxl-pu-my-account-wrap").find(".pu-error").remove();
								$this.closest(".pxl-pu-my-account-wrap").find(".pu-message").remove();
								var message = $('<ul/>');
								var type = "error";

								try{
									var response = JSON.parse(ajax_response.responseText);
 
									if ( typeof response.success !== "undefined" && response.success === true) {
										type = "message";
									}
									if ( !response.data.hasOwnProperty( "message" ) || !response.data.message.hasOwnProperty( "individual" )) {
										if (typeof response.data.message === "object") {
											$.each(
												response.data.message,
												function (index,value) {
													message.append("<li>" + value + "</li>");
												}
											);
										} else {
											message.append("<li>" + response.data.message + "</li>");
										}
										 
										
									}
								} catch (e) {
									message.append("<li>" + e.message + "</li>");
								}

								form.show_message(message, type, $this, "0"); // 0 = top, 1 = bottom
								$(window).scrollTop($this.closest(".pxl-frontend-form").offset().top);
								$(document).trigger("pu_edit_profile_after_ajax_complete",[ajax_response.responseText,type,$this]);
								$this.find(".pu-edit-submit-button").prop("disabled", false);
							}
						});
					});
				}
			}
			events.init();
		}
		 
		$(".pu-submit-button").on("click", function () {
			$(this).closest("form.pu-reg-form").pu_form_submission();
		});
		$(".pu-edit-submit-button").on("click", function () {
			$(this).closest("form.pu-edit-profile-form").pu_form_submission();
		});
		/*$(".pu-submit-button").on("click", function () {
			$(this).closest("form.pu-reg-form").pu_form_submission();
		});*/
	}
	//user_registration_form_init();
	/*$(window).on("load", function () {
		user_registration_form_init();
	});*/
	$( document ).ready( function() {
		user_registration_form_init();
	});
	 
})(jQuery);