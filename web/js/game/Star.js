(function (window)
{
    function Star( stage, imgStar, newScaleFactor, starStartingX, starMinY, starMaxY ) {
        this.initialize( stage, imgStar, newScaleFactor, starStartingX, starMinY, starMaxY );
    }
	
    // Cloud.prototype = new createjs.BitmapAnimation();

    // public properties:
	Star.prototype.isUsed = false;
	
	var STARTING_X;
	var ENDING_X;
	var MIN_Y;
	var MAX_Y;
	var MAX_SPEED = 4;
	var MIN_SPEED = 1;
	var MIN_ROTATION_SPEED = -.5;
	var MAX_ROTATION_SPEED = .5;
	
	var MAX_SIZE = 1;
	var MIN_SIZE = .6;
	
	Star.prototype.speed = 4;
	Star.prototype.rotationSpeed = 0;
	
	Star.prototype.starSprite;
	
    Star.prototype.initialize = function ( stage, imgStar, newScaleFactor, starStartingX, starMinY, starMaxY ) {
		MIN_Y = starMinY;
		MAX_Y = starMaxY;
		STARTING_X = starStartingX;
		ENDING_X = -100 * newScaleFactor;
	
		MAX_SPEED*=newScaleFactor;
		MIN_SPEED*=newScaleFactor;
		MAX_SIZE*=newScaleFactor;
		MIN_SIZE = Math.max( MIN_SIZE * newScaleFactor, .4 );
		// this.speed*=newScaleFactor;
	
		this.starSprite = new createjs.Bitmap( imgStar );
		stage.addChild( this.starSprite );
		
		this.respawn();
		// overwrite the x position to start with
		this.starSprite.x = Math.random() * STARTING_X;
    }

    Star.prototype.tick = function () {
		this.starSprite.x -= this.speed;
		this.starSprite.rotation += this.rotationSpeed;
		
		// yeah, yeah, this 300 should come from somewhere else
		if ( this.starSprite.x < ENDING_X ){
			this.isUsed = false;
			this.starSprite.visible = false;
			this.respawn();
		}
    }
	
	Star.prototype.respawn = function() {
		this.starSprite.x = STARTING_X;
		this.starSprite.y = ( Math.random() * ( MAX_Y - MIN_Y ) ) + MIN_Y;
		this.speed = ( Math.random() * ( MAX_SPEED - MIN_SPEED ) ) + MIN_SPEED;
		this.rotationSpeed = ( Math.random() * ( MAX_ROTATION_SPEED - MIN_ROTATION_SPEED ) ) + MIN_ROTATION_SPEED;
		
		this.isUsed = true;
		this.starSprite.alpha = 1;
		this.starSprite.visible = true;
		this.starSprite.width = 20;
		this.starSprite.scaleX = this.starSprite.scaleY = ( Math.random() * ( MAX_SIZE - MIN_SIZE ) ) + MIN_SIZE;
		// this.alpha = ( Math.random() * .4 ) + .6;
	}
	
	window.Star = Star;
	
} (window));