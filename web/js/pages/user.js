define(['bootstrap', 'form'], function(BS, Form) {
	//Events to be used within this module are declared here int he following format:
	//{ element: 'CSS SELECTOR', event: 'EVENT', handler: 'FUNCTION TO BE CALLED ON EVENT INITIALISATION' }
	var events = [
		{ element:'#user-creation', event:'submit', handler:'submit' },
	];
	
	return {
		initialize: function() {
			BS.events(events, this);
			if(typeof(userData.name) != "undefined") {
				$('#name').val(userData.name);
				$('#age').val(userData.age);
				$('#month').val(userData.month);
			}
			$.ajax({
				type:'get',
				url:'/ajax/reset'
			});
		},
		submit: function(e) {
			e.preventDefault();
			var data = [
				{title: 'name', value:$('#name').val(), type:$('#name').attr('data-type'), required:true},
				{title: 'age', value:$('#age').val(), type:$('#age').attr('data-type'), required:true},
				{title: 'month', value:$('#month').val(), type:$('#month').attr('data-type'), required:true}
			];
			
			var submitForm = Form.submitForm(data);
			if(submitForm.success == 1) {
				$.extend(userData, submitForm.data);
				if(loggedin == true) {
					BS.changePage('/menu', 'Menu');
				} else {
					BS.changePage('/character', 'Character');
				}
			} else {
				var message = "<div id='error'>";
				message += "<ul>";
				$.each(submitForm.error, function(i,v) {
					message += "<li>";
					if(v.reason == "required") {
						message += "Hang on a mo, first type in your name.";
					} else {
						if($("#"+v.field).attr('data-type') == "text") {
							message += "Wait a sec, you only need letters of the alphabet here.";
						} else {
							message += "Wait a sec, you can't type that.";
						}
					}
					message += "</li>";
				});
				message += "</ul>";
				message += "</div>";
				
				if($('#error').length > 0) {
					$('#error').replaceWith(message);
				} else {
					$('form').prepend(message);
				}
			}
		},
	}
});