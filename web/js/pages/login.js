define(['bootstrap', 'form'], function(BS, Form) {
	//Events to be used within this module are declared here int he following format:
	//{ element: 'CSS SELECTOR', event: 'EVENT', handler: 'FUNCTION TO BE CALLED ON EVENT INITIALISATION' }
	var events = [
		{ element:'#login', event:'submit', handler:'submit' },
	];
	
	function login(data, url) {
		$.ajax({
			type: 'post',
			data: data,
			dataType: 'json',
			url: url,
			async: false,
			success: function(response, status) {
				loginHandler(response);
			},
			error: function(response, status) {
				//console.log('error');
				loginHandler({success: 0, error: 1});
			}
		});
	}
	
	function loginHandler(response) {
		if(response.success == 1) {
			userData = response.data;
			loggedin = true;
			helpseen = true;
			BS.changePage('/menu', 'Menu');
		} else {
			var message = "<div id='error'>";
			message += "<ul>";
			if(response.error == 1) {
				message += "<li>Hmmm we can’t seem to find you, please try again.</li>";
			} else {
				message += "<li>Oops, something went wrong.  Please try again.</li>";
			}
			message += "</ul>";
			message += "</div>";
			
			if($('#error').length > 0) {
				$('#error').replaceWith(message);
			} else {
				$('form').prepend(message);
			}
			
		}
	}
	
	return {
		initialize: function() {
			BS.events(events, this);
			Form.initialize();
		},
		submit: function(e) {
			e.preventDefault();
			var data = [
				{title: 'username', value:$('#username').val(), type:$('#username').attr('data-type'), required:false},
				{title: 'password', value:$('#password').val(), type:$('#password').attr('data-type'), required:false}
			];
			var submitForm = Form.submitForm(data)
			if(submitForm.success == 1) {
				login(submitForm.data, $('#login-form').attr('action'));
			} else {
				var message = "<div id='error'>";
				message += "<ul>";
				if(submitForm.error == 1) {
					message += "<li>Hmmm we can’t seem to find you, please try again.</li>";
				} else {
					message += "<li>Oops, something went wrong.  Please try again.</li>";
				}
				message += "</ul>";
				message += "</div>";
			
				if($('#error').length > 0) {
					$('#error').replaceWith(message);
				} else {
					$('form').prepend(message);
				}
			}
		}
	}
});