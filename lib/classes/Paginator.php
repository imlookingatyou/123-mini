<?php


Class Paginator {

	public $total;
	public $per_page;
	public $current_page;
	
	/**
	 * 
	 */
	public function __construct($total, $per_page=10, $current_page=false, $exclude_params=array()) {
		$this->total = $total;
		$this->per_page = $per_page;
		$this->current_page = ($current_page)? $current_page:1;
		$this->exclude_params = $exclude_params;
		$this->request_uri = $this->_getURI();
	}
	
	/**
	 * 
	 */
	public function getPager() {
		
		$pager = array(
							'next' => $this->getNextLink(),
							'pages' => $this->getPages(),
							'prev' => $this->getPrevLink(),
							'current' => $this->current_page
						);
		return $pager;
	}
	
	/**
	 * 
	 */
	public function getPages() {

		$num_pages = ceil($this->total / $this->per_page);
		$links = array();
		for ($i=1; $i<=$num_pages; $i++) {
			$links[] = array(
								'url' => $this->_getUri(array('page' => $i)),
								'page' => $i,
							);
		}
		
		return $links;
	}
	
	
	/**
	 * 
	 */
	private function _getURI($add_params=array()) {		
		
		$request = parse_url($_SERVER['REQUEST_URI']);
		
		// build up the querystring
		$query = array();
		if (isset($request['query'])) {			
			parse_str($request['query'], $query);
			
			// build up the querystring and remove some stuff  
			foreach ($query as $k => $v) {			
				if (in_array($k, $this->exclude_params)) {
					unset($query[$k]);
				}			
			}			
		}
		
		$query = array_merge($query, $add_params);
		
		// make sure a '/' is apendded to end otherwise 
		// 'not a framework' complains and can't find the page
		$uri = rtrim($request['path'], '/');
		$uri .= '/';
		
		if (count($query)) {
			$uri .= '?' . http_build_query($query);
		}
		return $uri;		
	} 
	
	
	/**
	 * 
	 */
	public function getNextLink() {
		$link = array();
		
		if (($this->current_page * $this->per_page) < $this->total) {
			
			$link = array(
								'url' => $this->_getUri(array('page' => $this->current_page + 1)),
								'page' => $this->current_page + 1,
							);
			
		}
		
		return $link;
	}
	
	/**
	 * 
	 */
	public function getPrevLink() {
		$link = array();
	
		if ($this->current_page > 1) {
			$link = array(
								'url' => $this->_getUri(array('page' => $this->current_page - 1)),
								'page' => $this->current_page - 1,
							);			
		}
		
		return $link;
	}
	
	
}