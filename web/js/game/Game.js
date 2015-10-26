// interface variables
var _canvas = null;
var _buffer = null;

var canvas = null;
var buffer = null;

// class definition
function Game() {
	var self = this;
	var canvas;
	var context;
	
	var scaleFactor;
	var optimiseForSmallScreen;
	var optimiseForTouchScreen;
	
	var levelId = 1;
	
	var contentManager;
	var soundManager;
	var itemsManager;
	var background;

	var KEYCODE_UP = 38;
	var KEYCODE_DOWN = 40;
	
	var LEVEL_TIME = 45; //in seconds
	var MAX_DISTANCE = 12000;
	
	var STARTING_SPEED_Y = 0;
	var STARTING_SPEED_X = -6;

	var currentScore = 0;
	var currentEnergy = 100;
	var currentDistance = 0;

	var speedYNow = 0;

	var player;
	
	var playingGame = false;
	var timerInterval;
	var timerIntervalCount;
	var timerWarning = false;
	var fps;
	
	var currentMultiplier = 1;
	var multiplierTimer;
	var multiplierPreTimer;
	
	var floatingAlert;

	var iOSStandaloneMode = false;
	var iOSMode = false;
	var touchMode = false;
	var clickMode = false;
	
	var ajaxFinished = false;
	var timeoutFinished = false;
	var finishedTimeoutTime = 3; //in seconds
	
	var scaleFactor;
	
	this.Init = function( level, skinId, hairId, accessoryId )
		{
			levelId = level;
		
			// grab canvas context from the pag e by its id
			canvas = document.getElementById( 'canvas' );
			// make sure the canvas exists
			if( canvas && canvas.getContext ) {
				context = canvas.getContext( '2d' );
				context.fillStyle = '#f00'; // red
				// context.strokeStyle = '#000'; // red
				context.lineWidth = 1;
				context.font = "16pt Verdana";
				context.fillStyle = "blue";
				context.textBaseline = "top";
				
				// create a new stage and point it at our canvas
				stage = new createjs.Stage( canvas );

				// grab canvas width and height for later calculations
				screen_width = canvas.width;
				screen_height = canvas.height;
				// alert( "screen_height " + screen_height );
			} else {
				console.log( "Canvas does not exist!" );
			}
			
			// this is the scale factor in order to scale everything on the canvas down
			// this can also be used to decide if we use different assets for smaller screens
			scaleFactor = screen_height / 600;

			optimiseForSmallScreen = ( scaleFactor <= .5 );
			
			// the game is running on iOS from an "added to homepage" state
			iOSStandaloneMode = ( ( "standalone" in window.navigator ) && window.navigator.standalone );
			// the game is running on Safari for iOS
			iOSMode = ( "standalone" in window.navigator );
			
			// load all the spritesheets
			contentManager = new ContentManager( scaleFactor );
			contentManager.SetDownloadCompleted( onPreloaded );
			contentManager.StartDownload( level, skinId, hairId, accessoryId );

			soundManager = new SoundManager( iOSStandaloneMode, iOSMode );
			// just so it's not annoying while testing... of course comment this out when going live

			$('.game-play #soundbutton' ).on({ 'click' : function( e ){ e.preventDefault(); toggleSound(); } });
			$('.game-play #soundbutton' ).on({ 'touchstart' : function( e ){ e.preventDefault(); toggleSound(); } });
			// soundManager.turnSoundOff();
			
			soundManager.StartDownload();
			if( !iOSStandaloneMode ) {
				soundManager.addToPrependQueueAllAudio();
				//???????????????????? instead??? soundManager.prependAllAudio();
			}
			
			// do level dependant things
			// set level number
			$('#levelnumber').text(level);
			// set sky color
			$('.game-play #background').css("background-image", "url(/img/game/bg-sky-" + level + ".jpg)");
			$('#gamebody #topbar').width($('canvas').width());
			$('#gamebody #topbar').height((($('#gamebody #topbar').width() / parseInt($('#gamebody #topbar').css('max-width'))) * parseInt($('#gamebody #topbar').css('max-height'))));
			// set level specific elements and difficulty variables
			switch( level ) {
				case 1 :
					// only set the tiled bottom for level one, no point on having dummy images for the other two levels
					$('#gamebody .tiledbottom').css("background", "url('/img/game/bg-bottom-1.png') repeat-x");
					$('#gamebody #topbar').css("background-image", "url('/img/game/top-bg.png')");
					break;
				case 2 :
					// same top than first level... yes, I know, we could just get rid of the break up there, but that confuses things
					$('#gamebody #topbar').css("background-image", "url('/img/game/top-bg.png')");
					break;
				case 3 :
					$('#gamebody #topbar').css("background-image", "url('/img/game/top-bg-3.png')");
					break;
			}
			
			 
			//??? fps = new FPSMeter("fpsmeter", document.getElementById("fpscontainer"));
		}
	
	this.Reset = function() {
			currentScore = 0;
			currentEnergy = 100;
			currentDistance = 0;
			currentTime = 100;
		
			stage.removeAllChildren();
			createjs.Ticker.removeAllListeners();
			stage.update();
		}
	
	function checkAudioReady() {
        if (youraudioelement.attr('readyState')) {
            alert("it's ready!");
        } else {
            setTimeout(checkAudioReady, 250);
        }
    }


	function onPreloaded() {
		$('.game-play #initialcover #taptext').css("display", "block");
		
		// touch event for tablets and phones
		$('.game-play #initialcover' ).on({ 'touchstart' : function( e ){
				e.preventDefault();
				touchMode = true;
				soundManager.setDeviceVars( touchMode, !iOSMode );
				// Init adds all prepend audio to the queue with StartDownload already
				if( !iOSMode ) {
					// although check if iOS would benefit from this...
					soundManager.prependAllAudio();
				}
					// checkAudioReady();
				// try to prepend some of the audio
				if( !iOSStandaloneMode ) {
					setTimeout( function(){soundManager.prependNextAudio();}, 100);
					setTimeout( function(){soundManager.prependNextAudio();}, 300);
					setTimeout( function(){soundManager.prependNextAudio();}, 500);
					setTimeout( function(){soundManager.prependNextAudio();}, 700);
				} else {
					//+++ soundManager.prependNextAudio();
					// maybe wait for all the sounds to preload to start the game...
				}
				startGame( true );
			}});
			
		// click event for desktop
		$('.game-play #initialcover' ).on({ 'click' : function( e ){ e.preventDefault(); clickMode = true; startGame( false ); } });
		
		$('.game-play #closebutton' ).on({ 'click' : function( e ){ e.preventDefault(); window.location.href = "/game/results"; } });
		$('.game-play #closebutton' ).on({ 'touchstart' : function( e ){ e.preventDefault(); window.location.href = "/game/results"; } });
		
	}

	function toggleSound() {
		soundManager.toggleSound();
		if( soundManager.soundIsOn ) {
			$('.game-play #soundbutton' ).css("background-image", "url(/img/game/button-sfxon.png)");
		} else {
			$('.game-play #soundbutton' ).css("background-image", "url(/img/game/button-sfxoff.png)");
		}
	}
	
/* this works for Safari on iOS as well, but it depends on loading time... and sometimes they don't load
	function onPreloaded() {
		$('.game-play #initialcover #taptext').css("display", "block");
		// create 
		$('.game-play #initialcover' ).on({ 'touchstart' : function( e ){
		//+++ $('.game-play #initialcover' ).on({ 'touchend' : function( e ){
				e.preventDefault();
				//+++ soundManager.prependAllAudio();
				setTimeout( function(){soundManager.prependAllAudio();}, 300);
				setTimeout( function(){testFunction();}, 500);
				setTimeout( function(){testFunction2();}, 700);
				startGame();
			}});
		//??? $('.game-play #initialcover' ).on({ 'click' : function( e ){ e.preventDefault(); soundManager.prependAllAudio(); startGame(); } });
	}
	function testFunction() {
		soundManager.prependAllAudio2();
	}

	function testFunction2() {
		soundManager.prependAllAudio3();
	}
*/
	
	function startGame( optimiseForTouchScreen ) {

		if( optimiseForTouchScreen ) {
			$( '#bottombackground' ).removeClass( "slowscroll" )
		}
	
		$('.game-play #initialcover').css("display", "none");

		if ( document.addEventListener ) {
			document.addEventListener( "keydown", function( e ){onKeyDown( e )}, false );
			document.addEventListener( "keyup", function( e ){onKeyUp( e )}, false );
		} else {
			// window.document.attachEvent("onkeydown", callkeydownhandler);
			document.onkeydown = onKeyDown;
			document.onkeyup = onKeyUp;
			//+++ window.document.onkeydown = onKeyDown;
			//+++ window.document.onkeyup = onKeyUp;
		}
		
		$( '#buttonup' ).on({ 'touchstart' : function( e ){ e.preventDefault(); soundManager.prependNextAudio(); onKeyPressed( KEYCODE_UP ); } });
		$( '#buttonup' ).on({ 'touchend' : function( e ){ e.preventDefault(); onKeyReleased( KEYCODE_UP ); } });
		$( '#buttondown' ).on({ 'touchstart' : function( e ){ e.preventDefault(); soundManager.prependNextAudio(); onKeyPressed( KEYCODE_DOWN ); } });
		$( '#buttondown' ).on({ 'touchend' : function( e ){ e.preventDefault(); onKeyReleased( KEYCODE_DOWN ); } });
		
		$( '#buttonup' ).on({ 'mousedown' : function( e ){ e.preventDefault(); soundManager.prependNextAudio(); onKeyPressed( KEYCODE_UP ); } });
		$( '#buttonup' ).on({ 'mouseup' : function( e ){ e.preventDefault(); onKeyReleased( KEYCODE_UP ); } });
		$( '#buttondown' ).on({ 'mousedown' : function( e ){ e.preventDefault(); soundManager.prependNextAudio(); onKeyPressed( KEYCODE_DOWN ); } });
		$( '#buttondown' ).on({ 'mouseup' : function( e ){ e.preventDefault(); onKeyReleased( KEYCODE_DOWN ); } });
		
		background = new Background( stage, contentManager, scaleFactor, levelId, screen_width, screen_height );
		itemsManager = new ItemsManager( stage, contentManager, scaleFactor, levelId, optimiseForSmallScreen );
		player = new Player( stage, contentManager, scaleFactor, levelId, 80, screen_height - 50, onVehicleDropped );
		floatingAlert = new FloatingAlert( stage, contentManager, scaleFactor );

		speedYNow = STARTING_SPEED_Y;
		speedXNow = STARTING_SPEED_X;
		
		createjs.Ticker.addListener( window );
		//+++ createjs.Ticker.addListener( this );
		createjs.Ticker.useRAF = true;
		// the FPS will determine how quick things move towards the user, so scale it down as well... not optimal, but would require changing the way things work quite dramatically
		createjs.Ticker.setFPS( Math.ceil( 60 * scaleFactor ) );
		//+++ createjs.Ticker.setFPS( 60 );
		
		player.drop();
	}
	
	function onVehicleDropped() {
		playingGame = true;
		// start timer
		// initialTime = new Date().toLocaleTimeString();
		timerIntervalCount = 0;
		timerInterval = setInterval( function(){ updateTimer()},100 );
	}
	
	function updateTimer() {
		timerIntervalCount+=.1;
		var currentTime = 100 - ( timerIntervalCount * 100 / LEVEL_TIME );
		$('#timerbarfill').css("width", currentTime +"%");
		
		if( ( currentTime <= 10 ) && !timerWarning ) {
			timerWarning = true;
			$('#timercontainer #clock').css({ "animation": "pulsate 0.5s ease-out", "animation-iteration-count": "infinite", "-webkit-animation": "pulsate 0.5s ease-out", "-webkit-animation-iteration-count": "infinite" });
		}
		
		if( timerWarning ) {
			soundManager.addToPlayQueue( soundManager.SOUND_ID_TIMEUP );
		}
		
		if( currentTime <= 0 ) {
			// time's up!
			currentTime = 0;
			onTimeFinished();
		}
	}
	
	// generic function - when a key starts being pressed/tapped
	function onKeyPressed( keycode ){
		switch( keycode )
		{
			case KEYCODE_UP :
				// moving up
				player.onUpPressed();
				break;
				
			case KEYCODE_DOWN :
				// moving down
				player.onDownPressed();
				break;
		}
	}

	// generic function - when a key stops being pressed/tapped
	function onKeyReleased( keycode ){
		switch( keycode )
		{
			case KEYCODE_UP :
				player.onUpReleased();
				break;
				
			case KEYCODE_DOWN :
				player.onDownReleased();
				break;
		}
	}
	
	// keyboard specific function - when a key starts being pressed
	function onKeyDown( e ) {
		var keycode;
		if( window.event && window.event.keycode ) {
			keycode = window.event.keycode;
		} else {
			keycode = e.which;
		}
		
		// disable the scrollbar
		e.preventDefault();
		
		onKeyPressed( keycode );
	}
	
	// keyboard specific function - when a key stops being pressed
	function onKeyUp( e ) {
		var keycode;
		if( window.event && window.event.keycode ) {
			keycode = window.event.keycode;
		} else {
			keycode = e.which;
		}

		e.preventDefault();
		
		onKeyReleased( keycode );
	}

	// game loop
 	this.tick = function() {
		if( playingGame ) {
			// play next sound if any
			soundManager.playNextInQueue();
		
			currentDistance+= Math.abs( speedXNow );
			// currentDistanceX+= speedXNow;

			player.tick();
			background.tick();

			var itemsResult = itemsManager.tick( currentDistance, speedYNow, speedXNow, vehicle, currentMultiplier != 1  ); 
			// handle items manager result
			if( itemsResult.score > 0 ) {
				currentScore += itemsResult.score * currentMultiplier;
				// play sound for coin collected
				soundManager.addToPlayQueue( soundManager.SOUND_ID_COIN );

			} else if ( itemsResult.score < 0 ){
				currentScore += itemsResult.score;
				soundManager.addToPlayQueue( soundManager.SOUND_ID_OBSTACLE );
				// play sound for obstacle collected
				if( currentScore < 0 ) {
					currentScore = 0;
				}
			}

			if( itemsResult.multiplier != 0 ) {
				onMultiplierGot( itemsResult.multiplier );
				soundManager.addToPlayQueue( soundManager.SOUND_ID_MULTIPLIER );
			}
			
			if( itemsResult.coinsreduced > 0 ) {
				floatingAlert.show( itemsResult.coinsreduced );
				// flash coins in a negative way
				/*
				// removing the class
				//+++ $('#coins').removeClass( 'coinsdecrement' );
				$('#coins').css({ "animation": "", "-webkit-animation": "" });
				// triggering reflow - needs to do to reset animation
				canvas.offsetWidth = canvas.offsetWidth;
				// re-add the class
				//+++ $('#coins').addClass( 'coinsdecrement' );
				$('#coins').css({ "animation": "decrement 0.4s ease-out", "animation-iteration-count": "3", "-webkit-animation": "decrement 0.4s ease-out", "-webkit-animation-iteration-count": "3" });
				*/
				
			}
		}
		
		stage.update();
		
		if( playingGame ) {
			$('#coins').text(currentScore);
		}
    }

	function onTimeFinished() {
		clearInterval( timerInterval );
		$('.game-play #finalcover').css( "display", 'block' );
		$('#timercontainer #clock').css({ "animation": "", "-webkit-animation": "", "opacity":"1" });
		// make the game ticker stop
		createjs.Ticker.removeAllListeners();
		
		var result = { coinsearned: currentScore, level: levelId, finished: 1 }
		$.ajax({
			type: 'post',
			data: result,
			dataType: 'json',
			url: '/ajax/game/submitround',
			success: function(response, status) {
				redirectToResult('ajax');
			}
		});
		var time = finishedTimeoutTime * 1000;
		setTimeout(function() {
			redirectToResult('timeout');
		}, time);
	}
	
	function redirectToResult(initialiser) {
		if(initialiser == "ajax") {
			ajaxFinished = true;
		} else {
			timeoutFinished = true;
		}
		
		if(ajaxFinished == true && timeoutFinished == true) {
			window.location.href = "/game/results";
		}
	}
	
	function onMultiplierGot( multiplierValue ) {
		currentMultiplier = multiplierValue;
		// make multiplier appear on the bar
		$('#gamebody #topbar #multiplier').css("background-image", "url('/img/game/multx" + currentMultiplier + ".png')");
		$('#gamebody #topbar #multiplier').css( "opacity", 1 );
		// activate multiplier effect for 10 seconds
		multiplierPreTimer = window.setTimeout( onMultiplierAboutToExpire, 8000 );
		multiplierTimer = window.setTimeout( onMultiplierExpired, 10000 );
	}


	function onMultiplierAboutToExpire() {
		$('#gamebody #topbar #multiplier').css({ "animation": "", "-webkit-animation": "" });
		// triggering reflow - needs to do to reset animation
		canvas.offsetWidth = canvas.offsetWidth;
		$('#gamebody #topbar #multiplier').css({ "animation": "pulsedisappear 2s ease-out", "animation-iteration-count": "1", "-webkit-animation": "pulsedisappear 2s ease-out", "-webkit-animation-iteration-count": "1" });
	}
	
	function onMultiplierExpired() {
		currentMultiplier = 1;
		// make multiplier disappear from the bar
		$('#gamebody #topbar #multiplier').css( "opacity", 0 );
	}
	
	this.pauseGame = function() {
		// should pause multiplier timer
		// !!!!
		// remove tick function call
		// alert( "hi " + this );
		createjs.Ticker.removeListener( window );
		// removing all listeners 
		//--- createjs.Ticker.removeAllListeners();
		// remove control listeners
		// !!!! no real need, as they disappear from stage when rotated
		// make pause cover appear
		// !!!! nope, again, the only reason we are actually pausing is when rotating, or finishing the game
		// stop background animation
		$( '#bottombackground' ).removeClass( "slowscroll" )
	}
	
	this.unpauseGame = function() {
		createjs.Ticker.addListener( window );
		if( !optimiseForTouchScreen ) {
			$( '#bottombackground' ).addClass( "slowscroll" )
		}
	}	
}