define(['jquery', 'bootstrap'], function($, BS) {
	
	//Events to be used within this module are declared here int he following format:
	//{ element: 'CSS SELECTOR', event: 'EVENT', handler: 'FUNCTION TO BE CALLED ON EVENT INITIALISATION' }
	var events = [
		{ element:'h2', event:'click', handler:'exampleHandler' },
		{ element:'h4', event:'click', handler:function(e) { console.log('test'); } }
	];
	
	return {
		initialize: function() {
			BS.events(events, this);
		},
		exampleHandler: function(e) {
			console.log('Example.js exampleHandler function');
			BS.unbind(events[0], this);
		}
	}
});