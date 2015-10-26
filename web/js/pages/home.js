/*//////////////////////////////////////////////////////

Modules to be used in a page should be referenced 
in the define call, like the example module below.
Any page specific javascript can be contained within 
this file as well.

//////////////////////////////////////////////////////*/

define(['bootstrap'], function(BS) {
	
	var events = [
		{ element:'#closeprompt', event:'click', handler:'closePrompt' },
	];
	
	return {
		initialize: function() {
			BS.events(events, this);
			var userAgent = navigator.userAgent;
			var image = false;
			if(userAgent.match(/iPhone/i) || userAgent.match(/iPad/i)) {
				if (window.navigator.standalone != true) {
					if(userAgent.match(/OS 6_/i)) {
						image = "/img/ios6-save-home.png";
					} else {
						image = "/img/iphone-save-home.png";
					}
				}
			} else if(userAgent.match(/Android/i)) {
				if (window.navigator.standalone != true) {
					image = "/img/android-save-home.png";
				}
			}
			
			if(image != false) {
				$('#prompt-icon img').attr('src', image);
				$('#webappprompt').css('display','block');
			}
			if(/mobile/i.test(navigator.userAgent)) {
				setTimeout(function() {
					window.scrollTo(0, 1); 
				}, 1000); 
				
				if(userAgent.match(/iPhone/i)) {
					var height = screen.availWidth - (screen.height - screen.availHeight);
					$('meta[name="viewport"]').attr('content', 'width=device-width, height='+height+', minimum-scale=1.0, maximum-scale=1.0, user-scalable=no');
				}
			}
		},
		closePrompt: function(e) {
			e.preventDefault();
			$('#webappprompt').css('display', 'none');
		}
	}
});