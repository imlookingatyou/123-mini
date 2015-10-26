<?php
class Date {
	
	/**
	 * returns associative array with period=>values
	 * 
	 * @param $time unix epoch
	 * @param $from from unix epoch
	 */
	public static function timeAgo($from, $to) {
		$diff = $to - $from;
				
		$periods = array(
			//'decade' => 315705600, 
			'year' => 31570560, 
			'month' => 2630880, 
			//'week' => 604800, 
			'day' => 86400, 
			'hour' => 3600, 
			'minute' => 60, 
			'second' => 1,
		);
		
	//get startval
	$startVal = "hour";
	if( $diff > 86400 && $diff <= 8553600){
		$startVal = "day";
	}elseif( $diff > 8553600 && $diff <= 31570560){ //99 days
		$startVal = "month";
	}elseif( $diff > 31570560  ){
		$startVal = "year";
	}
			
	//now where is this in the periods array
	$keys = array_keys($periods);
	$keyNum = array_search($startVal,$keys);
	//now unset values in periods we don't want
	$num = count($periods);
        
    for($i = 0; $i <= $num-1; $i++){
    	if( $i < $keyNum || $i > $keyNum+1){
			$key = $keys[$i];
			unset($periods[$key]);
			unset($key);
    	}
    }
            
    $timeago = array();
    
    foreach ($periods as $k => $v) {
    	
    	if ($diff > $v) {
    		
    		$n = floor($diff / $v);
    		$timeago[$k] = floor($n);
    		$diff -= ($n*$v);
    	}
    }
    return $timeago;
	}
	
	
	/**
	 * returns a string from array returned by Date::timeAgo()
	 * @param $time unix epoch
	 * @param $from from unix epoch
	 * @param $format array of periods to show
	 */
	public static function formatTimeAgo($from, $to, $format=array('year', 'month', 'day', 'hour', 'minute', 'second')) {
 
		// have to calculate the offset
		$default_timezone = timezone_open(date_default_timezone_get());
		$from_datetime = new DateTime(date('Y-m-d H:i:s', $from)); 
		
		// add the offset
		$from += timezone_offset_get($default_timezone, $from_datetime);
		
		$timeago = Date::timeAgo($from, $to);
		
		$t = array();
		
		foreach($format as $period) {
			
			if (isset($timeago[$period])) {
				$time = $timeago[$period]; 
				if ($time != 1) {
					$period .= 's';
				}
				
				$t[] = "$time [$period]";
			}
		}
		
		$t = implode(" ", $t);
		if (!trim($t)) {
			return (string)'0';
		}	
		return $t;
		
	}
}