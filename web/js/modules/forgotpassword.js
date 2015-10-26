define(function() {

	//If this order changes, it will affect DB, so don't change unless absolutely necessary!
	var questions = [
		'What is your city of birth?',
		'What is your mother’s maiden name?',
		'What was your first pet’s name?',
		'What is your middle name?',
		'What’s your oldest sibling’s name?'
	]
	
	return {
		initialize: function(signup) {
			if(signup == true) {
				$.each(questions, function(i,v) {
					var html = "<option value='"+(i+1)+"'>"+v+"</option>";
					$('#question-form #question').append(html);
				});
			} else {
				var question = parseInt($('#question').attr('data-question')) - 1;
				$('#question').html(questions[question]);
			}
		}
	}
});