define(['bootstrap', 'form'], function(BS, Form) {
	//Events to be used within this module are declared here int he following format:
	//{ element: 'CSS SELECTOR', event: 'EVENT', handler: 'FUNCTION TO BE CALLED ON EVENT INITIALISATION' }
	var events = [
		
	];
	
	return {
		initialize: function() {
			BS.events(events, this);
			if(typeof(userData.goals) != "undefined") {
				$.each(userData.goals, function(i, v) {
					if(v == false || v == "false") {
						$('#goal'+(i+1)+'image').find('img').attr('src','/img/goals/no-goal-icon.png');
						$('#goal'+(i+1)+'description').html('');
						$('#goal'+(i+1)+'price').html('');
					} else {
						$('#goal'+(i+1)+'image').parent().addClass('active');
						$('#goal'+(i+1)+'image').find('img').attr('src','/img/goals/goal-'+v.icon+'.png');
						$('#goal'+(i+1)+'description').html(v.name);
						$('#goal'+(i+1)+'price').html('£'+v.cost);
					}
				});
			}
			if(signedup == true) {
				$('#nextbutton a').attr('href','/menu')
			}
		},
	}
});