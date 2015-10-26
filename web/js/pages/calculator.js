define(['character', 'glossary', 'help'], function(Character, Glossary, Help) {
	
return {
	initialize: function() {
		Glossary.initialize();
		Character.initialize();
		Help.initialize();
		if(typeof(userData.head) != "undefined") {
			Character.setHeadSkinChange(parseInt(userData.head), parseInt(userData.gender));
			Character.setHairChange(parseInt(userData.hair), parseInt(userData.gender));
			Character.setShoesChange(parseInt(userData.shoes), parseInt(userData.gender));
			Character.setBottomChange(parseInt(userData.bottom), parseInt(userData.gender));
			if(typeof(userData.accessories) != "undefined") {
				$('.accessory').css('background-image', 'url("/img/character/accessories/acc'+userData.accessories+'.png")');
				if(userData.accessoryType != "hat") {
					$('.accessory').addClass('face');
				}
			}
		} else {
			Character.setHeadSkinChange(1,0);
			Character.setHairChange(1,0);
			Character.setShoesChange(1,0);
			Character.setBottomChange(1,0);
			$('#button-menu').css('background-image', 'url(/img/calculator/btn-home.png)');
			$('#button-menu a').attr('href', '/menu');
			$('#agecontainer').css('display', 'none');
		}
		
		$('#close-play-sign').click(function(e) {
			$('#play-sign').css('display', 'none');
		});
	}
}

});