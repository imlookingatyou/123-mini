<?php

/**
 * Uses singleton pattern so only ever one instance of logger
 * Uses Zend_log to do most of the grunt work
 * 
 * @uses Logger_Errorlog 
 * 
 * @author Mark Wong
 * @author Stuart McAlpine
 */
class Logger {

  // constants are the same as Zend_Log
  const EMERG   = 0;  // Emergency: system is unusable
  const ALERT   = 1;  // Alert: action must be taken immediately
  const CRIT    = 2;  // Critical: critical conditions
  const ERR     = 3;  // Error: error conditions
  const WARN    = 4;  // Warning: warning conditions
  const NOTICE  = 5;  // Notice: normal but significant condition
  const INFO    = 6;  // Informational: informational messages
  const DEBUG   = 7;  // Debug: debug messages
	
	// Store the single instance of Logger
	private static $logger = false;
	
	private function __construct() {
		
		// setup file error logging
		$file_writer = new Logger_Errorlog();
		
		if (Config::get_optional("DEBUG_LOG") == false) {
			$file_writer->addFilter(Zend_Log::INFO);
		}

		$log = new Zend_Log();
		$log->addWriter($file_writer);
		
		// setup email error logging
		if(Config::get_optional("log_to_email") == true){
			$mail = new Zend_Mail();
			$mail->setFrom(Config::get_mandatory('log_email_from'));
			$mail->addTo(Config::get_mandatory('log_email_to'));
			
			// setup email template
			$layout = new Zend_Layout();
			$layout->setLayoutPath(DOCUMENT_ROOT.Config::get_mandatory("log_email_template"));
			$layout->setLayout('error-logger');
			$layout_formatter = new Zend_Log_Formatter_Simple('<li>.'.Zend_Log_Formatter_Simple::DEFAULT_FORMAT.'</li>');

			// Use default HTML layout.
			$email_writer = new Zend_Log_Writer_Mail($mail, $layout);
			$email_writer->setLayoutFormatter($layout_formatter);
			$email_writer->setSubjectPrependText(Config::get_mandatory('log_email_subject_prepend'));
			$email_writer->addFilter(Zend_Log::ERR);

			$log->addWriter($email_writer);
		}
		
		self::$logger = $log;

	} 
	
	public static function getInstance() {
		if (!self::$logger){
			new Logger();			
		}
    	return self::$logger;
	} 
	
	/**
	 * Logs a message
	 * 
	 * @example Logger::log("It's not working!");
	 * @example Logger::log("It's not working!", 0);
	 * @example Logger::log("It's not working!", Logger::EMERG);
	 * @example Logger::log("It's not working!", Logger::EMERG, true);
	 * 
	 * @param string $message The text to log
	 * @param number $priority The priority of the error (Logger::EMERG to Logger::DEBUG)
	 * @param bool $backtrace Add a debug backtrace to the error log
	 * @return void
     */
	public static function log($message="", $priority=5, $backtrace=false) {
		if (Config::get_optional("dev") != false) {
			$l = self::getInstance();
			if ($backtrace) {
				$l->log($message.self::backtrace(), $priority);
			} else {
				$l->log($message, $priority);
			}
		}
	}
	
	/**
	 * Returns a formatted string for the error log containing a backtrace
	 * 
	 * @return string
	 */
	public static function backtrace() {
		$output = '';
		$steps = debug_backtrace();
		unset($steps[0]);
		foreach ($steps as $step) {
			$class = !empty($step['class']) ? $step['class']."->" : "";
			$function = !empty($step['function']) ? $step['function']."() called at " : "";
			$location = "[".(!empty($step['file']) ? $step['file'] : "").":".(!empty($step['line']) ? $step['line'] : "")."]";
			$output .= ",\r\n                       ".$class.$function.$location;
		}
		return $output;
	}
	
	public static function dump($var){
		echo "<pre>";
		var_dump($var);
		echo "</pre>";
	}

}