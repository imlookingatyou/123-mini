define(['bootstrap', 'form', 'calculator'], function(BS, Form, Calculator) {
	//Events to be used within this module are declared here int he following format:
	//{ element: 'CSS SELECTOR', event: 'EVENT', handler: 'FUNCTION TO BE CALLED ON EVENT INITIALISATION' }
	var events = [
		{ element:'#goal-form', event:'submit', handler:'submit' },
		{ element:'input[type="radio"]', event:'change', handler:'checkboxChange' },
		{ element:'#acc-prev', event:'click', handler:'prevAccessories' },
		{ element:'#acc-next', event:'click', handler:'nextAccessories' }
	];
	
	function getGoalNum() {
		var goal = History.getState().url.replace(History.getRootUrl()+"goals/", "");
		return goal;
	}
	
	return {
		initialize: function() {
			BS.events(events, this);
			Form.initialize();
			$('input[type="radio"]').css('opacity', '0');
			$('input[type="radio"]').each(function(i,v) {
				if($(this).is(":checked")) {
					$(this).next('label').find('img').css('border', '2px solid #ffffff');
				}
			});
			
			var availWidth = $('#icons').width();
			var iconWidth = (availWidth / 6);
			$('#icons label').width(iconWidth);
			var width = (iconWidth * $('#icons img').length);
			$('#iconContainer').width(width);
			var goal = getGoalNum();
			if(typeof(userData.goals) != "undefined") {
				if(typeof(userData.goals[(goal-1)]) != "undefined" && userData.goals[(goal-1)] != false && userData.goals[(goal-1)] != "false") {
					$('#name').val(userData.goals[(goal-1)].name);
					$('#cost').val(userData.goals[(goal-1)].cost);
					$('#icon-1').prop('checked', false);
					$('#icon-'+userData.goals[(goal-1)].icon).prop('checked', true);
					$('#name').prev('span').css('visibility', 'hidden');
					$('#cost').prev('span').css('visibility', 'hidden');
					$('#icon-1').next('label').find('img').css('border', 'none');
					$('#icon-'+userData.goals[(goal-1)].icon).next('label').find('img').css('border', '2px solid #ffffff');
				} else {
					$('#name').prev('span').css('visibility', 'visible');
					$('#cost').prev('span').css('visibility', 'visible');
				}
			}
		},
		checkboxChange: function(e) {
			$this = $(e.target);
			$('input[type="radio"]').each(function(i,v) {
				$(this).next('label').find('img').css('border', 'none');
			});
			$this.next('label').find('img').css('border', '2px solid #ffffff');
		},
		prevAccessories: function(e) {
			e.preventDefault();
			var curr = parseInt($('#iconContainer').css('margin-left'));
			var width = $('#icons').width();
			var containerWidth = $('#iconContainer').width();
			if(curr != 0) {
				var left = curr + width;
				if(left > 0) {
					left = 0;
				}
				$('#iconContainer').css('margin-left', left+"px");
			}
		},
		nextAccessories: function(e) {
			e.preventDefault();
			var curr = parseInt($('#iconContainer').css('margin-left'));
			var width = $('#icons').width();
			var containerWidth = $('#iconContainer').width();
			if(curr != (-containerWidth + width)) {
				var left = curr - width;
				if(left < (-containerWidth + width)) {
					left = (-containerWidth + width);
				}
				$('#iconContainer').css('margin-left', left+"px");
			}
		},
		submit: function(e) {
			var self = this;
			e.preventDefault();
			var data = [
				{title: 'name', value:$('#name').val(), type:$('#name').attr('data-type'), required:true},
				{title: 'cost', value:$('#cost').val(), type:$('#cost').attr('data-type'), required:true},
				{title: 'icon', value:$('input:radio[name=icon]:checked').val(), type:$('input:radio[name=icon]').attr('data-type'), required:true},
				{title: 'goal', value:getGoalNum, type:'auto', required:true}
			];
			
			// max description: 20 chars
			data[0].value = data[0].value.substring( 0, 20 );
			
			var submitForm = Form.submitForm(data);
			if(submitForm.success == 1) {
				var saveData = submitForm.data
				if(loggedin) {
					saveData.id = userData.id;
					$.ajax({
						type: 'post',
						data: saveData,
						dataType: 'json',
						url: $('#goal-form').attr('action'),
						success: function(response, status) {
							if(response == 1) {
								goal = getGoalNum();
								userData.goals[(goal-1)] = submitForm.data;
								BS.changePage('/goals', 'Goals');
							} else {
								var message = "<div id='error'>";
								message += "<p>An error occurred, please try again</p>";
								message += "</div>";
								if($('#error').length > 0) {
									$('#error').replaceWith(message);
								} else {
									$('form').prepend(message);
								}
							}
						}
					});
				} else {
					goal = getGoalNum();
					if(typeof(userData.goals) == "undefined") {
						userData.goals = new Array(false, false, false);
					}
					userData.goals[(goal-1)] = submitForm.data;
					BS.changePage('/goals', 'Goals');
				}
			} else {
				var message = "<div id='error'>";
				message += "<ul>";
				$.each(submitForm.error, function(i,v) {
					message += "<li>";
					switch( v.reason ) {
						case "required" :
							if($("#"+v.field).attr('data-type') == "goal") {
								message += "Not so fast, first type in what you’re saving for.";
							} else if($("#"+v.field).attr('data-type') == "price") {
								message += "Woops! First type in the cost of your item.";
							} else {
								message += "Not so fast, you need to enter a value."
							}
							break;
						case "toobig" :
							message += "The maximum cost is " + Calculator.getGoalMaxTotal();
							break;
						default :
							if($("#"+v.field).attr('data-type') == "text") {
								message += "Wait a sec, you only need numbers and letters of the alphabet here.";
							} else if($("#"+v.field).attr('data-type') == "price") {
								message += "Hold up, you only need numbers for this bit.";
							} else {
								message += "Wait a sec, you can't type that.";
							}
							break;
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
		}
	}
});