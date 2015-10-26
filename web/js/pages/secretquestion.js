define(['bootstrap', 'form', 'forgotpassword'], function(BS, Form, FP) {
	var events = [
		{ element:'#question-form', event:'submit', handler:'submit' },
	];
	
	return {
		initialize: function() {
			BS.events(events, this);
			Form.initialize();
			FP.initialize(true);
		},
		submit: function(e) {
			e.preventDefault();
			var data = [
				{title: 'question', value:$('#question').val(), type:$('#question').attr('data-type'), required:true},
				{title: 'answer', value:$('#answer').val(), type:$('#answer').attr('data-type'), required:true},
			];

			var submitForm = Form.submitForm(data);
			if(submitForm.success == 1) {
				var data = $.extend(userData, submitForm.data);
				data.ajax = true;
				$.ajax({
					type: 'post',
					data: data,
					dataType: 'json',
					url: $('#question-form').attr('action'),
					async: false,
					success: function(response, status) {
						if(response.success == 1) {
							loggedin = true;
							userData.id = response.userId;
							BS.changePage('/calculator', 'Calculator');
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
				console.log(submitForm.error);
				var message = "<div id='error'>";
				message += "<ul>";
				$.each(submitForm.error, function(i,v) {
					message += "<li>";
					if(v.reason == "required") {
						message += "Not so fast, first type in your answer.";
					} else {
						if($("#"+v.field).attr('data-type') == "text") {
							message += "Only letters and spaces are allowed";
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
});