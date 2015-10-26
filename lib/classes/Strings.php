<?php

class Strings {

	/**
	 * function strchop
	 * DESC: Cuts a string to a given length and will also append a specified
	 * string on the end. This method truncates to the nearest blank space to
	 * avoid words being chopped. Updated to include multibyte char support
	 * and error handline where text has no blank space
	 *
	 * USAGE EXAMPLE: to truncate a string to near 50 characters and
	 * append "..." on the end, strchop($string, 50, "...")
	 *
	 * @param string $string
	 * @param int $truncateLength
	 * @param string $endString
	 * @return string
	 */
	
	public static function strchop($string, $truncateLength, $endString=false){	
		$strlen = mb_strlen($string,"UTF-8");
		// check if string length is over the specified truncate value
		// if it isn't simply return the string
		if($strlen > $truncateLength){
			//cut the string
			$cutStr = trim(mb_substr($string, 0, $truncateLength,"UTF-8"));
			
			//search for last blank space character
			$blankPos = mb_strrpos($cutStr, " ", "UTF-8");
			
			if(!$blankPos){
				error_log("no blank pos in string of $truncateLength character length: ".__METHOD__);
				return $cutStr . "...";
			}
			
			//cut string again to this new position
			$cutStr = trim(mb_substr($string, 0, $blankPos, "UTF-8"));
			//append endString if it exists
			if(isset($endString)){
				$cutStr = $cutStr.$endString;
			}
			return $cutStr;	
		}else{
			return $string;
		}
	}
	
	/**
	 * Returns a random string of a given length
	 * 
	 * @param integer $length (Optional, default 12) Length of password
	 * @param boolean $allowSimilarChars (Optional, default false) Return a string without similar characters
	 * @return string
	 */
	protected function randomString($length=12, $allowSimilarChars=false) {
		$output = '';
		$length = (int)$length;
		$chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!£$%^&*_+=@?';
		if ($allowSimilarChars == false) {
			$similar = array('I','O','o','1','0','_');
			$chars = str_replace($similar, '', $chars);
		}
		$array = explode($chars);
		for ($n=1; $n<=$length; $n++) {
			$array = array_rand($array);
			$output .= $array[0];
		}
		Logger::log('randomPassword $output = '.$output, Logger::DEBUG);
		return $output;
	}	
	
	 /**
	 * function checkEmailByMX
	 * DESC: checks if an mx record exists for a domain
	 *
	 * USAGE EXAMPLE: if(Strings::checkEmailByMX('test@test.com') == true){
	 *
	 * @param string $email
	 * @return boolean
	 */
	public function checkEmailByMX($email){

		//get domain
		list($username,$domain)=split('@',$email);
		$mxhosts = array();
		if(!getmxrr($domain, $mxhosts))	{
			// no mx records, ok to check domain
			if (!fsockopen($domain,25,$errno,$errstr,30)){
			  return false;
			} else {
			  return true;
			}
		} else {

		// mx records found
		foreach ($mxhosts as $host)	{
		  if (fsockopen($host,25,$errno,$errstr,30)){
			return true;
		  }
		}

		return false;
		}
	}


	/**
	 * function makeArray
	 * DESC: checks if el is an array, if not, converts to an array
	 *
	 * @param string/array $data
	 * @return array
	 */
	 
	public static function makeArray($data){
		if( !is_array($data) ){
			$data = array($data);
		}
		
		return $data;
	}

	/**
	 * function boolean
	 * DESC: returns a bool from a string
	 *
	 * @param string $val
	 * @return bool
	 */
	 
	public static function boolean($val){
		
		if( $val=="true" || $val=="1" || $val==1){
			return true;
		}else{
			return false;
		}
	}
	
	/**
	 * function is_assoc
	 * DESC: returns true if array is an associative array
	 *
	 * @param array $array
	 * @return bool
	 */
	 
	public static function isAssoc($array) { 
		if ( !is_array($_array) || empty($array) ) { 
			return -1; 
		} 
		foreach (array_keys($_array) as $k => $v) { 
			if ($k !== $v) { 
				return true; 
			} 
		} 
		return false; 
	}
	
	
}