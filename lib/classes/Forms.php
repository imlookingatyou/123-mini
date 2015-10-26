<?php

class Forms {

	// requests value
	public static function request($name){
		
		$req = "";
		
		if( isset($_REQUEST[$name]) && !is_null($_REQUEST[$name]) ){
			$req = $_REQUEST[$name];
		}
		
		return $req;
	}


	/**
	 * function selectData
	 * DESC: returns a string of option tags for <select> drop downs.
	 * Will also select the necessary option tag when supplied an array of
	 * selected items
	 *
	 * @param string $data
	 * @param string $selectState
	 * @return string
	 */

	public static function selectData($data, $selectState=false, $is_assoc=false){
		$optionString = "";

		// if the data passed to method aren't arrays, convert them
		if(!is_array($data)){
			$data = array($data);
		}

		if(!is_array($selectState)){
			$selectState = array($selectState);
		}

		// counter used to check whether $data array is associative or indexed
		// required to ascertain what data to use for values and classes in the option tags
		$counter = 0;

		foreach($data as $details => $values){

			$class = ($details===$counter)? strtolower($details):strtolower($values);
			$el = ($details===$counter)? $values:$details;

			$sep = ($el=="*sep*")? true:false;

			//build option tags for each element in the data array
			if($sep){
				$selected = ( in_array(strtolower(trim($class)),$selectState) )? "selected=\"selected\"":"";
				$optionString .= sprintf("<option value='0' $selected class=\"f_select f_selectval_sep\" >-------</option>\r", strtolower($class));
			}elseif( $is_assoc ){
				$selected = ( in_array(strtolower(trim($class)),$selectState) )? "selected=\"selected\"":"";
				$optionString .= sprintf("<option value=\"%s\" $selected class=\"f_select f_selectval_%s\" >%s</option>\r", strtolower($class), strtolower($class), $el);
			}else{
				$selected = ( in_array(strtolower(trim($el)),$selectState) )? "selected=\"selected\"":"";
				$optionString .= sprintf("<option value=\"%s\" $selected class=\"f_select f_selectval_%s\" >%s</option>\r", strtolower($el), strtolower($class), $el);
			}

			//clear variables for next loop
			unset($el);
			unset($class);
			unset($selected);

			$counter++;
		}

		return $optionString;
	}

	//like the above function, but deals with dates
	//default lang for months is english
	public static function dateDropDown($type, $selectState=false, $startYear = false, $locale="en_UK.UTF-8"){
		$ddString = "";
		$i = 0;

		setlocale(LC_ALL, $locale);

		if($type=="d"){
			for($i=1; $i<=31; $i++){

				$i = sprintf("%02d", $i);

				if($selectState && $selectState==$i){
					$selected = "selected=\"selected\"";
				}else{
					$selected = "";
				}

				$ddString .= sprintf("<option value=\"%02d\" $selected >%02d</option>\r", $i, $i);
			}
		}elseif($type=="m"){
			for($i=1; $i<=12; $i++){

				$startDate = mktime(0, 0, 0, $i, 1, 1996);
				//$m = date("F", $startDate);
				$m = strftime('%B',$startDate);
				$i = sprintf("%02d", $i);

				if($selectState && $selectState==$i){
					$selected = "selected=\"selected\"";
				}else{
					$selected = "";
				}

				$ddString .= sprintf("<option value=\"%02d\" $selected >%s</option>\r", $i, $m);
			}
		}elseif($type=="y"){

			$e = $startYear;
			$s = strtotime("today");
			$s = date("Y", $s);

			for($i=$s; $i>=$e; $i--){

				if($selectState && $selectState==$i){
					$selected = "selected=\"selected\"";
				}else{
					$selected = "";
				}

				$ddString .= sprintf("<option value=\"%04d\" $selected >%04d</option>\r", $i, $i);
			}
		}

		return $ddString;

	}


	//function that returns that right error class for each field
	public static function getError($field, $errors){
		$class = isset($errors[$field])? "form_error":"";
		return $class;
	}

	//function that returns that right error class for each field
	public static function getErrorMsg($field, $errors){
		$msg = isset($errors[$field]["msg"])? $errors[$field]["msg"]:"";
		return $msg;
	}

	//build an errors array for mandatory requests
	public static function buildErrorsArray($requests, $required=false){
		$errors = array();
		if($requests){
			//loop through array and add to errors array if it doesn't
			//exist in $_REQUESTs array
			foreach($requests as $key => $value){
				if(!Forms::request($key) && $value){
					$errors[$key] = true;
					if($required){
						$errors[$key] = array();
						$errors[$key]["msg"] = $required;
					}
				}
			}
			return $errors;
		}else{
			return false;
			error_log("No requests array: ".__METHOD__);
		}
	}


	//build an values array for all requests
	public static function getAllRequests($requests){
		$values = array();
		if($requests){

			foreach($requests as $key => $value){

				// values from $_REQUETS could be an array
				if (is_array(Forms::request($key))) {
					$values[$key] = array();
					foreach (Forms::request($key) as $v) {
						$values[$key][] = Forms::zendStripTags($v);
					}

				} else {
					$values[$key] =Forms::zendStripTags( Forms::request($key));
				}
			}
			return $values;
		}else{
			return false;
			error_log("No requests array: ".__METHOD__);
		}
	}

/**
 * zendInputFilter() - strips tags from input and optionally returns escaped output
 * @param array $input - array of user input
 * @param $escaped - will additionally run an html entities filter if set to true
 * @return array
 */
	public static function zendInputFilter($input,$escaped = false) {

		if ($input) {
			$output = new Zend_Filter_Input(array('*' => 'StripTags'), array(), $input); //strips tags from all input

				$escaped = $output->getEscaped(); // will be automatically run through an HTML-entities-filter
				// or
				$unescaped = $output->getUnescaped(); // the values as they come out of the filter-chain.

			if($escaped == true) {
				return $escaped;
			} else {
				return $unescaped;
			}
		} else {
			//Logger::log("No input received ".__METHOD__, Logger::DEBUG);
			return $input;
		}
	}
/**
 * zendStripTags() - runs strip tags on user input and returns filtered string
 * @param string $input
 * @return string
 */
	function zendStripTags($input) {
		 if ($input) {
			$zf = new Zend_Filter_StripTags(false,null,null,false);
			$output = $zf->filter($input);
			return $output;
		 } else {
			//Logger::log("No input received ".__METHOD__, Logger::DEBUG);
			return $input;
		}
	}
}