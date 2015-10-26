define(['jquery', 'bootstrap', 'analytics'], function($, BS, GA) {
	
	var events = [
		{ element:'#button-tips a', event:'click', handler:'open' },
		{ element:'#glossaryClose', event:'click', handler:'close' },
		{ element:'#glossary .item a', event:'click', handler:'toggleItem' }
	];
	
	var tips = [
		{'title':'Goal reached!', 'body':'Whoop! Whoop! <br />Well done, you’ve reached your savings target'},
		{'title':'Well done!', 'body':'You reached X% Interest by being a good saver.<br />What is interest? It’s extra money we pay you for choosing to save with us.'},
		[
			{'title':'Savings a little slow?', 'body':'Why not help by washing the dishes for a few extra pennies?'},
			{'title':'Savings a little slow?', 'body':'Why not wash the car for a little extra money?'},
			{'title':'Savings a little slow?', 'body':'Why not sell some old toys for a few more pounds?'}
		],
		{'title':'Drag your avatar', 'body':'If you drag up your Mini Me it will increase in age and show you how many savings and how much interest you will earn over time!'}
	];
	
	var timer;
	var dragTimer = false;
	//time between random tips in seconds
	var randomTipTime = 120;
	var activeTip = false;
	
	return {
		initialize: function() {
			BS.events(events, this);
			this.setTimer();
			this.setDragTimer();
			$('#glossary').css('width', '0%');
		},
		open: function(e) {
			if(typeof(e) != "undefined") {
				e.preventDefault();
			}
			$('#glossary, #glossary div').css('opacity', '1');
			$('#glossary').css('width', '');
			$('#button-tips').css('background-image', 'url(/img/calculator/btn-tips-out.png)');
			$('#button-tips').removeClass('flash');
			stopLightEffect();
			if(activeTip == true) {
				$('#tips').addClass('active');
				$('#tips a').addClass('active');
				$('#tips .description').css('max-height','300px');
				activeTip = false;
			}
			
			GA.trackEvent('Calculator Page', 'Glossary Opened', '');
		},
		close: function(e) {
			e.preventDefault();
			$('#glossary, #glossary div').css('opacity', '0');
			$('#glossary').css('width', '0%');
			$('.item a').each(function(i, v) {
				if($(this).hasClass('active')) {
					$(this).removeClass('active');
					$(this).closest('.item').removeClass('active');
					$(this).closest('.title').next('.description').css('max-height','0px');
				}
			});
		},
		toggleItem: function(e) {
			e.preventDefault();
			if($(this).hasClass('active')) {
				$(this).removeClass('active');
				$(this).closest('.item').removeClass('active');
				//$(this).closest('.title').next('.description').animate({'height':'0'}, 500);
				$(this).closest('.title').next('.description').css('max-height','0px');
			} else {
				$('.item a').each(function(i, v) {
					if($(this).hasClass('active')) {
						$(this).removeClass('active');
						$(this).closest('.item').removeClass('active');
						$(this).closest('.title').next('.description').css('max-height', '0px');
					}
				});
				var height = $(this).closest('.title').next('.description').children('p').outerHeight(true);
				// $(this).closest('.title').next('.description').animate({'height':height+'px'}, 500);
				$(this).closest('.title').next('.description').css('max-height','300px');
				$(this).addClass('active');
				$(this).closest('.item').addClass('active');
			}
		},
		highlightTip: function(tip, extra) {
			var tipNum = tip;
			if(typeof(tip) == "number") {
				tip = tips[tip];
			}
			if(typeof(extra) != "undefined" && tipNum == 2) {
				tip = tip[extra];
			}
			
			var title = tip.title;
			var body = tip.body;
			if(tipNum == 1) {
				body = body.replace("X%", extra+"%");
			}
			
			$('#tips .title h4').html(title);
			$('#tips .description p').html(body);
			
			playLightEffect();
			$('#button-tips').addClass('flash');
			$('#button-tips').bind('webkitAnimationEnd', function() {
				$(this).css('background-image', 'url(/img/calculator/btn-tips-over.png)');
				$(this).removeClass('flash');
				stopLightEffect();
			});
			activeTip = true;
			this.resetTimer();
		},
		setTimer: function() {
			var self = this;
			var randomTipTimeMS = randomTipTime * 1000;
			timer = setTimeout(function() {
				self.highlightTip(2, Math.floor(Math.random() * 2));
			}, randomTipTimeMS);
		},
		resetTimer: function() {
			clearTimeout(timer);
			this.setTimer();
		},
		setDragTimer: function() {
			var self = this;
			dragTimer = setTimeout(function() {
				self.highlightTip(3);
			}, 30000);
		}, 
		disableDragTimer: function() {
			if(dragTimer != false) {
				clearTimeout(dragTimer);
				dragTimer = false;
			}
		}
	}
});