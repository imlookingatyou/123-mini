(function (window)
{
    function ItemMultiplier( contentManager, newScaleFactor, multValue ) {
        this.initialize( contentManager, newScaleFactor, multValue );
    }
	
    ItemMultiplier.prototype = new createjs.Bitmap();

    // public properties:
    ItemMultiplier.prototype.bounds = 0;
	ItemMultiplier.prototype.velocityX = 0;
	ItemMultiplier.prototype.velocityY = 0;
	ItemMultiplier.prototype.isUsed = false;
	
    // constructor:
    ItemMultiplier.prototype.Bitmap_initialize = ItemMultiplier.prototype.initialize; //unique to avoid overriding base class

	var alreadyTaken;
	var scaleFactor;
   
	var outOfLimits;
	var disappearX;
	var disappearY;
	var minSpawnY;
	var spawnYGap;
	var spawnX;
	
	var movType;
	var yMovementCounter;
	var origY;
	var movFrequency;
	var movAmplitude;

	var minAmplitude;
	var maxAmplitude;
	var freqMinFactor;
	var freqMaxFactor
	
    ItemMultiplier.prototype.initialize = function ( contentManager, newScaleFactor, multValue ) {
		scaleFactor = newScaleFactor;
	
        this.Bitmap_initialize( contentManager[ "imgItemMultiplier" + multValue + "x" ] );

		this.scaleX = scaleFactor;
		this.scaleY = scaleFactor;
		
        this.name = "Multiplier";
		this.alreadyTaken = false;
        // size of the Bounds for the collision's tests
        this.bounds = 30 * newScaleFactor;
        this.hit = this.bounds;
		
		outOfLimits = 50 * scaleFactor;
		disappearX = 300 * scaleFactor;
		disappearY = 50 * scaleFactor;
		minSpawnY = 100 * scaleFactor;
		spawnYGap = 450 * scaleFactor;
		spawnX = 970 * scaleFactor;
		
		// from 5 to 20 for amp 50
		// from 15 to 70 for amp 150
		minAmplitude = 50 * scaleFactor;
		maxAmplitude = 150 * scaleFactor;
		freqMinFactor = .1;
		freqMaxFactor = .5;
    }
	
    ItemMultiplier.prototype.tick = function () {
		if( this.alreadyTaken ) {
			return;
		}
		
		this.yMovementCounter++;
		
		this.x += this.velocityX;
		if( this.movType == "linear" ) {
			this.y += this.velocityY;
		} else {
			this.y = ( ( Math.sin( ( 1 / this.movFrequency ) * this.yMovementCounter ) ) * this.movAmplitude ) + this.origY;
		}
		
		if( this.x < 0 - outOfLimits ) {
			this.isUsed = false;
			this.visible = false;
		}
    }

	ItemMultiplier.prototype.hitPoint = function ( tX, tY ) {
		if( this.alreadyTaken ) {
			return false;
		}
		return this.hitRadius( tX, tY, 0 );
	}

	ItemMultiplier.prototype.hitRadius = function ( tX, tY, tHit ) {
		if( this.alreadyTaken || !this.isUsed ) {
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
	
	ItemMultiplier.prototype.taken = function() {
		this.alreadyTaken = true;
		this.alpha = .5;
		var disappearTween = createjs.Tween.get( this ).to( { y:disappearY, x:disappearX }, 200 ).call( this.onDisappeared );
	}
	
	ItemMultiplier.prototype.onDisappeared = function() {
		this.isUsed = false;
		this.visible = false;
		// this.randomRespawn();
	}
	
	ItemMultiplier.prototype.respawn = function( yPos ) {
		this.movType = 'wave';
		this.yMovementCounter = 0;
		this.origY = yPos;
		this.x = spawnX;
		this.y = yPos;
		this.isUsed = true;
		this.alpha = 1;
		this.visible = true;
		this.alreadyTaken = false;
		this.movAmplitude = ( Math.random() * ( maxAmplitude - minAmplitude ) ) + minAmplitude; // 30
		this.movAmplitude = Math.min( this.movAmplitude, Math.min( yPos - minSpawnY, ( minSpawnY + spawnYGap ) - yPos ) );
		if( this.movAmplitude < minAmplitude ) {
			// if things get too crazy when close to the limits, do something about it here
			// force it to go on a straight line
			//+++ this.movType = "linear";
		}
		this.movFrequency = ( ( Math.random() * ( freqMaxFactor - freqMinFactor ) ) + freqMinFactor ) * this.movAmplitude;
	}
	
	ItemMultiplier.prototype.randomRespawn = function() {
		this.respawn( this.y = minSpawnY + ( Math.random() * spawnYGap ) );
	}
    
	window.ItemMultiplier = ItemMultiplier;
	
} (window));