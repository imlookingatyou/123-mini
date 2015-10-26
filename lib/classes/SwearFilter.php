<?php
class SwearFilter extends Zend_Rest_Client {
	
	
	public function replaceWords($phrase){

		

		// skip if we are on dev machines

		if (Config::get_mandatory("dev") == 1) {

			return $phrase;

		}

		
		$oFilter = self::connectToWebpurify();
		$oFilter->text($phrase);
		$oFilter->method('webpurify.live.replace');
		$oFilter->replacesymbol('#');

		try{
			$oResult = $oFilter->get();
		} catch (Zend_Http_Client_Adapter_Exception $e) {
			error_log("bloody timeouts");
			return false;
		}
		
		if(is_object($oResult->err)){
			if(Config::get_mandatory('dev') == 1){
				return $phrase;
			}
			return self::filterAccountError();
		} else {
			return $oResult->text;
		}
	}
	
	public function addtoblacklist($phrase){

		// skip if we are on dev machines

		if (Config::get_mandatory("dev") == 1) {

			return $phrase;

		}
		
		$oFilter = self::connectToWebpurify();
		$oFilter->word($phrase);
		$oFilter->method('webpurify.live.addtoblacklist');

		$oResult = $oFilter->get();
		
		if(is_object($oResult->err)){
			if(Config::get_mandatory('dev') == 1){
				return $phrase;
			}
			return self::filterAccountError();
		} else {
			return $oResult->success;
		}
	}
	
	public function checkForSwearing($phrase){
		$oFilter = self::connectToWebpurify();
		$oFilter->text($phrase);
		$oFilter->method('webpurify.live.check');
		//var_dump($oFilter); exit();
		try{
			$oResult = $oFilter->get();
		}catch (Exception $f){
			Logger::log('SwearFilter fail, returning phrase', Logger::NOTICE);
			return $phrase;
		}
		
		if( !isset($oResult) ){
			return $phrase;
		}
		if($oResult->found != 0){
			return false;	
		} 
				
		return $phrase;
	}
	
	private function connectToWebpurify($secure=0){

		$prefix = ($secure == 0) ? "http://" : "https://";

		$oFilter = new Zend_Rest_Client($prefix . Config::get_mandatory('purifyURL') );
		return $oFilter->api_key(Config::get_mandatory('webpurifyAPIKey') );
	}
	
	private function filterAccountError(){
		throw new Exception("<strong>There was an error accessing the filter API</strong>");
	}

}