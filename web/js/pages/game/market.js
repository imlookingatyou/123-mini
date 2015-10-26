define(['bootstrap'], function(BS) {

	var events = [
		{ element:'.carouselitem a.unlock', event:'click', handler:'buyItem' },
		{ element:'.carouselitem a.wearnow', event:'click', handler:'equipItem' },
		{ element:'.arrl', event:'click', handler:'marketLeft' },
		{ element:'.arrr', event:'click', handler:'marketRight' }
	];

	var numberofcarouselitems;
	var itemwidth;
	var maxsize;
	var viewport;
	var moving;
	
	var self;

	function turnarrowon(direction) {
		$('.arr'+direction).css('visibility','visible');
		//console.log('toggling arrow "'+direction+'" on');
	}
	
	function turnarrowoff(direction) {
		$('.arr'+direction).css('visibility','hidden');
		//console.log('toggling arrow "'+direction+'" off');
	}
	
	return {
		initialize: function() {
			BS.events(events, this);
			numberofcarouselitems = $(".carouselitem").length;
			itemwidth = $('.carouselitem').outerWidth(true);
			console.log(itemwidth);
			maxsize = numberofcarouselitems*itemwidth;
			viewport = $('.mc_viewport').width();
			moving = false;
			$('.carouselitemholder').css('width',maxsize);
			turnarrowoff('l');
			self = this;
		},
		buyItem: function(e) {
			e.preventDefault();
			var accessory = $(this).parent().parent().data('accessory');
			$.ajax({
				type: 'post',
				data: { 'accessory':accessory },
				dataType: 'json',
				url: '/ajax/game/buyitem',
				success: function(response, status) {
					if(response.success == 1) {
						$('.coins').html(response.coins);
						if(typeof(userData.coins) != "undefined") {
							userData.coins = response.coins;
						}
						var img = $('.carouselitem[data-accessory='+accessory+'] img').attr('src').replace('_locked', '');
						$('.carouselitem[data-accessory='+accessory+'] img').attr('src', img);
						if(response.type == "key") {
							$('.carouselitem[data-accessory='+accessory+'] span').html('Level unlocked!');
							var baseLevel = $('.carouselitem[data-accessory='+accessory+']').data('level');
							$('.carouselitem').each(function(i, v) {
								if($(this).data('level') == baseLevel + 1) {
									var img = $(this).find('img').attr('src').replace('_locked', '');
									$(this).find('img').attr('src', img);
									var price = $(this).data('price');
									if(response.coins < price) {
										$(this).find('span').html('<br/>'+price);
									} else {
										$(this).find('span').html('<a href="#" class="no-ajaxy unlock">Buy now<br/>'+price+'</a>');
									}
								}
							});
							
							if(typeof(userData.level) != "undefined") {
								userData.level = baseLevel + 1;
							}
						} else {
							$('.carouselitem[data-accessory='+accessory+'] span').html('<a href="#" class="no-ajaxy wearnow">Wear now</a>');
						}
						BS.events(events, self);
					} else {
						var message = "<div id='error'>";
						if(typeof(response.reason) != "undefined") {
							message += "<p>"+response.reason+"</p>";
						} else {
							message += "<p>An error occurred, please try again</p>";
						}
						message += "</div>";
						$('#error').replaceWith(message);
						console.log(message);
					}
				}
			});
		},
		equipItem: function(e) {
			e.preventDefault();
			var accessory = $(this).parent().parent().data('accessory');
			console.log(accessory);
			console.log($(this));
			$.ajax({
				type: 'post',
				data: { 'accessory':accessory },
				dataType: 'json',
				url: '/ajax/game/equipitem',
				success: function(response, status) {
					if(response.success == 1) {
						if(typeof(userData.accessories) != "undefined") {
							userData.accessories = accessory;
						}
						$('.carouselitem').each(function(i, v) {
							if($(this).data('accessory') == accessory) {
								$(this).find('span').html('Wearing');
							} else {
								if($(this).find('span').html() == "Wearing") {
									$(this).find('span').html('<a href="#" class="no-ajaxy wearnow">Wear now</a>');
									BS.events(events, self);
								}
							}
						});
					} else {
						var message = "<div id='error'>";
						if(typeof(response.reason) != "undefined") {
							message += "<p>"+response.reason+"</p>";
						} else {
							message += "<p>An error occurred, please try again</p>";
						}
						message += "</div>";
						$('#error').replaceWith(message);
					}
				}
			});
		},
		marketLeft: function(e) {
			if(!moving) {
				moving = true;
				var widthtomove = $('.carouselitem').outerWidth(true);
				var currentpos = parseInt( $('.carouselitemholder').css('left') );
				if((currentpos!=0)&&(currentpos<0)) {
					$('.carouselitemholder').animate({"left": '+='+widthtomove},500, function() { moving = false; });
					currentpos = parseInt( $('.carouselitemholder').css('left'))+widthtomove;
					//console.log('pos:'+currentpos);
					var currentvisibleitem = ( Math.round(((currentpos*-1)+viewport)/itemwidth) ) ;
					if (currentpos==0) { turnarrowoff('l'); } else { turnarrowon('l'); }
					//console.log(currentvisibleitem);
					//console.log(numberofcarouselitems);				
					if (currentvisibleitem < numberofcarouselitems) { turnarrowon('r'); } else { turnarrowoff('r'); }
				} else {
					moving = false;
				}
			}
		},
		marketRight: function(e) {
			if(!moving) {
				moving = true;
				var widthtomove = $('.carouselitem').outerWidth(true);
				var currentpos = parseInt( $('.carouselitemholder').css('left') );
				var currentvisibleitem = ( Math.round(((currentpos*-1)+viewport)/itemwidth) ) ;
				if (currentvisibleitem < numberofcarouselitems) {
					$('.carouselitemholder').animate({"left": '-='+widthtomove},500, function() { moving = false; });
					currentpos = parseInt( $('.carouselitemholder').css('left'))-widthtomove;
					currentvisibleitem = ( Math.round(((currentpos*-1)+viewport)/itemwidth) ) ;
					//console.log('pos:'+currentpos);
					if (currentpos<0) { turnarrowon('l'); } else { turnarrowoff('l'); }
					if (currentvisibleitem == numberofcarouselitems) { turnarrowoff('r'); } else { turnarrowon('r'); }
					//console.log(currentvisibleitem);
					//console.log(numberofcarouselitems);
				} else {
					moving = false;
				}
			}
		}
	}
});