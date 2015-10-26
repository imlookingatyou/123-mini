/*//////////////////////////////////////////////////////

Modules to be used in a page should be referenced 
in the define call, like the example module below.
Any page specific javascript can be contained within 
this file as well.

//////////////////////////////////////////////////////*/

define(['bootstrap'], function(BS) {
	
	var events = [
		//Example event below!
		//{ element:'#closeprompt', event:'click', handler:'closePrompt' },
	];
	
	return {
		initialize: function() {
			BS.events(events, this);
			
		}
	}
});