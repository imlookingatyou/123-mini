var hair;
var skin;
var accessory;

var xOffset;
var yOffset;
var hairYOffset;
var accessoryYOffset;

function Avatar( stage, contentManager, newScaleFactor, levelId, vehicleX ) {
	hair = new createjs.Bitmap( contentManager.imgAvatarHair );
	skin = new createjs.Bitmap( contentManager.imgAvatarSkin );
	accessory = new createjs.Bitmap( contentManager.imgAvatarAccessory );

	hair.scaleX = hair.scaleY = newScaleFactor;
	skin.scaleX = skin.scaleY = newScaleFactor;
	accessory.scaleX = accessory.scaleY = newScaleFactor;
	
	// different planes, different offsets?
	switch( levelId ) {
		case 1 :
			xOffset = 49 * newScaleFactor;
			yOffset = 78 * newScaleFactor;
			break;
		case 2 :
			xOffset = 46 * newScaleFactor;
			yOffset = 77 * newScaleFactor;
			break;
		case 3 :
			xOffset = 48 * newScaleFactor;
			yOffset = 82 * newScaleFactor;
			break;
	}
	
	hairYOffset = 22 * newScaleFactor;
	accessoryYOffset = 46 * newScaleFactor;
	
	skin.x = vehicleX - xOffset;
	hair.x = vehicleX - ( 20 * newScaleFactor ) - xOffset;
	accessory.x = vehicleX - ( 20 * newScaleFactor ) - xOffset;
	
	stage.addChild(skin);
	stage.addChild(hair);
	stage.addChild(accessory);
}

Avatar.prototype.tick = function ( vehiclePosY ) {
	skin.y = vehiclePosY - yOffset;
	hair.y = vehiclePosY - yOffset - hairYOffset;
	accessory.y = vehiclePosY - yOffset - accessoryYOffset;
}