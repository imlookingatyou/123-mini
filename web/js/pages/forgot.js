define(['bootstrap', 'form', 'forgotpassword'], function(BS, Form, FP) {
	//Events to be used within this module are declared here int he following format:
	//{ element: 'CSS SELECTOR', event: 'EVENT', handler: 'FUNCTION TO BE CALLED ON EVENT INITIALISATION' }
	var events = [
		{ element:'#forgot-form', event:'submit', handler:'submit' },
		{ element:'#get-question input[type="button"]', event:'click', handler:'getQuestion' },
	];
	
	var questionSubmit = false;
	var self;
	
	return {
		initialize: function() {
			BS.events(events, this);
			self = this;
		},
		submit: function(e) {
			e.preventDefault();
			if(questionSubmit != true) {
				if($('#username').val() != "") {
					self.getQuestion(true);
				} else {
					var message = "<div id='error'>";
					message += "<ul>";
					message += "<li>Hang on a mo, first type in your username.</li>";
					message += "</ul>";
					message += "</div>";
					
					if($('#error').length > 0) {
						$('#error').replaceWith(message);
					} else {
						$('form').prepend(message);
					}
				}
				questionSubmit = false;
				return false;
			} else {
				if($('#question').html() == "") {
					var message = "<div id='error'>";
					message += "<ul>";
					message += "<li>Hang on a mo, first type in your username.</li>";
					message += "</ul>";
					message += "</div>";

					if($('#error').length > 0) {
						$('#error').replaceWith(message);
					} else {
						$('form').prepend(message);
					}
				} else {
					var data = [
						{title: 'answer', value:$('#answer').val(), type:$('#answer').attr('data-type'), required:true},
					];
	
					var submitForm = Form.submitForm(data);
					if(submitForm.success == 1) {
						data = submitForm.data;
						$.ajax({
							type: 'post',
							data: data,
							dataType: 'json',
							url: '/ajax/answercheck',
							async: false,
							success: function(response, status) {
								if(response.success == 1) {
									BS.changePage('/reset', 'Reset Password');
								} else {
									var message = "<div id='error'>";
									message += "<ul>";
									message += "<li>Hmmm, that wasn’t quite right. Please try again.</li>";
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
						console.log(submitForm.error);
						var message = "<div id='error'>";
						message += "<ul>";
						$.each(submitForm.error, function(i,v) {
							message += "<li>";
							if(v.reason == "required") {
								message += "Hold on a mo, first type in your answer.";
							}
							message += "</li>";
						});
						message += "</ul>";
					
						if($('#error').length > 0) {
							$('#error').replaceWith(message);
						} else {
							$('form').prepend(message);
						}
					}
				}
			}
		},
		getQuestion: function(e) {
			if(e.type == "click" || e.keyCode == 13 || e == true) {
				var data = [
					{title: 'username', value:$('#username').val(), type:$('#username').attr('data-type'), required:true},
				];
				
				var submitForm = Form.submitForm(data);
				console.log(submitForm);
				if(submitForm.success == 1) {
					data = submitForm.data;
					$.ajax({
						type: 'post',
						data: data,
						dataType: 'json',
						url: '/ajax/getquestion',
						async: false,
						success: function(response, status) {
							if(response.success == 1) {
								$('#question').attr('data-question', response.question);
								FP.initialize();
								$('#question-section').fadeIn(500);
								if($('#error').length > 0) {
									$('#error').remove();
								}
								questionSubmit = true;
							} else {
								var message = "<div id='error'>";
								message += "<ul>";
								message += "<li>Hmmm we can’t seem to find your username.</li>";
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
					$.each(submitForm.error, function(i,v) {
						message += "<li>";
						if(v.reason == "required") {
							message += "Hang on a mo, first type in your username.";
						} else {
							var message = "<div id='error'>";
							message += "<p>Hmmm we can’t seem to find your username.</p>";
							message += "</div>";
			
							if($('#error').length > 0) {
								$('#error').replaceWith(message);
							} else {
								message += "Incorrect value entered";
							}
						}
						message += "</li>";
					});
					message += "</ul>";
				
					if($('#error').length > 0) {
						$('#error').replaceWith(message);
					} else {
						$('form').prepend(message);
					}
				}
			}
		}
	}
});