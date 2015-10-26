function ContentManager( newScaleFactor )
{
	// method to be called once all the elements have been downloaded
	var onDownloadCompleted;
	// number of elements to download
	var NUM_ELEMENTS_TO_DOWNLOAD = 10;
	var scaleFactor = newScaleFactor;

	// setting the callback method
	this.SetDownloadCompleted = function( callbackMethod ) {
		onDownloadCompleted = callbackMethod;
	}

	// define one of these for each image to be loaded
	this.imgVehicle = new Image();
	this.imgAvatarSkin = new Image();
	this.imgAvatarHair = new Image();
	this.imgAvatarAccessory = new Image();
	this.imgItemCoin = new Image();
	// this.imgItemCandy = new Image();
	this.imgItemExtraTime = new Image();
	this.imgItemObstacle1 = new Image();
	this.imgItemObstacle2 = new Image();
	this.imgItemObstacle3 = new Image();
	this.imgItemObstacle4 = new Image();
	this.imgItemObstacleCloud = new Image();
	this.imgItemMultiplier2x = new Image();
	this.imgItemMultiplier3x = new Image();
	this.imgBGMovingElement = new Image();
	this.imgFloatAlert5 = new Image();
	this.imgFloatAlert10 = new Image();
	this.imgFloatAlert30 = new Image();
	this.imgFloatAlert50 = new Image();
	

	// all the background images in an array
	this.imgBackgroundLayers = new Array();
	var numImagesLoaded = 0;

    // public method to launch the download process
    this.StartDownload = function ( levelId, avatarSkinId, avatarHairId, avatarAccessoryId ) {
		// images to download
		// only load needed obstacles spritesheets
		/*switch( levelId ) {
			case 1 :
				NUM_ELEMENTS_TO_DOWNLOAD = 14;
				SetDownloadParameters( this.imgItemObstacle1, "/img/game/obst-1.png", onImageLoad, onImageLoadError );
				break;
			case 2 :
				NUM_ELEMENTS_TO_DOWNLOAD = 16;
				SetDownloadParameters( this.imgItemObstacle1, "/img/game/obst-1.png", onImageLoad, onImageLoadError );
				SetDownloadParameters( this.imgItemObstacle2, "/img/game/obst-2.png", onImageLoad, onImageLoadError );
				SetDownloadParameters( this.imgItemObstacle3, "/img/game/obst-3.png", onImageLoad, onImageLoadError );
				break;
			case 3 :
				NUM_ELEMENTS_TO_DOWNLOAD = 17;
				SetDownloadParameters( this.imgItemObstacle1, "/img/game/obst-1.png", onImageLoad, onImageLoadError );
				SetDownloadParameters( this.imgItemObstacle2, "/img/game/obst-2.png", onImageLoad, onImageLoadError ); //------------------
				SetDownloadParameters( this.imgItemObstacle3, "/img/game/obst-3.png", onImageLoad, onImageLoadError );
				SetDownloadParameters( this.imgItemObstacle4, "/img/game/obst-4.png", onImageLoad, onImageLoadError );
				break;
		} */
				NUM_ELEMENTS_TO_DOWNLOAD = 17;
				SetDownloadParameters( this.imgItemObstacle1, "/img/game/obst-1.png", onImageLoad, onImageLoadError );
				SetDownloadParameters( this.imgItemObstacle2, "/img/game/obst-2.png", onImageLoad, onImageLoadError ); //------------------
				SetDownloadParameters( this.imgItemObstacle3, "/img/game/obst-3.png", onImageLoad, onImageLoadError );
				SetDownloadParameters( this.imgItemObstacle4, "/img/game/obst-4.png", onImageLoad, onImageLoadError );
		SetDownloadParameters( this.imgVehicle, "/img/game/vehicle-" + levelId + ".png", onImageLoad, onImageLoadError );
		SetDownloadParameters( this.imgAvatarSkin, "/img/game/avatar/skin" + avatarSkinId + ".png", onImageLoad, onImageLoadError );
		SetDownloadParameters( this.imgAvatarHair, "/img/game/avatar/hair" + avatarHairId + ".png", onImageLoad, onImageLoadError );
		SetDownloadParameters( this.imgAvatarAccessory, "/img/game/avatar/acc" + avatarAccessoryId + ".png", onImageLoad, onImageLoadError );
		SetDownloadParameters( this.imgItemCoin, "/img/game/coins.png", onImageLoad, onImageLoadError );
		SetDownloadParameters( this.imgItemMultiplier2x, "/img/game/multx2.png", onImageLoad, onImageLoadError );
		SetDownloadParameters( this.imgItemMultiplier3x, "/img/game/multx3.png", onImageLoad, onImageLoadError );
		SetDownloadParameters( this.imgBGMovingElement, "/img/game/clouds-" + levelId + ".png", onImageLoad, onImageLoadError );
		SetDownloadParameters( this.imgFloatAlert5, "/img/game/alert-5.png", onImageLoad, onImageLoadError );
		SetDownloadParameters( this.imgFloatAlert10, "/img/game/alert-10.png", onImageLoad, onImageLoadError );
		SetDownloadParameters( this.imgFloatAlert30, "/img/game/alert-30.png", onImageLoad, onImageLoadError );
		SetDownloadParameters( this.imgFloatAlert50, "/img/game/alert-50.png", onImageLoad, onImageLoadError );
		SetDownloadParameters( this.imgItemObstacleCloud, "/img/game/obstacle-cloud.png", onImageLoad, onImageLoadError );
		//--- SetDownloadParameters( this.imgItemObstacleCandy, "/img/game/obstacle-1.png", onImageLoad, onImageLoadError );
	}

    function SetDownloadParameters( imgElement, url, loadedHandler, errorHandler ) {
		imgElement.src = url;
		imgElement.onload = loadedHandler;
		imgElement.onerror = errorHandler;
	}

    // our global handler 
    function onImageLoad( e ) {
		numImagesLoaded++

        // If all elements have been downloaded
		if ( numImagesLoaded == NUM_ELEMENTS_TO_DOWNLOAD ) {
			numImagesLoaded = 0;
			// we're calling back the method set by SetDownloadCompleted
			onDownloadCompleted();
		}
	}

	// called if there is an error loading the image
	function onImageLoadError(e) {
		console.log( "Error Loading Image: " + e.target.src );
	}
}