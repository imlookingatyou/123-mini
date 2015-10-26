define(['bootstrap', 'form'], function(BS, Form) {
	
	var events = [
		{ element:'#reset-form', event:'submit', handler:'submit' }
	];
	
	return {
		initialize: function() {
			BS.events(events, this);
		},
		submit: function(e) {
			e.preventDefault();
			var data = [
				{title: 'password', value:$('#password').val(), type:$('#password').attr('data-type'), required:true},
				{title: 'retype', value:$('#retype').val(), type:$('#retype').attr('data-type'), required:true}
			];

			var submitForm = Form.submitForm(data);
			if(submitForm.success == 1 && Form.passwordCheck(data[0].value, data[1].value) == true) {
				data = submitForm.data;
				$.ajax({
					type: 'post',
					data: data,
					dataType: 'json',
					url: $(this).attr('action'),
					async: false,
					success: function(response, status) {
						if(response.success == 1) {
							BS.changePage('/login', 'Login');
						} else {
							var message = "<div id='error'>";
							message += "<p>An error occurred, please try again.</p>";
							message += "</div>";
			
							if($('#error').length > 0) {
								$('#error').replaceWith(message);
							} else {
								$('form').prepend(message);
							}
						}
					},
					error: function(response, status) {
						console.log('error - AJAX send error');
					}
				});	
			} else {
				var message = "<div id='error'>";
				message += "<ul>";
				if(typeof(submitForm.error) != "undefined") {
					$.each(submitForm.error, function(i,v) {
						message += "<li>";
						if(v.reason == "required") {
							switch(v.field) {
								case 'password':
									message += "Not so fast, first type in your new password.";
									break;
								case 'retype':
									message += "Not so fast, first retype your new password.";
									break;
							}
						} else {
							if($("#"+v.field).attr('data-type') == "text") {
								message += "Hold on, you only need numbers and letters of the alphabet here.";
							} else {
								message += "Hold on, your password is not allowed";
							}
						}
						message += "</li>";
					});
				}
				if(Form.passwordCheck(data[0].value, data[1].value) == false && data[0].value != "" && data[1].value != "") {
					message += "<li>Oops your passwords don’t match. Try again.</li>"
				}
				message += "</ul>";
				
				if($('#error').length > 0) {
					$('#error').replaceWith(message);
				} else {
					$('form').prepend(message);
				}
			}
		}
	}
});