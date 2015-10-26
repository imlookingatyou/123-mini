var avatar;
var vehicle;
var onPlaneDroppedFunc;
var limitTop;
var limitBottom;

function Player( stage, contentManager, newScaleFactor, levelId, y_start, y_end, functionOnPlaneDropped ) {
	onPlaneDroppedFunc = functionOnPlaneDropped;
	limitTop = y_end;
	limitBottom = y_start;	

	vehicle = new Vehicle( contentManager.imgVehicle, newScaleFactor, levelId, y_start, y_end, functionOnPlaneDropped );
	stage.addChild( vehicle );
	avatar = new Avatar( stage, contentManager, newScaleFactor, levelId, vehicle.x );
}

Player.prototype.drop = function () {
	//+++ var disappearTween = createjs.Tween.get( this ).to( { y:200 }, 1000, createjs.Ease.backOut ).call( this.onDropped );
	this.onDropped();
}

Player.prototype.onDropped = function() {
	onPlaneDroppedFunc();
}


Player.prototype.tick = function ( vehiclePosY ) {
	vehicle.tick();
	avatar.tick( vehicle.y );
}

Player.prototype.onUpPressed = function () {
	vehicle.isInIdleMode = false;
	vehicle.upKey = true;
}

Player.prototype.onUpReleased = function () {
	vehicle.upKey = false;
}

Player.prototype.onDownPressed = function () {
	vehicle.isInIdleMode = false;
	vehicle.downKey = true;
}

Player.prototype.onDownReleased = function () {
	vehicle.downKey = false;
}