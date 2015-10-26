(function (window)
{
    function Cloud( imgClouds, newScaleFactor, cloudsStartingX, cloudsMinY, cloudsMaxY ) {
        this.initialize( imgClouds, newScaleFactor, cloudsStartingX, cloudsMinY, cloudsMaxY );
    }
	
    Cloud.prototype = new createjs.BitmapAnimation();

    // public properties:
	Cloud.prototype.isUsed = false;
	
    // constructor:
    Cloud.prototype.BitmapAnimation_initialize = Cloud.prototype.initialize; //unique to avoid overriding base class

	var STARTING_X;
	var MIN_Y;
	var MAX_Y;
	var MAX_SPEED = 5;
	var MIN_SPEED = 1;
	var MAX_SIZE = 1;
	var MIN_SIZE = .6;
	
	Cloud.prototype.speed = 5;
	
    Cloud.prototype.initialize = function ( imgClouds, newScaleFactor, cloudsStartingX, cloudsMinY, cloudsMaxY )
	{
		MIN_Y = cloudsMinY;
		MAX_Y = cloudsMaxY;
		STARTING_X = cloudsStartingX;
		ENDING_X = -300 * newScaleFactor;
	
		Cloud.prototype.speed*=newScaleFactor;
		MAX_SPEED*=newScaleFactor;
		MIN_SPEED*=newScaleFactor;
		MAX_SIZE*=newScaleFactor;
		MIN_SIZE = Math.max( MIN_SIZE * newScaleFactor, .4 );

	
        var localSpriteSheet = new createjs.SpriteSheet(
				{
					images: [imgClouds],
					frames: [
								[0, 0, 256, 128, 0, 0, 0],
								[256, 0, 256, 128, 0, 0, 0],
								[512, 0, 256, 128, 0, 0, 0]
							]
				}
			);
	
        this.BitmapAnimation_initialize( localSpriteSheet );

        // do not animate
        this.gotoAndStop( 0 );

        this.name = "Cloud";

		this.alreadyTaken = false;
		
        this.currentFrame = 1;
		//??? this.alpha = .8;
		
		this.respawn();
		// overwrite the x position
		this.x = Math.random() * STARTING_X;
    }

    Cloud.prototype.tick = function () {
		this.x -= this.speed;
		
		if ( this.x < ENDING_X ) {
			this.isUsed = false;
			this.visible = false;
			console.log( "RESPAWNING!!" );
			this.respawn();
		}
    }
	
	Cloud.prototype.respawn = function( fromStart ) {
		this.x = STARTING_X;
		this.y = ( Math.random() * ( MAX_Y - MIN_Y ) ) + MIN_Y;
		this.speed = ( Math.random() * ( MAX_SPEED - MIN_SPEED ) ) + MIN_SPEED;
		
		this.isUsed = true;
		this.visible = true;
		this.alreadyTaken = false;
		this.gotoAndStop( Math.floor( Math.random() * 3 ) );
		this.scaleX = this.scaleY = ( Math.random() * ( MAX_SIZE - MIN_SIZE ) ) + MIN_SIZE;
		// this.alpha = ( Math.random() * .4 ) + .6;
	}
	
	window.Cloud = Cloud;
	
} (window));