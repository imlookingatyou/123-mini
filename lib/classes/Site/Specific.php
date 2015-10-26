<?php
/*******************************/
/* Sitespecific CLASS			       */
/*******************************/
/**
 * This class file extends the
 * Site class to provide specific
 * functionality for this project
 *
 */


class Site_Specific extends Site {

	protected $protocol;

	public function __construct() {
		$this->protocol = 'http://';
		if (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == "on") {
			 $this->protocol = 'https://';
		}
	}
	
	public function getReglangParams($reglang=false){
		/*
		this can be from a db or a hardcoded array
		
		returns something like the following (all 3 keys are mandatory):
		
		*/
		
		$reglangParams = array(			
			"reglang" => "gb-en",
			"langhtml" => "en",
			"langxml" => "en"
		);
		
		return (array)$reglangParams;
		
	}
	
	// this returns all properties for a specific page
	public function getPageParams($pageId=false, $reglang=false){
	
		/* again this can be hardcorded or db driven
		
		this is a default example
		
		$pagesProps["home"] = array(
			"meta"=>
				array(
					"description" => "value",
					"keywords" => "value",
					"title" => " | value",
				),
			"content" =>
				array(
					"body" => "important!",
					"extras" => array(),
				),
			"view" => "default",
			"templates" => 
				array("home"),
			"nocache" => false,
			"dictionary" =>
				array(
					"token" => "value",
					"token2" => "value2",
				),
		);*/
		
		
		$pageId = urldecode($pageId);
		if(!strstr($pageId,".html") && !strstr($pageId,".php")){
			if(substr($pageId,strlen($pageId)-1,1) == "/"){
				$pageId .= "home.html";
			} else {
				$pageId .= ".html";
			}
		}
		
		//this is a dynamic example
		
		$view = "default";
		switch(1==1){
			case strstr($pageId,"ajax"):
				$view = "empty";
				break;
			case strstr($pageId,"goals/"):
				$pageId = "goal-setup";
				break;
			default:
				$view = "default";
				break;
		}
		
		$pagesProps[$pageId] = array(
			"meta"=>
				array(
					"description" => "value",
					"keywords" => "value",
					"title" => " | value",
				),
			"content" =>
				array(
					"body" => "important!",
					"extras" => array(),
				),
			"view" => $view,
			"templates" => 
				array($pageId),
			"nocache" => false,
			"dictionary" =>
				array(
					"token" => "value",
					"token2" => "value2",
				),
		);
		
		if( $pageId && isset($pagesProps[$pageId]) ){
			
			$pageProps = $pagesProps[$pageId];
			
			return (array)$pageProps;			
		}else{
			return false;
		}

	}


}