<?php

// extend dictionary if necessary
$dictExtend = false;

$f= "";

// init contentObj
$siteExtend = new stdClass();
$siteExtend->contentObj = $pageContent;
if( !isset($this->contentObj['reglang']) ) {
	$this->contentObj['reglang'] = DEFAULT_LANG;
}

// template processing can redirect, so do this before any header output
$template = $this->pageVariable();

$f .= $this->pageVariable("headtag.html");
$f .= $this->pageVariable("openers.html");

/***********************************
	THIS IS THE MAIN CONTENT AREA
************************************/

// use templates array here
$f .= $template;

/******************************
	END MAIN CONTENT AREA
*******************************/

// get footer
$f .= $this->pageVariable("closers.html");
$f .= $this->pageVariable("closers_base.html");

// token replacement
$r = $this->dictionary($f, $dictExtend);
$output .= $r;
