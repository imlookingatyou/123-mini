<?php

/**
 * 
 * @author anthony galvin
 * Two tracking codes - one that does the client side code
 * the other does the server side tracking (which is quite clever) 
 */

Class Tracking {
	
		public function buildGoogleAnalyticsString($trackingID){
			return '
			<script type="text/javascript">
			var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
			document.write(unescape("%3Cscript src=\'" + gaJsHost + "google-analytics.com/ga.js\' type=\'text/javascript\'%3E%3C/script%3E"));
			</script>
			<script type="text/javascript">
			var pageTracker = _gat._getTracker("'.$trackingID.'");
			pageTracker._initData();
			pageTracker._trackPageview();
			</script>';
		}
			
		public function serverSideGoogleAnalytics(){
				$var_utmac	=	Config::get_mandatory('googleAnalyticsID'); //enter the new urchin code
				$var_utmhn	=	$_SERVER['HTTP_HOST']; //enter your domain
				$var_utmn	=	rand(1000000000,9999999999);//random request number
				$var_cookie	=	rand(10000000,99999999);//random cookie number
				$var_random	=	rand(1000000000,2147483647); //number under 2147483647
				$var_today	=	time(); //today
				$var_referer=	@$_SERVER['HTTP_REFERER']; //referer url
		
				if(ArtemisUtilities::loggedInIFAUser()){ //if session is set then we can get the user id - else send anonymous
					$var_uservar = ArtemisUtilities::loggedInIFAUser();
				} else {
					$var_uservar = "anonymous";
				}
		
				$var_utmp	=	'[ini_protocol]'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
				$urchinUrl	=	'[ini_protocol]www.google-analytics.com/__utm.gif?utmwv=1&utmn='.$var_utmn.'&utmsr=-&utmsc=-&utmul=-&utmje=0&utmfl=-&utmdt=-&utmhn='.$var_utmhn.'&utmr='.$var_referer.'&utmp='.$var_utmp.'&utmac='.$var_utmac.'&utmcc=__utma%3D'.$var_cookie.'.'.$var_random.'.'.$var_today.'.'.$var_today.'.'.$var_today.'.2%3B%2B__utmb%3D'.$var_cookie.'%3B%2B__utmc%3D'.$var_cookie.'%3B%2B__utmz%3D'.$var_cookie.'.'.$var_today.'.2.2.utmccn%3D(direct)%7Cutmcsr%3D(direct)%7Cutmcmd%3D(none)%3B%2B__utmv%3D'.$var_cookie.'.'.$var_uservar.'%3B';
				$handle 	=	fopen ($urchinUrl, "r");
				$test 		= 	fgets($handle);
				fclose($handle);
		
				return true;
		}
}