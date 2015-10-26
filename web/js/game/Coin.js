(function (window)
{
    function Coin( imgCoin, newScaleFactor )
	{
        this.initialize( imgCoin, newScaleFactor );
    }
	
    Coin.prototype = new createjs.BitmapAnimation();

    // public properties:
    Coin.prototype.bounds = 0;
	Coin.prototype.velocityX = 0;
	Coin.prototype.velocityY = 0;
	Coin.prototype.isUsed = false;
	
	Coin.prototype.value = 1;

    // constructor:
    Coin.prototype.BitmapAnimation_initialize = Coin.prototype.initialize; //unique to avoid overriding base class

	var alreadyTaken;
	var scaleFactor;
	
	var outOfLimits;
	var disappearX;
	var disappearY;
	var minSpawnY;
	var spawnYGap;
	var spawnX;
   
    Coin.prototype.initialize = function ( imgCoin, newScaleFactor )
	{
		scaleFactor = newScaleFactor;
	
        var localSpriteSheet = new createjs.SpriteSheet(
				{	
					images: [imgCoin],
					frames: [
								[0, 0, 32, 32, 0, 0, -1],
								[32, 0, 32, 32, 0, 0, -1],
								[64, 0, 32, 32, 0, 0, -1]
							]
					//+++ "frames": { width:18, height:24, regX:9, regY:12 },
				}
			);

        this.BitmapAnimation_initialize( localSpriteSheet );
		this.scaleX = this.scaleY = scaleFactor;

        // animate
        this.name = "Coin";

		this.alreadyTaken = false;
		
        //--- this.currentFrame = 1;

        // size of the Bounds for the collision's tests
        this.bounds = 12 * scaleFactor;
        this.hit = this.bounds;

		// do not animate
		this.gotoAndStop( Math.floor( Math.random() * 3 ) );

		outOfLimits = 50 * scaleFactor;
		disappearX = 180 * scaleFactor;
		disappearY = 50 * scaleFactor;
		minSpawnY = 100 * scaleFactor;
		spawnYGap = 450 * scaleFactor;
		spawnX = 970 * scaleFactor;
    }

    Coin.prototype.tick = function ( speedY, speedX )
	{
		if( this.alreadyTaken ) {
			return;
		}
		
		this.x += speedX;
		this.y += speedY;
		
		if( this.x < 0 - outOfLimits ) {
			this.isUsed = false;
			this.visible = false;
			//??? this.randomRespawn();
		}
    }

	Coin.prototype.hitPoint = function ( tX, tY )
	{
		if( this.alreadyTaken )
		{
			return false;
		}
		return this.hitRadius( tX, tY, 0 );
	}

	Coin.prototype.hitRadius = function ( tX, tY, tHit )
	{
		if( this.alreadyTaken || !this.isUsed )
		{
			return false;
		}
		// early returns speed it up
		if ( tX - tHit > this.x + this.hit) { return; }
		if ( tX + tHit < this.x - this.hit) { return; }
		if ( tY - tHit > this.y + this.hit) { return; }
		if ( tY + tHit < this.y - this.hit) { return; }
        //now do the circle distance test
		return this.hit + tHit > Math.sqrt( Math.pow( Math.abs( this.x - tX ), 2 ) + Math.pow( Math.abs( this.y - tY ), 2 ) );
	}
	
	Coin.prototype.taken = function()
	{
		this.alreadyTaken = true;
		this.alpha = .5;
		var disappearTween = createjs.Tween.get( this ).to( { y:disappearY, x:disappearX }, 300 ).call( this.onDisappeared );
		//+++ var disappearTween = createjs.Tween.get( this ).to( { alpha:0.5, y:this.y-100, x:this.x+(( Math.random()*50 ) - 25 ) }, 500, createjs.Ease.backIn ).call( this.onDisappeared );
		// var disappearTween = createjs.Tween.get( this ).to( { y:this.y - 100 }, 400 ).wait( 500 ).to( {alpha:0 }, 1000 ).set( {visible:false } ).call( this.onDisappeared );
		// this.visible = false;
	}
	
	Coin.prototype.onDisappeared = function()
	{
		this.isUsed = false;
		this.visible = false;
		// this.randomRespawn();
	}
	
	Coin.prototype.respawn = function( xPos, yPos, valueId )
	{
		switch( valueId ) {
			case 1:
				this.value = 1;
				break;
			case 2:
				this.value = 3;
				break;
			case 3:
				this.value = 5;
				break;
		}
		this.gotoAndStop( valueId - 1 );
		this.x = xPos;
		this.y = yPos;
		this.isUsed = true;
		this.alpha = 1;
		this.visible = true;
		this.alreadyTaken = false;
	}
	
	Coin.prototype.randomRespawn = function( valueId )
	{
		// console.log( "should respawn coin" );
		this.respawn( spawnX, minSpawnY + ( Math.random() * spawnYGap ), valueId )
	}
    
	window.Coin = Coin;
	
} (window));