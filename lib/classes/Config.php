<?php

// $Id: Config.php 59 2008-02-28 18:56:47Z mstillwell $

/**
 * Simple routines for restoring and retrieving configuration 
 * information based around the PHP function parse_ini_file().
 * 
 * @license GPL
 */

class Config {

    protected static $data = array();
    protected static $filename = array();
    
    /**
     * Loads the configuration information given in file $filename into
     * the configuration object.  This uses the function parse_ini_file()
     * internally, so the passed file should be compatible with it.
	 *
	 * If load is called multiple times, the configuration settings are 
	 * merged; in the case of a conflict, last file wins.
     *
     * @param string $filename
     */

    static function load($filename) {
	
    	if (!file_exists($filename)) {
    		trigger_error("fatal: configuration file [$filename] does not exist", E_USER_WARNING);
    	}
    	else {
            $filename = realpath($filename);
        }
    	
    	$d = @parse_ini_file($filename);
    	
        if (is_null($d)) {
        	trigger_error("fatal: couldn't parse configuration file [$filename]", E_USER_WARNING);
        }
        
        self::$data = array_merge(self::$data, $d);
        self::$filename[] = $filename;
        
    }
    
    /**
     * Returns true if key $k exists, otherwise false.
     *
     * @param string $k
     * @return boolean
     */
    
    static function exists($k) {
    	return array_key_exists($k, self::$data);
    }
    
    /**
     * Returns the configuration value associated with key $k, dying if
     * it does not exist.
     *
     * @param string $k
     * @return mixed
     */
    
    static function get_mandatory($k) {
    	
    	if (array_key_exists($k, self::$data)) {
    		return self::$data[$k];
    	}
    	else {
            trigger_error(sprintf("fatal: key [%s] missing from [%s]", $k, join(";", self::$filename)), E_USER_WARNING);
    	}
    	
    }
    
    /**
     * Returns the configuration value associated with key $k, returning
     * $default if it does not exist.
     *
     * @param string $k
     * @param mixed $default optional, defaults to null
     * @return mixed
     */
    
    static function get_optional($k, $default = null) {
		return array_key_exists($k, self::$data) ? self::$data[$k] : $default;
    }
    
    /**
     * Store the value $v as key $k in the configuration object.  (This is
     * not persisted; this class provides no way to write configuration information
     * to disk.)
     *
     * @param string $k
     * @param mixed $v
     * @return mixed
     */

    static function set($k, $v) {
        return self::$data[$k] = $v;
    }

}