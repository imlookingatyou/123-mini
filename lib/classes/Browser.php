<?php

class Browser{
	
	public function isiPhone(){
		return self::userAgentType("iPhone");
	}
	
	private function userAgentType($string){
		if(strstr($_SERVER['HTTP_USER_AGENT'], $string)){
			return true;
		}
		return false;
	}
	
}