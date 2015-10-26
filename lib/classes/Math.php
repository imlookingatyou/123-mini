<?php

class Math {	
	/**
	 * function multiRand
	 * DESC: Selects multiple, unique, random numbers from a specified range
	 *
	 * USAGE: E.g. to select 5 images from a range of 20, Math::multiRand(1, 20, 5)
	 *
	 * @param int $min
	 * @param int $max
	 * @param int $q
	 * @return array
	 */
	
	public static function multiRand($min, $max, $q){
		
		$randoms = array();
		//first check to see whether q is more than the number of elements to chose from.
		$nums = ($max - $min + 1);
		//if ok, then select random numbers
		if($q <= $nums){			
			//loop for the amount of random numbers you want
			for($i=1; $i<=$q; $i++){
				
				//make sure that the new random number has not been chosen already
				do{
					$val = rand($min, $max);
				}while( in_array($val, $randoms) );
				
				//add value to array
				array_push($randoms, $val);
			}
			return $randoms;
		}else{
			error_log("not enough elements to select random numbers from, $q is greater than $nums: ".__METHOD__);
			return $randoms;
		}
	}
	
	/**
	 * function multiRandLite
	 * DESC: Selects multiple, unique, random numbers from a specified range
	 *
	 * USAGE: E.g. to select 5 images from a range of 20, Math::multiRand(1, 20, 5)
	 *
	 * @param int $min
	 * @param int $max
	 * @param int $q
	 * @return array
	 */
	
	public static function multiRandLite($min, $max, $q){
		$randoms = array();
		//first check to see whether q is more than the number of elements to chose from.
		$nums = ($max - $min + 1);
		
		if($q <= $nums){
			$range = range($min, $max, 1);
			//loop for the amount of random numbers you want
			for($i=1; $i<=$q; $i++){
				shuffle($range);
				//add value to array
				array_push($randoms, $range[0]);
				//now remove this value from next loop
				unset($range[0]);
			}
			
			return $randoms;
		}else{
			error_log("not enough elements to select random numbers from, $q is greater than $nums: ".__METHOD__);
			return $randoms;
		}
	}
	
	/**
	 * function ageOnDate
	 * DESC: Returns the age on a given date when given a date
	 *
	 * dates need to be in the YYYY-MM-DD format 
	 *
	 * @param string $birthday
	 * @param string $futuredate
	 * @return int
	 */
	
	public static function ageOnDate($birthday, $futuredate=false){
		//retrieve year, month, day.
		list($year,$month,$day) = explode("-",$birthday);
		
		//work out difference in years from today
		
		if(!$futuredate){
			$year_diff  = date("Y") - $year;
			$month_diff = date("m") - $month;
			$day_diff   = date("d") - $day;
	
			if ($month_diff < 0) $year_diff--;
			elseif (($month_diff==0) && ($day_diff < 0)) $year_diff--;
		
		//work out difference in years from a given date
		}else{
			list($fyear,$fmonth,$fday) = explode("-",$futuredate);
			$year_diff  = $fyear - $year;
			$month_diff = $fmonth - $month;
			$day_diff   = $fday - $day;
			
			if( ($month_diff==0) && ($day_diff < 0) ) {
				$year_diff--;
			}elseif( $month_diff < 0 ){
				$year_diff--;
			}
		}    
		return $year_diff;
	}
	
	/**
	 * function duration
	 * DESC: Returns an array (days, hours, minutes, seconds) with the duration between two datestamps
	 *
	 * dates have to be strings, uses string to time function
	 * if $start is not defined, function will use todays timestamp
	 *
	 * @param string $start
	 * @param string $end
	 * @return array
	 */
	 
	public static function duration($end, $start=false){
		$days = 0;
		$seconds = 0;
		$hours   = 0;
		$minutes = 0;
		$end = strtotime($end);
		
		if($start){
			$start = strtotime($start);
		}else{
			$start = strtotime("now");
		}
		
		$diff = $end - $start;
		if($diff<0){
			$diff = $start - $end;
		}
		
		$duration = array();
		
		//work out differences in time
		//there are 86,400 seconds in a day
		if($diff % 86400 <= 0){
			$days = $diff / 86400;
		}
		
		if($diff % 86400 > 0) {
			$rest = ($diff % 86400);
			$days = ($diff - $rest) / 86400;
			
			if( $rest % 3600 > 0 ){
				$rest1 = ($rest % 3600);
				$hours = ($rest - $rest1) / 3600;
			   if( $rest1 % 60 > 0 ){
					$rest2 = ($rest1 % 60);
					$minutes = ($rest1 - $rest2) / 60;
					$seconds = $rest2;
				}else{
					$minutes = $rest1 / 60;
				}
			}else{
			   $hours = $rest / 3600;
			}
		}
		
		$duration["days"] = $days;
		$duration["hours"] = $hours;
		$duration["minutes"] = $minutes;
		$duration["seconds"] = $seconds;
		
		return $duration;
		
	}
	
	/**
	 * function datetimeToArray
	 * DESC: Returns a date array with DD, MM, YYYY elements
	 *
	 * dates need to be in the YYYY-MM-DD format 
	 *
	 * @param string $date
	 * @return array
	 */
	
	public static function datetimeToArray($date, $val){
		//retrieve year, month, day.
		$date = substr($date, 0, 10);
		list($year,$month,$day) = explode("-",$date);
		
		$dateArray = array();
		$dateArray["y"] = $year;
		$dateArray["m"] = $month;
		$dateArray["d"] = $day;
		
		return $dateArray[$val];
		
	}
	
}