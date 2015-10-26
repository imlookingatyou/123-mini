<?php

Class Media {
	
/*******************************/
/* EASY FLASH EMBED	   			*/
/*******************************/
/**
 * Creates a SWFobject instance from
 * a few params
 * @param string $path path to swf file
 * @param integer $width width of file
 * @param integer $height height of file
 * @param string $divID css id of div to replace
 * @param integer $version optional flash version
 * @param string $bgcolor optional background colour
 * @return string
 **/
	public function embedFlash($path, $width, $height, $divID, $version=8, $bgcolor='#ff0000', $variables_a=null, $attributes_a = null){

		$variables = "";
		if(is_array($variables_a)){
			foreach($variables_a as $name=>$value){
				$variables .= $name.': "'.$value.'",
				';
			}
		}
		$variables = substr(trim($variables), 0, -1);
		
		$attributes = "";
		if(is_array($attributes_a)){
			foreach($attributes_a as $name=>$value){
				$attributes .= $name.': "'.$value.'",
				';
			}
		}
		$attributes = substr(trim($attributes), 0, -1);
		
		$flashOptions = '
		var flashvars = {
    	'.$variables.'
		};
  		var params = {
  		  menu: "false",
  		  allowScriptAccess: "always",
  		  wmode: "transparent"
  	  		   
  	  		};
  		var attributes = {
  		  '.$attributes.'
  		};
  		';

		return '<script type="text/javascript">
				'.$flashOptions.'
					swfobject.embedSWF("'.$path.'", "'.$divID.'", "'.$width.'", "'.$height.'", "'.$version.'", false, flashvars, params);
				</script>';
		
		
	}
	
	public function customYouTubePlayer($sYoutubeId, $divID='youtubeVideo') {

			$noFlashContent = Config::get('noFlashContent');
		
			$aParams = array("id"=>"myytplayer");
			// show video if the youtube ID is set in Fans_Config
			$output .= "<div id='".$divID."'>".$noFlashContent."</div>";

			$output .= Fans_Pages::embedFlash("[ini_protocol]www.youtube.com/apiplayer?enablejsapi=1&playerapiid=ytplayer", 480, 295, "youtubeChallengeVideo", 8, '#ffffff', null, $aParams, true);
			$output .= "
			<input type='hidden' id='loadvideoid' name='loadvideoid' value='".$sYoutubeId."' />
			<div id='playerControls'>
				<a href='javascript:void(0);' id='videoPlay' onclick='videoplaypause()'></a>
				<a href='javascript:void(0);' id='videoMute' onclick='videomute()'></a>
				<!-- duration -->
				<div id='durationDisplay'><span id='videotime'>-</span> / <span id='videoduration'>-</span></div>
				<span id='userVideoEmbed'> </span>
   		   </div>
   		   
			";

		return $output;

	}
	
	
	
}