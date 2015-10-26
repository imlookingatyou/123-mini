<?php

Class Cookies {
	
	public function cookiesEnabled(){
		//we should have a PHP session cookie enabled in the client,so we can use this to check if cookies are enabled
		if(isset($_COOKIE['PHPSESSID'])){
			return true;
		} else {
			return false;
		}
	}
	
}