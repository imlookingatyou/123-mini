<?php
/*******************************/
/* Site CLASS			       */
/*******************************/
/**
 * This class file builds most of the page structure 
 * and the common page elements for the majority of 
 * fun on the floor pages.
 *
 */
class Site {

	const contentLocation = "/../content/";
	const viewLocation = "/../views/";
	const cssLocation = "/css/";
	const jsLocation = "/js/";

	private $_js = array();
	private $_css = array();
	private $templateLocation = "/../templates/";
	
	public $titleAppend = "";
	public $titleTag = "";
	public $contentObj = false;
	public $startProfile = false;

	public function __construct(){
		date_default_timezone_set(Config::get_mandatory('date_timezone'));
		$this->startProfile = microtime();
	}

	/*******************************/
	/* BUILD PAGE		           */
	/*******************************/
	/**
	 * This _super_function_ combines some of the methods in the
	 * class file to quickly create the 'default' page template
	 *
	 * @param array $pageContent an array of key information that is needed to build the page:
	 * 		"page"				label for the page, used to reference content, css and js files
	 * 		"title"				page title to display in the header
	 * 
	 * @return string
	 */
	public function buildPage( $pageContent=false ){
	
	if(!$pageContent){
		return false;
	}
	
	//set contentObj
	$this->contentObj = $pageContent;
	
	$page = @$pageContent['url'];
	$view = isset($pageContent['view'])? strtolower($pageContent['view']):false;
		
	$this->titleAppend = Config::get_optional("TITLE_PREFIX");
	$this->titleTag = $this->titleAppend.@$pageContent['meta']['title'];
		
	//specific to Sitespecific
	$reglang = strtolower($pageContent['reglang']);
	
	//get view which will in turn build components
	//check if view file exists
		$output = "";		
		if(!$view){
			$v = "default.php";
		}else{
			$v = $view.".php";
		}
		
		$vpath = DOCUMENT_ROOT.self::viewLocation.strtolower($v);
		
		if( file_exists($vpath) ){
			require_once($v);	
		}else{
			error_log("view file doesn't exist: ".__METHOD__." ".__LINE__);
			Site::fnf();
		}
		
		return $output;
	}

	/*************************************************************************************/
	/*************************************************************************************/
	/************** P A G E   C O N T E N T   A N D   S T R U C T U R E ******************/
	/*************************************************************************************/
	/*************************************************************************************/
	
	
	/*******************************/
	/* PAGE VARIABLE	           */
	/*******************************/
	/**
	 * Parses a value to a holder variable in a template file
	 *
	 * @param array $this->contentObj for $this->contentObj['key']
	 * @param string $template for templatefile
	 *
	 * @return string
	*/
	public function pageVariable($filename=false, $docache=false){
		
		$pathPre = DOCUMENT_ROOT.$this->templateLocation;
		
		//if no filename then we're using the templates array
		if( !$filename ){			
			//check the templates array
			if( isset($this->contentObj['templates']) ){
				$filename = $this->contentObj['templates'];
			}else{
				//use 404
				$filename = $this->contentObj['reglang']."/404.html";
			}
		}
		
		//convert $filename to array if it isn't already
		$fileArr = ( is_array($filename) )? $filename:array($filename);
		
		$cacheFilename = is_array($filename) ? implode('_', $filename) : $filename;
		if (!$cacheFilename) {
			$cacheFilename = 'body';
		}
		
		$cacheFilename.= ( !empty($docache["id"]) )? "_".$docache["id"]:"";

		$output = "";

		if ( empty($this->contentObj['nocache']) && $docache==true ) {
			$output = Cache::checkCache(__CLASS__, __FUNCTION__, $this->contentObj['reglang'].'_'.$cacheFilename);
		}
		
		if( !$output ){
		
			$filenameSupplied = true;
			ob_start();
			
			foreach($fileArr as $file){
				//check that there is a .html extension on the end of our template filename
				if(!strstr($file,".html")) $file .= ".html";
				$path = $pathPre.strtolower($file);
				
				//check to see if template exists
				if( !file_exists($path) ){
					header("HTTP/1.0 404 Not Found");
					header("Status: 404 Not Found");		
					$path = $pathPre.strtolower($this->contentObj['reglang']."/404.html");
					error_log("no template file, $file, found: ".__METHOD__." ".__LINE__);
				}
				
				include($path);
				unset($path);
				unset($file);
			}
			
			$output = ob_get_clean();
			if ( empty($this->contentObj['nocache']) && $docache==true && $filenameSupplied ) {
				unset($docache["id"]);
				Cache::checkCache(__CLASS__, __FUNCTION__, $this->contentObj['reglang'].'_'.$cacheFilename, $output, $docache);
			}
			
		}
		
		
		return $output;
	}

	
	/*******************************/
	/* FETCH PAGE CONTENT		   */
	/*******************************/
	/**
	 * Fetch page content from content directory that sits
	 * above the web root 
	 *
	 * @param string $page label for current page
	 *
	 * @return string
	*/
   public function pageContent($page, $reglang){
		
		$path = DOCUMENT_ROOT.self::contentLocation."/$reglang/".strtolower($page);
		$path = str_replace(".html/","/",$path);		
		$output = "";
		
		//check to see if content exists
		if( file_exists($path) ){
			//if it does exist, then start the buffer, get the contents
			ob_start();
			include($path);
			$output = ob_get_clean();
		} else {
			//return 404
			error_log("no content file found, FILE: $page, REGLANG: $reglang - ".__METHOD__." ".__LINE__);
			return Site::fnf(true);
		}
		
		return $output;
   }

	/*******************************/
	/* OPEN TAG				   */
	/*******************************/
	/**
	 * Open a specified element, adding
	 * id and class attributes if required
	 *
	 * @param string $el (div, ul etc)
	 * @param array $attribs e.g. array("id"=>"id","class"=>"class","href"=>"http://...")
	 *
	 * @return string
	*/
   public function openTag($el, $attribs=array(), $closeTag=false){
	
		$output = "\n<" . $el;
		foreach($attribs as $attrib=>$value){
			$output .= sprintf(" %s='%s'",$attrib,$value);
		}
		if($closeTag)
			$output .= " />";
		else 
			$output .= ">";
		
		return $output;
   }

	/********************************/
	/* CLOSE TAG				*/
	/********************************/
	/**
	 * Close a specified element
	 *
	 * @param string $el (div, ul etc)
	 *
	 * @return string
	*/
   public function closeTag($el){
	
		$output = "\n</" . $el . ">\n";		
		return $output;
   }
   
	/********************************/
	/* extraCss				*/
	/********************************/
	/**
	 * outputs extra css link tags
	 * 
	 * @deprecated
	 * @param string $cssArr
	 *
	 * @return string
	*/
	public function extraCss(){
		
		$cssArr = isset( $this->contentObj['cssArr'] )? $this->contentObj['cssArr']:false;
		if($cssArr){			
			//make $cssArr an array if it isn't
			$cssStr = "";
			if( !is_array($cssArr) ){
				$cssArr = array($cssArr);
			}
			
			//loop through and build <link> strings;
			foreach($cssArr as $val){
				//check that there is a .css extension on the end of our css filename
				if(!strstr($val,".css")) $val .= ".css";
			
				$cssStr .= "<link rel='stylesheet' href='".self::cssLocation.$val."' type='text/css' media='screen' />\n";
			}
			return $cssStr;
			
		}else{
			return false;
		}
	}
   
	/**
	 * Adds a CSS file to the site
	 * 
	 * @param string $src
	 */
	public function addCss($src) {
		$this->_css[] = $src;
	}
	
	/**
	 * Returns the site CSS files
	 * 
	 * @return Array of CSS file locations
	 */
	public function getCss() {
		return $this->_css;
	}
	
	/**
	 * Adds a Javascript file to the site
	 * 
	 * @param string $src
	 */
	public function addJs($src) {
		$this->_js[] = $src;
	}
	
	/**
	 * Returns the site Javascript files
	 * 
	 * @return Array of javascript file locations
	 */
	public function getJs() {
		return $this->_js;
	}
	
	/********************************/
	/* extraJs				*/
	/********************************/
	/**
	 * outputs extra js script tags
	 *
	 * @deprecated
	 * @param string $jsArr
	 *
	 * @return string
	*/
	public function extraJs(){
		
		$jsArr = isset( $this->contentObj['jsArr'] )? $this->contentObj['jsArr']:false;
		if($jsArr){			
			//make $jsArr an array if it isn't
			$cssStr = "";
			if( !is_array($jsArr) ){
				$jsArr = array($jsArr);
			}
			
			//loop through and build <link> strings;
			foreach($jsArr as $val){
				//check that there is a .css extension on the end of our css filename
				if(!strstr($val,".js")) $val .= ".js";
			
				$cssStr .= "<script src='".self::jsLocation.$val."' type='text/javascript' />;</script>\n";
			}
			return $cssStr;
			
		}else{
			return false;
		}
   }
  
	
	/*************************************************************************************/
	/*************************************************************************************/
	/************************* U T I L I T I E S *****************************************/
	/*************************************************************************************/
	/*************************************************************************************/
	
	/*******************************/
	/* debug mode				   */
	/*******************************/
	/**
	 * displays debug profiler
	 *
	 * @return string
	*/
	public function debugMode($pageParams=false){
		if( Config::get_mandatory("dev") && isset($_REQUEST['debug']) && $pageParams ){
			
			$endTime = microtime();
			$diffTime = $endTime - $this->startProfile;
			
			$dbugStr = "";
			$dbugStr .= "<div id='debugModule' style='background:#000; color:#fff; font-size:14px; line-height:1.0em; text-align:left;'><pre>".print_r($pageParams,1)."</pre>";
			$dbugStr .= "<p>build-time: ".(float)$diffTime." secs</p>";
			$dbugStr .= "</div>";
			return $dbugStr;
		}
	}


	/*******************************/
	/* IS LIVE SITE?			   */
	/*******************************/
	/**
	 * Checks if we are on the live site
	 *
	 * @return boolean
	*/
	public function isLiveSite($sites){
	
		if( !is_array($sites) ){
			$sites = array($sites);
		}
	
		if( in_array($_SERVER['SERVER_NAME'], $sites) ){
	    	return true;
		} else {
			return false;
		}
	}
	
	/*******************************/
	/* REFERER URI				   */
	/*******************************/
	/**
	 * Returns the referer without the domain
	 *
	 * @return string
	*/
	public function refererUri(){
		$refererURI = false;
		
		if( isset($_SERVER["HTTP_REFERER"]) ){
			$referer = $_SERVER["HTTP_REFERER"];
			$domainName = '[ini_protocol]'.$_SERVER["SERVER_NAME"]."/";
			$refererURI = str_replace( $domainName, "", $referer);
		}
		return $refererURI;
	}
	
	/*******************************/
	/* fileNotFound				   */
	/*******************************/
	/**
	 * Returns fileNotFound headers and includes error page
	 *
	 * @return NONE
	*/
	public function fnf( $reglang=DEFAULT_LANG ){
		header("HTTP/1.0 404 Not Found");
		header("Status: 404 Not Found");		
		$params = array("templates"=>"{$reglang}/404", "reglang"=>$reglang);
		echo self::buildPage($params);
	}


	/*******************************/
	/* isIe6					   */
	/*******************************/
	/**
	 * check is the user is using IE6
	 *
	 *
	 * @return string
	*/
	public function isIe6() {
		$ie = false;
		//if we find ie6 in the user agent, return the ie6
		//path we'd need to insert into urls
		if(strstr(@$_SERVER['HTTP_USER_AGENT'],"MSIE 6.0") && !strstr(@$_SERVER['HTTP_USER_AGENT'],"MSIE 7.0")){
			$ie = true;
		}
		return $ie;
	}


	/*******************************/
	/* DICTIONARY?				   */
	/*******************************/
	/**
	 * loopsthrough dictionary and find any tokens that need replacing
	 *
	 * @param string $f the file contents as a string
	 * @param array $mergeArray, a secondary array of translations that can be added
	 * @return string
	*/
	public function dictionary($f, $mergeArray=false){
		
		$reglang = $this->contentObj['reglang'];
		$dictionary = isset($this->contentObj['dictionary'])? $this->contentObj['dictionary']:false;

		//add defaults to the dictionary
		$dictionary["reglang"] = $reglang;
			
		if ( isset($dictionary) && $dictionary ) {

			//$dictionary["this_server_name"] = THIS_SERVER_NAME;
			//$dictionary["this_ssl_server_name"] = THIS_SSL_SERVER_NAME;
			$dictionary["ini_protocol"] = $this->protocol;
					
			$r = "";
			
			//merge arrays
			if( $mergeArray ){
				$dictionaryF = array();
				$dictionaryF = array_merge($mergeArray, $dictionary);
			}else{
				$dictionaryF = $dictionary;
			}
			
			//loop through content and replace tokens
			foreach($dictionaryF as $token => $val){
			
				$r = str_replace("[$token]", $val, $f );
				$f = $r;
			}

			return $r;
		} else {
			return $f;
		}


	}

	/*******************************/
	/* USE DICTIONARY				   */
	/*******************************/
	/**
	 * gets one value from the array
	 *
	 * @param string $key, the key of the value that we want from the array
	 * @return string
	*/
	public function getDictionaryItem($key) {

		$reglang = $this->contentObj['reglang'];
		$dictionary = isset($this->contentObj['dictionary'])? $this->contentObj['dictionary']:false;
		$dictionary["reglang"] = $reglang;
		
		if ( $dictionary ) {
			if ( array_key_exists($key,$dictionary ) ) {		
				return (string) $dictionary[$key];
			} else {
				return '';
			}
		}else{
			return false;
		}
	}


}