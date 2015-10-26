<?php
/**
 * 
 * @author markwong
 * Writes to error log
 *
 */

class Logger_Errorlog extends Zend_Log_Writer_Abstract {

    /**
     * Class Constructor
     */
    public function __construct(array $params = array()) {
    	// may want our own formatter? 
    	// change format by changing string passed into Zend_Log_Formatter_Simple
    	$this->_formatter = new Zend_Log_Formatter_Simple('%priorityName% (%priority%): %message%');    	     
    }

   
    /**
     * Write a message to the log.
     *
     * @param  array  $event  event data
     * @return void
     */
    protected function _write($event) {
    	$line = $this->_formatter->format($event);    	
    	error_log($line);
    }
    
    /**
     * Create a new instance of Logger_Errorlog
     * 
     * @param  array|Zend_Config $config
     * @return Zend_Log_Writer_Null
     * @throws Zend_Log_Exception
     */
    static public function factory($config)
    {
        return new self();
    }

}