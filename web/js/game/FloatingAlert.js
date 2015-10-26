var text5;
var text10;
var text30;
var text50;

var yFrom = 50;
var yTo = 80;

var currentAlert;
var scaleFactor;

function FloatingAlert( stage, contentManager, newScaleFactor ) {
	scaleFactor = newScaleFactor;

	yFrom*=scaleFactor;
	yTo*=scaleFactor;
	
	text5 = new createjs.Bitmap( contentManager.imgFloatAlert5 );
	text5.scaleX = text5.scaleY = scaleFactor;
	text5.x = 160 * scaleFactor;
	text5.y = 80 * scaleFactor;
	text5.visible = false;
	stage.addChild(text5);
	
	text10 = new createjs.Bitmap( contentManager.imgFloatAlert10 );
	text10.scaleX = text10.scaleY = scaleFactor;
	text10.x = 160 * scaleFactor;
	text10.y = 80 * scaleFactor;
	text10.visible = false;
	stage.addChild(text10);

	text30 = new createjs.Bitmap( contentManager.imgFloatAlert30 );
	text30.scaleX = text30.scaleY = scaleFactor;
	text30.x = 160 * scaleFactor;
	text30.y = 80 * scaleFactor;
	text30.visible = false;
	stage.addChild(text30);

	text50 = new createjs.Bitmap( contentManager.imgFloatAlert50 );
	text50.scaleX = text50.scaleY = scaleFactor;
	text50.x = 160 * scaleFactor;
	text50.y = 80 * scaleFactor;
	text50.visible = false;
	stage.addChild(text50);
	
}

FloatingAlert.prototype.show = function ( value ) {
	if( currentAlert != undefined ) {
		createjs.Tween.removeTweens(currentAlert);
		currentAlert.visible = false;
	}
	
	var signToUse;
	if( value >= 50 ) {
		signToUse = text50;
	} else if ( value >= 30 ) {
		signToUse = text30;
	} else if ( value >= 10 ) {
		signToUse = text10;
	} else if ( value >= 5 ) {
		signToUse = text5;
	}
	
	signToUse.alpha = 0;
	signToUse.visible = true;
	signToUse.y = yFrom;
	
	currentAlert = signToUse;
	createjs.Tween.get( signToUse ).to( { y:yTo, alpha:1 }, 500, createjs.Ease.backOut ).to( { alpha:.2 }, 150, createjs.Ease.backOut ).to( { alpha:1 }, 150, createjs.Ease.backOut ).to( { alpha:.2 }, 150, createjs.Ease.backOut ).to( { alpha:1 }, 150, createjs.Ease.backOut ).to( { alpha:.2 }, 150, createjs.Ease.backOut ).to( { alpha:1 }, 150, createjs.Ease.backOut ).to( { alpha:0, y:(yTo+(20 * scaleFactor)) }, 200, createjs.Ease.backOut ).call( this.onDisappeared );
}

FloatingAlert.prototype.onDisappeared = function() {
	text5.visible = false;
	text10.visible = false;
	text30.visible = false;
	text50.visible = false;
}