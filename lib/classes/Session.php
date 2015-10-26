<?php
/**
 * provides methods to start/destroy sessions and set/unset/get session data
 *
 */
Class Session
{
	/**
	 * the table to use for database session storage (if required)
	 * 
	 * @var string
	 */
	private static $tableName;
	
	/**
	 * the session lifetime (seconds)
	 * 
	 * @var int
	 */
	private static $lifetime;
	
	/**
	 * sets up the session storage method and starts the session
	 * 
	 * note: if database storage is used then session_write_close() must be used
	 * at the end of every page to ensure the session is written to
	 * 
	 * @param string $tableName if $tableName is passed then database storage is used
	 * @return void
	 */
	public static function init($tableName=''){
		
		// are we using database storage?
		if ($tableName) {
			
			self::$tableName = $tableName;
			
			// Register session handler callbacks
			session_set_save_handler(
				array('Session', "open"), 
				array('Session', "close"),
				array('Session', "read"),
				array('Session', "write"),
				array('Session', "destroy"),
				array('Session', "gc")
			);
		}

		// read the maxlifetime setting from PHP
		self::$lifetime = get_cfg_var("session.gc_maxlifetime");
		
		$configSessionShare = Config::get_optional('session_share');
		
		// default to only share sessions with current server name
		$sessionShare = !empty($configSessionShare) ? $configSessionShare : SERVER_NAME;
		
		session_set_cookie_params(self::$lifetime, '/', $sessionShare);
		
		if (Config::get_optional('session_path')) {
			$sessionPath = Config::get_optional('session_path');
			session_save_path($sessionPath);
		}
		
		session_start();
		
	}

	/**
	 * session 'open' callback when using database storage
	 * 
	 * @param string $save_path
	 * @param string $session_name
	 * @return bool
	 */
	public static function open($save_path, $session_name) {
		global $sess_save_path;
		$sess_save_path = $save_path;
		// don't need to do anything, just return true
		return true;
	}

	/**
	 * session 'close' callback when using database storage
	 * 
	 * @return bool
	 */
	public static function close() {
		// don't need to do anything, just return true
		return true;
	}
	 

	/**
	 * session 'read' callback when using database storage
	 * 
	 * @param string $id
	 * @return unknown_type
	 */
	public static function read($id) {

		global $db;
		
		// Set empty result
		$data = '';

		$newid = $db->quote($id);
		$time = $db->quote(time());

		$sql = 'SELECT data 
		        FROM   '.self::$tableName.' 
		        WHERE  id = '.$newid.' 
		        AND    expires > '.$time.' ;';
		
		$data = $db->fetchRow($sql);

		return $data;
	}

	/**
	 * session 'write' callback when using database storage
	 * 
	 * @param string $id
	 * @param mixed $data
	 * @return bool
	 */
	public static function write($id, $data) {

		global $db;
		
		$id      = $db->quote($id);
		
		$data    = $db->quote($data);
		$expires = $db->quote(time() + self::$lifetime);

		$sql = 'REPLACE '.self::$tableName.' 
		          (id, data, expires) 
		        VALUES
		          ('.$id.', '.$data.', '.$expires.') ;';

		$db->getConnection()->query($sql);

		return true;

	}

	/**
	 * if using database storage acts as the session 'destroy' callback,
	 * in standard behaviour destroys the session and cookie 
	 * 
	 * @param string $id
	 * @return bool
	 */
	function destroy($id) {

		if (self::$tableName) {
			
			global $db;
		
			// Build query
			$newid = $db->getConnection()->quote($id);
			$sql = 'DELETE FROM '.self::$tableName.' WHERE session_id = '.$newid.' ;';

			$db->getConnection()->query($sql);
			
		} else {
			$_SESSION = NULL;
			session_destroy();
		}
		
		if (isset($_COOKIE[session_name()])){
   			setcookie(session_name(), '', time()-42000, '/');
		}

		// always return true
		return true;

	}

	/**
	 * session 'gc' (garbage collection) callback when using database storage
	 * 
	 * @return bool
	 */
	function gc() {
		
		global $db;
		
		// Build DELETE query. Delete all records who have passed the expiration time
		$sql = 'DELETE FROM '.self::$tableName.' WHERE expires < UNIX_TIMESTAMP() ;';
		
		$db->getConnection()->query($sql);
		
		// always return true
		return true;
	}

	public static function set($name, $data){
		$_SESSION[$name] = $data;
		return true;
	}

	public static function unsetVar($name){
		if(isset($_SESSION[$name])){
			unset($_SESSION[$name]);
		}
		return true;
	}

	public static function get($name){
		if(isset($_SESSION[$name])){
			return $_SESSION[$name];
		}else{
			return null;
		}
	}

	public static function check(){
		if(isset($_REQUEST['PHPSESSID'])){
			if($_SESSION){
				return true;
			}else{
				return false;
			}
		}
		return false;
	}

	public static function setObject($name, $obj){
		$obj = serialize($obj);
		self::set($name,$obj);
	}
	
	public static function getObject($name){
		$obj = self::get($name);
		if($obj){
			return unserialize($obj);
		}
	}

}