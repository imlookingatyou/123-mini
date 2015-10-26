<?php

class Fb {
	
	private $values = array();
	
	const IFRAME = 1;
	const FBML   = 2;
	
	function __set($id,$value){
		$this->values[$id] = $value;
	}

	function __get($id){
		if(array_key_exists($id,$this->values)){
			return $this->values[$id];
		} else {
			Logger::log("Variable does not exist: ".__METHOD__." :: ".$id);
			return false;
		}
	}
	
	function __construct(){
		
		$this->values = array("fb_app_id"=>"",
							"fb_canvas_page"=>"",
							"fb_api_key"=>"",
							"fb_app_secret"=>"",
							"redirect_uri"=>"",
							"code"=>"",
							"scope"=>"",
							"access_token"=>"",
							"fb_secret"=>"",
							);
		
		if(Config::get_mandatory("fb_app_id")){
			$this->fb_app_id = Config::get_mandatory("fb_app_id");  
		}
		if(Config::get_mandatory("fb_canvas_page")){
			$this->fb_canvas_page = Config::get_mandatory("fb_canvas_page");  
		}
		if(Config::get_mandatory("fb_api_key")){
			$this->fb_api_key = Config::get_mandatory("fb_api_key");  
		}
		if(Config::get_mandatory("fb_secret")){
			$this->fb_secret = Config::get_mandatory("fb_secret");  
		}
		if(Config::get_mandatory("fb_secret")){
			$this->fb_app_secret = Config::get_mandatory("fb_secret");  
		}
		
		return $this;
		
	}
	
	//return a facebook like button
	/*
	function likeButton(){
		$output = '<iframe frameborder="0" width="90" height="20" src="http://www.facebook.com/widgets/like.php?locale=en_GB&href='.$this->fb_canvas_page.'&layout=button_count"></iframe>';
		return $output;
	}
	*/
	
	public function likeButton($method=Fb::IFRAME, $href="", $show_faces=false, $width=373, $height=35, $action="like", $font="arial", $colorscheme="light") {
		
		$output = "";
		
		$show_faces = (string)$show_faces;
		
		if (empty($href)) {
			$href = '[ini_protocol]'.SERVER_NAME.$_SERVER['PHP_SELF'];
		}
		
		switch ($method) {
			case Fb::IFRAME:
				$output = sprintf(
					"<iframe src='[ini_protocol]www.facebook.com/plugins/like.php?href=%s&amp;&amp;layout=standard&amp;show_faces=%s&amp;width=%d&amp;action=%s&amp;font=%s&amp;colorscheme=%s&amp;height=%s' scrolling='no' frameborder='0' style='border:none; overflow:hidden; width:%dpx; height:%dpx;' allowTransparency='true'></iframe>",
					Sanitise::html($href),
					Sanitise::html($show_faces),
					(int)$width,
					Sanitise::html($action),
					Sanitise::html($font),
					Sanitise::html($colorscheme),
					(int)$height,
					(int)$width,
					(int)$height
				);
				break;
			case Fb::FBML:
				$output = sprintf(
					"<script src='[ini_protocol]connect.facebook.net/en_US/all.js#xfbml=1'></script><fb:like href='%s' show_faces='%s' width='%s' font='%s'></fb:like>",
					urlencode($href),
					urlencode($show_faces),
					urlencode($width),
					urlencode($font)
				);
				break;
			default:
				Logger::log('Invalid $method ('.$method.') passed to Fb::likeButton', Logger::ALERT);
				break;
		}
		
		return $output;
	}
	
	//return a facebook "invite your friends" box
	function inviteFriendBox($inviteAppName='Competition Application',$inviteContent='Come and join this application',$inviteActionText='Please come and join this application, it is great!',$inviteLabel='View the application',$inviteRows=3,$inviteCols=3,$actionUrl="",$width="",$styles=""){
				

	$output = '<fb:serverfbml width="'.$width.'" style="'.$styles.'">
		<script type="text/fbml">
			<fb:request-form action="'.$this->fb_canvas_page.$actionUrl.'"
			method="POST" invite="true"
			type="'.$inviteAppName.'"
			content="'.$inviteContent.' '.htmlentities("<fb:req-choice url=\"'.$this->fb_canvas_page.'\" label=\"'.$inviteLabel.'\"").'">
				<fb:multi-friend-selector showborder="false"
				actiontext="'.$inviteActionText.'"
				rows="'.$inviteRows.'" cols="'.$inviteCols.'"/>
			</fb:request-form>
	</script>
	</fb:serverfbml>';
	
					
		return $output;
	}
	
	//return an iframe
	function iframe($url="upload.php",$queryString="",$height="800",$width="100%"){
		$output = '<iframe width="'.$width.'" src="[ini_protocol]' . $_SERVER['HTTP_HOST'] . '/'.$url.$queryString.'" frameborder="0" scrolling="no" height="'.$height.'" smartsize="true">
</iframe>';
		return $output;
	}
	
	/*
	function comments($numposts=4,$title="Comments",$xid="invite.html",$simple=1,$css=""){
		if($css != ""){
			$css .= "?" . strtotime("now");
		}
		$output = sprintf("<fb:comments numposts='%s' title='%s' xid='%s' simple='%s' css='%s'></fb:comments>",$numposts,$title,$xid,$simple,$css);
		return $output;
	}
	*/
	
	public function comments($href="", $num_posts=10, $width=373){
		if (empty($href)) {
			$href = '[ini_protocol]'.SERVER_NAME.$_SERVER['PHP_SELF'];
		}
		$output = sprintf(
			"<div id='fb-root'></div>
			<script src='[ini_protocol]connect.facebook.net/en_US/all.js#appId=137394133000677&amp;xfbml=1'></script>
			<fb:comments href='%s' num_posts='%d' width='%d'></fb:comments>",
			Sanitise::html($href),
			(int)$num_posts,
			(int)$width
		);
		return $output;
	}
	
	function jsSdk(){
		
		$output = "<div id='fb-root'></div>
					<script>
						window.fbAsyncInit = function() {
							FB.init({appId: '[APP_ID]', status: true, cookie: true,
							xfbml: true});
							};
						(function() {
							var e = document.createElement('script'); e.async = true;
							e.src = document.location.protocol +
							'//connect.facebook.net/en_US/all.js';
							document.getElementById('fb-root').appendChild(e);
						}());
					</script>";
		return $output;
	}
	
	//get the access url for getting an access token
	function getAccessUrl($queryString="",$url=""){
		$accessUrl = "https://graph.facebook.com/oauth/access_token?";
		$accessUrl .= "client_id=". $this->fb_app_id;
		
		//to get an access token, the redirect_uri has to be exactly the same as that
		//used when the authorization was made
		$redirectUri = $this->fb_canvas_page . $url;
		$queryString = str_replace("code=" . $this->code,"",urldecode($queryString));
		if($queryString != ""){
			$redirectUri .= "?" . $queryString;
		}
		$this->redirect_uri = $redirectUri;
		$accessUrl .= "&redirect_uri=".$redirectUri;
		$accessUrl .= "&client_secret=".$this->fb_secret;
		$accessUrl .= "&code=".$this->code;
		//var_dump($accessUrl);
		//exit;
		return $accessUrl;
	}
	
	//get the authorisation url to push users through
	function getAuthUrl($queryString="",$page=""){
		$authUrl = "[ini_protocol]graph.facebook.com/oauth/authorize?";
		$authUrl .= "client_id=".$this->fb_api_key;
		$redirectUri = $this->fb_canvas_page . $page;
		if($queryString != ""){
			$redirectUri .= "?" . $queryString;
		}
		$this->redirect_uri = $redirectUri;
		$authUrl .= "&redirect_uri=".$redirectUri;
		if($this->scope){
			$authUrl .= "&scope=".$this->scope;
		}
		//var_dump($authUrl);
		//exit;
		return $authUrl;
	}
	
	//get array for a feed with id $id and of type $type
	function getDetails($type="page",$id=""){
		if($id != ""){
			if($this->access_token){
				$me = file_get_contents("https://graph.facebook.com/$id/feed?".$this->access_token);
				$me = json_decode($me);
				return $me;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
	
	//get the access token from the accessurl
	function getAccessToken($queryString="",$type="fbml",$url=""){
		$accessUrl = $this->getAccessUrl($queryString,$url);
		//var_dump($accessUrl);
		//exit;
		$response = @file_get_contents($accessUrl);
		if(!$response){
			switch($type){
				case "fbml":
					//do an fbml redirect if user hasn't got a valid key
					echo "<fb:redirect url='".$this->getAuthUrl($queryString,$url)."' />";
					break;
				case "iframe":
				default:
					//do a php redirect if user hasn't got a valid key
					//var_dump($this->getAuthUrl($queryString,$url));
					//header("Location:" . $this->getAuthUrl($queryString,$url));
					echo "<script type='text/javascript'>window.top.location = '" . $this->getAuthUrl($queryString,$url) . "';</script>";
					break;
			}
			exit;
		} else {
			//access token is returned in format access_token=XYZ so we can pass
			//it straight into query strings later where required
			list($accessToken,$expires) = explode("&",$response);
			$this->access_token = $accessToken;
			return $accessToken;
		}
	}
	
	//get a user's details
	function getUserDetails($id="me"){
		//var_dump($this->access_token);
		if($this->access_token){
			$me = file_get_contents("https://graph.facebook.com/$id?".$this->access_token);
			$me = json_decode($me);
			//var_dump($me);
			return $me;
		} else {
			return false;
		}
	}
	
	//delete something from a page
	function deleteAnItem($id=""){
		if($id){
			$xPost = $this->access_token;
			
			$ch = curl_init("https://graph.facebook.com/$id?method=delete");
	
			//make sure VERBOSE is off, otherwise it spams the server logs
			curl_setopt($ch, CURLOPT_VERBOSE, 0); 
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
			curl_setopt($ch, CURLOPT_HEADER, 1); 
			curl_setopt($ch, CURLOPT_TIMEOUT, 120);
			curl_setopt($ch, CURLOPT_POST, 1); 
			curl_setopt($ch, CURLOPT_POSTFIELDS, $xPost); 
			curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 1); 
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0); 
			curl_setopt($ch, CURLOPT_CAINFO, NULL);
			curl_setopt($ch, CURLOPT_CAPATH, NULL); 
			curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 0); 
		
			$result = curl_exec($ch);
			
			return $result;
		} else {
			return false;
		}
	}
	
	//make a post to the wall of user with id $id 
	function postToWall($post=array()){
		
		if(!array_key_exists("name",$post)){
			$post["name"] = "";
		}
		
		if(!array_key_exists("id",$post)){
			$post["id"] = "me";
		}
		
		if(!array_key_exists("caption",$post)){
			$post["caption"] = "";
		}
		
		if(!array_key_exists("message",$post)){
			$post["message"] = "";
		}
		
		if(!array_key_exists("description",$post)){
			$post["description"] = "";
		}
		
		if(!array_key_exists("picture",$post)){
			$post["picture"] = "";
		}
		
		if(!array_key_exists("link",$post)){
			$post["link"] = "";
		}
		
		/* REFERENCE TO LAYOUT FOR POST TO WALL
		//the link text and title that appears below message but above caption and description 
		$name = "Coral Ask A Pro";
		
		//caption appears under name, and is required so we don't see the url of the server (canvas url)
		$caption = "Join in the Dugout banter";
		
		//message is what appears next to the user's name, in larger darker text e.g. Lee Stillwell just asked legend, Terry Butcher, a question in the Coral Dugout 
		$message = "just asked football legend, " . $talent['name'] . ", a question in the Coral Dugout.";
		
		//what appears underneath the caption, is the main body of your wall post
		$description = "Ask your own question, or vote for other questions that you'd like answered. In the Dugout, football fans are putting their burning questions to some of the sport's great names. Join UK football legends, Terry Butcher, Martin Peters and Graham Poll, as they share their hot tips for South Africa 2010.";
		
		//picture that appears to the left hand side of the post. If you are going to add a picture, make it an absolute url, pointing to the server not the app
		$picture = "[ini_protocol]".$_SERVER['HTTP_HOST']."/img/logo-ask_a_pro.jpg";
		
		//the link url that appears in the post. Unless you are sharing a link to something other than your app, this should be the app url
		$link = "[ini_protocol]apps.facebook.com/coral-ask-a-pro/
		*/
		
		$xPost = $this->access_token . "&message=" . urlencode($post["message"]) . "&picture=" . urlencode($post["picture"]) . "&link=" . urlencode($post["link"]). "&caption=" . urlencode($post["caption"]) . "&description=" . urlencode($post["description"]) . "&name=" . urlencode($post["name"]);
		//since you can only post to the current user's wall, me is acceptable
		$ch = curl_init("https://graph.facebook.com/".$post["id"]."/feed");

		//make sure VERBOSE is off, otherwise it spams the server logs
		curl_setopt($ch, CURLOPT_VERBOSE, 0); 
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
		curl_setopt($ch, CURLOPT_HEADER, 1); 
		curl_setopt($ch, CURLOPT_TIMEOUT, 120);
		curl_setopt($ch, CURLOPT_POST, 1); 
		curl_setopt($ch, CURLOPT_POSTFIELDS, $xPost); 
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 1); 
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0); 
		curl_setopt($ch, CURLOPT_CAINFO, NULL);
		curl_setopt($ch, CURLOPT_CAPATH, NULL); 
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 0); 
	
		$result = curl_exec($ch);
	//	Logger::log($result);
	//	Logger::log($this->access_token);	
		return $result;
	}
	
	/**
	 * return an fbml youtube video string
	 * 
	 * @param $url
	 * @return string
	 */
	function embedYoutube($url){
		$output = "";
		$url = Sanitise::Html($url);
		if($url){
			$video = str_replace("watch?v=","v/",$url);
			$output = sprintf("<fb:swf swfbgcolor='000000' imgstyle='border-width:3px; border-color:white;' swfsrc='%s&amp;autoplay=1' imgsrc='%s' width='425' height='344'/>",$video,$video);
		}
		return $output;
	}
	
	function sharePage($url,$title,$text) {
		
		$output = '<a href="[ini_protocol]www.facebook.com/sharer.php?u='.$url.'&amp;t='.urlencode($title).'" target="_blank" class="sharelink">'.$text.'</a>';
		return $output;

		
	}
	
	function appLoginButton() {

	}
	
	function saveSignedRequest() {
		
		$signed_request = $_POST['signed_request'];
		$secret = Config::get_mandatory('fb_secret');
		
		list($encoded_sig, $payload) = explode('.', $signed_request, 2);
	
		// decode the data
		$sig = Fb::base64_url_decode($encoded_sig);
		$data = json_decode(Fb::base64_url_decode($payload), true);
	
		if (strtoupper($data['algorithm']) !== 'HMAC-SHA256') {
			error_log('Unknown algorithm. Expected HMAC-SHA256');
			return null;
		}
	
		// check sig
		$expected_sig = hash_hmac('sha256', $payload, $secret, $raw = true);
		if ($sig !== $expected_sig) {
			error_log('Bad Signed JSON signature!');
			return null;
		}
		
		// save to session, so we have it throughout app
		$_SESSION['signed_request'] = $data;
	
		return $data;
	}
	
	function base64_url_decode($input) {
		return base64_decode(strtr($input, '-_', '+/'));
	}
	
	public function pageIsLiked() {
	  $output = false;
	  $request = @$_REQUEST["signed_request"];
	  if (!empty($request)) {
	    list($encoded_sig, $load) = explode('.', $request, 2);
	    $fbData = json_decode(base64_decode(strtr($load, '-_', '+/')), true);
	    if (!empty($fbData["page"]["liked"])) {
	      $output = true;
  	  }
	  }
	  return $output;
	}
	
	
	
}
