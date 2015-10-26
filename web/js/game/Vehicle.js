(function (window)
{
    function Vehicle( imgPlayer, newScaleFactor, y_start, y_end, functionOnPlaneDropped ) {
        this.initialize( imgPlayer, newScaleFactor, y_start, y_end, functionOnPlaneDropped );
    }
	
    Vehicle.prototype = new createjs.BitmapAnimation();

    // public properties:
    Vehicle.prototype.bounds = 0;
    Vehicle.prototype.hit = 0;
    Vehicle.prototype.alive = true;

	Vehicle.prototype.isInIdleMode;
	Vehicle.prototype.direction;
	
	Vehicle.prototype.upKey = false;
	Vehicle.prototype.downKey = false;
	
	var ACCELERATION = 0.5;
	var MAX_VELOCITY = 9;
	var velocityY = 0;
	var targetSpeedY = 0;
	
    // constructor:
    Vehicle.prototype.BitmapAnimation_initialize = Vehicle.prototype.initialize; //unique to avoid overriding base class

    var quarterFrameSize;
   
    Vehicle.prototype.initialize = function ( imgPlayer, newScaleFactor, levelId, y_start, y_end, functionOnPlaneDropped ) {
		this.x = 150 * newScaleFactor;
		this.y = 200 * newScaleFactor;
		//+++ this.y = -100;

		// do not scale down the acceleration, as movement is already sped down by the FPS
		// ACCELERATION *= newScaleFactor;
		MAX_VELOCITY *= newScaleFactor;
		
		var localSpriteSheet;
		
		switch( levelId ) {
			case 1 :
				localSpriteSheet = new createjs.SpriteSheet(
						{
							images: [imgPlayer], //image to use
							"framerate":24,
							"frames":[ 
									// x, y, width, height, imageIndex, regX, regY
									[0, 0, 256, 128, 0, 110, 43],
									[256, 0, 256, 128, 0, 110, 43],
									[512, 0, 256, 128, 0, 110, 43],
									[0, 128, 256, 128, 0, 110, 43],
									[256, 128, 256, 128, 0, 110, 43],
									[512, 128, 256, 128, 0, 110, 43],
									[0, 256, 256, 128, 0, 110, 43],
									[256, 256, 256, 128, 0, 110, 43],
									[512, 256, 256, 128, 0, 110, 43],
									[0, 384, 256, 128, 0, 110, 43],
									[256, 384, 256, 128, 0, 110, 43],
									[512, 384, 256, 128, 0, 110, 43],
									[0, 512, 256, 128, 0, 110, 43],
									[256, 512, 256, 128, 0, 110, 43],
									[512, 512, 256, 128, 0, 110, 43],
									[0, 640, 256, 128, 0, 110, 43],
									[256, 640, 256, 128, 0, 110, 43],
									[512, 640, 256, 128, 0, 110, 43],
									[0, 768, 256, 128, 0, 110, 43],
									[256, 768, 256, 128, 0, 110, 43],
									[512, 768, 256, 128, 0, 110, 43],
									[0, 896, 256, 128, 0, 110, 43],
									[256, 896, 256, 128, 0, 110, 43],
									[512, 896, 256, 128, 0, 110, 43]
								],
							/* frames: { width:150, height:150, regX:75, regY:75 }, */
							animations: {
								idle: [0, 23, "idle", 4],
							}
						}
					);
				break;
			
			case 2 :
				localSpriteSheet = new createjs.SpriteSheet(
						{
							images: [imgPlayer], //image to use
							"framerate":24,
							"frames":[ 
									// x, y, width, height, imageIndex, regX, regY
									[0, 0, 256, 128, 0, 110, 43],
									[256, 0, 256, 128, 0, 110, 43],
									[512, 0, 256, 128, 0, 110, 43],
									[0, 128, 256, 128, 0, 110, 43],
									[256, 128, 256, 128, 0, 110, 43],
									[512, 128, 256, 128, 0, 110, 43],
									[0, 256, 256, 128, 0, 110, 43],
									[256, 256, 256, 128, 0, 110, 43],
									[512, 256, 256, 128, 0, 110, 43],
									[0, 384, 256, 128, 0, 110, 43],
									[256, 384, 256, 128, 0, 110, 43],
									[512, 384, 256, 128, 0, 110, 43],
									[0, 512, 256, 128, 0, 110, 43],
									[256, 512, 256, 128, 0, 110, 43],
									[512, 512, 256, 128, 0, 110, 43],
									[0, 640, 256, 128, 0, 110, 43],
									[256, 640, 256, 128, 0, 110, 43],
									[512, 640, 256, 128, 0, 110, 43],
									[0, 768, 256, 128, 0, 110, 43],
									[256, 768, 256, 128, 0, 110, 43],
									[512, 768, 256, 128, 0, 110, 43],
									[0, 896, 256, 128, 0, 110, 43],
									[256, 896, 256, 128, 0, 110, 43],
									[512, 896, 256, 128, 0, 110, 43]
								],
							animations: {
								idle: [0, 23, "idle", 4],
							}
						}
					);
				break;
			
			case 3 :
				localSpriteSheet = new createjs.SpriteSheet(
						{
							images: [imgPlayer], //image to use
							"framerate":24,
							"frames":[ 
									// x, y, width, height, imageIndex, regX, regY
									[0, 0, 256, 128, 0, 160, 54],
									[256, 0, 256, 128, 0, 160, 54],
									[512, 0, 256, 128, 0, 160, 54],
									[0, 128, 256, 128, 0, 160, 54],
									[256, 128, 256, 128, 0, 160, 54],
									[512, 128, 256, 128, 0, 160, 54],
									[0, 256, 256, 128, 0, 160, 54],
									[256, 256, 256, 128, 0, 160, 54],
									[512, 256, 256, 128, 0, 160, 54],
									[0, 384, 256, 128, 0, 160, 54],
									[256, 384, 256, 128, 0, 160, 54],
									[512, 384, 256, 128, 0, 160, 54],
									[0, 512, 256, 128, 0, 160, 54],
									[256, 512, 256, 128, 0, 160, 54],
									[512, 512, 256, 128, 0, 160, 54],
									[0, 640, 256, 128, 0, 160, 54],
									[256, 640, 256, 128, 0, 160, 54],
									[512, 640, 256, 128, 0, 160, 54],
									[0, 768, 256, 128, 0, 160, 54],
									[256, 768, 256, 128, 0, 160, 54],
									[512, 768, 256, 128, 0, 160, 54],
									[0, 896, 256, 128, 0, 160, 54],
									[256, 896, 256, 128, 0, 160, 54],
									[512, 896, 256, 128, 0, 160, 54]
								],
							animations: {
								idle: [0, 23, "idle", 4],
							}
						}
					);
				break;
		}

        createjs.SpriteSheetUtils.addFlippedFrames(localSpriteSheet, true, false, false);

        this.BitmapAnimation_initialize( localSpriteSheet );

		this.scaleX = this.scaleY = newScaleFactor;
		
        //??? quarterFrameSize = this.spriteSheet.getFrame(0).rect.width / 4;

        // start playing the first sequence:
        this.gotoAndPlay("idle");     //animate
        this.isInIdleMode = true;

        this.name = "Vehicle";

        // starting directly at the first frame of the walk_h sequence
        this.currentFrame = 1;

        //Size of the Bounds for the collision's tests
        this.bounds = 50 * newScaleFactor;
        this.hit = this.bounds;
    }
	
    Vehicle.prototype.tick = function () {
		if( !this.alive ) {
			return;
		}
		
		if ( !this.upKey && !this.downKey && velocityY == 0 ) {
			this.isInIdleMode = true;
			return;
		}

		if ( this.upKey ) {
			targetSpeedY = -1*MAX_VELOCITY;
		} else if ( this.downKey ) {
			targetSpeedY = MAX_VELOCITY;
		} else {
			targetSpeedY = 0;
		}
		
		if( ( velocityY + ACCELERATION ) < targetSpeedY ) {
			velocityY+=ACCELERATION;
		} else if ( ( velocityY - ACCELERATION ) > targetSpeedY ) {
			velocityY-=ACCELERATION;
		} else {
			velocityY = targetSpeedY;
		}
		
		// Moving the sprite based on the direction & the speed
		if( ( ( this.y + velocityY ) <= limitBottom ) || ( ( this.y + velocityY ) >= limitTop ) ) {
			velocityY = 0;
		}
	
		this.y += velocityY;
	
        if ( this.alive && !this.isInIdleMode ) {
            // Hit testing the screen width, otherwise our sprite would disappear
            // The vehicle is blocked at each side but we keep the walk_right or walk_animation running
        }
    }

    window.Vehicle = Vehicle;
	
} (window));