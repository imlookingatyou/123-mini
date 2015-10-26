var isPlaying = false;
var song = new Audio();
var coinsEffect = new Audio();
var lightEffect = new Audio();
var goalEffect = new Audio();
var mute = false;

var canPlayMp3, canPlayOgg;
var audioExtension = ".none";

var thisUrl = "";

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

var muteElement = document.getElementById('mute-button');
muteElement.addEventListener('click', function(e) {
	e.preventDefault();
	if(mute == false) {
		mute = true;
		document.getElementById('mute-image').src = "/img/sound_off.png";
		stopMusic();
	} else {
		mute = false;
		document.getElementById('mute-image').src = "/img/sound_on.png";
		startSound(thisUrl);
	}
});

document.getElementById('startButton').onclick = function(e) {
	if(/mobile/i.test(navigator.userAgent) && mute == false) {
		e.preventDefault();
		isPlaying = false;
		startSound('/');
	}
};

function startSound(url) {
	thisUrl = url;
	if(url != "/calculator") {
		startMusic();
	} else {
		if(isPlaying == true) {
			stopMusic();
		}
		startCalcEffects();
	}
}

function startMusic() {
	if(isPlaying == false && mute == false) {
		console.log(audioExtension);
		song.src = "/sound/newMusic"+audioExtension;
		song.load();
		//Some browsers don't like song.loop
		if (typeof song.loop == 'boolean') {
			song.loop = true;
		} else {
			song.addEventListener('ended', function() {
				this.currentTime = 0;
				this.play();
			});
		}
		song.play();
		
		isPlaying = true;
	}
}

function stopMusic() {
	//Some browsers don't like song.loop
	if (typeof song.loop !== 'boolean') {
		song.removeEventListener('ended');
	}	
	song.pause();
	isPlaying = false;
}

function startCalcEffects() {
	coinsEffect.src = "/sound/coins-fall"+audioExtension;
	lightEffect.src = "/sound/lightbulb2_02"+audioExtension;
	goalEffect.src = "/sound/goal-achieved_01"+audioExtension;
	
	coinsEffect.load();
	lightEffect.load();
	goalEffect.load();
}

function playCoinEffect() {
	if(mute == false) {
		coinsEffect.play();
	}
}

function playLightEffect() {
	if(mute == false) {
		/*if (typeof song.loop == 'boolean') {
			lightEffect.loop = true;
		} else {
			lightEffect.addEventListener('ended', function() {
				this.currentTime = 0;
				this.play();
			});
		}*/
		lightEffect.play();
	}
}

function stopLightEffect() {
	lightEffect.removeEventListener('ended');
	lightEffect.pause();
}

function playGoalEffect() {
	if(mute == false) {
		goalEffect.play();
	}
}