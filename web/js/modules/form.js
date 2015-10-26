define(['jquery', 'bootstrap', 'calculator'], function($, BS, Calculator) {
	
	var events = [
		{ element:'.insidelabel input[type="text"]', event:'focusin', handler:'toggleLabel' },
		{ element:'.insidelabel input[type="text"]', event:'focusout', handler:'toggleLabel' },
		{ element:'.insidelabel input[type="password"]', event:'focusin', handler:'toggleLabel' },
		{ element:'.insidelabel input[type="password"]', event:'focusout', handler:'toggleLabel' }
	];
	
	function validateField(type, data, required) {
		var valid;
		var reason = 'validation';
		
		switch(type) {
			case 'text':
				if(required == false && data == "") {
					valid = true;
				} else {
					valid = /^[a-zA-Z '-]+$/.test(data);					
				}
				break;
			case 'username':
				if(required == false && data == "") {
					valid = true;
				} else {
					valid = /^[a-zA-Z!$£%0-9]+$/.test(data);
				}
				break;
			case 'password':
				if(required == false && data == "") {
					valid = true;
				} else {
					valid = /^[a-zA-Z!$£%0-9]+$/.test(data);
				}
				break;
			case 'price':
				valid = ( /^[0-9.]+$/.test(data) );
				if( valid ) {
					if( parseInt( data ) > Calculator.getGoalMaxTotal() ) {
						valid = false;
						reason = 'toobig';
					}
				}
				break;
			case 'goal':
				if(required == false && data == "") {
					valid = true;
				} else {
					valid = /^[a-zA-Z0-9 ]+$/.test(data);					
				}
				break;
			default:
				valid = true;
				break;
		}
		
		return { valid:valid, reason:reason };
	}
	
	
	return {
		initialize: function(e) {
			BS.events(events, this);
			$('.insidelabel input[type="text"]').each(function(i, v) {
				if($(this).val() != "") {
					$(this).prev('span').css('visibility', 'hidden');
				}
			});
		},
		toggleLabel: function(e) {
			if(e.type=="focusin") {
				if(!$(this).val()) {
					$(this).prev('span').css('visibility', 'hidden');
				}				
			} else {
				if(!$(this).val()) {
					$(this).prev('span').css('visibility', 'visible');
				}
			}
		},
		submitForm: function(data) {
			var error = new Array();
			var validationResult;
			var saveData = {};
			$.each(data, function(i, v) {
				if((v.required == true && v.value != "") || v.required == false) {
					validationResult = validateField(v.type, v.value, v.required);
					if(!validationResult.valid) {
						error.push({field: v.title, reason: validationResult.reason } );
					} else {
						saveData[v.title] = v.value;
					}
				} else {
					error.push({field: v.title, reason: 'required'});
				}
			});
			
			if(error.length > 0) {
				return {success: 0, error: error};
			} else {
				return {success: 1, data: saveData};
			}
		},
		passwordCheck: function(password, retype) {
			if(password == retype) {
				return true;
			} else {
				return false;
			}
		}
	}
});