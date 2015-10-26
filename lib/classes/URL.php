<?php

class URL {

	public static function varfromurl($id) {
		if (isset($_REQUEST[$id])) {
			return $_REQUEST[$id];
		} else {
			return false;
		}
	}

}