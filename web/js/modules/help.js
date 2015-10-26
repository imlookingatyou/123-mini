define(['bootstrap'], function(BS) {
	
	var events = [
		{ element:'#button-help a', event:'click', handler:'open' },
		{ element:'#close-help', event:'click', handler:'close' },
		{ element:document, event:'keyup', handler:'closeEscKey' },
	];
	
	return {
		initialize: function() {
			BS.events(events, this);
			setTimeout(this.open, 250);
		},
		open: function(e) {
			if(typeof(e) != "undefined") {
				e.preventDefault();
				$('#help').fadeIn(250);
			} else {
				if(helpseen == false) {
					helpseen = true;
					$('#help').fadeIn(250);
				}
			}
		},
		close: function(e) {
			e.preventDefault();
			$('#help').fadeOut(250);
		},
		closeEscKey: function(e){
			//console.log('esc key pressed');
			if (e.keyCode == 27) {
				$('#help').fadeOut(250);
			 }
		}
	}
	
});