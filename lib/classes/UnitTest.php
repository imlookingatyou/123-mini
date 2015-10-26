<?php

/**
 * This class file is for creating small unit tests that can
 * be used to test key elements. It should be extended to test 
 * specific project elements. Some example tests from Vertu
 * are included at the bottom of the file
 */
Class UnitTest{

	/* sample test date from Vertu project
	private static $username = "atgtest0176";
	private static $email = "vertu0176@ganymede.co.uk";
	private static $IMEI = "922201014122432";
	private static $serialNumber = "ZA-000176";
	*/
		
	
	public function allTests($aTests){
		if(is_array($aTests)){
			$output = "";
			foreach($aTests as $test){
				$output .= self::runTest($test)."<br><br>";		
			}
			return $output;
		}
		return false;
	}
	
	public function runTest($testToRun){
		if(method_exists('UnitTest',$testToRun)){
			return self::formatresult(call_user_func(array('self',$testToRun)), $testToRun);
		} 
		
		return self::testError($testToRun);
	}
	
	/**
	 * output formats
	 */
	private function formatResult($result, $label){
		return "<strong>Test Results for ".$label."</strong><br/>
		<code>
			".$result."
		</code>
		";
	}
	
	private function testError($label){
		return "The test ".$label." was not available";
	}
	
	/* SAMPLE TESTS FROM VERTU*/
	/*************************
	private function vrwsCustomerResponseTypeTest($object){
		
		if(isset($object->CustomersElement->CustomerResult->OperationResults->OperationResult)){
			
			if(is_object($object->CustomersElement->CustomerResult->OperationResults->OperationResult)){
				return "Object";
			}
			
			if(is_array($object->CustomersElement->CustomerResult->OperationResults->OperationResult)){
				return "Array";
			}
			
		
		} else {
			return "Not Set";
		}
	}
	
	private function vrwsConnection(){
		$output = "The connection to Vrws (".VRWS_WSDL.") is ";
		if(Vrws::Available() == true){
			return $output. "available";	
		}
		return $output. "not available";
	}
	
	public function validatePhone($imei=null, $serial=null){
		
		// if these are empty get them from the config in the file
		if($imei == NULL && $serial == NULL && !empty($_GET['arg1']) && !empty($_GET['arg2'])){
			$imei = $_GET['arg1'];
			$serial = $_GET['arg2'];
		} else if($imei == NULL && $serial == NULL){
			$imei = self::$IMEI;
			$serial = self::$serialNumber;
		}
		
		$result = "IMEI='".$imei."' Serial No='".$serial."'<br/>";
		$result .= print_r(Vrws::ValidatePhone($imei, $serial) , 1);
		
		return $result;
	}
	*************************/
}