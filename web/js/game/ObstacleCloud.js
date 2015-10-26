(function (window)
{
    function ObstacleCloud( imgObstacleCloud, sizeId, scaleFactor, optimiseForSmallScreen ) {
        this.initialize( imgObstacleCloud, sizeId, scaleFactor, optimiseForSmallScreen );
    }
	
    ObstacleCloud.prototype = new createjs.BitmapAnimation();

	ObstacleCloud.prototype.xOffset = 0;
	ObstacleCloud.prototype.yOffset = 0;;
	
    // constructor:
    ObstacleCloud.prototype.BitmapAnimation_initialize = ObstacleCloud.prototype.initialize; //unique to avoid overiding base class

    ObstacleCloud.prototype.initialize = function ( imgObstacleCloud, sizeId, scaleFactor, optimiseForSmallScreen ) {
        
		var localSpriteSheet = new createjs.SpriteSheet(
				{
					images: [imgObstacleCloud], //image to use
					frames:[ 
							// x, y, width, height, imageIndex, regX, regY
							[0, 0, 256, 256, 0, 0, 0],
							[256, 0, 256, 256, 0, 0, 0],
							[512, 0, 256, 256, 0, 0, 0],
							[768, 0, 256, 256, 0, 0, 0],
							[1024, 0, 256, 256, 0, 0, 0],
							[1280, 0, 256, 256, 0, 0, 0],
							[1536, 0, 256, 256, 0, 0, 0],
							[0, 256, 256, 256, 0, 0, 0],
							[256, 256, 256, 256, 0, 0, 0],
							[512, 256, 256, 256, 0, 0, 0],
							[768, 256, 256, 256, 0, 0, 0],
							[1024, 256, 256, 256, 0, 0, 0],
							[1280, 256, 256, 256, 0, 0, 0],
							[1536, 256, 256, 256, 0, 0, 0],
							[0, 512, 256, 256, 0, 0, 0],
							[256, 512, 256, 256, 0, 0, 0],
							[512, 512, 256, 256, 0, 0, 0],
							[768, 512, 256, 256, 0, 0, 0],
							[1024, 512, 256, 256, 0, 0, 0],
							[1280, 512, 256, 256, 0, 0, 0],
							[1536, 512, 256, 256, 0, 0, 0],
							[0, 768, 256, 256, 0, 0, 0],
							[256, 768, 256, 256, 0, 0, 0],
							[512, 768, 256, 256, 0, 0, 0]				
						],
					animations: {
						idle: [0, 23, "idle", 3],
					}
				}
			);

        this.BitmapAnimation_initialize( localSpriteSheet );

        // animate
		if( optimiseForSmallScreen ) {
			this.gotoAndStop( 0 );
		} else {
			this.gotoAndPlay("idle");
		}

		switch( sizeId ) {
			case 1 :
				this.scaleX = this.scaleY = .5 * scaleFactor;
				this.yOffset = -32 * scaleFactor;
				this.xOffset = this.yOffset + ( 20 * scaleFactor );
				break;
			case 2 :
				this.scaleX = this.scaleY = .7 * scaleFactor;
				this.yOffset = -44 * scaleFactor;
				this.xOffset = this.yOffset + ( 20 * scaleFactor );
				break;
			case 3 :
				this.scaleX = this.scaleY = .8 * scaleFactor;
				this.yOffset = -51 * scaleFactor;
				this.xOffset = this.yOffset + ( 30 * scaleFactor );
				break;
			case 4 :
				this.scaleX = this.scaleY = 1 * scaleFactor;
				this.yOffset = -63 * scaleFactor;
				this.xOffset = this.yOffset + ( 32 * scaleFactor );
				break;
		}		
		
        this.name = "ObstacleCloud";

        // starting directly at the first frame of the sequence
        this.currentFrame = 1;
		// this.x = 300 + xOffset;
		// this.y = 300 + yOffset;
    }

    ObstacleCloud.prototype.tick = function ( newX, newY ) {
		this.x = newX + this.xOffset;
		this.y = newY + this.yOffset;
    }

	window.ObstacleCloud = ObstacleCloud;
	
} (window));