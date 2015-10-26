(function (window)
{
    function GameAvatar( imgGameAvatar )
	{
        this.initialize( imgGameAvatar );
    }
	
    GameAvatar.prototype = new createjs.BitmapAnimation();

    // public properties:
    //??? ItemEnergy.prototype.bounds = 0;
	//??? ItemEnergy.prototype.velocityX = 0;
	//??? ItemEnergy.prototype.velocityY = 0;
	//??? ItemEnergy.prototype.isUsed = false;
	
    // constructor:
    GameAvatar.prototype.BitmapAnimation_initialize = GameAvatar.prototype.initialize; //unique to avoid overiding base class

    GameAvatar.prototype.initialize = function ( contentManager )
	{
        var localSpriteSheet = new createjs.SpriteSheet(
				{	
					"frames": { width:216, height:356, regX:108, regY:178 },
					"images": contentManager.imgPlayer,
					"animations": {"all": {"frames": [0]}}
				}
			);

        this.BitmapAnimation_initialize( localSpriteSheet );

        // animate
        this.gotoAndStop("all");

        this.name = "GameAvatar";

		this.x = 100;
		this.y = 100;
		
        // starting directly at the first frame of the walk_h sequence
        this.currentFrame = 1;
    }

    GameAvatar.prototype.tick = function ( speedY, speedX )
	{
		if( this.alreadyTaken )
		{
			return;
		}
		
		this.x += speedX;
		this.y += speedY;
		
		if( ( this.x < 0 - 50 ) || ( this.y < 0 - 50 ) )
		{
			this.isUsed = false;
			this.visible = false;
			//??? this.randomRespawn();
		}
    }

	GameAvatar.prototype.goAway = function()
	{
	}
	
	window.GameAvatar = GameAvatar;
	
} (window));