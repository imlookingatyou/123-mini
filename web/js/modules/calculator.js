define(['jquery', 'glossary', 'goals', 'analytics'], function($, Glossary, Goals, GA) {

$maxTotal = 55000;
// if you modify the maxTotal variable, modify the below to reflect a rounded value below a third of it
// Also, modify same maxTotal variable in Goals module <- why are you not using the exported function to get this value?
var goalMaxTotal = 18000;

if ( ! window.console ) {

    (function() {
      var names = ["log", "debug", "info", "warn", "error",
          "assert", "dir", "dirxml", "group", "groupEnd", "time",
          "timeEnd", "count", "trace", "profile", "profileEnd"],
          i, l = names.length;

      window.console = {};

      for ( i = 0; i < l; i++ ) {
        window.console[ names[i] ] = function() {};
      }
    }());

}

var currInterest = 0;

var currSliderHint = 0;
var allHints = [
		"Saving money can be easy. Whenever you earn, or get given money, keep some in a safe place like a money box or a coin jar. If you do this often you’ll have enough to spend on something you really want.",
		"There are lots of ways to earn money for your savings. You could volunteer to wash the car, walk the dog, wash the dishes or help with the laundry for a few more pennies. Pocket money goes here as well!",
		"If you want to grow your savings there are great ways of doing it. On a hot day you could sell lemonade to passers-by, sell old toys at a car boot sale or cook some cakes and set up a bake sale.",
		"There are other ways you can save money too. What about birthday and Christmas gifts? Instead of spending it all on sweets you can put some to one side. Think smart, save well and save often."
	];

/*	
		"Saving money can be easy. Whenever you earn money, keep some in a safe place like a piggy bank or a coin jar. If you do this often you’ll have enough to spend on something you really want.",
		"There are lots of ways to earn money for your savings. You could volunteer to wash dad’s car, or even the neighbour’s car. You could walk the dog, wash the dishes or help mum with the laundry for a few more pennies. And don’t forget your pocket money!",
		"If you want to grow your savings there are great ways of doing just that. On a hot day you could sell lemonade to passers-by, sell some old toys at a car boot sale or you could ask mum to help you cook some cakes and set up a bake sale.",
		"There are other ways you can save money too. What about birthday and Christmas gifts? Instead of spending it all on sweets you can put some to one side. Think smart, save well and save often."
*/

// variables used to calculate total
var ageDiffYears = 0;
var ageDiffMonths = 0;
var ageDiffWeeks = 0;
var totalSavings = 0;
var totalWeekly = 0;
var totalMonthly = 0;
var totalYearly = 0;

var startAge = 0;
var startMonthQuarter = 0;
var startMonthDec = 0;
	
//SLIDERS

function collision($div1, $div2) {
      var x1 = $div1.offset().left;
      var w1 = 40;
      var r1 = x1 + w1;
      var x2 = $div2.offset().left;
      var w2 = 40;
      var r2 = x2 + w2;
        
      if (r1 < x2 || x1 > r2) return false;
      return true;
      
    }
    
// // slider call

function updateTotal() {
	var newInterestRate;
	var newInterest;
	var totalValue = 0;
	var totalInterest = 0;

	var cumulativeInterest = 0;
	var cumulativeTotal = totalSavings;
	var yearlySavings = ( totalWeekly * 52 ) + ( totalMonthly * 12 ) + totalYearly;
	
	// calculate the interest, month by month
	for( var i=1; i <= ageDiffMonths; i++ ) {
		// add yearly savings, if 12 months have passed
		if( i%12 == 0 ) {
			cumulativeTotal+=totalYearly;
		}
		// add monthly savings
		cumulativeTotal+=totalMonthly;
		// add weekly savings for the month
		cumulativeTotal+=( totalWeekly * 4.33 );
		
		// calculate interest rate
		if( cumulativeTotal < 100 ){
			newInterestRate = 0;
		} else if ( cumulativeTotal >= 100 && cumulativeTotal < 200 ) {
			newInterestRate = 1;
		} else if ( cumulativeTotal >= 200 && cumulativeTotal < 300 ) {
			newInterestRate = 1.98;
		} else {
			newInterestRate = 2.96;
		}
		
		// calculate new interest based on cumulative total
		newInterest = newInterestRate * Math.min( 2000, cumulativeTotal ) / 100;
		// make this interest monthly...
		newInterest/=12;
		// round down to 2 decimals the new interest
		newInterest = ( parseInt( newInterest * 100 ) / 100 );
		//??? newInterest = parseFloat( ( parseInt( newInterest * 100 ) / 100 ).toFixed(2) );

		// add it to the cumulative interest
		cumulativeInterest+=newInterest;
		cumulativeInterest = parseFloat( cumulativeInterest.toFixed(2) );
		// add the interest to the cumulative total
		cumulativeTotal+=newInterest;
		cumulativeTotal = parseFloat( cumulativeTotal.toFixed(2) );
	}

	// calculate the total value with no interest
	totalValue = cumulativeTotal - cumulativeInterest;
	//+++ totalValue = totalSavings + ( totalWeekly * ageDiffWeeks ) + ( totalMonthly * ageDiffMonths ) + ( totalYearly * ageDiffYears );
	
	// use the last calculated interest rate
	if( currInterest != newInterestRate ) {
		swapInterest( newInterestRate );
	}

	// update total text field - don't use cumulativeTotal, that was only used to calculate the yearly interest and will not reflect reality if less than a year
	$("#total-label p span").html( ( totalValue + cumulativeInterest ).toFixed(2));
	$("#total-interest span").html( "£" + ( cumulativeInterest ).toFixed(2));

	setCoins( totalValue, cumulativeInterest );
	Goals.checkGoals(cumulativeTotal);
	//+++ Goals.checkGoals((totalValue + cumulativeInterest));
}

function onSlidersUpdated() {
	if($('#slideryearly').find('a').length > 0) {
		// get all the values from the sliders
		totalSavings = parseFloat($('#slidersavings').find('a').text().substring(1));
		totalWeekly = parseFloat($('#sliderweekly').find('a').text().substring(1));
		totalMonthly = parseFloat($('#slidermonthly').find('a').text().substring(1));
		totalYearly = parseFloat($('#slideryearly').find('a').text().substring(1));
		// we just changed the monetary values, update the totals
		updateTotal();	
	}
}

function setCoins($totalValue, $interest) {
	$coinHeight = (($totalValue * 100) / $maxTotal);
	$redCoinHeight = ((( $totalValue + $interest )* 100) / $maxTotal);
	$('#gold-coins').height($coinHeight + '%');
	if( $interest == 0 ) {
		$('#red-coins').height( '0%');
	} else {
		$('#red-coins').height($redCoinHeight + '%');
	}
}

function recalculateStartAge() {
	// console.log( "recalculateStartAge called" );
	// calculate and store the real initial age for use both in the calculator and the character
	if(typeof(userData.age) != "undefined") {
		startAge = parseInt( userData.age );
		var startMonth = parseInt( userData.month );
		var currMonth = ( new Date().getMonth() ) + 1;
		var monthDiff = currMonth - startMonth;
		// console.log( "monthDiff " + monthDiff );
		if( monthDiff < 0 ) {
			monthDiff+=12;
		}
		// get the quarter-based month difference
		startMonthQuarter = Math.floor( monthDiff / 3 );
		startMonthDec = startMonthQuarter / 4;
		// console.log( "calculated already " + 
	} else {
		startAge = 0;
		startMonthQuarter = 0;
		startMonthDec = 0;
	}
}

function init() {

	// recalculate start age based on user data - this might have changed
	recalculateStartAge();
	$('.slider').each(function(i,v) {
		$(this).slider({
			range: "max",
			min: $(this).attr('data-min'),
			max: $(this).attr('data-max'),
			step: parseFloat($(this).attr('data-step')),
			value: 0,
			create: function(event, ui) {
				$(this).find('a').html('£0');
				if(loggedin && typeof(userData[$(this).attr('data-name')]) != "undefined") {
					$(this).slider("value", parseFloat(userData[$(this).attr('data-name')]));
					if(parseFloat($(this).attr('data-step')) % 1 != 0) {
						$(this).find('a').html('£'+(parseFloat(userData[$(this).attr('data-name')]).toFixed(2)));
					} else {
						$(this).find('a').html('£'+(parseFloat(userData[$(this).attr('data-name')])));
					}
					
					onSlidersUpdated();
				}
			},
			change: function( event, ui ) {
				updateSliderLabels(ui);
				playCoinEffect();
			},
			slide: function( event, ui ) {
				updateSliderLabels(ui);
			},
			stop: function(event, ui) {
				data = {};
				$('.slider').each(function(i,v) {
					data[$(this).attr('data-name')] = parseFloat($(this).find('a').text().substring(1));
				});
				if(loggedin) {
					$.extend(userData, data);
					data.userID = userData.id;
					$.ajax({
						type: 'post',
						data: data,
						dataType: 'json',
						url: '/ajax/savings'
					});
				}
				
				GA.trackEvent('Calculator Page', 'Slider Change', $(this).attr('data-name'));
			}
		});
	//		$('.ui-slider-handle').append('<p class="amount">£<span></span></p>');
	//		$(".ui-slider-handle p span", this).text(($maxValSlider / 4));
	//		$(".amount", this).val('£' + $( "#slider-range-max" ).slider("value") );

	})
	
}

function updateSliderLabels(ui) {
	var val = ui.value;
	if(ui.value % 1 != 0) {
		val = ui.value.toFixed(2);
	}
	$(ui.handle).html('£'+val);
	onSlidersUpdated();
}

	function swapInterest( newVal ) {
		if( newVal == undefined ) {
			newVal = 0;
		}
		
		newVal = Math.round( newVal );
		
		$("#interest-rates span").html( newVal + "%" );
		if(newVal > 0) {
			Glossary.highlightTip(1, newVal);
		}
		/*
		if( currInterest != 0 ) {
			$( '#perc' + currInterest ).css( { 'color':'#f00' } );
		}
		if( newVal != 0 ) {
			$( '#perc' + newVal ).css( { 'color':'#fff' } );
		}
		*/
		currInterest = newVal;
		/*
		var selWidth = $('#interest-selector' ).width();
		$('#interest-selector' ).stop( true );
		$('#interest-selector' ).animate( { left: ( ( newVal * selWidth ) - selWidth + ( ( selWidth > 49 )?1:2) ) + 'px' }, 300 );
		*/
	}

	function sliderHintSelect( hintId ) {
		if( currSliderHint == hintId ) {
			sliderHintDeselect( currSliderHint );
			currSliderHint = 0;
			return;
		}

		if( currSliderHint != 0 ) {
			sliderHintDeselect( currSliderHint )
		}
		
		currSliderHint = hintId;
		$( '#slider-help-panel' ).css( { 'display':'block' } );
		// make the sliders visible again
		$( '.slider-container' ).css( { 'visibility':'hidden' } );
		$( '.ui-slider-handle' ).css( { 'display':'none' } );
		if ( hintId == 1 ) {
			$( '#helpbutton' + currSliderHint ).removeClass( "slider-hint-button-deselected" ).addClass( "slider-hint-button-selected-top" );
		} else if ( hintId == allHints.length ) {
			$( '#helpbutton' + currSliderHint ).removeClass( "slider-hint-button-deselected" ).addClass( "slider-hint-button-selected-bottom" );
		} else {
			$( '#helpbutton' + currSliderHint ).removeClass( "slider-hint-button-deselected" ).addClass( "slider-hint-button-selected-middle" );
		}
		$( "#slider-help-panel p" ).empty();
		$( "#slider-help-panel p" ).append( allHints[ hintId - 1 ] );
		$('.sliderhintclosebutton').css({'display':'block'});
		
	}

	function sliderHintClose( e ) {
		e.preventDefault();
		sliderHintDeselect( currSliderHint );
		currSliderHint = 0;
	}
	
	function sliderHintDeselect( hintId ) {
		$('#slider-help-panel' ).css( { 'display':'none' } );
		$('.sliderhintclosebutton').css({'display':'none'});
		// make the sliders visible again
		$( '.slider-container' ).css( { 'visibility':'visible' } );
		$( '.ui-slider-handle' ).css( { 'display':'inline-block' } );
		$( '#helpbutton' + hintId ).removeClass( "slider-hint-button-selected-top" ).removeClass( "slider-hint-button-selected-middle" ).removeClass( "slider-hint-button-selected-bottom" ).addClass( "slider-hint-button-deselected" );
	}
	
	function amendValues(e) {
		e.preventDefault();
		var newVal = 0;
		if(e.type == "click") {
			var $slider = $('#slider'+$(this).attr('data-slider'));
			var $input = $('#text'+$(this).attr('data-slider'));	
			var direction = $(this).attr('data-value');
			var currVal = parseFloat($slider.slider("value"));
			var max = parseFloat($slider.slider('option', 'max'));
			var step = parseFloat($slider.slider('option', 'step'));
			if(direction == "-" && currVal > 0) {
				newVal = currVal - step;
			} else if(direction == "+" && currVal <= max) {
				newVal = currVal + step;
			}
		} else {
			var $slider = $('#slider'+$(this).attr('data-name'));
			var $input = $(this);
			var newVal = parseFloat($input.val());
			var max = $input.attr('max');
			var step = $input.attr('step');
			if(newVal > max) {
				newVal = max;
			} else if(newVal < 0 || isNaN(newVal)) {
				newVal = 0;
			} else if(newVal % step != 0) {
				remainder = newVal % step;
				newVal -= remainder;
			}
		}
		
		$slider.slider('value', newVal);
		if($input.attr('data-name') == "weekly" && newVal % 1 != 0) {
			newVal = newVal.toFixed(2);
		}
		$input.val(newVal);
	}
	
	function clearZero(e) {
		if($(this).val() == "0") {
			$(this).val("");
		}
	}
	
return {
	initialize:function() {
		init();
		$('.help').on('click', function(e) {
			e.preventDefault();
			sliderHintSelect($(this).attr('data-help'));
		});
		$('.sliderhintclosebutton').on('click', sliderHintClose );
		$('.slider-container .button a').on('click', amendValues);
		$('.slider-container input').on('focusout', amendValues);
		$('.slider-container input').on('focusin', clearZero);
		
		Goals.initialize();
	},
	ageChanged:function(age) {
		// current age is the one based on the character's height/measure tape
		var currRealAge = ( Math.round( age * 4 ) / 4 ).toFixed( 2 );
		var currAgeFloor = Math.floor( age );
		var currAgeDec = currRealAge - currAgeFloor;
		var currAgeMonths = 0;
		
		// var startAge = 0;
		var startMonth = startMonthQuarter * 3;
		// startAge = userData.age;
		// startMonth = userData.month;
		
		// var currMonth = ( new Date().getMonth() ) + 1;
		
		// ??? currMonth - startMonth
		
		// discard start months after whole quarters
		//startMonth = Math.floor( startMonth / 3 ) * 3;
		
		// console.log( "------------------------------------------------------------------------" );
		// console.log( "ageChanged " + currRealAge + " - currAgeDec " + currAgeDec + " - startAge " + startAge );
		
		var yearsDiff = currAgeFloor - startAge;
		var monthDiff;
		var weeksDiff;

		// console.log( "yearsDiff " + yearsDiff );

		
		// current month is zero based

		switch( currAgeDec ) {
			case 0 :
				$('#tape-age-fraction').html('');
				break;
			case 0.25 :
				$('#tape-age-fraction').html('&frac14');
				currAgeMonths = 3;
				break;
			case 0.50 :
				$('#tape-age-fraction').html('&frac12');
				currAgeMonths = 6;
				break;
			case 0.75 :
			default :
				$('#tape-age-fraction').html('&frac34');
				currAgeMonths = 9;
				break;
		}
		
		// get the real month difference
		monthDiff = currAgeMonths - startMonth;
		// console.log( "monthDiff " + monthDiff );
		if( monthDiff < 0 ) {
			yearsDiff--;
			monthDiff+=12;
		}
		// console.log( "monthDiff adj " + monthDiff );
		// get the quarter-based month difference
		monthQuarters = Math.floor( monthDiff / 3 );
		// console.log( "monthQuarters " + monthQuarters );
		monthDiff = monthQuarters * 3;
		// console.log( "monthDiff after qrt " + monthDiff );
		// and add total months per whole year
		monthDiff += ( yearsDiff * 12 );
		// console.log( "monthDiff including years " + monthDiff );
		// there are 13 weeks in a quarter
		weeksDiff = ( yearsDiff * 52 ) + ( monthQuarters * 13 );
		
		// console.log( "diff is " + yearsDiff + " years " + monthDiff + " months " + weeksDiff + " weeks " );
	
		ageDiffYears = yearsDiff;
		ageDiffMonths = monthDiff;
		ageDiffWeeks = weeksDiff;
		// console.log( "weeksDiff " + weeksDiff + " monthDiff " + monthDiff );
		
		// we just modified the age, update the totals
		updateTotal();

		$('#tape-age').html( currAgeFloor );


		// age now means total years
		switch( monthQuarters ) {
			case 0 : $('#age-fraction p').html(''); break;
			case 1 : $('#age-fraction p').html('&frac14'); break;
			case 2 : $('#age-fraction p').html('&frac12'); break;
			case 3 : default : $('#age-fraction p').html('&frac34'); break;
		}		
		$('#age p').html( ageDiffYears );
	},
	getStartAge: function() {
		// console.log( "Calculator.getStartAge called" + startAge );
		return { years:startAge, monthsQuarter:startMonthQuarter };
	},
	getGoalMaxTotal: function() {
		return goalMaxTotal;
	}
}
});