define(['glossary'], function(Glossary) {
	var $maxTotal = 55000;
	var goalSteps = [];
	var goalStages = [];
	
	return {
		initialize: function() {
			var $tank = $('#machine-tank-cover');
		
			goalStages = [];
			goalSteps = [];
			if(typeof(userData.goals) != "undefined" && userData.goals.length > 0) {
				$.each(userData.goals, function(i, v) {
					if(typeof(v.icon) != "undefined") {
						goalStages.push({icon: v.icon, cost:v.cost});
						$('#goal'+(goalStages.length)).html("<img src='/img/goals/goal-"+v.icon+"b.png' />");
					}
				});
				
				console.log(goalStages);
				
				var goalsTotal = 0;
				$.each(goalStages, function(i, v) {
					if(v.cost > 0) {
						var perc = ((parseInt(v.cost) + goalsTotal) / $maxTotal) * 100;
						goalsTotal += parseInt(v.cost);
						goalSteps.push(goalsTotal);
						$('#goal-line-'+i).css({
							'bottom': perc+"%",
							'display': 'block'
						});
					}
				});
			}
		},
		checkGoals:function(total) {
			if(goalSteps.length > 0) {
				$.each(goalSteps, function(i, v) {
					if(total > v) {
						$('#goal'+(i+1)+' img').attr('src', '/img/goals/goal-'+goalStages[i].icon+'.png');
						if($('#goal'+(i+1)).hasClass('reached') != true && $('#goal'+(i+1)).hasClass('passed') != true) {
							$('#goal'+(i+1)).addClass('reached');
							$('#goal'+(i+1)).bind('webkitAnimationEnd', function(){
								$('#goal'+(i+1)).removeClass('reached');
								$('#goal'+(i+1)).addClass('passed');
							});
						}
						if($('#goal'+(i+1)).hasClass('passed') != true) {
							playGoalEffect();
							Glossary.highlightTip(0);
						}
					} else {
						$('#goal'+(i+1)+' img').attr('src', '/img/goals/goal-'+goalStages[i].icon+'b.png');
						$('#goal'+(i+1)).removeClass('reached');
						$('#goal'+(i+1)).removeClass('passed');
					}
				});
			}
		}
	}
	
});