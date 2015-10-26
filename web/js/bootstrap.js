define(['jquery'], function($) {
	return {
		events: function(events, target) {
			//This function sets up the events utilising the jQuery "on" function
			//It takes an array of events, in the format shown above, and a target which relates
			//to the module that is handling the events.  The target is passed using "this".
			$.each(events, function(i, v) {
				//First we check if the selector part of the "on" function has been passed
				if(typeof(v.selector) !== "undefined") {
					//Then we check to see if the event handler passed is a reference to a function
					//or an actual function
					if(typeof(v.handler) === "function") {
						$(v.element).on(v.event, v.selector, v.handler);
					} else {
						$(v.element).on(v.event, v.selector, target[v.handler]);
					}
				} else {
					if(typeof(v.handler) === "function") {
						$(v.element).on(v.event, v.handler);
					} else {
						$(v.element).on(v.event, target[v.handler]);
					}
				}
			});
		},
		unbind: function(event, target) {
			//This function removes an event from the DOM.  It takes an event in the same object
			//format as above, and is designed to be used by passing an array element from the module.
			if(typeof(event.selector) !== "undefined") {
				if(typeof(event.handler) === "function") {
					$(event.element).off(event.event, event.selector, event.handler);
				} else {
					$(event.element).off(event.event, event.selector, target[event.handler]);
				}
			} else {
				if(typeof(event.handler) === "function") {
					$(event.element).off(event.event, event.handler);
				} else {
					$(event.element).off(event.event, target[event.handler]);
				}
			}
		},
		unbindAll: function(events, target) {
			//This function is a way to remove all events from a module, as opposed to individual
			//events.  This takes the events array defined in each module
			$.each(events, function(i,v) {
				this.unbind(v, target);
			});
		},
		escapeRegex: function(str) {
			//This function is utilised to escape URL strings for the router function that takes
			//place within the main.js file
			return str.replace(/[$-\/?[-^{|}]/g, '\\$&');
		},
		changePage: function(url, title) {
			var		url = url,
					title = title||null;
				
			// Continue as normal for cmd clicks etc
			//if ( event.which == 2 || event.metaKey ) { return true; }
				
			// Ajaxify this link
			History.pushState(null,title,url);
			return false;
		}
	}
});