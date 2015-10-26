<?php
/**
 * Methods to sanitise user input
 * 
 * @author Stuart McAlpine
 *
 */
class Sanitise {
	
	const HTML = 1;
	const URL  = 2;
	const DB   = 3;
	
	/**
     * Sanitises for HTML output
     * 
     * @param mixed $input
     * @return string
     */
	public static function Html($input, $sanitise=true) {
    	$output = "";
		if (is_object($input)) {
    		$input = (string)$input;
    	}
    	if (is_array($input)){
    		$output = array();
    		foreach($input as $key=>$value){
    			$output[$key] = self::Html($value, $sanitise);
    		}
    	} else {
    		$input = mb_convert_encoding($input, "UTF-8", "UTF-8");
    		if ($sanitise) {
				$sanitised = Sanitise::poisonWords($input, self::HTML);
    		}
    		$output = htmlentities($input, ENT_QUOTES, "UTF-8"); 
    	}
    	// @todo: double check this HTML sanitiser is working properly
//    	Logger::log('converted "'.print_r($input, 1).'" to "'.print_r($output, 1).'"');
		return $output;
	}
	
	/**
	 * Sanitises for URL output 
	 * - take care to use this on query vars and not entire URLs
	 * 
	 * @param mixed $input
	 * @return string
	 */
	public static function Url($input, $sanitise=true) {
    	$output = "";
		if (is_object($input)) {
    		$input = (string)$input;
    	}
    	if (is_array($input)){
    		foreach($input as $key=>$value){
    			$input[$key] = self::Url($value, $sanitise);
    		}
    	} else {
			if ($sanitise) {
				$input = Sanitise::poisonWords($input, self::URL);
			}
    		$output = urlencode($input);
    	}
		return $output;
	}
	
	/**
	 * Sanitises for database input
	 * 
	 * @param mixed $input
	 * @return string
	 */
	public static function Db($input, $sanitise=true) {
    	$output = "";
		if (is_object($input)) {
    		$input = (string)$input;
    	}
    	if (is_array($input)){
    		foreach($input as $key=>$value){
    			$input[$key] = self::Db($value, $sanitise);
    		}
    		$output = $input;
    	} else {
    		if ($sanitise) {
	    		// @todo pass connection to Db() as we need to use some form of escaping before inputting into the db.
				$input = Sanitise::poisonWords($input, self::DB);
    		}
    		$output = Sanitise::poisonWords($input);
    	}
		return $output;
	}
	
	/**
	 * Filters user input to prevent email header injection
	 * 
	 * @param string $input
	 * @return string
	 */
	public static function emailHeaders($input) {
		$filter = array(
			"\r", 
			"\n", 
			"%0a", 
			"%0d", 
			"Content-Type:", 
			"bcc:", 
			"to:", 
			"cc:", 
		);
		$output = str_ireplace($filter, " ", $input);
		return $output;
	}
	
	/**
	 * Runs a string through a filter - if a poison word is found then returns a blank string
	 * 
	 * @param string $input
	 * @return string
	 */
	public function poisonWords($input, $type) {
		// @todo check poisonWords() filters aren't too heavy handed for HTML
		// UPDATE: it is - it was filtering the string "Choccy Weetabixy Descriptiony sdfg sd gsd gsd sd sdf g "
		// just returning input
		// @todo poisonWords() is disabled
		//return $input;
		switch ($type) {
			case self::HTML:
			case self::URL:
				$filter = array(
					"&#",
					"<SCRIPT",
					"< SCRIPT",
					"SCRIPT>",
					"SCRIPT >",
					"<?",
					"?>",
					"document.",
					".js",
					"eval(",
					"eval (",
					"ONMOUSE",
					"ONLOAD",
//					"JAVASCRIPT",
					"$(",
					"ONCLICK",
					"ONFOCUS",
					"ONBLUR",
					"<IMG",
				);
				break;
			case self::DB:
				$filter = array(
					"&#",
					"DELETE",
					"INSERT",
					"UPDATE",
				);
				break;
		}
		foreach($filter as $item){
			if(mb_stristr($input,$item)){
				// @todo shouldn't return an empty string if possible as we lose all data - look into a mb string replace solution
				$input = "";
			}
		}
		return $input;
	}
	
}
