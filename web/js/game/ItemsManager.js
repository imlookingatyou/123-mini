// quantity of coins at the same time 
var COINS_QUANTITY = 500;
//+++ var COINS_QUANTITY = 100;

var DISTANCE_STEPS = 30;

var ITEM_RESPAWN_X = 970;

var COINS_MIN_Y = 90;
var COINS_MAX_Y = 550;
var COINS_Y_AREA = COINS_MAX_Y - COINS_MIN_Y;

var drawingCurrentIndex = 0;
var drawingCurrentSubIndex = 0;

// remember all these positions should be multiplied by the scale factor before adding to the generated array
var patternPositions_1 = new Array( [0,30,60,90,120,150,180],[0,30,60,90,120,150,180] );
var patternPositions_2 = new Array( [30,180],[0,30,150,180],[0,120,150,180],[0,90,120,180],[0,30,60,90,180],[30,60,180] );
var patternPositions_3 = new Array( [30,150],[0,30,150,180],[0,90,180],[0,90,180],[0,30,60,90,120,150,180],[30,60,120,150] );

var patternPositions_A = new Array( [30,60,90,120,150,180],[0,30,60,90,120,150,180],[0,30,120],[0,30,120],[0,30,60,90,120,150,180],[30,60,90,120,150,180] );
var patternPositions_B = new Array( [0,30,60,90,120,150,180],[0,30,60,90,120,150,180],[0,90,180],[0,90,180],[0,30,60,90,120,150,180],[30,60,120,150] );
var patternPositions_C = new Array( [60,90,120],[30,60,90,120,150],[0,30,150,180],[0,30,150,180],[0,30,150,180],[0,30,150,180] );
var patternPositions_D = new Array( [0,30,60,90,120,150,180],[0,30,60,90,120,150,180],[0,180],[0,30,150,180],[30,60,90,120,150],[60,90,120] );
var patternPositions_E = new Array( [0,30,60,90,120,150,180],[0,30,60,90,120,150,180],[0,90,180],[0,90,180],[0,180],[0,180] );
var patternPositions_F = new Array( [0,30,60,90,120,150,180],[0,30,60,90,120,150,180],[0,90],[0,90],[0],[0] );
var patternPositions_G = new Array( [60,90,120],[30,60,90,120,150],[0,30,150,180],[0,30,90,150,180],[0,30,90,120,150,180],[0,30,90,120,150,180] );
var patternPositions_H = new Array( [0,30,60,90,120,150,180],[0,30,60,90,120,150,180],[90],[90],[0,30,60,90,120,150,180],[0,30,60,90,120,150,180] );
var patternPositions_I = new Array( [0,30,60,90,120,150,180],[0,30,60,90,120,150,180] );
var patternPositions_J = new Array( [90,120],[90,120,150],[150,180],[150,180],[0,30,60,90,120,150],[0,30,60,90,120] );
var patternPositions_K = new Array( [0,30,60,90,120,150,180],[0,30,60,90,120,150,180],[60,90,120],[30,60,90,120,150],[0,30,60,120,150,180],[0,30,150,180] );
var patternPositions_L = new Array( [0,30,60,90,120,150,180],[0,30,60,90,120,150,180],[180],[180],[180],[180] );
var patternPositions_M = new Array( [0,30,60,90,120,150,180],[0,30,60,90,120,150,180],[30,60],[60,90],[30,60],[0,30,60,90,120,150,180],[0,30,60,90,120,150,180] );
var patternPositions_N = new Array( [0,30,60,90,120,150,180],[0,30,60,90,120,150,180],[30,60,90],[90,120,150],[0,30,60,90,120,150,180],[0,30,60,90,120,150,180] );
var patternPositions_O = new Array( [30,60,90,120,150],[0,30,60,90,120,150,180],[0,180],[0,180],[0,30,60,90,120,150,180],[30,60,90,120,150] );
var patternPositions_P = new Array( [0,30,60,90,120,150,180],[0,30,60,90,120,150,180],[0,90],[0,90],[0,30,60,90],[30,60] );
var patternPositions_Q = new Array( [30,60,90,120,150],[0,30,60,90,120,150,180],[0,180],[0,120,150,180],[0,30,60,90,120,150],[30,60,90,120,180] );
var patternPositions_R = new Array( [0,30,60,90,120,150,180],[0,30,60,90,120,150,180],[0,90,120],[0,90,120,150],[0,30,60,90,150,180],[30,60,180] );
var patternPositions_S = new Array( [30,60,150],[0,30,60,90,180],[0,90,180],[0,90,180],[0,90,120,150,180],[30,120,150] );
var patternPositions_T = new Array( [0],[0],[0,30,60,90,120,150,180],[0,30,60,90,120,150,180],[0],[0] );
var patternPositions_U = new Array( [0,30,60,90,120,150],[0,30,60,90,120,150,180],[180],[180],[0,30,60,90,120,150,180],[0,30,60,90,120,150] );
var patternPositions_V = new Array( [0,30,60],[0,30,60,90,120],[90,120,150,180],[90,120,150,180],[0,30,60,90,120],[0,30,60] );
var patternPositions_W = new Array( [0,30,60,90,120,150,180],[0,30,60,90,120,150,180],[120,150],[90,120],[120,150],[0,30,60,90,120,150,180],[0,30,60,90,120,150,180] );
var patternPositions_X = new Array( [0,30,150,180],[0,30,60,120,150,180],[60,90,120],[60,90],[0,30,60,120,150,180],[0,30,150,180] );
var patternPositions_Y = new Array( [0,30,60],[0,30,60,90],[90,120,150,180],[90,120,150,180],[0,30,60,90],[0,30,60] );
var patternPositions_Z = new Array( [0,150,180],[0,120,150,180],[0,90,120,180],[0,60,90,180],[0,30,60,180],[0,30,180] );

var patternPositions_Exclamation = new Array( [0,30,60,90,150,180],[0,30,60,90,150,180] );
var patternPositions_Dash = new Array( [90],[90] );
var patternPositions_Question = new Array( [30,60],[0,30,60],[0,120,180],[0,90,120,180],[0,30,60,90],[30,60] );
// var patternPositions_Logo
var patternPositions_Heart = new Array( [30,60,90],[0,30,60,90,120],[0,30,60,90,120,150],[30,60,90,120,150,180],[0,30,60,90,120,150],[0,30,60,90,120],[30,60,90] );
// var patternPositions_Club
// var patternPositions_Spade
// var patternPositions_Diamond

function scalePatternPositions() {
	// nothing to do if scale is 1
	if( scaleFactor == 1 ) { return; }
	
	scalePositions( patternPositions_1 );
	scalePositions( patternPositions_2 );
	scalePositions( patternPositions_3 );
	scalePositions( patternPositions_A);
	scalePositions( patternPositions_B );
	scalePositions( patternPositions_C );
	scalePositions( patternPositions_D );
	scalePositions( patternPositions_E );
	scalePositions( patternPositions_F );
	scalePositions( patternPositions_G );
	scalePositions( patternPositions_H );
	scalePositions( patternPositions_I );
	scalePositions( patternPositions_J );
	scalePositions( patternPositions_K );
	scalePositions( patternPositions_L );
	scalePositions( patternPositions_M );
	scalePositions( patternPositions_N );
	scalePositions( patternPositions_O );
	scalePositions( patternPositions_P );
	scalePositions( patternPositions_Q );
	scalePositions( patternPositions_R );
	scalePositions( patternPositions_S );
	scalePositions( patternPositions_T );
	scalePositions( patternPositions_U );
	scalePositions( patternPositions_V );
	scalePositions( patternPositions_W );
	scalePositions( patternPositions_X );
	scalePositions( patternPositions_Y );
	scalePositions( patternPositions_Z );
	scalePositions( patternPositions_Exclamation );
	scalePositions( patternPositions_Question );
	scalePositions( patternPositions_Dash );
	scalePositions( patternPositions_Heart );
	
	// scale all the shapes
	var i
	for ( i = 0; i < shapes_Small.length; i++ ) {
		scalePositions( shapes_Small[i].positions );
	}
	for ( i = 0; i < shapes_Medium.length; i++ ) {
		scalePositions( shapes_Medium[i].positions );
	}
	for ( i = 0; i < shapes_Large.length; i++ ) {
		scalePositions( shapes_Large[i].positions );
	}
}

var itemPatterns;

var itemPatternsIndexNow = 0;
// this is the counter to see how many we've done for the current pattern, and check if we have to move to the next pattern index
// 	it should reset to 0 whenever moving to the next patter, and compared with the quantity of items for the current pattern
var itemCounterNow = 0;
var totalItemCounter = 0;

var allCoins;
var allObstacles1;
var allObstacles2;
var allObstacles3;
var allObstacles4;
var multiplier2x;
var multiplier3x;
var stage;
var scaleFactor;

function ItemsManager( stage, contentManager, newScaleFactor, levelId, optimiseForSmallScreen ) {
	this.initialize( stage, contentManager, newScaleFactor, levelId, optimiseForSmallScreen );
}

function countAllElements( arrayToCount ) {
	var qty = 0;
	for ( var i = 0; i < arrayToCount.length; i++ ) {
		qty+=arrayToCount[i].length;
	}
	return qty;
}

// lowest level one, just adds to the array
function addToItemPatternsArray( itemToAdd, mustScalePositions ) {
	if( mustScalePositions == undefined ) { mustScalePositions = true; }
	
	if( itemToAdd.params != undefined ) {
		if( ( itemToAdd.params.ypos != undefined ) && ( itemToAdd.params.ypos != 'random' ) ) {
			itemToAdd.params.ypos*=scaleFactor;
		}

		if( itemToAdd.params.amplitude != undefined ) {
			itemToAdd.params.amplitude*=scaleFactor;
		}

		if( mustScalePositions && itemToAdd.params.positions != undefined ) {
			for( var i = 0; i < itemToAdd.params.positions.length; i++ ) {
				for( var j = 0; j < itemToAdd.params.positions[i].length; j++ ) {
					itemToAdd.params.positions[i][j]*=scaleFactor;
				}
			}
		}
	}
	// finally add it to the array
	itemPatterns.push( itemToAdd );
}

function scalePositions( positions ) {
	for( var i = 0; i < positions.length; i++ ) {
		for( var j = 0; j < positions[i].length; j++ ) {
			positions[i][j]*=scaleFactor;
		}
	}
	return positions;
}

function addPauseToPatternsArray( pauseTime ) {
	addToItemPatternsArray( { type:"pause", qty:pauseTime } );
}

var MOVEMENT_LINEAR = 'linear';
var MOVEMENT_WAVE = 'sine';

var minObstacleSpeed;
var maxObstacleSpeed;

// position can be a fixed number, or random if 'default'
function addObstacleToPatternsArray( newSize, position, newSpeed, movement ) {
	if( newSpeed == 'default' ) {
		newSpeed = ( Math.random() * ( maxObstacleSpeed - minObstacleSpeed ) ) + minObstacleSpeed;
	}
	addToItemPatternsArray( { type:"obstacle", qty:1, func:randomPos, params:{ ypos:position, size:newSize, speed:newSpeed, move:movement } } );
} 

function addWordToItemPatternsArray( wordToAdd, yPos, coinsType ) {
	var qtyAmount;
	
	// if not defined, set in the middle
	if( yPos == undefined ) {
		yPos = COINS_MIN_Y + ( COINS_Y_AREA * .5 );
	}
	
	for ( var i = 0; i < wordToAdd.length; i++ ){
		var currentChar = wordToAdd.charAt(i);
		if( currentChar == " " ) {
			addPauseToPatternsArray( 2 );
			continue;
		}
		// we do this for special characters
		switch( currentChar ) {
			case '-' :
				qtyAmount = countAllElements( patternPositions_Dash )
				addToItemPatternsArray( { type:"coins", qty:qtyAmount, func:drawing, params:{ ypos:yPos, value:coinsType, usecolumns:true, positions:patternPositions_Dash.slice(0) } }, false );
				break;
			case '!' :
				qtyAmount = countAllElements( patternPositions_Exclamation )
				addToItemPatternsArray( { type:"coins", qty:qtyAmount, func:drawing, params:{ ypos:yPos, value:coinsType, usecolumns:true, positions:patternPositions_Exclamation.slice(0) } }, false );
				break;
			case '?' :
				qtyAmount = countAllElements( patternPositions_Question )
				addToItemPatternsArray( { type:"coins", qty:qtyAmount, func:drawing, params:{ ypos:yPos, value:coinsType, usecolumns:true, positions:patternPositions_Question.slice(0) } }, false );
				break;
			default :
				// it's a normal letter/number
				qtyAmount = countAllElements( window['patternPositions_' + currentChar] )
				addToItemPatternsArray( { type:"coins", qty:qtyAmount, func:drawing, params:{ ypos:yPos, value:coinsType, usecolumns:true, positions:window['patternPositions_' + currentChar].slice(0) } }, false );
				break;
		}
		// always add a space between letters
		addPauseToPatternsArray( 2 );
	}
}

function addILuvToPatternsArray( lovedWord, coinsType ) {
	var yPos = ( Math.random() * ( COINS_Y_AREA - 200 ) ) + COINS_MIN_Y + 100; // this 100 is because they are written from the middle
	addWordToItemPatternsArray( "I", yPos, coinsType );
	addToItemPatternsArray( { type:"coins", qty:countAllElements(patternPositions_Heart), func:drawing, params:{ ypos:yPos, value:PATTERN_COINS_GOLD, usecolumns:true, positions:patternPositions_Heart } }, false );
	addWordToItemPatternsArray( " " + lovedWord, yPos, coinsType );
}

var PATTERN_DIF_EASIEST = 0;
var PATTERN_DIF_EASY = 1;
var PATTERN_DIF_MEDIUM = 2;
var PATTERN_DIF_HARD = 3;
var PATTERN_DIF_HARDEST = 4;

var PATTERN_COINS_BRONZE = 1;
var PATTERN_COINS_SILVER = 2;
var PATTERN_COINS_GOLD = 3;
var PATTERN_COINS_ALTERNATE = 4;
var PATTERN_COINS_ESCALATE = 5;

var PATTERN_WORD_SHORT = 0;
var PATTERN_WORD_MEDIUM = 1;
var PATTERN_WORD_LONG = 2;

var PATTERN_SHAPES_SMALL = 0;
var PATTERN_SHAPES_MEDIUM = 1;
var PATTERN_SHAPES_LARGE = 2;

function addRandomWordToPatternsArray( coinsType, wordLength ) {
	var possibleWords;
	var word;

	// do this depending on coinsQty maybe?...
	switch( wordLength ) {
		case PATTERN_WORD_SHORT :
			possibleWords = [ '1 2 3', 'SAVE', 'GOOD!', 'QUICK!', 'GO!', ];
			break;
		case PATTERN_WORD_MEDIUM :
			possibleWords = [ 'GREAT!', 'AWESOME!', 'AMAZING!', 'MINI ME', 'FASTER!' ];
			break;
		case PATTERN_WORD_LONG :
			possibleWords = [ 'SAVE MORE!', 'BRILLIANT!', 'FANTASTIC!', 'MINI JETS', 'KEEP GOING' ];
			break;
	}

	// set a random position, based on the fixed height for letters, which is 200 pixels
	var yPos = ( Math.random() * ( COINS_Y_AREA - 200 ) ) + COINS_MIN_Y;
	addWordToItemPatternsArray( possibleWords[ Math.floor( Math.random() * possibleWords.length ) ], yPos, coinsType );
}

var shapes_Small = new Array( 
								{ positions:[[0],[-15,15],[-30,0,30],[-15,15],[0]] }, // small romboids
								{ positions:[[-25,0,25],[-25,0,25],[-25,0,25]] }, // small squares
								{ positions:[[45],[15],[-15,45],[-45,15],[-15,45],[15],[45]] }, // small triangles pointing up
								{ positions:[[-45],[-15],[15,-45],[45,-15],[15,-45],[-15],[-45]] }, // small triangles pointing down
								{ positions:[[-40,40],[-20,20],[0],[-20,20],[-40,40]] }, // small x
								{ positions:[[-15,15],[-30,0,30],[-15,15]] }, // small circles
								{ positions:[[-30,0,30],[-45,-15,45],[-60,0,30,60],[-45,-15,45],[-30,0,30]] }, // small cube
								{ positions:[[-45,-15,15,45],[-30,30],[-15,15],[-30,30],[-45,-15,15,45]] } // small bow
							);

var shapes_Medium = new Array( 
								{ positions:[[-50,-25,0],[-70,25],[-70,40],[-40,60],[-70,40],[-70,25],[-50,-25,0]] }, // medium heart
								{ positions:[[0],[-15,15],[-30,30],[-45,45],[-30,30],[-15,15],[0]] }, // horizontal medium romboids
								{ positions:[[0],[-25,25],[-50,50],[-75,75],[-50,50],[-25,25],[0]] }, // medium romboids
								{ positions:[[0],[-30,30],[-60,60],[-90,90],[-60,60],[-30,30],[0]] }, // medium romboids
								{ positions:[[0],[-30],[-60],[-90,-60,-30,0,30,60,90],[60],[30],[0]] }, // medium half and half arrow
								{ positions:[[0],[30],[60],[-90,-60,-30,0,30,60,90],[-60],[-30],[0]] }, // medium half and half arrow - inverted
								{ positions:[[0],[0,-30],[0,-60],[-90,0,90],[0,60],[0,30],[0]] }, // medium half and half arrow - horizontal
								{ positions:[[0],[0,30],[0,60],[-90,0,90],[0,-60],[0,-30],[0]] }, // medium half and half arrow - horizontal inverted
								{ positions:[[-45,-15,15,45],[-60,-30,60],[-75,-15,75],[-90,0,30,60,90],[-75,-15,75],[-60,-30,60],[-45,-15,15,45]] }, // medium cube
								{ positions:[[-30,0,30],[-60,60],[-90,0,90],[-90,-30,0,30,90],[-90,0,90],[-60,60],[-30,0,30]] } // medium circle with plus in the middle
							);

var shapes_Large = new Array( 
								{ positions:[
										[-120,-90,-60],[-150,-120,-90,-60,-30],[-150,-120,-90,-60,-30,0],[-120,-90,-60,-30,0,30],[-150,-120,-90,-60,-30,0],[-150,-120,-90,-60,-30],[-120,-90,-60], // medium heart
										[120,150],[105,135,165],[60,90,120,150,225],[45,75,105,135,165,195,225],[60,90,120,150,225],[105,135,165],[120,150], // medium club
										[-45,-15],[-90,-60,-30,0],[-105,-75,-45,-15],[-150,-120,-90,-60,-30,0,30],[-105,-75,-45,-15],[-90,-60,-30,0],[-45,-15], // medium spade
										[135],[105,135,165],[75,105,135,165,195],[45,75,105,135,165,195,225],[75,105,135,165,195],[105,135,165],[135] // medium diamond
									] 
								}, // all card suits, filled
								{ positions:[[-60,-30,0,30,60],[-105,105],[-135,45,135],[-165,-75,-45,74,165],[-180,-90,-60,-30,105,180],[-180,-75,-45,105,180],[-180,105,180],[-180,-75,-45,105,180],[-180,-90,-60,-30,105,180],[-165,-75,-45,74,165],[-135,45,135],[-105,105],[-60,-30,0,30,60]] }, // big smiley face
								{ positions:[[-75,-45,-15,15,45],[-105,75],[-135,105],[-150,120],[-165,135],[-165,150],[-135,180],[-105,210],[-135,180],[-165,150],[-165,135],[-150,120],[-135,105],[-105,75],[-75,-45,-15,15,45]] } // big heart, empty
								// { positions:[[-30],[-30,0],[-30,45,75,105,135,165],[-30,150],[-45,135],[-90,120],[-135,105]] } // big star, empty
								
								
								// [-180,-150,-120,-90,-60,-30,0,30,60,90,120,150,180]
								// [-195,-165,-135,-105,-75,-45,-15,15,45,75,105,135,165,195]
							);

							
function getShapeData( shapePositions ) {
	var coinsQty = 0;
	var maxHeight = 0;

	for( var i = 0; i < shapePositions.length; i++ ) {
		for( var j = 0; j < shapePositions[i].length; j++ ) {
			maxHeight = Math.max( maxHeight, Math.abs( shapePositions[i][j] ) );
			coinsQty++;
		}
	}

	// all shapes should be drawn from the middle
	maxHeight*=2;
	
	return( { coinsQty:coinsQty, height:maxHeight } );
}
							
function addShapesToPatternsArray( coinsType, difficulty, sizeId ) {

	var shapePositions;
	var shapeData;
	var randomId = 0;

	// first choose a random shape
	switch( sizeId ) {
		case PATTERN_SHAPES_SMALL :
			shapePositions = shapes_Small[ Math.floor( Math.random() * shapes_Small.length ) ].positions;
			break;
		case PATTERN_SHAPES_MEDIUM :
			shapePositions = shapes_Medium[ Math.floor( Math.random() * shapes_Medium.length ) ].positions;
			break;
		case PATTERN_SHAPES_LARGE :
			shapePositions = shapes_Large[ Math.floor( Math.random() * shapes_Large.length ) ].positions;
			break;
	}

// force medium, to test
//sizeId = PATTERN_SHAPES_SMALL;
//shapePositions = shapes_Small[ 2 ].positions;
// sizeId = PATTERN_SHAPES_MEDIUM;
// shapePositions = shapes_Medium[ shapes_Medium.length - 1 ].positions;
// sizeId = PATTERN_SHAPES_LARGE;
// shapePositions = shapes_Large[ shapes_Large.length - 1 ].positions;
	
	// get the shape data
	shapeData = getShapeData( shapePositions );
	// the height of the shape is half going up and half going down
	// shapeData.height
	
	// small and medium sizes share layouts, hence a different switch
	switch( sizeId ) {
		case PATTERN_SHAPES_SMALL :
		case PATTERN_SHAPES_MEDIUM :
			// now choose the layout
			var shapesQty = 4;
			var yPos;
			var minGap;
			var maxGap;
			var gap;
			randomId = Math.floor( Math.random() * 4 ) + 1;
			
			switch( randomId ) {
				case 1 :
					// straight line - ignore difficulty for pattern, just add obstacles
					yPos = ( Math.random() * ( COINS_Y_AREA - shapeData.height ) ) + COINS_MIN_Y + ( shapeData.height * .5 );
					for( var i = 0; i < shapesQty; i++ ) {
						addToItemPatternsArray( { type:"coins", qty:shapeData.coinsQty, func:drawing, params:{ ypos:yPos, value:coinsType, usecolumns:true, positions:shapePositions } }, false );
						if( ( i % 2 != 0 ) && ( difficulty >= PATTERN_DIF_MEDIUM ) ) {
							addObstacleToPatternsArray( 1, 'random', 200, MOVEMENT_WAVE );
						}
						addPauseToPatternsArray( 2 );
					}
					break;
				case 2 :
					// escalating down - ignore difficulty for pattern, just add obstacles
					minGap = shapeData.height * .5;
					maxGap = ( COINS_Y_AREA / ( shapesQty - 1 ) ) - shapeData.height;
					gap = ( Math.random() * ( maxGap - minGap ) ) + minGap;
					yPos = ( Math.random() * ( COINS_Y_AREA - ( gap * ( shapesQty - 1 ) ) - shapeData.height ) ) + COINS_MIN_Y + ( shapeData.height * .5 );
					for( var i = 0; i < shapesQty; i++ ) {
						addToItemPatternsArray( { type:"coins", qty:shapeData.coinsQty, func:drawing, params:{ ypos:yPos + ( gap * i ), value:coinsType, usecolumns:true, positions:shapePositions } }, false );
						if( ( i % 2 != 0 ) && ( difficulty >= PATTERN_DIF_MEDIUM ) ) {
							addObstacleToPatternsArray( 1, 'random', 200, MOVEMENT_WAVE );
						}
						addPauseToPatternsArray( 2 );
					}
					
					// add obstacles depending on difficulty 

					break;
				case 3 :
					// escalating up - ignore difficulty for pattern, just add obstacles
					minGap = shapeData.height * .5;
					maxGap = ( COINS_Y_AREA / ( shapesQty - 1 ) ) - shapeData.height;
					gap = ( Math.random() * ( maxGap - minGap ) ) + minGap;
					yPos = ( Math.random() * ( COINS_Y_AREA - ( gap * ( shapesQty - 1 ) ) - shapeData.height ) ) + COINS_MIN_Y + ( shapeData.height * .5 ) + ( gap * ( shapesQty - 1 ) ) ;
					for( var i = 0; i < shapesQty; i++ ) {
						addToItemPatternsArray( { type:"coins", qty:shapeData.coinsQty, func:drawing, params:{ ypos:yPos - ( gap * i ), value:coinsType, usecolumns:true, positions:shapePositions } }, false );
						if( ( i % 2 != 0 ) && ( difficulty >= PATTERN_DIF_MEDIUM ) ) {
							addObstacleToPatternsArray( 1, 'random', 200, MOVEMENT_WAVE );
						}
						addPauseToPatternsArray( 2 );
					}
					break;
				case 4 :
					// 2 alternate positions - max gap does depend on difficulty
					minGap = shapeData.height * Math.max( 1, difficulty );
					maxGap = Math.min( minGap, ( ( ( COINS_Y_AREA / 5 ) * difficulty ) - shapeData.height ) );
					gap = ( Math.random() * ( maxGap - minGap ) ) + minGap;
					yPos = ( Math.random() * ( COINS_Y_AREA - gap - shapeData.height ) ) + COINS_MIN_Y + ( shapeData.height * .5 );
					for( var i = 0; i < shapesQty; i++ ) {
						addToItemPatternsArray( { type:"coins", qty:shapeData.coinsQty, func:drawing, params:{ ypos:yPos + ((i%2==0)?gap:0), value:coinsType, usecolumns:true, positions:shapePositions } }, false );
						if( ( i % 2 != 0 ) && ( difficulty >= PATTERN_DIF_MEDIUM ) ) {
							addObstacleToPatternsArray( 1, 'random', 200, MOVEMENT_WAVE );
						}
						addPauseToPatternsArray( 2 );
					}
					break;
			}
			break;
			
		case PATTERN_SHAPES_LARGE :
			// just position it in the middle
			var yPos = ( Math.random() * ( COINS_Y_AREA - shapeData.height ) ) + COINS_MIN_Y + ( shapeData.height * .5 );
			addToItemPatternsArray( { type:"coins", qty:shapeData.coinsQty, func:drawing, params:{ ypos:yPos, value:coinsType, usecolumns:true, positions:shapePositions } }, false );
			break;
	}
	return;
}

function addLinesToPatternsArray( coinsQty, coinsType, difficulty ) {
	var randomId = 0;
	
	if( coinsQty == 0 ) { coinsQty = 30 };
	
	switch( difficulty ) {
		case PATTERN_DIF_EASIEST :
		case PATTERN_DIF_EASY :
			var MIN_SEP = 50;
			var MAX_SEP = 100;
			var sep = ( Math.random() * ( MAX_SEP - MIN_SEP ) ) + MIN_SEP;
			randomId = Math.floor( Math.random() * 4 ) + 1;
			switch( randomId ) {
				case 1 :
					// just one straight line
					addToItemPatternsArray( { type:"coins", qty:coinsQty, func:straightLine, params:{ ypos:( ( Math.random() * COINS_Y_AREA ) + COINS_MIN_Y ), value:coinsType } } );
					break;
				case 2 :
					// 2 lines easy to get, descending
					coinsQty = Math.floor( coinsQty / 2 );
					initialY = ( ( Math.random() * ( COINS_MAX_Y - sep ) - COINS_MIN_Y ) + COINS_MIN_Y );
					addToItemPatternsArray( { type:"coins", qty:coinsQty, func:straightLine, params:{ ypos:initialY, value:coinsType } } );
					addToItemPatternsArray( { type:"coins", qty:coinsQty, func:straightLine, params:{ ypos:initialY + sep, value:coinsType } } );
					break;
				case 3 :
					// 2 lines easy to get, ascending
					coinsQty = Math.floor( coinsQty / 2 );
					initialY = ( ( Math.random() * ( COINS_MAX_Y - sep ) - COINS_MIN_Y ) + COINS_MIN_Y ) + sep;
					addToItemPatternsArray( { type:"coins", qty:coinsQty, func:straightLine, params:{ ypos:initialY, value:coinsType } } );
					addToItemPatternsArray( { type:"coins", qty:coinsQty, func:straightLine, params:{ ypos:initialY - sep, value:coinsType } } );
					break;
				case 4 :
					// broken down line 3 to 5 pieces, easy to get
					var pieces = Math.floor( Math.random() * 3 ) + 3;
					coinsQty = Math.floor( coinsQty / pieces );
					initialY = ( ( Math.random() * ( COINS_MAX_Y - sep ) - COINS_MIN_Y ) + COINS_MIN_Y );
					for( var i = 0; i <  pieces; i++ ) {
						addToItemPatternsArray( { type:"coins", qty:coinsQty, func:straightLine, params:{ ypos:initialY + ( ( ( i % 2 ) == 0 )?0:sep ), value:coinsType } } );
					}
					break;
			}
			break;
		case PATTERN_DIF_MEDIUM :
		case PATTERN_DIF_HARD :
		case PATTERN_DIF_HARDEST :
			var MIN_SEP = 50;
			var MAX_SEP = COINS_Y_AREA / 2;
			var sep = ( Math.random() * ( MAX_SEP - MIN_SEP ) ) + MIN_SEP;
			var initialY;
			randomId = Math.floor( Math.random() * 4 ) + 1;
			switch( randomId ) {
				case 1 :
					// 3 lines escalating down
					coinsQty = Math.floor( coinsQty / 3 );
					initialY = ( ( Math.random() * ( COINS_MAX_Y - ( sep * 2 ) - COINS_MIN_Y ) ) + COINS_MIN_Y );
					addToItemPatternsArray( { type:"coins", qty:coinsQty, func:straightLine, params:{ ypos:initialY, value:coinsType } } );
					addObstacleToPatternsArray( 1, 'random', 200, MOVEMENT_WAVE );
					addToItemPatternsArray( { type:"coins", qty:coinsQty, func:straightLine, params:{ ypos:initialY + sep, value:coinsType } } );
					addPauseToPatternsArray( 1 );
					addToItemPatternsArray( { type:"coins", qty:coinsQty, func:straightLine, params:{ ypos:initialY + ( 2 * sep ), value:coinsType } } );
					break;
				case 2 :
					// 3 lines escalating up
					coinsQty = Math.floor( coinsQty / 3 );
					initialY = ( ( Math.random() * ( COINS_MAX_Y - ( sep * 2 ) - COINS_MIN_Y ) ) + COINS_MIN_Y ) + ( 2 * sep );
					addToItemPatternsArray( { type:"coins", qty:coinsQty, func:straightLine, params:{ ypos:initialY, value:coinsType } } );
					addObstacleToPatternsArray( 1, 'random', 200, MOVEMENT_WAVE );
					addToItemPatternsArray( { type:"coins", qty:coinsQty, func:straightLine, params:{ ypos:initialY - sep, value:coinsType } } );
					addPauseToPatternsArray( 1 );
					addToItemPatternsArray( { type:"coins", qty:coinsQty, func:straightLine, params:{ ypos:initialY - ( 2 * sep ), value:coinsType } } );
					break;
				case 3 :
					// 3 to 5 lines escalating down
					var linesQty = Math.floor( Math.random() * 3 ) + 2; 
					MIN_SEP = 100 / linesQty;
					MAX_SEP = COINS_Y_AREA / ( linesQty - 1 );
					sep = ( Math.random() * ( MAX_SEP - MIN_SEP ) ) + MIN_SEP;
					coinsQty = Math.floor( coinsQty / linesQty );
					initialY = ( ( Math.random() * ( COINS_MAX_Y - ( sep * ( linesQty - 1 ) ) - COINS_MIN_Y ) ) + COINS_MIN_Y );
					for( var i = 0; i < linesQty; i++ ) {
						addToItemPatternsArray( { type:"coins", qty:coinsQty, func:straightLine, params:{ ypos:initialY + ( i * sep ), value:coinsType } } );
						addPauseToPatternsArray( 1 );
					}
					break;
				case 4 :
					// 3 to 5 lines escalating up
					var linesQty = Math.floor( Math.random() * 3 ) + 2; 
					MIN_SEP = 100 / linesQty;
					MAX_SEP = COINS_Y_AREA / ( linesQty - 1 );
					sep = ( Math.random() * ( MAX_SEP - MIN_SEP ) ) + MIN_SEP;
					coinsQty = Math.floor( coinsQty / linesQty );
					initialY = ( ( Math.random() * ( COINS_MAX_Y - ( sep * ( linesQty - 1 ) ) - COINS_MIN_Y ) ) + COINS_MIN_Y ) + ( ( linesQty - 1 ) * sep );
					for( var i = 0; i < linesQty; i++ ) {
						addToItemPatternsArray( { type:"coins", qty:coinsQty, func:straightLine, params:{ ypos:initialY - ( i * sep ), value:coinsType } } );
						addPauseToPatternsArray( 1 );
					}
					break;
			}
			break;
		default:
		// case PATTERN_DIF_HARD :
		// case PATTERN_DIF_HARDEST :
			randomId = Math.floor( Math.random() * 1 ) + 1;
			switch( randomId ) {
				case 1 :
					// 2 to 4 alternate very separated lines
					break;
			}
			break;
	}
}

function addWaveToPatternsArray( coinsQty, coinsType, difficulty ) {
	var randomId = 0;
	
	var waveCoinsQty;
	var yMin;
	var yMax;
	var yPos;
	var amplitude;

	difficulty = PATTERN_DIF_HARD;
	
	switch( difficulty ) {
		case PATTERN_DIF_EASIEST :
		case PATTERN_DIF_EASY :
			randomId = Math.floor( Math.random() * 2 ) + 1;
			
			switch( randomId ) {
				case 1 :
					// WAVE - EASY and EASIEST
					// two good medium to big waves, connect at middle - works well with coins from 20 to 60
					coinsQty = Math.min( Math.max( coinsQty, 20 ), 60 );
					waveCoinsQty = Math.floor( coinsQty / 2 );
					amplitude = Math.floor( Math.random() * 160 ) + 50;
					yMin = COINS_MIN_Y + amplitude;
					yMax = COINS_MAX_Y - amplitude;
					yPos = ( Math.random() * ( yMax - yMin ) ) + yMin;
					addToItemPatternsArray( { type:"coins", qty:waveCoinsQty, func:sineWave, params:{ ypos:yPos, value:coinsType, amplitude:amplitude, frequency:1 } } );
					addToItemPatternsArray( { type:"coins", qty:waveCoinsQty, func:sineWave, params:{ ypos:yPos, value:coinsType, amplitude:amplitude, frequency:1 } } );
					break;
				case 2 :
					// WAVE - EASIER
					// two good big waves - works well with coins from 20 to 60
					coinsQty = Math.min( Math.max( coinsQty, 20 ), 60 );
					waveCoinsQty = Math.floor( coinsQty / 2 );
					amplitude = Math.floor( Math.random() * 160 ) + 50;
					yMin = COINS_MIN_Y + amplitude;
					yMax = COINS_MAX_Y - amplitude;
					yPos = ( Math.random() * ( yMax - yMin ) ) + yMin;
					addToItemPatternsArray( { type:"coins", qty:waveCoinsQty, func:cosineWave, params:{ ypos:yPos, value:coinsType, amplitude:amplitude, frequency:1 } } );
					addToItemPatternsArray( { type:"coins", qty:waveCoinsQty, func:cosineWave, params:{ ypos:yPos, value:coinsType, amplitude:amplitude, frequency:1 } } );
					break;
			}
			break;
		case PATTERN_DIF_MEDIUM :
			randomId = Math.floor( Math.random() * 2 ) + 1;
			switch( randomId ) {
				case 1 :
					// three medium to big waves, connect at middle - works well with coins from 40 to 80
					coinsQty = Math.min( Math.max( coinsQty, 40 ), 80 );
					waveCoinsQty = Math.floor( coinsQty / 3 );
					amplitude = Math.floor( Math.random() * 70 ) + 110;
					yMin = COINS_MIN_Y + amplitude;
					yMax = COINS_MAX_Y - amplitude;
					yPos = ( Math.random() * ( yMax - yMin ) ) + yMin;
					addToItemPatternsArray( { type:"coins", qty:waveCoinsQty, func:sineWave, params:{ ypos:yPos, value:coinsType, amplitude:amplitude, frequency:1 } } );
					addObstacleToPatternsArray( 1, 'random', 200, MOVEMENT_WAVE );
					addToItemPatternsArray( { type:"coins", qty:waveCoinsQty, func:sineWave, params:{ ypos:yPos, value:coinsType, amplitude:amplitude, frequency:1 } } );
					addObstacleToPatternsArray( 1, 'random', 200, MOVEMENT_WAVE );
					addToItemPatternsArray( { type:"coins", qty:waveCoinsQty, func:sineWave, params:{ ypos:yPos, value:coinsType, amplitude:amplitude, frequency:1 } } );
					break;
				case 2 :
					// three medium to big waves - works well with coins from 40 to 80
					coinsQty = Math.min( Math.max( coinsQty, 40 ), 80 );
					waveCoinsQty = Math.floor( coinsQty / 3 );
					amplitude = Math.floor( Math.random() * 70 ) + 110;
					yMin = COINS_MIN_Y + amplitude;
					yMax = COINS_MAX_Y - amplitude;
					yPos = ( Math.random() * ( yMax - yMin ) ) + yMin;
					addToItemPatternsArray( { type:"coins", qty:waveCoinsQty, func:cosineWave, params:{ ypos:yPos, value:coinsType, amplitude:amplitude, frequency:1 } } );
					addObstacleToPatternsArray( 1, 'random', 200, MOVEMENT_WAVE );
					addToItemPatternsArray( { type:"coins", qty:waveCoinsQty, func:cosineWave, params:{ ypos:yPos, value:coinsType, amplitude:amplitude, frequency:1 } } );
					addObstacleToPatternsArray( 1, 'random', 200, MOVEMENT_WAVE );
					addToItemPatternsArray( { type:"coins", qty:waveCoinsQty, func:cosineWave, params:{ ypos:yPos, value:coinsType, amplitude:amplitude, frequency:1 } } );
					break;
			}
			break;
		case PATTERN_DIF_HARD :
		case PATTERN_DIF_HARDEST :
			randomId = Math.floor( Math.random() * 2 ) + 1;
			switch( randomId ) {
				case 1 :
					// four big waves, connect at middle - works well with coins from 70 to 100
					coinsQty = Math.min( Math.max( coinsQty, 70 ), 100 );
					waveCoinsQty = Math.floor( coinsQty / 4 );
					amplitude = Math.floor( Math.random() * 140 ) + 110;
					yMin = COINS_MIN_Y + amplitude;
					yMax = COINS_MAX_Y - amplitude;
					yPos = ( Math.random() * ( yMax - yMin ) ) + yMin;
					addToItemPatternsArray( { type:"coins", qty:waveCoinsQty, func:sineWave, params:{ ypos:yPos, value:coinsType, amplitude:amplitude, frequency:1 } } );
					addObstacleToPatternsArray( 1, 'random', 200, MOVEMENT_WAVE );
					addToItemPatternsArray( { type:"coins", qty:waveCoinsQty, func:sineWave, params:{ ypos:yPos, value:coinsType, amplitude:amplitude, frequency:1 } } );
					addObstacleToPatternsArray( 2, 'random', 200, MOVEMENT_WAVE );
					addObstacleToPatternsArray( 3, 'random', 200, MOVEMENT_WAVE );
					addObstacleToPatternsArray( 4, 'random', 200, MOVEMENT_WAVE );
					addToItemPatternsArray( { type:"coins", qty:waveCoinsQty, func:sineWave, params:{ ypos:yPos, value:coinsType, amplitude:amplitude, frequency:1 } } );
					addObstacleToPatternsArray( 2, 'random', 200, MOVEMENT_WAVE );
					addToItemPatternsArray( { type:"coins", qty:waveCoinsQty, func:sineWave, params:{ ypos:yPos, value:coinsType, amplitude:amplitude, frequency:1 } } );
					break;
				case 2 :
					// four big waves - works well with coins from 70 to 100
					coinsQty = Math.min( Math.max( coinsQty, 70 ), 100 );
					waveCoinsQty = Math.floor( coinsQty / 4 );
					amplitude = Math.floor( Math.random() * 140 ) + 110;
					yMin = COINS_MIN_Y + amplitude;
					yMax = COINS_MAX_Y - amplitude;
					yPos = ( Math.random() * ( yMax - yMin ) ) + yMin;
					addToItemPatternsArray( { type:"coins", qty:waveCoinsQty, func:cosineWave, params:{ ypos:yPos, value:coinsType, amplitude:amplitude, frequency:1 } } );
					addObstacleToPatternsArray( 1, 'random', 200, MOVEMENT_WAVE );
					addToItemPatternsArray( { type:"coins", qty:waveCoinsQty, func:cosineWave, params:{ ypos:yPos, value:coinsType, amplitude:amplitude, frequency:1 } } );
					addObstacleToPatternsArray( 2, 'random', 200, MOVEMENT_WAVE );
					addObstacleToPatternsArray( 3, 'random', 200, MOVEMENT_WAVE );
					addObstacleToPatternsArray( 4, 'random', 200, MOVEMENT_WAVE );
					addToItemPatternsArray( { type:"coins", qty:waveCoinsQty, func:cosineWave, params:{ ypos:yPos, value:coinsType, amplitude:amplitude, frequency:1 } } );
					addObstacleToPatternsArray( 2, 'random', 200, MOVEMENT_WAVE );
					addToItemPatternsArray( { type:"coins", qty:waveCoinsQty, func:cosineWave, params:{ ypos:yPos, value:coinsType, amplitude:amplitude, frequency:1 } } );
					break;
			}
			break;
	}
} 

function addSwirlToPatternsArray( coinsQty, coinsType, difficulty ) {
	var randomId = 0;

	switch( difficulty ) {
		case PATTERN_DIF_EASIEST :
		case PATTERN_DIF_EASY :
			randomId = Math.floor( Math.random() * 1 ) + 1;
			switch( randomId ) {
				case 1 :
					// SWIRL - EASY - 75
					addToItemPatternsArray( { type:"coins", qty:20, func:sineWave, params:{ ypos:340, value:coinsType, amplitude:50, frequency:2 } } );
					addToItemPatternsArray( { type:"coins", qty:25, func:sineWave, params:{ ypos:340, value:coinsType, amplitude:90, frequency:2 } } );
					addObstacleToPatternsArray( 1, 'random', 200, MOVEMENT_WAVE );
					addToItemPatternsArray( { type:"coins", qty:30, func:sineWave, params:{ ypos:340, value:coinsType, amplitude:130, frequency:2 } } );
					break;
			}
			break;
		case PATTERN_DIF_MEDIUM :
			randomId = Math.floor( Math.random() * 1 ) + 1;
			switch( randomId ) {
				case 1 :
					// SWIRL - MEDIUM - 150
					addToItemPatternsArray( { type:"coins", qty:20, func:sineWave, params:{ ypos:340, value:coinsType, amplitude:50, frequency:2 } } );
					addToItemPatternsArray( { type:"coins", qty:25, func:sineWave, params:{ ypos:340, value:coinsType, amplitude:90, frequency:2 } } );
					addObstacleToPatternsArray( 1, 'random', 200, MOVEMENT_WAVE );
					addToItemPatternsArray( { type:"coins", qty:30, func:sineWave, params:{ ypos:340, value:coinsType, amplitude:130, frequency:2 } } );
					addObstacleToPatternsArray( 2, 'random', 200, MOVEMENT_WAVE );
					addObstacleToPatternsArray( 3, 'random', 200, MOVEMENT_WAVE );
					addToItemPatternsArray( { type:"coins", qty:35, func:sineWave, params:{ ypos:340, value:coinsType, amplitude:170, frequency:2 } } );
					addToItemPatternsArray( { type:"coins", qty:40, func:sineWave, params:{ ypos:340, value:coinsType, amplitude:210, frequency:2 } } );
					break;
			}
			break;
		case PATTERN_DIF_HARD :
		case PATTERN_DIF_HARDEST :
			randomId = Math.floor( Math.random() * 1 ) + 1;
			switch( randomId ) {
				case 1 :
					addObstacleToPatternsArray( 1, 'random', 200, MOVEMENT_WAVE );
					addObstacleToPatternsArray( 2, 'random', 200, MOVEMENT_WAVE );
					addObstacleToPatternsArray( 3, 'random', 200, MOVEMENT_WAVE );
					addObstacleToPatternsArray( 4, 'random', 200, MOVEMENT_WAVE );
					addToItemPatternsArray( { type:"coins", qty:10, func:sineWave, params:{ ypos:340, value:coinsType, amplitude:50, frequency:1 } } );
					addToItemPatternsArray( { type:"coins", qty:15, func:sineWave, params:{ ypos:340, value:coinsType, amplitude:130, frequency:1 } } );
					addToItemPatternsArray( { type:"coins", qty:20, func:sineWave, params:{ ypos:340, value:coinsType, amplitude:210, frequency:1 } } );
					addObstacleToPatternsArray( 2, 'random', 200, MOVEMENT_WAVE );
					addObstacleToPatternsArray( 3, 'random', 200, MOVEMENT_WAVE );
					addToItemPatternsArray( { type:"coins", qty:15, func:sineWave, params:{ ypos:340, value:coinsType, amplitude:130, frequency:1 } } );
					addToItemPatternsArray( { type:"coins", qty:10, func:sineWave, params:{ ypos:340, value:coinsType, amplitude:50, frequency:1 } } );
					addObstacleToPatternsArray( 1, 'random', 200, MOVEMENT_WAVE );
					addObstacleToPatternsArray( 2, 'random', 200, MOVEMENT_WAVE );
					addObstacleToPatternsArray( 3, 'random', 200, MOVEMENT_WAVE );
					addObstacleToPatternsArray( 4, 'random', 200, MOVEMENT_WAVE );
					break;
			}
			break;
	}
}


function randomizeItemPatternsArray( levelId, levelData ) {
	// do this depending on the level difficulty, using some patterns from a pattern generator array
	// and don't forget to multiply EVERYTHING by the scaleFactor here!

	itemPatterns = new Array();
	// always add a pause at the beginning
	addPauseToPatternsArray( 1 );
	
	//+++ addWordToItemPatternsArray( "LEVEL " + levelId );
	
	//??? { type:"obstacle", qty:1, func:randomPos, ypos:100, params: { size:1 } }

	minObstacleSpeed = 1;
	maxObstacleSpeed = 2;

// addShapesToPatternsArray( PATTERN_COINS_GOLD, PATTERN_DIF_EASY, PATTERN_SHAPES_SMALL );
	
	
	switch( levelId ) {
		case 1 :
			addPauseToPatternsArray( 10 );
			addWaveToPatternsArray( 60, PATTERN_COINS_BRONZE, PATTERN_DIF_EASIEST );
			
			addPauseToPatternsArray( 10 );
			
			addObstacleToPatternsArray( 1, 'random', 200, MOVEMENT_LINEAR );
			addLinesToPatternsArray( 30, PATTERN_COINS_SILVER, PATTERN_DIF_EASY ); // PATTERN_COINS_ESCALATE
			
			addPauseToPatternsArray( 10 );
			
			addObstacleToPatternsArray( 1, 'random', 200, MOVEMENT_LINEAR );
			addObstacleToPatternsArray( 1, 'random', 200, MOVEMENT_WAVE );
			addShapesToPatternsArray( PATTERN_COINS_GOLD, PATTERN_DIF_EASY, PATTERN_SHAPES_SMALL ); // PATTERN_COINS_ALTERNATE
			
			addPauseToPatternsArray( 10 );
			
			addRandomWordToPatternsArray( PATTERN_COINS_BRONZE, PATTERN_WORD_SHORT );
			
			addPauseToPatternsArray( 10 );
			
			addObstacleToPatternsArray( 1, 'random', 200, MOVEMENT_LINEAR );
			addObstacleToPatternsArray( 1, 'random', 200, MOVEMENT_WAVE );
			addObstacleToPatternsArray( 1, 'random', 200, MOVEMENT_LINEAR );
			addSwirlToPatternsArray( 0, PATTERN_COINS_BRONZE, PATTERN_DIF_EASY );
			
			addPauseToPatternsArray( 10 );
			
			addObstacleToPatternsArray( 1, 'random', 200, MOVEMENT_WAVE );
			addObstacleToPatternsArray( 1, 'random', 200, MOVEMENT_WAVE );
			addObstacleToPatternsArray( 1, 'random', 200, MOVEMENT_WAVE );
			addLinesToPatternsArray( 30, PATTERN_COINS_SILVER, PATTERN_DIF_MEDIUM ); // PATTERN_COINS_ALTERNATE
			
			addPauseToPatternsArray( 10 );
			
			addObstacleToPatternsArray( 1, 'random', 200, MOVEMENT_WAVE );
			addObstacleToPatternsArray( 1, 'random', 200, MOVEMENT_WAVE );
			addObstacleToPatternsArray( 1, 'random', 200, MOVEMENT_WAVE );
			addObstacleToPatternsArray( 1, 'random', 200, MOVEMENT_LINEAR );
			addRandomWordToPatternsArray( PATTERN_COINS_BRONZE, PATTERN_WORD_LONG );
			
			addPauseToPatternsArray( 10 );
			
			addObstacleToPatternsArray( 1, 'random', 200, MOVEMENT_LINEAR );
			addObstacleToPatternsArray( 1, 'random', 200, MOVEMENT_WAVE );
			addObstacleToPatternsArray( 1, 'random', 200, MOVEMENT_WAVE );
			addShapesToPatternsArray( PATTERN_COINS_GOLD, PATTERN_DIF_EASY, PATTERN_SHAPES_SMALL ); // PATTERN_COINS_ESCALATE, PATTERN_DIF_MEDIUM
			addPauseToPatternsArray( 10 );

			/*
			
			// diagonals
			addToItemPatternsArray( { type:"coins", qty:10, func:straightLine, params:{ ypos:200, value:1 } } );
			addObstacleToPatternsArray( 1, 200, 'default', MOVEMENT_WAVE );
			addToItemPatternsArray( { type:"coins", qty:28, func:alternatePos, params:{ ypos:200, value:1, positions:[0,10,20,30,20,10,0,-10,-20,-30,-20,-10,0] } } );
			addToItemPatternsArray( { type:"coins", qty:10, func:straightLine, params:{ ypos:200, value:1 } } );
			*/
			break;
		case 2 :
			
			addObstacleToPatternsArray( 2, 'random', 'default', MOVEMENT_LINEAR );
			addObstacleToPatternsArray( 2, 'random', 'default', MOVEMENT_WAVE );
			addShapesToPatternsArray( PATTERN_COINS_SILVER, PATTERN_DIF_MEDIUM, PATTERN_SHAPES_SMALL ); // PATTERN_COINS_ALTERNATE
			
			addPauseToPatternsArray( 6 );

			addObstacleToPatternsArray( 1, 'random', 'default', MOVEMENT_LINEAR );
			addObstacleToPatternsArray( 1, 'random', 'default', MOVEMENT_WAVE );
			addToItemPatternsArray( { type:"multiplier", value:2, qty:1, func:randomPos, ypos:0 } );
			addObstacleToPatternsArray( 2, 'random', 'default', MOVEMENT_WAVE );
			addWaveToPatternsArray( 60, PATTERN_COINS_BRONZE, PATTERN_DIF_MEDIUM );
			
			addPauseToPatternsArray( 6 );

			addObstacleToPatternsArray( 1, 'random', 'default', MOVEMENT_LINEAR );
			addObstacleToPatternsArray( 2, 'random', 'default', MOVEMENT_WAVE );
			addObstacleToPatternsArray( 3, 'random', 'default', MOVEMENT_WAVE );
			addShapesToPatternsArray( PATTERN_COINS_GOLD, PATTERN_DIF_MEDIUM, PATTERN_SHAPES_MEDIUM ); // PATTERN_COINS_ALTERNATE

			addPauseToPatternsArray( 6 );

			addObstacleToPatternsArray( 2, 'random', 'default', MOVEMENT_WAVE );
			addLinesToPatternsArray( 40, PATTERN_COINS_SILVER, PATTERN_DIF_MEDIUM ); // PATTERN_COINS_ESCALATE
			
			addPauseToPatternsArray( 6 );

			addObstacleToPatternsArray( 1, 'random', 'default', MOVEMENT_LINEAR );
			addObstacleToPatternsArray( 1, 'random', 'default', MOVEMENT_LINEAR );
			addToItemPatternsArray( { type:"multiplier", value:2, qty:1, func:randomPos, ypos:0 } );
			addObstacleToPatternsArray( 1, 'random', 'default', MOVEMENT_LINEAR );
			addObstacleToPatternsArray( 1, 'random', 'default', MOVEMENT_LINEAR );
			addObstacleToPatternsArray( 1, 'random', 'default', MOVEMENT_LINEAR );
			addRandomWordToPatternsArray( PATTERN_COINS_BRONZE, PATTERN_WORD_SHORT );

			addPauseToPatternsArray( 6 );
			
			addObstacleToPatternsArray( 2, 'random', 'default', MOVEMENT_LINEAR );
			addObstacleToPatternsArray( 3, 'random', 'default', MOVEMENT_WAVE );
			addShapesToPatternsArray( PATTERN_COINS_BRONZE, PATTERN_DIF_MEDIUM, PATTERN_SHAPES_SMALL );
			
			addPauseToPatternsArray( 2 );

			addObstacleToPatternsArray( 1, 'random', 'default', MOVEMENT_WAVE );
			addObstacleToPatternsArray( 2, 'random', 'default', MOVEMENT_LINEAR );
			addObstacleToPatternsArray( 3, 'random', 'default', MOVEMENT_WAVE );
			addShapesToPatternsArray( PATTERN_COINS_SILVER, PATTERN_DIF_HARD, PATTERN_SHAPES_MEDIUM );
			
			addToItemPatternsArray( { type:"multiplier", value:2, qty:1, func:randomPos, ypos:0 } );
			addPauseToPatternsArray( 2 );

			addObstacleToPatternsArray( 1, 'random', 'default', MOVEMENT_WAVE );
			addObstacleToPatternsArray( 1, 'random', 'default', MOVEMENT_WAVE );
			addObstacleToPatternsArray( 2, 'random', 'default', MOVEMENT_LINEAR );
			addObstacleToPatternsArray( 3, 'random', 'default', MOVEMENT_WAVE );
			addShapesToPatternsArray( PATTERN_COINS_GOLD, PATTERN_DIF_HARD, PATTERN_SHAPES_SMALL );

			addPauseToPatternsArray( 6 );
			
			addObstacleToPatternsArray( 2, 'random', 'default', MOVEMENT_LINEAR );
			addObstacleToPatternsArray( 3, 'random', 'default', MOVEMENT_WAVE );
			addObstacleToPatternsArray( 2, 'random', 'default', MOVEMENT_WAVE );
			addObstacleToPatternsArray( 3, 'random', 'default', MOVEMENT_LINEAR );
			addRandomWordToPatternsArray( PATTERN_COINS_BRONZE, PATTERN_WORD_MEDIUM );

			addPauseToPatternsArray( 6 );
			
			addObstacleToPatternsArray( 2, 'random', 'default', MOVEMENT_LINEAR );
			addObstacleToPatternsArray( 3, 'random', 'default', MOVEMENT_WAVE );
			addShapesToPatternsArray( PATTERN_COINS_BRONZE, PATTERN_DIF_MEDIUM, PATTERN_SHAPES_SMALL );
			
			addPauseToPatternsArray( 10 );
			break;
		case 3 :
			addSwirlToPatternsArray( 0, PATTERN_COINS_SILVER, PATTERN_DIF_MEDIUM );

			addPauseToPatternsArray( 4 );

			addObstacleToPatternsArray( 1, 'random', 'default', MOVEMENT_LINEAR );
			addObstacleToPatternsArray( 1, 'random', 'default', MOVEMENT_LINEAR );
			addObstacleToPatternsArray( 1, 'random', 'default', MOVEMENT_LINEAR );
			addObstacleToPatternsArray( 4, 'random', 'default', MOVEMENT_WAVE );
			addObstacleToPatternsArray( 4, 'random', 'default', MOVEMENT_LINEAR );
			addSwirlToPatternsArray( 0, PATTERN_COINS_GOLD, PATTERN_DIF_HARD );

			addPauseToPatternsArray( 4 );

			addToItemPatternsArray( { type:"multiplier", value:2, qty:1, func:randomPos, ypos:0 } );
			addObstacleToPatternsArray( 1, 'random', 'default', MOVEMENT_LINEAR );
			addObstacleToPatternsArray( 3, 'random', 'default', MOVEMENT_WAVE );
			addObstacleToPatternsArray( 1, 'random', 'default', MOVEMENT_LINEAR );
			addShapesToPatternsArray( PATTERN_COINS_GOLD, PATTERN_DIF_EASY, PATTERN_SHAPES_SMALL );

			addPauseToPatternsArray( 2 );

			addObstacleToPatternsArray( 1, 'random', 'default', MOVEMENT_LINEAR );
			addObstacleToPatternsArray( 3, 'random', 'default', MOVEMENT_WAVE );
			addObstacleToPatternsArray( 4, 'random', 'default', MOVEMENT_LINEAR );
			addShapesToPatternsArray( PATTERN_COINS_GOLD, PATTERN_DIF_HARD, PATTERN_SHAPES_MEDIUM );

			addPauseToPatternsArray( 2 );

			addObstacleToPatternsArray( 1, 'random', 'default', MOVEMENT_LINEAR );
			addObstacleToPatternsArray( 4, 'random', 'default', MOVEMENT_WAVE );
			addObstacleToPatternsArray( 4, 'random', 'default', MOVEMENT_WAVE );
			addShapesToPatternsArray( PATTERN_COINS_GOLD, PATTERN_DIF_EASY, PATTERN_SHAPES_LARGE );

			addPauseToPatternsArray( 4 );
/*
			addObstacleToPatternsArray( 1, 'random', 'default', MOVEMENT_LINEAR );
			addObstacleToPatternsArray( 4, 'random', 'default', MOVEMENT_LINEAR );
			addObstacleToPatternsArray( 1, 'random', 'default', MOVEMENT_LINEAR );
			addObstacleToPatternsArray( 4, 'random', 'default', MOVEMENT_LINEAR );
			addObstacleToPatternsArray( 1, 'random', 'default', MOVEMENT_LINEAR );
			addRandomWordToPatternsArray( PATTERN_COINS_SILVER, PATTERN_WORD_LONG );

			addPauseToPatternsArray( 6 );
			
			*/

			addObstacleToPatternsArray( 4, 'random', 'default', MOVEMENT_WAVE );
			addObstacleToPatternsArray( 3, 'random', 'default', MOVEMENT_WAVE );
			addLinesToPatternsArray( 10, PATTERN_COINS_BRONZE, PATTERN_DIF_EASY ); // PATTERN_COINS_ESCALATE
			addObstacleToPatternsArray( 4, 'random', 'default', MOVEMENT_WAVE );
			addObstacleToPatternsArray( 3, 'random', 'default', MOVEMENT_WAVE );
			addLinesToPatternsArray( 10, PATTERN_COINS_SILVER, PATTERN_DIF_MEDIUM ); // PATTERN_COINS_ESCALATE
			addObstacleToPatternsArray( 4, 'random', 'default', MOVEMENT_WAVE );
			addObstacleToPatternsArray( 3, 'random', 'default', MOVEMENT_WAVE );
			addLinesToPatternsArray( 10, PATTERN_COINS_GOLD, PATTERN_DIF_HARD ); // PATTERN_COINS_ESCALATE

			addPauseToPatternsArray( 4 );

			/*
			addObstacleToPatternsArray( 4, 'random', 'default', MOVEMENT_WAVE );
			addObstacleToPatternsArray( 3, 'random', 'default', MOVEMENT_WAVE );
			addToItemPatternsArray( { type:"multiplier", value:3, qty:1, func:randomPos, ypos:0 } );
			addObstacleToPatternsArray( 3, 'random', 'default', MOVEMENT_WAVE );
			addRandomWordToPatternsArray( PATTERN_COINS_BRONZE, PATTERN_WORD_MEDIUM );

			addPauseToPatternsArray( 4 );
			
			
			addObstacleToPatternsArray( 1, 'random', 'default', MOVEMENT_WAVE );
			addObstacleToPatternsArray( 1, 'random', 'default', MOVEMENT_WAVE );
			addObstacleToPatternsArray( 4, 'random', 'default', MOVEMENT_WAVE );
			addObstacleToPatternsArray( 3, 'random', 'default', MOVEMENT_WAVE );
			addWaveToPatternsArray( 60, PATTERN_COINS_BRONZE, PATTERN_DIF_MEDIUM );
			addWaveToPatternsArray( 60, PATTERN_COINS_SILVER, PATTERN_DIF_HARD );
			
			addPauseToPatternsArray( 4 );
			*/
			
			addObstacleToPatternsArray( 4, 'random', 'default', MOVEMENT_WAVE );
			addObstacleToPatternsArray( 4, 'random', 'default', MOVEMENT_WAVE );
			addObstacleToPatternsArray( 4, 'random', 'default', MOVEMENT_WAVE );
			addObstacleToPatternsArray( 4, 'random', 'default', MOVEMENT_WAVE );
			addObstacleToPatternsArray( 1, 'random', 'default', MOVEMENT_LINEAR );
			addObstacleToPatternsArray( 1, 'random', 'default', MOVEMENT_LINEAR );
			addToItemPatternsArray( { type:"multiplier", value:3, qty:1, func:randomPos, ypos:0 } );
			addILuvToPatternsArray( "SAVING", PATTERN_COINS_SILVER );

			addPauseToPatternsArray( 10 );
			
			break;
	}
}

ItemsManager.prototype.initialize = function( newStage, contentManager, newScaleFactor, levelId, optimiseForSmallScreen ) {
	stage = newStage;

	scaleFactor = newScaleFactor;

	// scale the fixed positions patterns
	//??? scalePatternPositions();
	
	DISTANCE_STEPS*=scaleFactor;
	ITEM_RESPAWN_X*=scaleFactor;

	var levelData = {};
	switch( levelId ) {
		case 1 :
			levelData.obstacles1Qty = 5;
			levelData.obstacles2Qty = 2;
			levelData.obstacles3Qty = 0;
			levelData.obstacles4Qty = 0;
			break;
		case 2 :
			levelData.obstacles1Qty = 5;
			levelData.obstacles2Qty = 4;
			levelData.obstacles3Qty = 1;
			levelData.obstacles4Qty = 0;
			break;
		case 3 :
			levelData.obstacles1Qty = 5;
			levelData.obstacles2Qty = 2;
			levelData.obstacles3Qty = 3;
			levelData.obstacles4Qty = 2;
			break;
	}
	
	randomizeItemPatternsArray( levelId, levelData );
	
	// scale the fixed positions patterns - yes, after creating the patterns, so they are done only once
	scalePatternPositions();
	
	
	allCoins = new Array();
	// just to test, add x coins
	for( var i = 0; i < COINS_QUANTITY; i++ ) {
		var newCoin = new Coin( contentManager.imgItemCoin, scaleFactor );
		allCoins.push( newCoin );
		// just placing it out of the way
		newCoin.y = -100;
		// newCoin.velocityY = STARTING_SPEED_Y * scaleFactor;
		// newCoin.velocityX = STARTING_SPEED_X * scaleFactor;
		stage.addChild( newCoin );
	}
	
	// add obstacles to arrays, all the different types
	for( var o = 1; o <= 4; o++ ) {
		window['allObstacles' + o] = new Array();
		for( var i = 0; i < levelData['obstacles' + o + 'Qty']; i++ ) {
			//??? ( Math.random() * 2 ) + 1
			var newObstacle = new ItemObstacle( stage, contentManager, o, scaleFactor, optimiseForSmallScreen );
			window['allObstacles' + o].push( newObstacle );
			newObstacle.y = -500;
		}
	}
	
	multiplier2x = new ItemMultiplier( contentManager, scaleFactor, 2 );
	multiplier3x = new ItemMultiplier( contentManager, scaleFactor, 3 );
		multiplier2x.velocityY = 0;
		multiplier2x.velocityX = -4 * scaleFactor;
		multiplier2x.y = -100;
		multiplier3x.velocityY = 0;
		multiplier3x.velocityX = -5 * scaleFactor;
		multiplier3x.y = -100;
	stage.addChild( multiplier2x );
	stage.addChild( multiplier3x );

	// create items patterns before the level starts, depending on levelId
	// itemPatterns = new Array( ... );
}

ItemsManager.prototype.tick = function( currentDistance, speedY, speedX, player, ignoreMultiplier ) {
	var scoreToAdd = 0;
	var multx = 0;
	var coinsToReduce = 0;

	// update all the coins
	if( currentDistance >= ( totalItemCounter * DISTANCE_STEPS ) ) {
		nextItem( currentDistance, ignoreMultiplier );
		totalItemCounter++;
	}
	
	//--- if( player.alive...
	for ( coin in allCoins ) {
		var currentCoin = allCoins[ coin ];
		
		currentCoin.tick( speedY, speedX );
		
		if( currentCoin.hitRadius( player.x, player.y, player.hit ) ) {
			currentCoin.taken();
			scoreToAdd+=currentCoin.value;
		}
	
		continue;
	}

	for( var o = 1; o <= 4; o++ ) {
		for ( obstacle in window['allObstacles' + o] ) {
			var currentObstacle = window['allObstacles' + o][ obstacle ];
			currentObstacle.tick();
			
			if( currentObstacle.hitRadius( player.x, player.y, player.hit ) ) {
				currentObstacle.taken();
				coinsToReduce+=currentObstacle.value;
				scoreToAdd-=currentObstacle.value;
			}
			continue;
		}
	}
	
	if( multiplier2x.isUsed ) {
		multiplier2x.tick();
		if( multiplier2x.hitRadius( player.x, player.y, player.hit ) ) {
			multiplier2x.taken();
			multx = 2;
		}
	}

	if( multiplier3x.isUsed ) {
		multiplier3x.tick();
		if( multiplier3x.hitRadius( player.x, player.y, player.hit ) ) {
			multiplier3x.taken();
			multx = 3;
		}
	}
	
	return { score:scoreToAdd, extratime:0, multiplier:multx, coinsreduced:coinsToReduce };
}

function nextItem( currentDistance, ignoreMultiplier ) {
	// generate the next item in queue
	if( itemCounterNow >= itemPatterns[ itemPatternsIndexNow ].qty ) {
		// attempt to go to next pattern
		itemPatternsIndexNow++;
		// and recount the item counter
		itemCounterNow = 0;
		// reset the drawing starting index (only used for drawing pattern)
		drawingCurrentIndex = 0;
		drawingCurrentSubIndex = 0;
		
		// check if there is actually a next pattern
		if( itemPatternsIndexNow >= itemPatterns.length )
		{
			// or else count over
			itemPatternsIndexNow = 0;
		}
	}
	
	// spawn a new item of the type needed, in the proper position
	switch( itemPatterns[ itemPatternsIndexNow ].type ) {
		case "pause" :
			itemCounterNow++;
			break;
		case "coins" :
			{
				// coins quantity used if there more than one coin in a column
				var coinsQty = 1;
				// if function is drawing
				if( itemPatterns[ itemPatternsIndexNow ].params.usecolumns ) {
					// coins depend on current drawing index
					coinsQty = itemPatterns[ itemPatternsIndexNow ].params.positions[ drawingCurrentIndex ].length;
				}				
				// get a free coin
				for ( coin in allCoins ) {
					var currentCoin = allCoins[ coin ];
					
					if( currentCoin.isUsed ) {
						continue;
					}
					
					currentCoin.respawn( ITEM_RESPAWN_X, itemPatterns[ itemPatternsIndexNow ].func( currentDistance, itemPatterns[ itemPatternsIndexNow ].params ), itemPatterns[ itemPatternsIndexNow ].params.value, currentDistance );
					coinsQty--;
					itemCounterNow++;
					if( coinsQty == 0 ) {
						break;
					}
				}
			}
			break;
		
		case "obstacle" :
			// do this depending on the size
			// get a free obstacle
			for ( obstacle in window[ "allObstacles" + itemPatterns[ itemPatternsIndexNow ].params.size ] ) {
				var currentObstacle = window[ "allObstacles" + itemPatterns[ itemPatternsIndexNow ].params.size ][ obstacle ];
				if( currentObstacle.isUsed ) {
					continue;
				}
				
				if( itemPatterns[ itemPatternsIndexNow ].params.ypos == 'random' ) {
					currentObstacle.randomRespawn( itemPatterns[ itemPatternsIndexNow ].params.move );
				} else {
					currentObstacle.respawn( itemPatterns[ itemPatternsIndexNow ].params.ypos, itemPatterns[ itemPatternsIndexNow ].params.move );
				}
				break;
			}
			itemCounterNow++;
			break;
			
		case "multiplier" :
			if( !ignoreMultiplier ) {
				switch( itemPatterns[ itemPatternsIndexNow ].value ) {
					case 2 :
						multiplier2x.randomRespawn();
						break;
					case 3 :
						multiplier3x.randomRespawn();
						break;
				}
			}
			itemCounterNow++;
			break;
	}
}

function sineWave( currentDistance, params ) {
	return ( ( Math.sin( ( itemCounterNow * ( Math.PI * 2 ) / itemPatterns[ itemPatternsIndexNow ].qty * params.frequency ) ) * params.amplitude ) + params.ypos );
}

function cosineWave( currentDistance, params ) {
	return ( ( Math.cos( ( itemCounterNow * ( Math.PI * 2 ) / itemPatterns[ itemPatternsIndexNow ].qty * params.frequency ) ) * params.amplitude ) + params.ypos );
}

function tangentWave( currentDistance, params ) {
	return ( ( Math.tan( ( itemCounterNow * ( Math.PI * 2 ) / itemPatterns[ itemPatternsIndexNow ].qty * params.frequency ) ) * params.amplitude ) + params.ypos );
}

function straightLine( currentDistance, params ) {
	return params.ypos;
}

function diagonalUp( currentDistance, params ) {
	return params.ypos - ( itemCounterNow * params.angle ); 
}

function diagonalDown( currentDistance, params ) {
	return params.ypos + ( itemCounterNow * params.angle ); 
}

function randomPos( currentDistance, params ) {
	return( ( Math.random() * 350 ) + 50 );
}

function alternatePos( currentDistance, params ) {
	var posNow = itemCounterNow % params.positions.length;
	return params.ypos + params.positions[ posNow ];
}

function drawing( currentDistance, params ) {
	var returnValue = params.ypos + params.positions[ drawingCurrentIndex ][ drawingCurrentSubIndex ];
	// go to the next position
	drawingCurrentSubIndex++;
	if( drawingCurrentSubIndex >= params.positions[ drawingCurrentIndex ].length ) {
		drawingCurrentSubIndex = 0;
		drawingCurrentIndex++;
	}
	return returnValue;
}