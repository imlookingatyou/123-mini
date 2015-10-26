<?php

// $Id: init.php 95 2010-04-12 12:41:49Z hjakison $

// Constants and settings required by every PHP script.  
//
// Either include this explicitly from each script:
//
//   require_once("init.php");
//
// or arrange to have it loaded automatically via Apache:
//
//   php_value auto_prepend_file c:/workspace/ski-republic/lib/init.php


// let's make sure the $_SERVER['DOCUMENT_ROOT'] variable is set
if(!isset($_SERVER['DOCUMENT_ROOT'])){
	if(isset($_SERVER['SCRIPT_FILENAME'])){
		$_SERVER['DOCUMENT_ROOT'] = str_replace( '\\', '/', substr($_SERVER['SCRIPT_FILENAME'], 0, 0-strlen($_SERVER['PHP_SELF'])));
	};
};
if(!isset($_SERVER['DOCUMENT_ROOT'])){
	if(isset($_SERVER['PATH_TRANSLATED'])){
		$_SERVER['DOCUMENT_ROOT'] = str_replace( '\\', '/', substr(str_replace('\\\\', '\\', $_SERVER['PATH_TRANSLATED']), 0, 0-strlen($_SERVER['PHP_SELF'])));
	};
};

// $_SERVER['DOCUMENT_ROOT'] is now set - you can use it as usual...
if(!empty($_SERVER['DOCUMENT_ROOT'])){
	define( 'DOCUMENT_ROOT', $_SERVER['DOCUMENT_ROOT'] );
	define( 'SERVER_NAME',   $_SERVER['SERVER_NAME']   );
} else {
	
	//works for phpunit
	define( 'DOCUMENT_ROOT', dirname(__FILE__ ) . "/../web" );
	define( 'SERVER_NAME',   "test"   );
}

function init_autoload($class) {
    require_once(sprintf("%s.php", str_replace("_", "/", $class)));
}
spl_autoload_register("init_autoload");

$include_path = array(
    sprintf("%s/../lib", DOCUMENT_ROOT),
    sprintf("%s/../lib/classes", DOCUMENT_ROOT),
    sprintf("%s/../views", DOCUMENT_ROOT),
	sprintf("%s/../lib/Facebook", DOCUMENT_ROOT)
);
    
ini_set("include_path", join(PATH_SEPARATOR, $include_path));

Config::load(sprintf("%s/../config/default.ini", DOCUMENT_ROOT));
Config::load(sprintf("%s/../config/%s.ini", DOCUMENT_ROOT, SERVER_NAME));

//GLOBALS
define( 'DEFAULT_LANG',   Config::get_mandatory("DEFAULT_LANG") );
$tsn = Config::get_optional("THIS_SERVER_NAME")? Config::get_optional("THIS_SERVER_NAME"):SERVER_NAME;
$tsll = Config::get_optional("THIS_SSL_SERVER_NAME")? Config::get_optional("THIS_SERVER_NAME"):SERVER_NAME;
define( 'THIS_SERVER_NAME',   $tsn );
define( 'THIS_SSL_SERVER_NAME',   $tsll );

$isDev = ( Config::get_optional("dev")==="1" )? true:false;
ini_set("display_errors",   (bool)$isDev);
ini_set("html_errors",      (bool)$isDev);
ini_set("log_errors",       (bool)$isDev);
if($isDev){
	ini_set("error_reporting",  E_ALL);
}

?>