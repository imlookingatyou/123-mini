define(['calculator', 'glossary', 'analytics'], function(Calculator, Glossary, GA) {
	  // var $start_counter = $( "#event-start" ),
  //     $drag_counter = $( "#event-drag" ),
  //     $stop_counter = $( "#event-stop" ),
  //     counts = [ 0, 0, 0 ];

  
	$maxDragValue = 135;
	$characterMaxAge = 18;
	$characterAge = 0;

	// start age is minimum age
	var startAge;
	var startAgeDecimal;
	var ageGap;
	
	var tabletRatio = 0.7;
	var phoneRatio = 0.4;
	var desktopRatio = 1;
	
	var currentAccessory = 0;

	// default ratio for desktop
	var ratio = desktopRatio;
	setCharSize();
	$(window).resize(function() {
  		setCharSize();
  	});

	function setCharSize(){
		console.log($(window).width());
		if($(window).width() > 767 && $(window).width() <= 1024) {
			ratio = tabletRatio;
			//alert('JS values set to TABLET');
		} else if($(window).width() <= 767) {
			ratio = phoneRatio;
			//alert('JS values set to PHONE');
			//$(".fixed-char-top").toggleClass('fixed-char-top char-top');
		}
		$maxDragValue*=ratio;
	}

	//Default / starting size.
	$dragValue = 100;
	var dragged = false;

var assets = [];
assets.push({'classname': '.char-bottom', 'style': 'height','value':0, 'units':'px', 'min':100, 'max':200});
assets.push({'classname': '.legs-top', 'style': 'height','value':0, 'units':'px', 'min':15, 'max':35});
assets.push({'classname': '.shirt-bottom', 'style': 'height','value':0, 'units':'px', 'min':52, 'max':90});
assets.push({'classname': '.ear', 'style': 'background-size','value':0, 'units':'%', 'min':75, 'max':100});
assets.push({'classname': '.ear-left', 'style': 'left','value':0, 'units':'%', 'min':9, 'max':6});
assets.push({'classname': '.ear-right', 'style': 'right','value':0, 'units':'%', 'min':9, 'max':6});
assets.push({'classname': '.nose', 'style': 'width','value':0, 'units':'px', 'min':13, 'max':19});
assets.push({'classname': '.nose', 'style': 'margin-top','value':0, 'units':'px', 'min':90, 'max':80});

assets.push({'classname': '.hair', 'style': 'transform','value':{'scaleX':0, 'scaleY':0}, 'units':')', 'min':{'scaleX':1, 'scaleY':1}, 'max':{'scaleX':1.3, 'scaleY':1.3}});

// assets.push({'classname': '.hair', 'style': 'width','value':0, 'units':'px', 'min':150, 'max':155});
assets.push({'classname': '.head', 'style': 'height','value':0, 'units':'px', 'min':150, 'max':135});
assets.push({'classname': '.head', 'style': 'bottom','value':0, 'units':'%', 'min':21, 'max':30});
assets.push({'classname': '.accessory.face', 'style': 'bottom','value':0, 'units':'%', 'min':25, 'max':33});
assets.push({'classname': '.head, .hair', 'style': 'transform','value':{'scale':0}, 'units':')', 'min':{'scale':0.95}, 'max':{'scale':1}});
assets.push({'classname': '.eyebrows', 'style': 'top','value':0, 'units':'%', 'min':21, 'max':30});
assets.push({'classname': '.eyebrow-left, .eyebrow-right', 'style': 'transform','value':{'scaleX':0, 'scaleY':0}, 'units':')', 'min':{'scaleX':0.9, 'scaleY':0.9}, 'max':{'scaleX':1, 'scaleY':1}});
assets.push({'classname': '.eye', 'style': 'transform','value':{'scaleX':0, 'scaleY':0}, 'units':')', 'min':{'scaleX':1.15, 'scaleY':1.15}, 'max':{'scaleX':0.75, 'scaleY':0.75}});
assets.push({'classname': '.eye:eq(0)', 'style': 'left','value':0, 'units':'%', 'min':55, 'max':58});
assets.push({'classname': '.eye:eq(1)', 'style': 'left','value':0, 'units':'%', 'min':15, 'max':12});
assets.push({'classname': '.mouth', 'style': 'width','value':0, 'units':'px', 'min':70, 'max':107});
assets.push({'classname': '.mouth', 'style': 'height','value':0, 'units':'px', 'min':42, 'max':48});
assets.push({'classname': '.mouth', 'style': 'top','value':0, 'units':'%', 'min':68, 'max':62});
assets.push({'classname': '.mouth', 'style': 'left','value':0, 'units':'%', 'min':25, 'max':12});
assets.push({'classname': '.arm-left, .arm-right', 'style': 'bottom','value':0, 'units':'%', 'min':18, 'max':44});
assets.push({'classname': '.arm-left, .arm-right', 'style': 'height','value':0, 'units':'px', 'min':80, 'max':90});
assets.push({'classname': '.arm-left', 'style': 'transform', 'value':{'scaleX':0, 'scaleY':0, 'rotate':0}, 'units': ')', 'min':{'scaleX':-1, 'scaleY':1, 'rotate':-35}, 'max':{'scaleX':-1.5, 'scaleY':1.5, 'rotate':-38}});
assets.push({'classname': '.arm-right', 'style': 'transform', 'value':{'scaleX':0, 'scaleY':0, 'rotate':0}, 'units': ')', 'min':{'scaleX':1, 'scaleY':1, 'rotate':-35}, 'max':{'scaleX':1.5, 'scaleY':1.5, 'rotate':-38}});
assets.push({'classname': '.arm-right', 'style': 'left','value':0, 'units':'%', 'min':60, 'max':69});
assets.push({'classname': '.arm-left', 'style': 'right','value':0, 'units':'%', 'min':60, 'max':68});
assets.push({'classname': '.hand-right, .hand-left', 'style': 'bottom','value':0, 'units':'%', 'min':14, 'max':34});
assets.push({'classname': '.hand-right', 'style': 'left','value':0, 'units':'%', 'min':75, 'max':80});
assets.push({'classname': '.hand-left', 'style': 'right','value':0, 'units':'%', 'min':75, 'max':80});
assets.push({'classname': '.hand-right', 'style': 'transform','value':{'scaleX':0, 'scaleY':0}, 'units':')', 'min':{'scaleX':0.9, 'scaleY':0.9}, 'max':{'scaleX':1.3, 'scaleY':1.3}});
assets.push({'classname': '.hand-left', 'style': 'transform','value':{'scaleX':0, 'scaleY':0}, 'units':')', 'min':{'scaleX':-0.9, 'scaleY':0.9}, 'max':{'scaleX':-1.3, 'scaleY':1.3}});
assets.push({'classname': '.trouser-3, .trouser-4, .trouser-5', 'style': 'height','value':0, 'units':'px', 'min':150, 'max':100});

assets.push({'classname': '.shoes-left, .shoes-right', 'style': 'bottom','value':0, 'units':'%', 'min':-5, 'max':12});
assets.push({'classname': '.shoes-left, .shoes-right', 'style': 'transform','value':{'scaleX':0, 'scaleY':0}, 'units':')', 'min':{'scaleX':1, 'scaleY':1}, 'max':{'scaleX':1.3, 'scaleY':1.3}});
assets.push({'classname': '.shoes-left', 'style': 'left','value':0, 'units':'%', 'min':13, 'max':8});
assets.push({'classname': '.shoes-right', 'style': 'right','value':0, 'units':'%', 'min':13, 'max':8});

var accessories = [];
accessories.push({"classname":"acces-glasses-sun", "element":".acces-glasses"});
accessories.push({"classname":"acces-mouth-mustache", "element":".acces-mouth"});
accessories.push({"classname":"acces-glasses-bar", "element":".acces-glasses"});
accessories.push({"classname":"acces-top-bunny", "element":".acces-top"});
accessories.push({"classname":"acces-top-hat", "element":".acces-top"});

// set the character start age based on entered age and birth month, and current date, at the bottom of the measure tape
function setCharStartAge() {
	var startAgeData = Calculator.getStartAge();	
	startAge = startAgeData.years;
	//if the start age is undefined, don't change the character height based on false veraibles
	if (startAge == undefined ){
		//alert('No age has been set, so character height and calculator will be inaccurate.');
	}else{
	}
	
	//Basic check for if this is the calculator page or the character page.
	if ($("#tapeContainer").is('*')) {
    	dragHandAndEnd();

		if( $('.char-top').position() != undefined ) {		
			//getCharAge();
			//dragHandAndEnd( null, "" );
		} else {
		//??? $('.fixed-char-top').css('top', '50px');
		}
		
		getCharAge();

    	startAgeDecimal = startAgeData.monthsQuarter * .25;
		ageGap = $characterMaxAge - ( startAge + startAgeDecimal );		
		setCharAge( startAge, startAgeDecimal );
		
		$dragValue = $maxDragValue; 
		$('.char-top').css('top', $maxDragValue);

		resizeTape();
	}else{
		//Character customise page.
		$dragValue = 135 * ratio;
		$('.fixed-char-top').css('top', $dragValue);
		// $('#tape').css('height', ( parseInt($('#tapeContainer').css('height')) - parseInt($('#tape-drag').css('height')) ) +'px');
	}
	
	resizeChar(assets);
	
	// make the character appear, better than disassembled first!
	$( '.character').css( 'display', 'inline-block' );
}
function getCharAge(){
	//$dragValue = parseInt($('#calculator .character .char-top-wrapper .char-top').position().top);
	// if ($dragValue != '' ){
	// 	console.log('$dragValue is undefined');
	// 	$dragValue = 100;
	// }	
	//console.log('getCharAge fired!, dragValue set to = ' + $dragValue);
	$characterAgeValues =  ($maxDragValue / ageGap);
	$characterAge =  $characterMaxAge - ($dragValue / $characterAgeValues);
	
	$characterAge = (Math.round($characterAge * 4) / 4).toFixed(2);
	$characterAgeDecimal = $characterAge - Math.floor($characterAge);
	
	setCharAge( Math.floor( $characterAge ), $characterAgeDecimal );

	//console.log('$characterAge = ' + $characterAge + '. $characterAgeDecimal = ' + $characterAgeDecimal);
}

function setCharAge( years, monthsDec ) {
	
	/*
	switch( monthsDec ) {
		case 0 :
		default :
			$('#age-fraction p').html('');
			break;
			
		case 0.25 :
			$('#age-fraction p').html('&frac14');
			break;
			
		case 0.5 :
			$('#age-fraction p').html('&frac12');
			break;
			
		case 0.75 :
			$('#age-fraction p').html('&frac34');
			break;
	}
	$('#age p').html(Math.floor(( years )));
	*/
	Calculator.ageChanged( years + monthsDec );
}

// $dragValue = $maxDragValue - (($maxDragValue / $characterMaxAge) * $characterAge);
// console.log('$dragValue = ' + $dragValue);
// $('.char-top').css('top',$dragValue);

function dragHandler(e) {
	dragHandAndEnd(e, $(this).attr('id'));
}

function dragStart(e) {
	$('#tape-holder-cog').addClass('tape-holder-cog-animate');
	if(dragged == false) {
		dragged = true;
		Glossary.disableDragTimer();
	}
	
	GA.trackEvent('Calculator Page', 'Character Dragged', '');
}

function dragEnd(e) {
	$('#tape-holder-cog').removeClass('tape-holder-cog-animate');
	//Includeing this on dragEnd means the user can't push the top-half off the body.
	dragHandAndEnd(e, $(this).attr('id'));
}
var i=0;
function dragHandAndEnd(e, id){

	$overflowBugDragVal = parseInt($('.char-top').css('top'), 10);


	if($overflowBugDragVal >= (70 * ratio)){
		//console.log('70px hit! $overflowBugDragVal = ' + $overflowBugDragVal);
		$('.char-top-wrapper').css('overflow','hidden');
	}else{
		//console.log('70px not hit! $overflowBugDragVal = '+ $overflowBugDragVal);
		$('.char-top-wrapper').css('overflow','visible');
	};
	
	//To make sure the above 'if' function doesn't overide 'hidden' on first run.
	while (i<1)
	{ 
		$('.char-top-wrapper').css('overflow','hidden')
		//console.log(i);
		i++;
	}

	//If user has clicked the plus sign to increase age.
	if(id == "plus-sign"){
		getCharAge();
		//$dragValue = $('#calculator .character .char-top-wrapper .char-top').position().top;		
		if($dragValue - ($characterAgeValues / 4) > 0){
			//console.log('plus-sign. $dragValue = ' + $dragValue);
			$dragValue = $dragValue - ($characterAgeValues / 4);
			//console.log($dragValue);
			$('#calculator .character .char-top-wrapper .char-top').css('top', $dragValue + 'px');
			resizeTape();
			resizeChar(assets);

		}else{
			//The character has reached it's peak height, push it to top, to make it 18.
			$dragValue = 0;			
			$('#calculator .character .char-top-wrapper .char-top').css('top', $dragValue + 'px');
		}
	}

	//If user has clicked the minus sign to decrease age.
	if(id == "minus-sign"){
		getCharAge();
		//$dragValue = $('#calculator .character .char-top-wrapper .char-top').position().top;		
		if($dragValue + ($characterAgeValues / 4) <= $maxDragValue){

			//console.log('minus-sign. $dragValue = ' + $dragValue);
			$dragValue = $dragValue + (parseFloat($characterAgeValues / 4));
			//console.log($dragValue);
			// $dragValue = $dragValue + ($maxDragValue / (18 - (startAge + startAgeDecimal)*4));				
			$('#calculator .character .char-top-wrapper .char-top').css('top', $dragValue + 'px');
			resizeTape();
			resizeChar(assets);
			
		}else{
			//The character has reached it's peak, push it to bottom, to make it 18.
			/*console.log("resetting character");
			$dragValue = 0;			
			$('#calculator .character .char-top-wrapper .char-top').css('top', $maxDragValue + 'px');*/
		}
	}
	
	//If user is draging the tape
	if( id == "tape-drag" ) {
		var currHeight = Math.abs($('#tape-drag').position().top);
		var maxH = parseInt($('#tapeContainer').height());
		$('#tape').css('height', ( maxH - currHeight ) +'px');
		$('#calculator .character .char-top-wrapper .char-top').css('top', parseInt($('#tape-drag' ).css('top' ) ) + 'px');
		if(currHeight >= maxH) {
			$dragValue = 0;
		} else {
			// $dragValue = $maxDragValue - (Math.round((currHeight / maxH) * $maxDragValue));
			$dragValue = $('#calculator .character .char-top-wrapper .char-top').position().top;
		}
		
	} else if( id == 'character-top') {
		$dragValue = $('#calculator .character .char-top-wrapper .char-top').position().top;
		//console.log('not dragging tape. $dragValue= ' + $dragValue);
		//console.log('not dragging tape. $dragValue decimals = ' + ($dragValue - Math.floor($dragValue)));
		resizeTape();
	} else {
		resizeTape();
	}

	resizeChar(assets);
	getCharAge();
}

function resizeChar(assets){
      $.each(assets, function(key,properties) {
			//console.log(key);
			var cssProp = properties.style;
			var cssVal = '';
			//console.log('$maxDragValue = ' +$maxDragValue);
			if(typeof(properties.value) == "object") {
				//console.log('a');
				//If CSS value has more than two options, do this...
				var i = 0;
				$.each(properties.value, function(i,v) {
					if(i != 0) {
						cssVal += " ";
					}
					cssVal += i+"(";
					var finalVal = getFinalValue(properties.min[i], properties.max[i] );
					cssVal += finalVal;
					if(i == 'rotate') {
						cssVal += "deg";
					}
					cssVal += properties.units;
					
					i++;
				});
			} else {

				if(properties.units != '%'){
				//console.log('b');
					var finalVal = getFinalValue((properties.min * ratio), (properties.max * ratio));
					cssVal = finalVal + properties.units;
				//console.log(finalVal);				

				//console.log('properties.classname = ' + properties.classname + '. properties.units = ' + properties.units + '. cssProp = ' + cssProp);

				}else{
					var finalVal = getFinalValue(properties.min, properties.max);
					cssVal = finalVal + properties.units;
				}				
			}
			$(properties.classname).css(cssProp,cssVal);

			//console.log(properties.classname + cssProp + cssVal);

			function getFinalValue(min,max){
				$assetDif = (max - min);
				//console.log('$assetDif = ' + (max - min));
			    $dragValPerc = (($dragValue / $maxDragValue) * 100);
			    //console.log('$dragValPerc = (' + $dragValue + ' / ' + $maxDragValue + ') * 100 = ' + $dragValPerc);
			    $curAsseVal = (($dragValPerc * $assetDif) / 100);
			    //console.log('($dragValPerc * $assetDif) / 100 is ' + $curAsseVal);
			    //$assetSizes.asseSelector[i].css($assetSizes.asseCssProp[i], $assetSizes.assePrePend[i] + ($assetSizes.asseCssMaxVal[i] - $curAsseVal) + $assetSizes.asseMeasure[i]);
			    //console.log('postion left drag ' + $('.char-top').position().top);
			    return max - $curAsseVal;
			}
		});
  			
  	}
      
	function resizeTape() {
		/*
		var dragHeight = parseInt($('#tapeContainer').css('height')) - parseInt($('#tape-drag').css('height'));
		var maxH = parseInt($('#tape').css('max-height'));
		var dragPerc = (($maxDragValue - $dragValue) / $maxDragValue) * 100;
		var height = (dragPerc / 100) * maxH;
		*/
		
		var newHeight = parseInt($('#tapeContainer').height()) - parseInt($('.char-top' ).css('top' ) );
		$('#tape').css('height', newHeight +'px');
		$('#tape-drag').css('top', ( parseInt($('.char-top' ).css('top' ) ) )+'px');
	}

	$custmHair = false;
	$lastMaleVal = 0;
	$lastGen = 'notset';
	$lastFemVal = 0;


return {
	initialize: function() {
		$dragContainer = $(".char-top-wrapper");
		if($('#calculator').length > 0) {
			Calculator.initialize();
			//Only draggable via the #calculator div on calculator page.
			$('#calculator .character .char-top').draggable({ axis: "y", containment: $dragContainer, start: dragStart, drag: dragHandler, stop: dragEnd });
			$('#calculator #tape-drag').draggable({ axis: "y", containment: $('#tapeContainer'), start: dragStart, drag: dragHandler, stop: dragEnd});	
			
			$('#plus-sign').on('click', function(){				
				dragHandAndEnd(null, $(this).attr('id'));
			});

			$('#minus-sign').on('click', function(){				
				dragHandAndEnd(null, $(this).attr('id'));
			});
		}
		/*if(typeof(userData.accessories) != "undefined" && userData.accessories > 0) {
			$(accessories[(userData.accessories - 1)].element).addClass(accessories[(userData.accessories - 1)].classname)
			$(accessories[(userData.accessories - 1)].element).css('display', 'block');
		}*/
		setCharStartAge();
	},
	setAccessory: function(accessory, initial) {
		if(typeof(initial) == "undefined") {
			initial = false;
		}
		//CODE HERE!!!! YAYAYAYAYAYAYAYAYAY!
		//accessory = 1;
		/*var accessoryNum = ['','glasses-sun','mouth-mustache','glasses-bar','top-bunny','top-hat']
		
		for (var i=0;i<accessoryNum.length;i++){
			$acce = accessoryNum[i];
			
			$acceContain = '.acces-' + $acce.substr(0, $acce.indexOf('-'));
			
			$acceSelector = 'acces-' + $acce.substr(0, $acce.indexOf('-')) + '-' + $acce.split('-')[1];
			
			
			$('.' + $acceSelector).fadeOut('fast');

			$($acceContain).removeClass($acceSelector);

			
		}

		if(accessory > 0) {
			$acce = accessoryNum[accessory];
		
			$acceContain = '.acces-' + $acce.substr(0, $acce.indexOf('-'));
		
			$acceSelector = 'acces-' + $acce.substr(0, $acce.indexOf('-')) + '-' + $acce.split('-')[1];
		
		
			$($acceContain).addClass($acceSelector);

			$('.' + $acceSelector).fadeIn('fast');
			GA.trackEvent('Character Page', 'Accessory Change', '');
		}*/
		
		$('.accessory').fadeOut('fast', function() {
			if((accessory == currentAccessory && initial == false) || accessory == 0) {
				currentAccessory = 0;
				$('.accessory').css('background-image', 'none');
			} else {
				currentAccessory = accessory;
				$('.accessory').css('background-image', 'url("/img/character/accessories/acc'+accessory+'.png")');
				$('.accessory').fadeIn('fast');
			}
		});
		
		GA.trackEvent('Character Page', 'Accessory Change', '');
	},
	setHeadSkinChange: function(value, gender) {
		
		//Non gender specific attributes that need to change

		$lastValue = value -1;
	
		if(value == 1){
			$lastValue = 4;
		}

		
		$('.leg-left,.leg-right').removeClass('legs-'+$lastValue);
		$('.leg-left,.leg-right').addClass('legs-' + value);

		$('.head').removeClass('head-skin-'+$lastValue);
		$('.head').addClass('head-skin-' + value);

		$('.arm').removeClass('arm-skin-'+$lastValue);
		$('.arm').addClass('arm-skin-' + value);

		$('.hand').removeClass('hand-skin-'+$lastValue);
		$('.hand').addClass('hand-skin-' + value);

		$('.neck').removeClass('neck-skin-'+$lastValue);
		$('.neck').addClass('neck-skin-' + value);

		$('.ear').removeClass('ear-skin-'+$lastValue);
		$('.ear').addClass('ear-skin-' + value);

		$('.nose').removeClass('nose-skin-'+$lastValue);
		$('.nose').addClass('nose-skin-' + value);

		//SET VALUES TO MALE
		if(gender == 0){
			//console.log('MALE');

			//console.log('remove class ' + $lastValue + '. addclass ' + value);
			
			$lastMaleVal = $lastValue;
			$lastGen = 0;
			//male
		}

		//SET VALUES TO FEMALE
		if(gender == 1){
			//console.log('FEMALE');
			value += 4;

			
			$lastFemVal = value;
			//console.log('remove class number ' + $lastValue + '. add class number ' + value);
			//female
		}



		if($custmHair == false || $lastGen != gender){
			//console.log('no custom hair set, changing now..');

			$(".hair-front").removeClass (function (index, css) {
			    return (css.match (/\bhair-front-skin-\S+/g) || []).join(' ');
			});
			$('.hair-front').addClass('hair-front-skin-' + value);

			$(".hair-back").removeClass (function (index, css) {
			    return (css.match (/\bhair-back-skin-\S+/g) || []).join(' ');
			});
			$('.hair-back').addClass('hair-back-skin-' + value);

			$(".eyebrow-left").removeClass (function (index, css) {
			    return (css.match (/\beyebrows-left-\S+/g) || []).join(' ');
			});
			$('.eyebrow-left').addClass('eyebrows-left-' + value);

			$(".eyebrow-right").removeClass (function (index, css) {
			    return (css.match (/\beyebrows-right-\S+/g) || []).join(' ');
			});
			$('.eyebrow-right').addClass('eyebrows-right-' + value);

		};

			$(".mouth").removeClass (function (index, css) {
			    return (css.match (/\bmouth-skin-\S+/g) || []).join(' ');
			});
			$('.mouth').addClass('mouth-skin-' + value);

			$(".eye").removeClass (function (index, css) {
			    return (css.match (/\beye-skin-\S+/g) || []).join(' ');
			});
			$('.eye').addClass('eye-skin-' + value);

		if(gender == 1){
			$lastGen = 1;
		}		
		
	},
	setHairChange: function(value, gender) {
		var i = 0;		
		if (i > 1 ){
		 	$custmHair = true;
		}
		i++;
		
		$lastValue = value -1;
	
		if(value == 1){
			$lastValue = 4;
		}

		//SET VALUES TO MALE
		if(gender == 0){
			//console.log('MALE');
			if ($lastGen == 1){
				//console.log('LAST GENDER WAS FEMALE');
				$lastValue = value +=4;
				//console.log('remove class ' + $lastValue + '. addclass ' + value);
			}
			
			$lastGen = 0;
			//male
		}

		//SET VALUES TO FEMALE
		if(gender == 1){
			//console.log('FEMALE');
			value += 4;
			$lastValue = value -1;			
			if(value == 5){
				$lastValue = 8;
			}
			$lastGen = 1;
			//console.log('remove class number ' + $lastValue + '. add class number ' + value);
			//female
		}		
		
		$(".hair-front").removeClass (function (index, css) {
		    return (css.match (/\bhair-front-skin-\S+/g) || []).join(' ');
		});
		$('.hair-front').addClass('hair-front-skin-' + value);

		$(".hair-back").removeClass (function (index, css) {
		    return (css.match (/\bhair-back-skin-\S+/g) || []).join(' ');
		});
		$('.hair-back').addClass('hair-back-skin-' + value);

		$(".eyebrows").removeClass (function (index, css) {
		    return (css.match (/\beyebrows-skin-\S+/g) || []).join(' ');
		});
		$('.eyebrows').addClass('eyebrows-skin-' + value);


		// $('.hair-front').removeClass('hair-front-skin-'+$lastValue);
		// $('.hair-front').addClass('hair-front-skin-' + value);

		// $('.hair-back').removeClass('hair-back-skin-'+$lastValue);
		// $('.hair-back').addClass('hair-back-skin-' + value);

		// $('.eyebrows').removeClass('eyebrows-skin-'+$lastValue);
		// $('.eyebrows').addClass('eyebrows-skin-' + value);

	},
	setShoesChange: function(value, gender) {
		
		prevVal = value - 1;		


		
		$prevGen = gender;
		//console.log('$prevGen = '+gender);

		$(".shoes-left").removeClass (function (index, css) {
		    return (css.match (/\bshoes-left-\S+/g) || []).join(' ');
		});
		$('.shoes-left').addClass('shoes-left-' + value);

		$(".shoes-right").removeClass (function (index, css) {
		    return (css.match (/\bshoes-right-\S+/g) || []).join(' ');
		});
		$('.shoes-right').addClass('shoes-right-' + value);

	},
	setBottomChange: function(value, gender) {

		prevVal = value - 1;		

		//if the last gender selected was female, update the prevVal veraible
		try {
			if ($prevGen == '1'){
				prevVal = (value + 4) - 1;
			}
		}
		catch(e) {}

		
		$prevGen = gender;
		//console.log('$prevGen = '+gender);

		//Stop the values reaching 0
		if(value == 1) {
			prevVal = 4;
		}

		$(".leg-left div, .leg-right div").removeClass (function (index, css) {
		    return (css.match (/\btrouser-\S+/g) || []).join(' ');
		});
		$(".leg-left div, .leg-right div").addClass('trouser-' + value);

		$(".legs-top").removeClass (function (index, css) {
		    return (css.match (/\blegs-top-\S+/g) || []).join(' ');
		});
		$('.legs-top').addClass('legs-top-' + value);
	}
}

});
