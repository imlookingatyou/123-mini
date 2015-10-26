require.config({
    // relative url from where modules will load
    baseUrl: "/js/modules",
    // any libraries used should be referenced here.
    paths: {
        "jquery" : "/js/libs/jquery.min",
        "jqueryui" : "/js/libs/jquery-ui.min",
        "jquery-scrollTo": "/js/libs/jquery-scrollto",
        "historyjs": "/js/libs/jquery.history",
        "ajaxify": "/js/libs/ajaxify-html5",
        "bootstrap": "/js/bootstrap",
        "jqueryui-touchpunch" : "/js/jquery.ui.touch-punch.min",
        "easeljs":"//code.createjs.com/easeljs-0.5.0.min",
        "ease":'/js/libs/tweenjs/Ease',
        "tween":'/js/libs/tweenjs/Tween',
    },
    shim: {
    	jquery: {
    		exports: '$'
    	},
    	"jquery-scrollTo": {
    		deps:['jquery']
    	},
      "jqueryui": {
        deps:['jquery']
      },
      "jqueryui-touchpunch": {
        deps:['jquery', 'jqueryui']
      },
    	historyjs: {
    		deps:['jquery'],
    		exports: 'History'
    	},
    	ajaxify: {
    		deps:['jquery', 'historyjs']
    	},
    },
    //Cache bust
    urlArgs: "bust=" + (new Date()).getTime()
});

require(['jquery', 'jqueryui', 'jqueryui-touchpunch', 'jquery-scrollTo', 'historyjs', 'ajaxify', 'bootstrap'], function($, UI, UITouchPunch, ScrollTo, History, Ajaxify, BS) {
	/*////////////////////////////////////////////////
	Routing setup.  
	Edit this section to add a template path to the 
	switch statement if you need to use a different 
	page JS for any reason.
	* Wildcard accepted, e.g.:
	case '/a/*':
	will match all sub-paths of a/
	////////////////////////////////////////////////*/

	var config = [
		{ url: "/", pagejs: "/js/pages/home.js" },
		{ url: "/game/", pagejs: "/js/pages/game/home.js" },
		{ url: "/goals/*", pagejs: "/js/pages/goal-setup.js" },
	];
	
	var url = "/"+History.getState().url.replace(History.getRootUrl(), '');
	var pagejs = "/js/pages"+url+".js";
	$.each(config, function(i, v) {
		if(v.url == url) {
			pagejs = v.pagejs;
			return false;
		} else {
			var match = false;
			if(v.url.indexOf('*') != -1) {
				var regex = v.url.replace('*', '');
				regex = new RegExp(BS.escapeRegex(regex));
				if(url.match(regex) != null) {
					match = true;
				}
			}
			
			if(v.url != "/" && match == true) {
				pagejs = v.pagejs;
				return false;
			}
		}
	});
	
	require([pagejs], function(Page){
		try {
			Page.initialize();
		} catch(err) {
			//No initialize function, no worries!
			console.log(err);
		}
	}, function(err) {
		console.log("Failed to load module: "+err.requireModules[0]);
		console.log(err);
	});	
	
	
	/*////////////////////////////////////////////////
	Multi page Javascript
	
	Any javascript that will be run across multiple 
	pages but does NOT fit into a module can be 
	placed here.  However, this should only be 
	used in extreme cases.
	////////////////////////////////////////////////*/
	
	if(/mobile/i.test(navigator.userAgent)) {
		setTimeout(function() {
			window.scrollTo(0, 1); 
		}, 1000); 
	}
	
	if (window.navigator.standalone == true) {
		$(document).on('click', 'a', function(e) {
			if($(e.target).hasClass('no-ajaxy') && $(e.target).attr('href') != "#") {
				e.preventDefault();
				location.href = $(e.target).attr( "href" );
			}
		});
	}
	
	startSound(url);
	
}, function(err) {
	console.log(err);
});

requirejs.onError = function (err) {
	console.log('Global Error:');
	console.log(err);
	console.log(err.requireType);
	if (err.requireType === 'timeout') {
		console.log('modules: ' + err.requireModules);
	}

	throw err;
};