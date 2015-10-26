define(function() {
	
	return {
		trackEvent: function(category, action, label) {
			_gaq.push(['_trackEvent', category, action, label]);
		}
	}
});