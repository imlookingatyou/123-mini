function SoundManager( isiOSStandaloneMode, isiOSMode ) {

	// public constants
	this.SOUND_ID_COIN = 0;
	this.SOUND_ID_OBSTACLE = 1;
	this.SOUND_ID_MULTIPLIER = 2;
	this.SOUND_ID_TIMEUP = 3;

	this.soundIsOn = true;
	
	var touchMode = false;
	var isAndroid = false;
	var iOSStandaloneMode = isiOSStandaloneMode;
	var iOSMode = isiOSMode;
	
	// how many coin sounds can play at the same time
	var COIN_AUDIO_QTY = 10; // 4 for mobile // 10 for desktop
	var COIN_AUDIO_DIFFERENT_SOUNDS = 6;

	var loadedFiles = 0;
	var soundFilesQuantity = 0;
	
	var coinAudioNow = 0;
	var coinsCollected = new Array();
	var obstacleCollected = new Audio();
	var multiplierCollected = new Audio();
	var timeRunningOut = new Audio();
	
	var playQueue = new Array();

	var audioPrependIndexNow = 0;
	var allAudioToPrepend = new Array();
	
    // public method to launch the download process
    this.StartDownload = function () {
		var canPlayMp3, canPlayOgg;
		var audioExtension = ".none";
	
		// Need to check the canPlayType first or an exception
		// will be thrown for those browsers that don't support it      
		var myAudio = document.createElement('audio');

		if (myAudio.canPlayType) {
			// Currently canPlayType(type) returns: "", "maybe" or "probably" 
			canPlayMp3 = !!myAudio.canPlayType && "" != myAudio.canPlayType('audio/mpeg');
			canPlayOgg = !!myAudio.canPlayType && "" != myAudio.canPlayType('audio/ogg; codecs="vorbis"');
		}

		if (canPlayMp3) {
			audioExtension = ".mp3";
		} else if (canPlayOgg) {
			audioExtension = ".ogg";
		}
		// Used to simulate multi-channels audio 
		// As HTML5 Audio in browsers is today too limited
		// Yes, I know, we're forced to download N times the same file...
		if (audioExtension !== ".none") {
			for (var a = 0; a < COIN_AUDIO_QTY; a++) {
				coinsCollected[a] = new Audio();
				SetAudioDownloadParameters(coinsCollected[a], "/sound/coin" + (( a % COIN_AUDIO_DIFFERENT_SOUNDS ) + 1) + audioExtension);
				//SetAudioDownloadParameters(coinsCollected[a], "/sound/coin2" + audioExtension);
			}
			// SetAudioDownloadParameters( this.coinCollected, "/sound/coin" + audioExtension);
			// obstacleCollected.addEventListener( "canplay", addToLoadedNumber );
			/*
			obstacleCollected.addEventListener("canplaythrough", function()
			  {
				// alert( "canplaythrough!" );
			  }
			);
			*/

			SetAudioDownloadParameters( obstacleCollected, "/sound/obstacle" + audioExtension);
			SetAudioDownloadParameters( multiplierCollected, "/sound/multiplier" + audioExtension);
			SetAudioDownloadParameters( timeRunningOut, "/sound/timeup" + audioExtension);

			/*
  			allAudioToPrepend.push( coinsCollected[1] );
			allAudioToPrepend.push( obstacleCollected );
			allAudioToPrepend.push( multiplierCollected );
			allAudioToPrepend.push( timeRunningOut );
			*/
		}
	}

	function addToLoadedNumber() {
		loadedFiles++;
		alert( "loaded " + loadedFiles );
	}
	
	function isAllSoundLoaded() {
		return ( loadedFiles == soundFilesQuantity );
	}
	
	this.loadNextAudio = function() {
		// check if there is anything to prepend
		if( allAudioToPrepend.length == 0 ) {
			return;
		}
		
		if( allAudioToPrepend[ 0 ].readyState == 4 ) {
			// remove it from the audio to prepend queue
			allAudioToPrepend.splice( 0, 1 );
		} else {
			allAudioToPrepend[ 0 ].load();
		}
	}
	
	this.prependNextAudio = function() {
	
		// check if there is anything to prepend
		if( ( allAudioToPrepend.length == 0 ) || iOSStandaloneMode ) {
			return;
		}

		// if Android
		if( !iOSMode && this.touchMode ) {
			allAudioToPrepend[ audioPrependIndexNow ].volume = 0;
			allAudioToPrepend[ audioPrependIndexNow ].play();
			allAudioToPrepend[ audioPrependIndexNow ].pause();
			allAudioToPrepend.splice( audioPrependIndexNow, 1 );
			return;
		}
		
		// go through all of them, but start from the next one, finding one that's not been loaded yet
		// for( var i = 0; i < allAudioToPrepend.length; i++ ) {
		// alert( "prepend " + audioPrependIndexNow + " - " + allAudioToPrepend[ audioPrependIndexNow ].readyState + " len " + allAudioToPrepend.length );
			// android seems to always report 4 here, even if not preloaded???
			if( allAudioToPrepend[ audioPrependIndexNow ].readyState == 4 ) {
				// remove it from the audio to prepend queue
				allAudioToPrepend.splice( audioPrependIndexNow, 1 );
				// don't count this one
		// 		i--;
			} else {
				allAudioToPrepend[ audioPrependIndexNow ].volume = 0;
				allAudioToPrepend[ audioPrependIndexNow ].play();
				allAudioToPrepend[ audioPrependIndexNow ].pause();
				// just prepended one, break the loop after this
		// 		i = allAudioToPrepend.length;
				// point to the next index
				audioPrependIndexNow++;
			}
			
			if( audioPrependIndexNow >= allAudioToPrepend.length ) {
				audioPrependIndexNow = 0;
			}
		//}

		//+++ go through the array to prepend checking for the next thing to do so
		
		// check if the current thing to prepend has already been prepended
		// 4 means "enough data available to start playing"
	
	/*
		if( audioPrependIndexNow < allAudioToPrepend.length ) {
			allAudioToPrepend[ audioPrependIndexNow ].volume = 0;
			allAudioToPrepend[ audioPrependIndexNow ].play();
			allAudioToPrepend[ audioPrependIndexNow ].pause();
			audioPrependIndexNow++;
			alert( "obstacle ready " + obstacleCollected.readyState );
		}
		*/
	}
	
	this.setDeviceVars = function( isTouch, isItAndroid ) {
		touchMode = isTouch;
		isAndroid = isItAndroid;
		if( touchMode ) {
			COIN_AUDIO_QTY = 4;
		}
	}
	
	// this one is only really needed for Android
	this.prependAllAudio = function () {
		for (var a = 0; a < COIN_AUDIO_QTY; a++) {
			if ( !isAndroid ) { coinsCollected[a].volume = 0; }
			coinsCollected[a].play();
			coinsCollected[a].pause();
		}
		// turning the volume down on Android makes it still play
		if ( !isAndroid ) { timeRunningOut.volume = 0; }
		timeRunningOut.play();
		timeRunningOut.pause();
		if ( !isAndroid ) { multiplierCollected.volume = 0; }
		multiplierCollected.play();
		multiplierCollected.pause();
		if ( !isAndroid ) { obstacleCollected.volume = 0; }
		obstacleCollected.play();
		obstacleCollected.pause();
	}
	
	this.checkAudio = function() {
	}
	
	
	// this function only to be called to pre-pend all the files for further use on mobile
	this.addToPrependQueueAllAudio = function () {
		for (var a = 0; a < COIN_AUDIO_QTY; a++) {
			this.addToPlayQueue( this.SOUND_ID_COIN, true );
		}
		this.addToPlayQueue( this.SOUND_ID_OBSTACLE, true );
		this.addToPlayQueue( this.SOUND_ID_MULTIPLIER, true );
		this.addToPlayQueue( this.SOUND_ID_TIMEUP, true );
	}
	
    function playCoinAudio( isSilent ) {
		coinAudioNow++;
		console.log( "playing " + COIN_AUDIO_QTY );
		if( isSilent ) {
			coinsCollected[ coinAudioNow % COIN_AUDIO_QTY ].volume = 0;
		} else {
			coinsCollected[ coinAudioNow % COIN_AUDIO_QTY ].volume = .5;
		}
		coinsCollected[ coinAudioNow % COIN_AUDIO_QTY ].play();
	}
	
    function SetAudioDownloadParameters( audioElement, url ) {
		soundFilesQuantity++;
		// audioElement.addEventListener( "canplay", addToLoadedNumber );
		// audioElement.addEventListener( "canplaythrough", addToLoadedNumber );
		audioElement.src = url;
		audioElement.load();
		//--- if( iOSStandaloneMode ) {
		//--- 	audioElement.addEventListener( "canplaythrough", loadNextAudio );
		//--- }
		allAudioToPrepend.push( audioElement );
	}
	
	this.addToPlayQueue = function( soundID, isSilent ) {
		if( this.soundIsOn ) {
			playQueue.push( { id:soundID, silent:isSilent } );
		}
	}
	
	this.playNextInQueue = function() {
		if( playQueue.length == 0 ) {
			return;
		}
		
		if( this.soundIsOn ) {
			switch( playQueue[0].id ) {
				case this.SOUND_ID_COIN :
					playCoinAudio( playQueue[0].silent );
					break;
				case this.SOUND_ID_OBSTACLE :
					if( playQueue[0].silent ) { obstacleCollected.volume = 0; } else { obstacleCollected.volume = 1; }
					obstacleCollected.play();
					break;
				case this.SOUND_ID_MULTIPLIER :
					if( playQueue[0].silent ) { multiplierCollected.volume = 0; } else { multiplierCollected.volume = .8; }
					multiplierCollected.play();
					break;
				case this.SOUND_ID_TIMEUP :
					if( playQueue[0].silent ) { timeRunningOut.volume = 0; } else { timeRunningOut.volume = 1; }
					timeRunningOut.play();
					break;
			}
		}
		
		// remove the sound just played from the queue
		playQueue.shift();
	}
	
	this.emptyPlayQueue = function() {
		playQueue = new Array();
	}
	
	this.turnSoundOn = function() {
		this.soundIsOn = true;
	}
	
	this.turnSoundOff = function() {
		this.soundIsOn = false;
	}
	
	this.toggleSound = function() {
		this.soundIsOn = !this.soundIsOn;
	}
}