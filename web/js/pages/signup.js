define(['bootstrap', 'form'], function(BS, Form) {
	//Events to be used within this module are declared here int he following format:
	//{ element: 'CSS SELECTOR', event: 'EVENT', handler: 'FUNCTION TO BE CALLED ON EVENT INITIALISATION' }
	var events = [
		{ element:'#signup-form', event:'submit', handler:'submit' },
		{ element:'#continuebutton a', event:'click', handler:'skipSave' }
	];
	
	return {
		initialize: function() {
			BS.events(events, this);
			Form.initialize();
		},
		submit: function(e) {
			e.preventDefault();
			var data = [
				{title: 'username', value:$('#username').val(), type:$('#username').attr('data-type'), required:true},
				{title: 'password', value:$('#password').val(), type:$('#password').attr('data-type'), required:true},
				{title: 'retype', value:$('#retype').val(), type:$('#retype').attr('data-type'), required:true},
			];

			var submitForm = Form.submitForm(data);
			if(submitForm.success == 1 && Form.passwordCheck(data[1].value, data[2].value) == true) {
				var data = $.extend(userData, submitForm.data);
				data.ajax = true;
				$.ajax({
					type: 'post',
					data: data,
					dataType: 'json',
					url: $('#signup-form').attr('action'),
					async: false,
					success: function(response, status) {
						if(response.success == 1) {
							BS.changePage('/secretquestion', 'Secret Question');
						} else {
							var message = "<div id='error'>";
							message += "<ul>";
							message += "<li>Uh oh! Someone else has chosen your username.</li>";
							message += "</ul>";
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
								case 'username':
									message += "Hang on a mo, first type in your username.";
									break;
								case 'password':
									message += "Not so fast, first type in your password.";
									break;
								case 'retype':
									message += "Not so fast, first retype your password.";
									break;
								default:
									message += "Hang on a mo, first type in your username.";
									break;
							}
						} else {
							if($("#"+v.field).attr('data-type') == "username") {
								message += "Woops! You only need numbers and letters in your username.";
							} else {
								message += "Hold on, your password is not allowed";
							}
						}
						message += "</li>";
					});
				}
				if(Form.passwordCheck(data[1].value, data[2].value) == false && data[1].value != "" && data[2].value != "") {
					message += "<li>Oops your passwords don’t match. Try again.</li>"
				}
				message += "</ul>";
				
				if($('#error').length > 0) {
					$('#error').replaceWith(message);
				} else {
					$('form').prepend(message);
				}
			}
		},
		skipSave: function(e) {
			e.preventDefault();
			signedup = true;
			BS.changePage('/calculator', 'Calculator');
		}
	}
});