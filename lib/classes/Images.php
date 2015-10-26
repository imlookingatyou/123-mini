<?php 
class Images {

	// Crops $src so that it fits within the bounding box ($max_w, $max_h).
	// The cropped section is centered.
	
	public static function imageboundingbox($src, &$dst, $max_w, $max_h) {
		
		$dst_w = $max_w;
		$dst_h = $max_h;
	
		if (is_null($dst)) {
			$dst = imagecreatetruecolor($dst_w, $dst_h);
		}
	
		$src_w = imagesx($src);
		$src_h = imagesy($src);
	
		$src_x = ($dst_w < $src_w) ? floor(($src_w - $dst_w) / 2) : 0;
		$src_y = ($dst_h < $src_h) ? floor(($src_h - $dst_h) / 2) : 0;
	
		return imagecopy($dst, $src, 0, 0, $src_x, $src_y, $dst_w, $dst_h);
	}

	
	// Resamples (resizes) $src to a width of at least $min_w, and
	// a height of at least $min_h.  The destination can be either
	// smaller or larger than the source; in all cases the aspect
	// ratio is maintained.  (Set $min_w or $min_h to 0 to resize
	// by height or width.)
	//
	// FIXME We're not especially careful without rounding 
	// pixel values; we're probably going to be wrong by
	// up to one pixel on occasion.
	
	public static function imageresamplemin($src, &$dst, $min_w, $min_h) {
	
		$src_w = imagesx($src);
		$src_h = imagesy($src);
		
		$dst_w = $min_w;
		$dst_h = $min_h;
	
		if ($dst_w < (($src_w / $src_h) * $min_h)) {
			$dst_w = ($src_w / $src_h) * $min_h;
		}
	
		if ($dst_h < (($src_h / $src_w) * $min_w)) {
			$dst_h = ($src_h / $src_w) * $min_w;
		}
	
		if (is_null($dst)) {
			$dst = imagecreatetruecolor($dst_w, $dst_h);
		}
	
		return imagecopyresampled($dst, $src, 0, 0, 0, 0, $dst_w, $dst_h, $src_w, $src_h);
	}

	
	// Resamples (resizes) $src to a maximum width of $max_w, and
	// a maximum height of $max_h.  (The aspect ratio is maintained.)
	// If $dst is null, it's created with a black background. 
	//
	// To set the background to some other color, do something like
	//
	//   $dst_image = imagecreatetruecolor($WIDTH, $HEIGHT);
	//	 $white = imagecolorallocate($dst_image, 255, 255, 255);
	//	 imagefill($dst_image, 0, 0, $white);
	//	 imageresamplemax($src_image, $dst_image, $WIDTH, $HEIGHT);
	//
	// FIXME We're not especially careful without rounding 
	// pixel values; we're probably going to be wrong by
	// up to one pixel on occasion.

	public static function  imageresamplemax($src, &$dst, $max_w, $max_h) {
	
		$src_w = imagesx($src);
		$src_h = imagesy($src);
		
		$dst_w = $max_w;
		$dst_h = $max_h;
	
		if ($dst_w > (($src_w / $src_h) * $max_h)) {
			$dst_w = ($src_w / $src_h) * $max_h;
		}
	
		if ($dst_h > (($src_h / $src_w) * $max_w)) {
			$dst_h = ($src_h / $src_w) * $max_w;
		}
	
		if (is_null($dst)) {
			$dst = imagecreatetruecolor($dst_w, $dst_h);
		}
		
		$off_x = floor($max_w - $dst_w) / 2;
		$off_y = floor($max_h - $dst_h) / 2;
		
		return imagecopyresampled($dst, $src, $off_x, $off_y, 0, 0, $dst_w, $dst_h, $src_w, $src_h);
	}

	
	// Makes sure that $dir exists (i.e. if it doesn't exist already, it will be
	// created), or exits.  (i.e. handles own errors.)
	
	public static function  imagemkdir($dir) {
		if (!is_dir($dir)) {
		    if (mkdir($dir)) {
				error_log("warning: created image directory " . realpath($dir));
		    }
		    else {
				error_log("warning: could not create image directory " . $dir);
				header("HTTP/1.0 500 Internal Server Error");
				exit;
		    }
		}
		
		return true;
	}

	
	// Loads image.  Either returns image object, or exits.  (i.e.
	// handles own errors.)
	
	public static function  imageload($filename) {
		
		$img = @imagecreatefromjpeg($filename);
		
		if (!$img) {
			$img = @imagecreatefromgif($filename);
			if(!$img) {
				$img = @imagecreatefrompng($filename);
				if(!$img) {
					$img = @imagecreatefromgif("missingimage/preview_not_available.gif");
				}
			}
		}
		
		if (!$img) {
			error_log("warning: couldn't read $filename");
		    header("HTTP/1.0 500 Internal Server Error");
		    exit;
		}
		
		return $img;
	}

	
	// Saves image.  Either returns, or exits.  (i.e. handles
	// own errors.)
	
	public static function  imagesave($img, $filename, $quality = 85) {
		@imagejpeg($img, $filename, $quality);
	
		if (!file_exists($filename)) {
			error_log("warning: couldn't write to " . $filename);
			header("HTTP/1.0 500 Internal Server Error");
			exit;
		}
		
		return true;
	}

	public static function  imageredirect($filename) {
		$url = substr(realpath($filename), strlen(realpath($_SERVER["DOCUMENT_ROOT"])));
		$url = str_replace("\\", "/", $url); // switch slashes around
		header("Location: $url");
		exit;
	}
	
	public static function imgRotateJpg($dir='') {
		
		$slash="";
		if($dir){$slash="/";}

		$dir = "images/".$dir.$slash;
	
		$dh = opendir($dir);
		while (false !== ($filename = readdir($dh))){
			$files[] = $filename;
		}

		do{
			$num = rand(1, count($files)-1);
			if($files[$num]){			
				$dotPos = strrpos($files[$num], ".");	
				$thisFileType = strtolower(substr($files[$num], $dotPos+1));
			}else{
				$thisFileType = "";
			}
			
		} while ($thisFileType!="jpg");
		
		$pos = strpos($files[$num], ".");		
		$imageString = $dir.substr($files[$num],0,$pos).".jpg";

		return $imageString;
	
	}
	
}