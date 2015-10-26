(function (window)
{
    function ObstacleImage( contentManager, newSizeId, scaleFactor ) {
        this.initialize( contentManager, newSizeId, scaleFactor );
    }

	
	ObstacleImage.prototype.xOffset;
	ObstacleImage.prototype.yOffset;
	ObstacleImage.prototype.sizeId;
	ObstacleImage.prototype.differentImagesQty;
	
    ObstacleImage.prototype = new createjs.BitmapAnimation();
	
    // constructor:
    ObstacleImage.prototype.BitmapAnimation_initialize = ObstacleImage.prototype.initialize; //unique to avoid overriding base class

    ObstacleImage.prototype.initialize = function ( contentManager, newSizeId, scaleFactor ) {
		var localSpriteSheet;
		
		this.sizeId = newSizeId;
		
		switch( this.sizeId ) {
			case 1 :
				localSpriteSheet = new createjs.SpriteSheet(
						{
							images: [contentManager.imgItemObstacle1],
							frames: [
										[0, 0, 64, 32, 0, 0, 0],
										[64, 0, 64, 32, 0, 0, 0],
										[128, 0, 64, 32, 0, 0, 0],
										[0, 32, 64, 32, 0, 0, 0]
									]
						}
					);
				this.differentImagesQty = 4;
				this.yOffset = -15 * scaleFactor;
				this.xOffset = 0;
				break;
			case 2 :
				localSpriteSheet = new createjs.SpriteSheet(
						{
							images: [contentManager.imgItemObstacle2],
							frames: [
										[0, 0, 64, 64, 0, 0, 0],
										[64, 0, 64, 64, 0, 0, 0],
										[128, 0, 64, 64, 0, 0, 0],
										[0, 64, 64, 64, 0, 0, 0]
									]
						}
					);
				this.differentImagesQty = 4;
				this.yOffset = -25 * scaleFactor;
				this.xOffset = 0;
				break;
			case 3 :
				localSpriteSheet = new createjs.SpriteSheet(
						{
							images: [contentManager.imgItemObstacle3],
							frames: [
										[0, 0, 128, 128, 0, 0, 0],
										[128, 0, 128, 128, 0, 0, 0],
										[256, 0, 128, 128, 0, 0, 0]
									]
						}
					);
				this.differentImagesQty = 3;
				this.yOffset = -38 * scaleFactor;
				this.xOffset = 0;
				break;
			case 4 :
				localSpriteSheet = new createjs.SpriteSheet(
						{
							images: [contentManager.imgItemObstacle4],
							frames: [
										[0, 0, 128, 128, 0, 0, 0],
										[128, 0, 128, 128, 0, 0, 0],
										[256, 0, 128, 128, 0, 0, 0]
									]
						}
					);
				this.differentImagesQty = 3;
				this.yOffset = -50 * scaleFactor;
				this.xOffset = 0;
				break;
		}

		this.scaleX = this.scaleY = scaleFactor;
		
        this.BitmapAnimation_initialize( localSpriteSheet );

		//+++ this.refresh();
		this.gotoAndStop( Math.floor( Math.random() * this.differentImagesQty ) );
		// this.x = 300 + xOffset;
		// this.y = 300 + yOffset;

        this.name = "ObstacleImage";

        //??? this.currentFrame = 1;
    }

	ObstacleImage.prototype.refresh = function() {
        // go to a random image
		this.gotoAndStop( Math.floor( Math.random() * this.differentImagesQty ) );
	}
	
    ObstacleImage.prototype.tick = function ( newX, newY ) {
		this.x = newX + this.xOffset;
		this.y = newY + this.yOffset;
    }
	
	window.ObstacleImage = ObstacleImage;
	
} (window));