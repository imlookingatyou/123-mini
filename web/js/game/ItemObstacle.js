//  scaleFactor NEEDS TO BE USED PROPERLY IN THIS FILE!!!
function ItemObstacle( stage, contentManager, sizeId, newScaleFactor, optimiseForSmallScreen ) {

    // ItemObstacle.prototype = new ItemObstacle();

    // public properties:
	ItemObstacle.prototype.SIZE_XS = 1;
	ItemObstacle.prototype.SIZE_S = 2;
	ItemObstacle.prototype.SIZE_M = 3;
	ItemObstacle.prototype.SIZE_L = 4;

	ItemObstacle.prototype.isUsed = false;
	ItemObstacle.prototype.x = 0;
	ItemObstacle.prototype.y = 0;
	ItemObstacle.prototype.velocityX = -5;
	ItemObstacle.prototype.velocityY = 0;
	ItemObstacle.prototype.bounds = 0;
	// amount of coins to deduct
	ItemObstacle.prototype.value = 0;

	// constructor:
	
	ItemObstacle.prototype.obstacleImage;
	ItemObstacle.prototype.evilCloud;
	
	var alreadyTaken;
	var scaleFactor;

	var outOfLimits;
	var disappearY;
	var minSpawnY;
	var spawnYGap;
	var spawnX;	
	
	var movType;
	var yMovementCounter;
	var origY;
	var movFrequency;
	var movAmplitude;

	var minAmplitude;var maxAmplitude;
	var freqMinFactor;
	var freqMaxFactor
	
    ItemObstacle.prototype.initialize = function ( stage, contentManager, sizeId, newScaleFactor, optimiseForSmallScreen ) {
		scaleFactor = newScaleFactor;
		
		outOfLimits = 50 * scaleFactor;
		disappearY = 100 * scaleFactor;
		minSpawnY = 100 * scaleFactor;
		spawnYGap = 450 * scaleFactor;
		spawnX = 1100 * scaleFactor;

		minAmplitude = 50 * scaleFactor;
		maxAmplitude = 150 * scaleFactor;
		freqMinFactor = .1;
		freqMaxFactor = .5;
		
		this.evilCloud = new ObstacleCloud( contentManager.imgItemObstacleCloud, sizeId, scaleFactor, optimiseForSmallScreen );
		this.obstacleImage = new ObstacleImage( contentManager, sizeId, scaleFactor );
		stage.addChild( this.evilCloud );
		stage.addChild( this.obstacleImage );
		
		switch( sizeId ) {
			case 1 :
				// size of the Bounds for the collision's tests
				this.bounds = 15 * scaleFactor;
				// value to be deducted from coins when picked up
				this.value = 5;
				this.velocityX = -1 * ( Math.floor( Math.random() * 5 ) + 5 );
				break;
			case 2 :
				this.bounds = 25 * scaleFactor;
				this.value = 10;
				this.velocityX = -1 * ( Math.floor( Math.random() * 5 ) + 6 );
				break;
			case 3 :
				this.bounds = 37 * scaleFactor;
				this.value = 30;
				this.velocityX = -1 * ( Math.floor( Math.random() * 5 ) + 7 );
				break;
			case 4 :
				this.bounds = 50 * scaleFactor;
				this.value = 50;
				this.velocityX = -1 * ( Math.floor( Math.random() * 4 ) + 9 );
				break;
		}
        this.hit = this.bounds;
	
		this.alreadyTaken = false;
		
        // counting directly at the first frame of the walk_h sequence
        this.currentFrame = 1;
		this.hide();
    }

	ItemObstacle.prototype.hitPoint = function ( tX, tY ) {
		if( this.alreadyTaken ) {
			return false;
		}
		return this.hitRadius( tX, tY, 0 );
	}

	ItemObstacle.prototype.hitRadius = function ( tX, tY, tHit ) {
		if( this.alreadyTaken ) {
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
		
	ItemObstacle.prototype.taken = function() {
		this.alreadyTaken = true;
		// console.log( Ease.backIn );
		// this.onDisappeared();
		createjs.Tween.get( this.evilCloud ).to( { alpha:0 }, 200, createjs.Ease.backIn );
		createjs.Tween.get( this.obstacleImage ).to( { alpha:0 }, 200 );
		createjs.Tween.get( this ).to( { y: this.y + disappearY }, 250 ).call( this.onDisappeared );
	}

	ItemObstacle.prototype.onDisappeared = function() {
		this.hide();
		//--- this.randomRespawn();
	}

	ItemObstacle.prototype.hide = function() {
		this.isUsed = false;
		this.x = 1100;
		this.obstacleImage.visible = false;
		this.obstacleImage.alpha = 0;
		this.evilCloud.visible = false;
		this.evilCloud.alpha = 0;
	}

	ItemObstacle.prototype.show = function() {
		this.obstacleImage.visible = true;
		this.obstacleImage.alpha = 1;
		this.evilCloud.visible = true;
		this.evilCloud.alpha = 1;
	}
	
	ItemObstacle.prototype.respawn = function( yPos, newMovType ) {
		this.obstacleImage.refresh();
		this.isUsed = true;
		this.x = spawnX;
		this.y = yPos;
		this.show();
		this.alreadyTaken = false;
		this.movType = newMovType;
		this.yMovementCounter = 0;
		this.origY = yPos;
		if( this.movType != "linear" ) {
			this.movAmplitude = ( Math.random() * ( maxAmplitude - minAmplitude ) ) + minAmplitude; // 30
			this.movAmplitude = Math.min( this.movAmplitude, Math.min( yPos - minSpawnY, ( minSpawnY + spawnYGap ) - yPos ) );
			if( this.movAmplitude < minAmplitude ) {
				// if things get too crazy when close to the limits, do something about it here
				// ... force it to go on a straight line
				this.movType = "linear";
			}
			this.movFrequency = ( ( Math.random() * ( freqMaxFactor - freqMinFactor ) ) + freqMinFactor ) * this.movAmplitude;
		}
	}

	ItemObstacle.prototype.randomRespawn = function( newMovType ) {
		this.respawn( minSpawnY + ( Math.random() * spawnYGap ), newMovType );
	}

	ItemObstacle.prototype.tick = function () {
		if( !this.isUsed ) { return; }
		
		if( !this.alreadyTaken ) {

			this.yMovementCounter++;
		
			this.x += this.velocityX;
			if( this.movType == "linear" ) {
				this.y += this.velocityY;
			} else {
				this.y = ( ( Math.sin( ( 1 / this.movFrequency ) * this.yMovementCounter ) ) * this.movAmplitude ) + this.origY;
			}
			
		}

		this.obstacleImage.tick( this.x, this.y );
		this.evilCloud.tick( this.x, this.y );
		
		if( !this.alreadyTaken ) {
			if ( this.x < 0 - outOfLimits ) {
				this.hide();
				//--- this.randomRespawn();
				//--- this.respawn( 300 * scaleFactor );
			}
		}
	}

	this.initialize( stage, contentManager, sizeId, newScaleFactor, optimiseForSmallScreen );
};