
function onYouTubePlayerAPIReady() {
}

$(document).ready(function() {

    // create youtube player
    var player;


	function playVideo(videoID) {

    if ($('#playerOverlay').length > 0) {
    	$('#playerOverlay').remove();          
	}

    $('body').append('<div id="playerOverlay"><div id="playerContainer"><div id="closeBtnContainer"><div id="closeBtn"></div></div><div id="player"></div></div></div>')

     $('#closeBtn').click(function() {   
        $('#playerOverlay').fadeOut(400, function() {
        	$('#playerOverlay').remove();
        });
    });


    player = new YT.Player('player', {
        	height: '100%',
        	width: '100%',
        	videoId: videoID,
        	playerVars: { 'controls': 0, 'showinfo': 0 },
        	events: {
			'onStateChange': onPlayerStateChange
        	}
		});
	};
	
    // when video ends
    function onPlayerStateChange(event) {        
        if(event.data === 0) {          
            $('#playerOverlay').remove();
            $('#playerOverlay').fadeOut(400, function() {
            	$('#playerOverlay').remove();
        	});
        };
    };

    $('.video-thumbnail').click(function() {
      	var thisVideo = $(this).data('youtubeurl');
        playVideo(thisVideo);
    });
});

$(document).ready(function(){

window.addEventListener("orientationchange", function(e){
	window.scrollTo(0,0);
	var video = $('#video');
	if(window.innerHeight > window.innerWidth){
    	video.attr("src", "");
	} else {
		video.attr("src", "https://www.youtube.com/embed/H-bJkFmD3B4?showinfo=0&iv_load_policy=3&controls=0&rel=0"); 
	}
}, false); 

//Font resizing
	$('.center-box').flowtype({ 
  		 minimum : 300,
  		 maximum : 570
	});

//Fades in intro text
	$('.center-box').fadeIn(1000);

//Controls
var pause = 150,
	fast = 700,
	medium = 800,
	mediumslow = 900,
	slow = 1000,
	slower = 1500;	
	slowest = 2000;	
	isAnimating = false;


	//-- Box One Controls --//
	$('.one .lamplinks img.gameLink').click(function() {
		if (!isAnimating) {
			isAnimating = true;
			//Box 1 elements
			$('.center-box h1').animate({ "left": "-=160%" }, medium );
			$('.center-box h2').delay(pause).animate({ "left": "-=160%" }, mediumslow );
			$('.center-box p').delay(pause).animate({ "left": "-=160%" }, slow );
			$('.grass').addClass('movegrass');
			$('.boy img').animate({ "left": "-=100%" }, medium );
			$('.one .tree img').delay(medium).animate({ "right": "+=200%" }, medium );
			$('.one .bigbush img').animate({ "left": "-=40%" }, slow, function(){
				$('.two .bigbush img').animate({ "left": "-=60%" }, slow );
			});
			$('.lamplinks').animate({ "left": "-=100%" }, medium );

			//Box 2 elements
			$('.two .tree img').animate({ "right": "+=40%" }, slow );
			$('.two .game a img').animate({ "left": "-=180%" }, medium );
			$('.two .sun').animate({ "left": "-=12%" }, slow );
			$('.container').animate({ "left": "-=100%" }, slowest, function() {
				isAnimating = false;
			});
		}
	});

	$('.one .lamplinks img.calculatorLink').click(function() {
		if (!isAnimating) {
			isAnimating = true;
			//Box 1 elements
			$('.center-box h1').animate({ "left": "-=160%" }, medium );
			$('.center-box h2').delay(pause).animate({ "left": "-=160%" }, mediumslow );
			$('.center-box p').delay(pause).animate({ "left": "-=160%" }, slow );
			$('.grass').addClass('movegrass');
			$('.boy img').animate({ "left": "-=100%" }, medium );
			$('.one .tree img').delay(medium).animate({ "right": "+=200%" }, medium );
			$('.one .bigbush img').animate({ "left": "-=40%" }, slow );
			$('.lamplinks').animate({ "left": "-=100%" }, medium );

			//Box 2 elements
		
			$('.two .game a img').animate({ "left": "-=480%" }, slowest );
			$('.two .sun').animate({ "left": "+=83%" }, slowest );
			$('.two .bigbush img').animate({ "left": "-=100%" }, slowest );
			$('.two .right').animate({ "right": "+=100%" }, slow );
			$('.two .tree img').animate({ "right": "+=190%" }, slow);
			$('.container').animate({ "left": "-=200%" }, slowest );

			//Box 3 elements
			$('.three .tree img').animate({ "left": "-=65%" }, slow );
			$('.three .bigbush img').animate({ "left": "-=40%" }, slowest);
			$('.three .calculator a img').animate({ "left": "-=300%" }, slow, function() {
				isAnimating = false;
			});
		}
	});

	$('.one .lamplinks img.demoLink').click(function() {
		if (!isAnimating) {
			isAnimating = true;
			//Box 1 elements
			$('.center-box h1').animate({ "left": "-=160%" }, medium );
			$('.center-box h2').delay(pause).animate({ "left": "-=160%" }, mediumslow );
			$('.center-box p').delay(pause).animate({ "left": "-=160%" }, slow );
			$('.grass').addClass('movegrass');
			$('.boy img').animate({ "left": "-=100%" }, medium );
			$('.one .tree img').delay(medium).animate({ "right": "+=200%" }, medium );
			$('.one .bigbush img').animate({ "left": "-=40%" }, slow );
			$('.lamplinks').animate({ "left": "-=100%" }, medium );

			//Box 2 elements
		
			$('.two .game a img').animate({ "left": "-=480%" }, slowest );
			$('.two .sun').animate({ "left": "+=178%" }, slowest );
			$('.two .bigbush img').animate({ "left": "-=100%" }, slowest );
			$('.two .right').animate({ "right": "+=100%" }, slow );
			$('.two .tree img').animate({ "right": "+=190%" }, slow);
			$('.container').animate({ "left": "-=300%" }, slowest );

			//Box 3 elements
			$('.three .tree img').animate({ "left": "-=110%" }, slow );
			$('.three .bigbush img').animate({ "left": "-=80%" }, slow);
			$('.three .calculator a img').animate({ "left": "-=600%" }, slow );
			$('.three .right').animate({ "right": "+=100%" }, fast );

			//Box 4 elements
			$('.four .bigbush img').animate({ "left": "-=25%" }, slow);
			$('.four .video div.video1').delay(pause).animate({ "left": "-=180%" }, fast );
			$('.four .tree img').animate({ "left": "-=80%" }, slow, function() {
				isAnimating = false;
			});
		}
	});

	$('.one .lamplinks img.videosLink').click(function() {
		if (!isAnimating) {
			isAnimating = true;
			//Box 1 elements
			$('.center-box h1').animate({ "left": "-=160%" }, medium );
			$('.center-box h2').delay(pause).animate({ "left": "-=160%" }, mediumslow );
			$('.center-box p').delay(pause).animate({ "left": "-=160%" }, slow );
			$('.grass').addClass('movegrass');
			$('.boy img').animate({ "left": "-=100%" }, medium );
			$('.one .tree img').delay(medium).animate({ "right": "+=200%" }, medium );
			$('.one .bigbush img').animate({ "left": "-=40%" }, slow );
			$('.lamplinks').animate({ "left": "-=100%" }, medium );

			//Box 2 elements
		
			$('.two .game a img').animate({ "left": "-=480%" }, slowest );
			$('.two .sun').animate({ "left": "+=278%" }, slowest );
			$('.two .bigbush img').animate({ "left": "-=100%" }, slowest );
			$('.two .right').animate({ "right": "+=100%" }, slow );
			$('.two .tree img').animate({ "right": "+=190%" }, slow);
			$('.container').animate({ "left": "-=400%" }, slowest );

			//Box 3 elements
			$('.three .tree img').animate({ "left": "-=110%" }, slow );
			$('.three .bigbush img').animate({ "left": "-=80%" }, slow);
			$('.three .calculator a img').animate({ "left": "-=600%" }, slow );
			$('.three .right').animate({ "right": "+=100%" }, fast );

		
			//Box 4 elements
			$('.four .bigbush img').animate({ "left": "-=50%" }, slow);
			$('.four .video div.video1').delay(pause).animate({ "left": "-=180%" }, fast );
			$('.four .tree img').animate({ "left": "-=160%" }, slow);

			//Box 5 elements
			$('.five .bigbush img').animate({ "left": "-=25%" }, slow);
			$('.five .cloud img').animate({ "left": "-=140%" }, slow, function() {
				isAnimating = false;
			});
			
		}
	});


	//-- Box Two Controls --//

	$('.two .left').click(function() { 
		if (!isAnimating) {
			isAnimating = true;
			//Box 1 elements
			$('.center-box h1').animate({ "left": "+=160%" }, medium );
			$('.center-box h2').animate({ "left": "+=160%" }, mediumslow );
			$('.center-box p').animate({ "left": "+=160%" }, slow );
			$('.lamplinks').animate({ "left": "+=100%" }, medium );
			$('.one .tree img').animate({ "right": "-=200%" }, medium);
			$('.two .bigbush img').animate({ "left": "+=60%" }, slow, function(){
				$('.one .bigbush img').animate({ "left": "+=40%" }, slow );
			});

			//Box 2 elements
			$('.container').animate({ "left": "+=100%" }, slower );
			$('.boy img').animate({ "left": "+=100%" }, medium );
			$('.two .game a img').animate({ "left": "+=180%" }, slow );
			$('.two .sun').animate({ "left": "+=12%" }, medium );
			$('.two .tree img').animate({ "right": "-=40%" }, slow, function() {
				isAnimating = false;
			});
			
		}
	});

	$('.two .right').click(function() {
		if (!isAnimating) {
			isAnimating = true;
			//Box 2 elements
			$('.two .game a img').animate({ "left": "-=300%" }, medium );
			$('.two .sun').animate({ "left": "+=95%" }, slowest );
			$('.two .bigbush img').animate({ "left": "-=40%" }, slowest );
			$('.two .right').animate({ "right": "+=100%" }, medium );
			$('.two .tree img').animate({ "right": "+=150%" }, slow);
			$('.container').animate({ "left": "-=100%" }, slowest );

			//Box 3 elements
			$('.three .tree img').animate({ "left": "-=65%" }, slow );
			$('.three .bigbush img').animate({ "left": "-=40%" }, slowest);
			$('.three .calculator a img').animate({ "left": "-=300%" }, slow, function() {
				isAnimating = false;
			});
			
		}
	});


	//-- Box Three Controls --//

	$('.three .left').click(function() {
		if (!isAnimating) {
			isAnimating = true;
			//Box 2 elements
			$('.two .bigbush img').animate({ "left": "+=60%" }, slow );
			$('.two .game a img').animate({ "left": "+=300%" }, medium );
			$('.two .sun').animate({ "left": "-=95%" }, slowest );
			$('.two .tree img').animate({ "right": "-=150%" }, slow );

			//Box 3 elements
			$('.container').animate({ "left": "+=100%" }, slowest );
			$('.three .tree img').animate({ "left": "+=65%" }, slow );
			$('.three .bigbush img').animate({ "left": "+=40%" }, slow );
			$('.three .calculator a img').animate({ "left": "+=300%" }, slow );
			$('.two .right').animate({ "right": "-=100%" }, medium, function() {
				isAnimating = false;
			});
			
		}
	});

	$('.three .right').click(function() {
		if (!isAnimating) {
			isAnimating = true;
			//Box 2 element
			$('.two .sun').animate({ "left": "+=95%" }, slowest );

			//Box 3 elements
			$('.container').animate({ "left": "-=100%" }, slowest );
			$('.three .tree img').animate({ "left": "-=45%" }, medium );
			$('.three .bigbush img').animate({ "left": "-=40%" }, slow);
			$('.three .calculator a img').animate({ "left": "-=300%" }, slow );
			$('.three .right').animate({ "right": "+=100%" }, fast );

			//Box 4 elements
			$('.four .bigbush img').animate({ "left": "-=25%" }, slow);
			$('.four .video div.video1').delay(pause).animate({ "left": "-=180%" }, fast );
			$('.four .tree img').animate({ "left": "-=80%" }, slow, function() {
				isAnimating = false;
			});
			
		}
	});

	//-- Box four Controls --//

	$('.four .left').click(function() {
		if (!isAnimating) {
			isAnimating = true;
			//Box 2 element
			$('.two .sun').animate({ "left": "-=95%" }, slowest );

			//Box 3 elements
			$('.three .bigbush img').animate({ "left": "+=40%" }, slow);
			$('.container').animate({ "left": "+=100%" }, slowest );
			$('.three .tree img').animate({ "left": "+=45%" }, medium );
			$('.three .calculator a img').animate({ "left": "+=300%" }, slow );
			$('.three .right').animate({ "right": "-=100%" }, fast );

			//Box 4 elements
			$('.four .bigbush img').animate({ "left": "+=25%" }, slow);
			$('.four .video div.video1').delay(slowest).animate({ "left": "+=180%" }, fast );
			$('.four .tree img').animate({ "left": "+=80%" }, slow, function() {
				isAnimating = false;
			});
			
		}
	});

	$('.four .right').click(function() {
		if (!isAnimating) {
			isAnimating = true;
			//Box 2 element
			$('.two .sun').animate({ "left": "+=95%" }, slowest );

			//Box 4 elements
			$('.container').animate({ "left": "-=100%" }, slowest );
			$('.four .bigbush img').animate({ "left": "-=25%" }, slow);
			$('.four .video div.video1').delay(pause).animate({ "left": "-=0%" }, fast );
			$('.four .tree img').animate({ "left": "-=80%" }, slow );

			//Box 5 elements
			$('.five .bigbush img').animate({ "left": "-=25%" }, slow);
			$('.five .cloud img').animate({ "left": "-=140%" }, slow );
			$('.five .videos').delay(pause).animate({ "left": "-=0%" }, fast, function() {
				isAnimating = false;
			});
			
		}
	});

	//-- Box five Controls --//

	$('.five .left').click(function() {
		if (!isAnimating) {
			isAnimating = true;
			//Box 2 elements
			$('.two .sun').animate({ "left": "-=95%" }, slowest );
			$('.container').animate({ "left": "+=100%" }, slowest );

			//Box 4 elements
			$('.four .bigbush img').animate({ "left": "+=25%" }, slow);
			$('.four .tree img').animate({ "left": "+=80%" }, slow );
			$('.four .video').delay(pause).animate({ "left": "-=0%" }, fast );

			//Box 5 elements
			$('.five .bigbush img').animate({ "left": "+=25%" }, slow);
			$('.five .cloud img').animate({ "left": "+=140%" }, slow );
			$('.five .videos').delay(pause).animate({ "left": "+=0%" }, fast, function() {
				isAnimating = false;
			});
			
		}
	});

}); //end