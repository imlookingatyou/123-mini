<?php

//extend dictionary if necessary
$dictExtend = false;

$f= "";

//init contentObj
$siteExtend->contentObj = $pageContent;
if( !isset($this->contentObj['reglang']) ) {
	$this->contentObj['reglang'] = DEFAULT_LANG;
}

$f .= $this->pageVariable();

//token replacement
$r = $this->dictionary($f, $dictExtend);
$output .= $r;

?>