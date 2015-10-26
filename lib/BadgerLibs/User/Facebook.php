<?php

/**
 * Our Facebook User class - it has a load of properties here ripped directly from
 * http://developers.facebook.com/docs/reference/api/user/, many of which we may not 
 * currently use but have been included for consistency and scalability
 * 
 * @author Stuart McAlpine
 *
 */
class BadgerLibs_User_Facebook extends BadgerLibs_User {

	/**
	 * The user access token
	 * 
	 * @param String
	 */
	private $access_token;
	
	/**
	 * The user's Facebook ID
	 * [Permissions: No access_token required]
	 * 
	 * @param String
	 */
	public $id;
	
	/**
	 * The user's full name
	 * [Permissions: No access_token required]
	 * 
	 * @param String
	 */
	public $name;
	
	/**
	 * The user's first name
	 * [Permissions: No access_token required]
	 * 
	 * @param String
	 */
	public $first_name;
	
	/**
	 * The user's middle name
	 * [Permissions: No access_token required]
	 * 
	 * @param String
	 */
	public $middle_name;
	
	/**
	 * The user's last name
	 * [Permissions: No access_token required]
	 * 
	 * @param String
	 */
	public $last_name;
	
	/**
	 * The user's gender: female or male
	 * [Permissions: No access_token required]
	 * 
	 * @param String
	 */
	public $gender;
	
	/**
	 * The user's locale
	 * [Permissions: No access_token required
	 * 
	 * @param String containing the ISO Language Code and ISO Country Code]
	 */
	public $locale;
	
	/**
	 * The user's languages
	 * [Permissions: user_likes]
	 * 
	 * @param Array of objects containing language id and name
	 */
	public $languages;
	
	/**
	 * The URL of the profile for the user on Facebook
	 * [Permissions: No access_token required]
	 * 
	 * @param String containing a valid URL
	 */
	public $link;
	
	/**
	 * The user's Facebook username
	 * [Permissions: No access_token required]
	 * 
	 * @param String
	 */
	public $username;
	
	/**
	 * An anonymous, but unique identifier for the user; only returned if specifically requested via the fields URL parameter
	 * [Permissions: Requires access_token]
	 * 
	 * @param String
	 */
	public $third_party_id;
	
	/**
	 * The user's timezone offset from UTC
	 * [Permissions: Available only for the current user]
	 * 
	 * @param Number
	 */
	public $timezone;
	
	/**
	 * The last time the user's profile was updated; changes to the languages, link, timezone, verified, interested_in, favorite_athletes, favorite_teams, and video_upload_limits are not not reflected in this value
	 * [Permissions: Requires access_token]
	 * 
	 * @param String containing a IETF RFC 3339 datetime
	 */
	public $updated_time;
	
	/**
	 * The user's account verification status, either true or false (see below)
	 * [Permissions: Requires access_token]
	 * 
	 * @param Boolean
	 */
	public $verified;
	
	/**
	 * The user's biography
	 * [Permissions: user_about_me or friends_about_me]
	 * 
	 * @param String
	 */
	public $bio;
	
	/**
	 * The user's birthday
	 * [Permissions: user_birthday or friends_birthday]
	 * 
	 * @param Date string in MM/DD/YYYY format
	 */
	public $birthday;
	
	/**
	 * A list of the user's education history
	 * [Permissions: user_education_history or friends_education_history]
	 * 
	 * @param Array of objects containing year and type fields, and school object (name, id, type, and optional year, degree, concentration array, classes array, and with array )
	 */
	public $education;
	
	/**
	 * The proxied or contact email address granted by the user
	 * [Permissions: email]
	 * 
	 * @param String containing a valid RFC822 email address
	 */
	public $email;
	
	/**
	 * The user's hometown
	 * [Permissions: user_hometown or friends_hometown]
	 * 
	 * @param Object containing name and id
	 */
	public $hometown;
	
	/**
	 * The genders the user is interested in
	 * [Permissions: user_relationship_details or friends_relationship_details]
	 * 
	 * @param Array containing strings
	 */
	public $interested_in;
	
	/**
	 * The user's current city
	 * [Permissions: user_location or friends_location]
	 * 
	 * @param Object containing name and id
	 */
	public $location;
	
	/**
	 * The user's political view
	 * [Permissions: user_religion_politics or friends_religion_politics]
	 * 
	 * @param String
	 */
	public $political;
	
	/**
	 * The user's favorite athletes; this field is deprecated and will be removed in the near future
	 * [Permissions: user_likes or friends_likes]
	 * 
	 * @param Array of objects containing id and name fields
	 */
	public $favorite_athletes;
	
	/**
	 * The user's favorite teams; this field is deprecated and will be removed in the near future
	 * [Permissions: user_likes or friends_likes]
	 * 
	 * @param Array of objects containing id and name fields
	 */
	public $favorite_teams;
	
	/**
	 * The user's favorite quotes
	 * [Permissions: user_about_me or friends_about_me]
	 * 
	 * @param String
	 */
	public $quotes;
	
	/**
	 * The user's relationship status: Single, In a relationship, Engaged, Married, It's complicated, In an open relationship, Widowed, Separated, Divorced, In a civil union, In a domestic partnership
	 * [Permissions: user_relationships or friends_relationships]
	 * 
	 * @param String
	 */
	public $relationship_status;
	
	/**
	 * The user's religion
	 * [Permissions: user_religion_politics or friends_religion_politics]
	 * 
	 * @param String
	 */
	public $religion;
	
	/**
	 * The user's significant other
	 * [Permissions: user_relationship_details or friends_relationship_details]
	 * 
	 * @param Object containing name and id
	 */
	public $significant_other;
	
	/**
	 * The size of the video file and the length of the video that a user can upload; only returned if specifically requested via the fields URL parameter
	 * [Permissions: Requires access_token]
	 * 
	 * @param Object containing length and size of video
	 */
	public $video_upload_limits;
	
	/**
	 * The URL of the user's personal website
	 * [Permissions: user_website or friends_website]
	 * 
	 * @param String containing a valid URL
	 */
	public $website;
	
	/**
	 * A list of the user's work history
	 * [Permissions: user_work_history or friends_work_history]
	 * 
	 * @param Array of objects containing employer, location, position, start_date and end_date fields
	 */
	public $work;
	
	/**
	 * A list of the user's work history
	 * [Permissions: user_work_history or friends_work_history]
	 * 
	 * @param Array of objects containing friend name and friend ID
	 */
	public $friends;
	
	public function __construct($options=array()) {

		parent::__construct($options);
		
			// Inject Facebook Application into user object
		if (empty($options['facebook'])) {
		  throw new Exception('A Facebook user requires a valid Facebook Application object');
		} else {
		  $this->facebook = $options['facebook'];
		}
		
		// get access_token from options, session or ini file (for testing)
		$ini_fb_access_token = Config::get_optional('fb_access_token');
		if (!empty($ini_fb_access_token)) {
			$this->setAccessToken($ini_fb_access_token);
		} elseif (!empty($options['access_token'])) {
			$this->setAccessToken($options['access_token']);
		} elseif (!empty($_SESSION['access_token'])) {
			$this->setAccessToken($_SESSION['access_token']);
		}
		
		// request permissions if required
		if (empty($this->access_token) && !empty($options['auth'])) {
			Config::get_mandatory('fb_permissions');
		}
		
		// populate user
// 		$this->getUser();
		
		// populate friends, if required
		if (!empty($options['friends'])) {
// 			$this->friends = $this->getFriends();
		}
		
	}
	

	/**
	 * Returns the currently logged-in users' friends from the Facebook Graph API
	 * 
	 * @return Array of objects containing friend name and friend ID
	 */
	public function getFriends() {
		$output = array();
// 		$url = sprintf('https://graph.facebook.com/me/friends?access_token=%s', $this->getAccessToken());
// 		$response = $this->getHttpResponse($url);
// 		$response = json_decode($response);
// 		$output = $response->data;
		try {
			// Proceed knowing you have a logged in user who's authenticated.
			$friends = $this->facebook->api('/me/friends');
			$output = $friends['data'];
		} catch (FacebookApiException $e) {
			Logger::log($e->getMessage(), Logger::DEBUG);
			$output = null;
		}
		return $output;
	}
	

	/**
	 * Get the access token from the session or the $_GET params
	 * 
	 * @return string|boolean Access token or false
	 */
	public function getAccessToken() {
		$output = $this->access_token;
		return $output;
	}
	
	/**
	 * Set the access token
	 * 
	 * @return object|boolean BadgerLibs_User_Facebook or false
	 */
	public function setAccessToken($access_token) {
		$output = false;
		if (empty($access_token)) {
			throw new Exception('Access token cannot be empty');
		}
		$this->access_token = $access_token;
		$_SESSION['acess_token'] = $access_token;
		return $this;
	}
	
	public function auth($options=array()) {

	  $output = false;
	  
	  // Get User ID
	  $user = $this->facebook->getUser();
	  
	  // set redirect uri
	  $redirect_uri = Config::get_mandatory('fb_canvas_page');
	  if (!empty($options['redirect_uri'])) {
	  	$redirect_uri = $options['redirect_uri'];
	  }
	  
	  // set next uri
	  $next = Config::get_mandatory('fb_canvas_page');
	  if (!empty($options['next'])) {
	  	$next = $options['next'];
	  }
	  
	  // set cancel uri
	  $cancel_uri = Config::get_mandatory('fb_canvas_page');
	  if (!empty($options['cancel_uri'])) {
	  	$cancel_uri = $options['cancel_uri'];
	  }
	  
// 	  var_dump($user);
	  
	  // We may or may not have this data based on whether the user is logged in.
	  //
	  // If we have a $user id here, it means we know the user is logged into
	  // Facebook, but we don't know if the access token is valid. An access
	  // token is invalid if the user logged out of Facebook.
	  if ($user) {
	    try {
	      // Proceed knowing you have a logged in user who's authenticated.
	      $profile = $this->facebook->api('/me');
	    } catch (FacebookApiException $e) {
	      Logger::log($e->getMessage(), Logger::DEBUG);
	      $profile = null;
	    }
	  }
	  
// 	  var_dump($output);
	  
	  // if we have no user with access token then redirect to login/permissions grant
	  if (empty($profile)) {
	    $url = $this->facebook->getLoginUrl(array(
	    	'canvas' => 1,
        	'fbconnect' => 0,
        	'scope' => Config::get_mandatory('fb_scope'),
	    	'redirect_uri' => $redirect_uri,
	    	'next' => $next,
	    	'cancel_url' => $cancel_uri
      	));
	    // we need to do a js redirect as facebook uses iframes
	    // @todo figure out how to redirect server-side instead of using js for fb auth (impossible?)
	    printf('<script>top.location.href="%s"</script>', $url);
	    echo '<noscript><h1>Error</h1><p>Your web browser must have Javascript enabled to use this application.</p></noscript>';
	    die;
	  }
	  
	  $this->populate($profile);
	  return $this;
	}
	
	protected function populate($user) {
	  if (!empty($user) && is_array($user)) {
  	  foreach ($user as $key => $val) {
  	    if (property_exists($this, $key)) {
  	      $this->$key = $val;
  	    }
  	  }
	  }
	}
	
}
