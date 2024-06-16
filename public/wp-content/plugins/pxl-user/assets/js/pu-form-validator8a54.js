(function ($) {
	var pu_form_selector = $("form.pu-reg-form,form.pu-edit-profile-form");
	var pu_form_validator = {
		$pus: pu_form_selector,
		init: function () {
			this.add_validation_methods();
			this.load_validation();
			this.$pus.on(
				"input validate change",
				".input-text, select, input:checkbox input:radio",
				this.validate_field
			);
		},
		add_validation_methods: function () { 
			// Validate email addresses.
			$.validator.methods.email = function (value, element) {
				/* https://stackoverflow.com/questions/2855865/jquery-validate-e-mail-address-regex */
				var pattern = new RegExp(
					/^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i
				);
				return this.optional(element) || pattern.test(value);
			};
			/**
			 * Validation for username length.
			 */
			$.validator.addMethod(
				"length_validator",
				function (value, element, param) {
					return value.length <= param;
				},
				$.validator.format('<span class="tt-text">Please enter less than {0} characters.</span>')
			);

			/**
			 * Validation for username validation for special character.
			 */
			$.validator.addMethod(
				"special_character_validator",
				function (value, element) {
					var reg = new RegExp(
						/^(?=.{3,20}$)[a-zA-Z][a-zA-Z0-9_.]*(?: [a-zA-Z0-9]+)*$/
					);
					return this.optional(element) || reg.test(value);
				},
				'<span class="tt-text">'+pu_reg_params.message_username_character_fields+'</span>'
			);
		},
		load_validation: function () {
			if (typeof $.fn.validate === "undefined") {
				return false;
			}
			var $this_node = this;

			$this_node.$pus.each(function () {
				var $this = $(this);  
				var validator_params = $this_node.custom_validation($this);
				//$this_node.custom_validation_messages();
				$this.validate({
					errorClass: "pu-error",
					validClass: "pu-valid",
					rules: validator_params.rules,
					messages: validator_params.messages,
					focusInvalid: false,
					invalidHandler: function (form, validator) {
						if (!validator.numberOfInvalids()) return;

						// Scroll to first error message on submit.
						$(window).scrollTop(
							$(validator.errorList[0].element).offset().top
						);
					},
					errorPlacement: function (error, element) {
						if (element.is(".password_2")) {
							element.parent().after(error);
						} else if ( "radio" === element.attr("type") || "checkbox" === element.attr("type") || "password" === element.attr("type") ) {
							element.parent().parent().parent().append(error);
						}else{
							error.insertAfter(element.parent().parent());
						}
					},
					submitHandler: function (form) {
						if ( $(form).hasClass("register") || ($(form).hasClass("edit-profile") && "yes" === pu_reg_params.ajax_submission_on_edit_profile) ) {
							return false;
						}
						return true;
					}
				});
			});
		},
		validate_field: function (e) {  
			$.extend($.validator.messages, {
				required: '<span class="tt-text">'+pu_reg_params.message_required_fields+'</span>',
				email: '<span class="tt-text">'+pu_reg_params.message_email_fields+'</span>',
				confirmpassword: '<span class="tt-text">'+pu_reg_params.message_confirm_password_fields+'</span>',
			});
			var $this = $(this),
				$parent = $this.closest(".pu-form-row"),
				validated = true,
				validate_required = $parent.is(".validate-required"),
				validate_email = $parent.is(".validate-email"),
				event_type = e.type; 

			if ("input" === event_type) {
				$parent.removeClass(
					"pu-invalid pu-invalid-required-field pu-invalid-email pu-validated"
				);
			}
			if ("validate" === event_type || "change" === event_type) {
				if (validate_required) { //console.log($this.val()+'aaa');
					if ("checkbox" === $this.attr("type") && !$this.is(":checked")) {
						$parent.removeClass("pu-validated").addClass("pu-invalid pu-invalid-required-field");
						validated = false;
					} else if ($this.val() === "") {
						$parent.removeClass("pu-validated").addClass("pu-invalid pu-invalid-required-field");
						validated = false;
					}
				}
				if (validate_email) {
					if ($this.val()) {
						/* https://stackoverflow.com/questions/2855865/jquery-validate-e-mail-address-regex */
						var pattern = new RegExp(
							/^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i
						);
					 	 
						if (!pattern.test($this.val())) {
							$parent
								.removeClass("pu-validated")
								.addClass("pu-invalid pu-invalid-email");
							validated = false;
						}
					}
				}
				if (validated) {
					$parent
						.removeClass("pu-invalid pu-invalid-required-field pu-invalid-email")
						.addClass("pu-validated");
				}
			}
		},
		custom_validation: function (this_node) {
			var rules = {},
				messages = {};

			var user_login_div = this_node.find(".user_login");
			var username_validator = {};
			if ( user_login_div.length && "undefined" !== typeof user_login_div.data("username-length")) {
				username_validator.length_validator = user_login_div.data("username-length");
			}

			if (user_login_div.data("username-character") == "0") {
				username_validator.special_character_validator = user_login_div.data("username-character");
			}
			rules.user_login = username_validator;
 			//console.log(this_node);
			if (this_node.hasClass("edit-password")) {
				rules.password_2 = {
					equalTo: ".password_1",
				};
				messages.password_2 = '<span class="tt-text">'+pu_reg_params.message_confirm_password_fields+'</span>';
			} else if ( this_node.hasClass("register") && this_node.find(".user_confirm_password").length ) {
				rules.user_confirm_password = {
					equalTo: this_node.closest(".pu-reg-form").find('[name="user_pass"]'),
				};
				messages.user_confirm_password = '<span class="tt-text">'+pu_reg_params.message_confirm_password_fields+'</span>';
			}
			return { rules: rules, messages: messages };
		},
		custom_validation_messages: function () {
			// Override default jquery validator messages with our plugin's validation messages.
			$.validator.messages.required = '<span class="tt-text">'+pu_reg_params.message_required_fields+'</span>';
			$.validator.messages.email = '<span class="tt-text">'+pu_reg_params.message_email_fields+'</span>';
			$.validator.messages.confirmpassword = '<span class="tt-text">'+pu_reg_params.message_confirm_password_fields+'</span>';
		},
	}

	//$( document ).ready( function() {
	$(window).on("load", function () {
		pu_form_validator.init();
	});
})(jQuery);