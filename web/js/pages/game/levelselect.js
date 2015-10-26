define(['bootstrap'], function(BS) {
	var events = [];
	$( ".levelslot" ).click(function() {
		$(this).children('span').css('display','block');
	});
	
	$( ".levelslot" ).hover(
	  function() {
		$(this).children('span').css('display','block');
	  }, function() {
		$(this).children('span').css('display','none');
	  }
	);
	
	return {
		initialize: function() {
			BS.events(events, this);
			
		}
	}
});