<?php
class Cache {
	
	protected static $_caches = array();
	
	public static function cache_init($options=false) {
		
		$defaultCacheExpire = Config::get_mandatory("DEFAULT_CACHE_EXPIRE");
		
		if (empty($defaultCacheExpire)) {
			$defaultCacheExpire = 0;
		}
		
		$lifetime = (isset($options["lifetime"])) ? $options["lifetime"] : $defaultCacheExpire;
		
		$cacheExists = false;
		if (!empty(self::$_caches[$lifetime])) {
			$cacheExists = true;
		}
		
		if (!$cacheExists && Config::get_optional("MEMCACHE_ON") == true) {
			
			$servers = array(
				'host' => Config::get_mandatory("memcache_host"),
				'port' => Config::get_mandatory("memcache_port"),
				'persistent' => Zend_Cache_Backend_Memcached::DEFAULT_PERSISTENT, //true by default
				'weight' => 1, //no of buckets
			);

			$frontendOptions = array(
				'lifetime' => $lifetime, 
				'automatic_serialization'=> true
			);
			
			$backendOptions = array(
				'servers' => $servers
			);
			
			$memcache = Zend_Cache::factory(
				'Core', 
				'Memcached', 
				$frontendOptions, 
				$backendOptions
			);
			
			// test memcache & clean out old entries if they exist
			if (@$memcache->save("test", "test_id")) {
				
				$num = mt_rand(0,100);
				if( $num==1 ){
					$memcache->clean(Zend_Cache::CLEANING_MODE_OLD);
					Logger::log("cache cleaned: ".__METHOD__." line: ".__LINE__, Logger::DEBUG);
				}
				
				self::$_caches[$expire] = $memcache;
			} else {
				self::$_caches[$expire] = false;
			}

		} elseif (!$cacheExists) {
			
			$frontendOptions = array(
				'lifetime' => $lifetime, 
				'automatic_serialization' => true,
//				'automatic_cleaning_factor' => 0,
//				'logging' => false,
				'cache_id_prefix' => Config::get_optional('CACHE_ID_PREFIX')
			);
			
			$backendOptions = array(
				'cache_dir' => sprintf("%s/../%s/", DOCUMENT_ROOT, Config::get_mandatory("CACHE_DIR"))
			);
			
			self::$_caches[$lifetime] = Zend_Cache::factory(
				'Core', 
				'File', 
				$frontendOptions, 
				$backendOptions
			);
			
			self::doClean($options);
		}
		
		return self::$_caches[$lifetime];
		
	}
	
	//let's clean out old entries if they exist
	public static function doClean($opt){
		$num = mt_rand(0,100);
		if( $num==1 ){
			$cache_pool = self::cache_init($opt);	
			$cache_pool->clean(Zend_Cache::CLEANING_MODE_OLD);
			Logger::log("cache cleaned: ".__METHOD__." line: ".__LINE__, Logger::DEBUG);
		}
	}
	
	public static function returnFalse(){
		return false;
	}
	
	/*******************************/
	/* set()		   */
	/*******************************/
	/**
	 * set data in cache to a unique id
	 *
	 * @param int $id
	 * @param object $data
	 *
	 * @return boolean
	*/
	public static function set($id=false, $data=NULL, $options=false){
		if(Config::get_optional("CACHE_ON")){
			if($id && $data!=NULL ){

				$id = self::filterCacheId($id);
								
				$tag = ( isset($options["tag"]) )? $options["tag"]:"site";
				if(!is_array($tag)){
					$tag = array($tag);
				}
				$opt["lifetime"] = ( isset($options["lifetime"]) )? $options["lifetime"]:NULL;
						
				if($data === false){
					$data = "0";
				}
							
				$cache_pool = self::cache_init($opt);
				if($cache_pool){				
					$cache_pool->save($data, $id, $tag);
					
					Logger::log("$id cached: ".__METHOD__, Logger::DEBUG);
					return true;
				}else{
					// should return data of can't set up cache thing
					Logger::log("$id cache_init failed: ".__METHOD__, Logger::WARN);
					return $data;
				}
			}else{
				Logger::log("no id or data supplied: ".__METHOD__, Logger::DEBUG);
				return false;
			}
		}else{
			return true;
		}
	}
	
	/*******************************/
	/* get()		   */
	/*******************************/
	/**
	 * get data from cache for a unique id
	 *
	 *
	 * @return resultset
	*/
	public static function get($id=false){
		if(Config::get_optional("CACHE_ON")){
			if($id){
				$id = self::filterCacheId($id);
				$cache_pool = self::cache_init();
				if($cache_pool){
			
					if($result = $cache_pool->load($id)) {
						Logger::log("$id in cache: ".__METHOD__, Logger::DEBUG);
						$output = $result;
					}else{
						Logger::log("$id not in cache: ".__METHOD__, Logger::DEBUG);
						$output = false;
					}
				}else{
					Logger::log("no cache pool", Logger::DEBUG);
					$output = false;
				}
			}else{
				Logger::log("no id supplied: ".__METHOD__, Logger::DEBUG);
				$output = false;
			}
		}else{
			$output = false;
		}
		return $output;
	}
	


	/*******************************/
	/* clearTag()		   			*/
	/*******************************/
	/**
	 * delete a specific tag from the cache
	 *
	 * @return boolean
	*/
	public static function clearTag($tag=false){
		if($tag){
			
			$tags = ( is_array($tag) )? $tag:array($tag);
			
			$cache_pool = self::cache_init();
			if($cache_pool){
				if($cache_pool->clean(Zend_Cache::CLEANING_MODE_MATCHING_TAG, $tags)){
					Logger::log("$tag tag cache files cleared: ".__METHOD__, Logger::DEBUG);
					return true;
				}else{
					Logger::log("$tag tag cache files NOT cleared: ".__METHOD__, Logger::DEBUG);
					return false;
				}
			}else{
				return false;
			}
		}else{
			Logger::log("No tag supplied: ".__METHOD__, Logger::DEBUG);
			return false;
		}
	}
	
	
	/*******************************/
	/* clearAll()		   			*/
	/*******************************/
	/**
	 * delete everything from the cache
	 *
	 * @return boolean
	*/
	public static function clearAll(){
		$cache_pool = self::cache_init();
		if($cache_pool){
			if($cache_pool->clean(Zend_Cache::CLEANING_MODE_ALL)){
				Logger::log("All cache files cleared: ".__METHOD__, Logger::NOTICE);
				return true;
			}else{
				Logger::log("All cache files NOT cleared: ".__METHOD__, Logger::NOTICE);
				return false;
			}
		}else{
			return false;
		}
	}
	
	/*******************************/
	/* clearId()		   			*/
	/*******************************/
	/**
	 * delete one record from the cache
	 *
	 * @return boolean
	*/
	public static function clearId($id){
		if(Config::get_optional("CACHE_ON")){
			$cache_pool = self::cache_init();
			if( $cache_pool ){
				$id = self::filterCacheId($id);
				if( $cache_pool->remove($id) ){
					Logger::log("$id cache files cleared: ".__METHOD__, Logger::DEBUG);
					return true;
				}else{
					Logger::log("$id cache files NOT cleared: ".__METHOD__, Logger::DEBUG);
					return false;
				}
			}else{
				return false;
			}
		} else {
			return false;
		}
	}
		
	/* create generic cache id and then get or set it */
	public static function checkCache($class, $method, $id, $data=NULL, $params=false) {
		
		if (Config::get_optional("CACHE_ON")){
			
			$cache_id = sprintf('%s_%s_%s', $class, $method, $id);
			
			if( $data===NULL ){
				// we're doing a get
				$output = Cache::get($cache_id);
			}elseif( $data==="clearId" ){
				$output = Cache::clearId($cache_id);
			}else{
				//else set
				$output = Cache::set($cache_id, $data, $params);
			}
		} else {
			$output = false;
		}
		return $output;
	}
	
	private static function filterCacheId($cacheId) {
		$output = preg_replace('/[^a-zA-Z0-9_]/i', '_', $cacheId);
		return $output;
	}

}
