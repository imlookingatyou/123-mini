define(function() {
	
	return {
		initialize: function() {
			if(typeof(userData.name) != "undefined") {
				$('#name').html(userData.name);
			}
		}
	}
	
});