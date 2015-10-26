<?php

class db {
	
	public static function appDbConnect(){
		try {
			$db = Zend_Db::factory("Pdo_Mysql", array(
				"host"       => Config::get_mandatory('app_hostname'),
				"username"   => Config::get_mandatory('app_username'),
				"password"   => Config::get_mandatory('app_password'),
				"dbname"     => Config::get_mandatory('app_database'),
				"persistent" => true,
				"charset"    => "utf8",
				"profiler"   => true
			));
			$output = $db;
		} catch (Zend_Db_Adapter_Exception $e) {
			// perhaps a failed login credential, or perhaps the RDBMS is not running
			Logger::log("NO APP DB CONNECTION: ".$e->getMessage(), Logger::CRIT);
			$output = false;
		} catch (Zend_Exception $e) {
			// perhaps factory() failed to load the specified Adapter class
			Logger::log("NO APP DB CONNECTION - failed to load Adapter class: ".$e->getMessage(), Logger::CRIT);
			$output = false;
		}
		return $output;
	}

}