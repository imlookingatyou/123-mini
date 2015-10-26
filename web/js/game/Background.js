var MOVING_ELEMENTS_QUANTITY = 5;
var STARS_QUANTITY = 0;

var allMovingElements;


// clouds are spritesheets, stars are single bitmaps. They both differ in sizes, speed, and stars rotate, which clouds don't do
var ELEMENT_CLOUDS = 0;
var ELEMENT_STARS = 1;

function Background( stage, contentManager, newScaleFactor, levelId, screen_width, screen_height ) {
	this.initialize( stage, contentManager, newScaleFactor, levelId, screen_width, screen_height );
}

Background.prototype.initialize = function( stage, contentManager, newScaleFactor, levelId, screen_width, screen_height ) {

	// configure the background depending on the level
	switch( levelId ) {
		case 1 :
			// no moving elements on level 1
			MOVING_ELEMENTS_QUANTITY = 0;
			break;
		case 2 :
			MOVING_ELEMENTS_QUANTITY = 5;
			movingElementID = ELEMENT_CLOUDS;
			break;
		case 3 :
			MOVING_ELEMENTS_QUANTITY = 10;
			movingElementID = ELEMENT_STARS;
			break;
	}

	var cloudsStartingX = screen_width +  ( 100 * newScaleFactor );
	var cloudsMinY = screen_height - ( 300 * newScaleFactor ); //+++ make this a percentage of the height
	var cloudsMaxY = screen_height - ( 20 * newScaleFactor );

	allMovingElements = new Array();
	for( var i = 0; i < MOVING_ELEMENTS_QUANTITY; i++ ) {
		var newElement;
		
		switch( movingElementID ) {
			case ELEMENT_CLOUDS :
				newElement = new Cloud( contentManager.imgBGMovingElement, newScaleFactor, cloudsStartingX, cloudsMinY, cloudsMaxY );
				stage.addChild( newElement );
				break;
			case ELEMENT_STARS :
				newElement = new Star( stage, contentManager.imgBGMovingElement, newScaleFactor, cloudsStartingX, cloudsMinY, cloudsMaxY );
				break;
		}
		allMovingElements.push( newElement );
	}
}

Background.prototype.tick = function() {
	// move the moving elements, no matter if clouds of stars (or whatever)
	for ( movingElement in allMovingElements ) {
		var currentElement = allMovingElements[ movingElement ];
		currentElement.tick();
	}
	return;
}