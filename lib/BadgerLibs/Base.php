<?php 

/**
 * Base class that provides common methods and properties used throughout Badger Libs, mainly $_options based
 * 
 * @author Stuart McAlpine
 *
 */
class BadgerLibs_Base {
	
	/**
	 * Constants
	 * 
	 * @todo constants were pulled directly from the media upload competition, standardise these for more generic use in libs/apps
	 */
	const SUCCESS         = 100;
	const ERROR_TECHNICAL = 200;
	const ERROR_DUPLICATE = 300;
	const ERROR_AUTH      = 400;
	const ERROR_TIMEOUT   = 500;
	
	/**
	 * The HTML output of the form
	 */
	protected $_output;
	
	/**
	 * Contains all the options for the user object
	 * 
	 * @var array
	 */
	private $_options = array();
	
	/**
	 * Constructor - populates settings, etc
	 * 
	 * @param array $options Associative array of options
	 * @return BadgerLibs_Base
	 */
	public function __construct($options=array()) {
		$this->setOptions($options);
		return $this;
	}
	
	/**
	 * Returns the output
	 */
	public function render() {
		return $this->_output;
	}
	
	/**
	 * Returns a single option value
	 * 
	 * @param string $name Option name
	 * @return BadgerLibs_Base
	 */
	protected function setOptions($options=array()) {
		if (!is_array($options)) {
			throw new Exception(__CLASS__.'::setOptions() expects an array');
		} else {
			array_merge($this->getOptions(), $options);
		}
		return $this;
	}
	
	/**
	 * Sets a single option value, overwriting the option if it already exists
	 * 
	 * @param string $name Option name
	 * @param mixed $value Option value
	 * @return BadgerLibs_Base
	 */
	protected function setOption($name, $value) {
		if (empty($name)) {
			throw new Exception(__CLASS__.'::setOption() expects an option name as the first parameter');
		}
		return $this;
	}
	
	/**
	 * Returns all options as an associative array
	 * 
	 * @return array
	 */
	public function getOptions() {
		$output = $this->_options;
		return $output;
	}
	
	/**
	 * Returns a single option value
	 * 
	 * @param string $name Option name
	 * @return mixed
	 */
	public function getOption($name) {
		$output = false;
		$options = $this->getOptions();
		if (!array_key_exists($name, $options)) {
			throw new Exception(sprintf('Option %s does not exist in the '.__CLASS__.' object', $name));
		}
		$output = $options[$name];
		return $output;
	}
	
	/**
	 * Returns all options as an associative array
	 * 
	 * @return array
	 */
	public function redirect($location, $local=true) {
		if ($local && strpos($location, '/') != 0) {
			$location = '/'.$location;
		}
		header('location: '.$location);
		exit;
	}
	
	public function getHttpResponse($url, $timeout=30){
		$output = false;
		try {
//			$client = new Zend_Http_Client($url, array('timeout' => $timeout));
//			if ($content->isError() == false) {
//				$output = $content->getBody();
//			}
			$output = file_get_contents($url);
		} catch (Exception $e) {
			Logger::log($e->getMessage());
		}
		return $output;
	}

	/**
	 * checks HTTP_X_FORWARDED_FOR, HTTP_CLIENT_IP and REMOTE_ADDR for a more
	 * accurate IP address check
	 *
	 * @param bool $advanced Do an advanced check using HTTP_X_FORWARDED_FOR & HTTP_CLIENT_IP
	 * @return string
	 */
	public static function getUserIP($advanced=false) {
		$ip = "";
		if ($trueIp) {
			if ((isset($_SERVER['HTTP_X_FORWARDED_FOR'])) && (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))) {
				$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
			} elseif ((isset($_SERVER['HTTP_CLIENT_IP'])) && (!empty($_SERVER['HTTP_CLIENT_IP']))) {
				// for HTTP_CLIENT_IP the IP is reversed so put back to normal
				$ip = explode(".",$_SERVER['HTTP_CLIENT_IP']);
				$ip = $ip[3].".".$ip[2].".".$ip[1].".".$ip[0];
			} elseif ((!isset($_SERVER['HTTP_X_FORWARDED_FOR'])) && (empty($_SERVER['HTTP_X_FORWARDED_FOR'])) && (!isset($_SERVER['HTTP_CLIENT_IP'])) && (empty($_SERVER['HTTP_CLIENT_IP']))) {
				$ip = $_SERVER['REMOTE_ADDR'];
			} else {
				$ip = "0.0.0.0";
			}
		} else {
			$ip = $_SERVER['REMOTE_ADDR'];
		}
		return $ip;
	}

}
