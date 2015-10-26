<?php 

if (isset($_GET['file'])) { $srcfilename = $_GET['file']; } else { die; }

$HEIGHT = 150;
$WIDTH = 150;
$DSTDIR = "generated/thumbs/";

$dstfilename = $DSTDIR.basename($filename);

if (file_exists($dstfilename)) {
   	Images::imageredirect($dstfilename);
} else {
   	$srcimg = Images::imageload($srcfilename);

	if (imagesy($srcimg) > imagesx($srcimg)) {
	#portrait image
		if (imagesy($srcimg) > $HEIGHT) {
			Images::imageresamplemin($srcimg, $dstimg, 0, $HEIGHT);
		} else {
			$dstimg = Images::imageload($srcfilename);
		}
	} elseif (imagesy($srcimg) < imagesx($srcimg)) {
	#landscape image
		if (imagesx($srcimg) > $WIDTH) {
			Images::imageresamplemin($srcimg, $dstimg, $WIDTH, 0);
		} else {
			$dstimg = Images::imageload($srcfilename);
		}
	} else {
		Images::imageresamplemin($srcimg, $dstimg, $WIDTH, 0);
	}

	Images::imagesave($dstimg, $dstfilename, 80);
	Images::imageredirect($dstfilename);

}
?>