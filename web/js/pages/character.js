define(['bootstrap', 'form', 'character', 'analytics'], function(BS, Form, Character, GA) {
	//Events to be used within this module are declared here int he following format:
	//{ element: 'CSS SELECTOR', event: 'EVENT', handler: 'FUNCTION TO BE CALLED ON EVENT INITIALISATION' }
	var events = [
		{ element:'#character-creation', event:'submit', handler:'submit' },
		{ element:'input:radio[name=accessories]', event:'change', handler:'checkboxChange' },
		{ element:'input:radio[name=accessories]', event:'click', handler:'deselect' },
		{ element:'input:radio[name=gender]', event:'change', handler:'genderChange' },
		{ element:'#acc-prev', event:'click', handler:'prevAccessories' },		
		{ element:'#acc-next', event:'click', handler:'nextAccessories' },
		{ element:'.attr', event:'click', handler:'attributeChange' },
		{ element:'.accessory', event:'click', handler:'attributeChange' },
	];
	
	maxVals = [];
	maxVals['hair'] = 4;
	maxVals['head'] = 4;
	maxVals['bottom'] = 5;
	maxVals['shoes'] = 6;
	
	var currentAccessory;
	
	return {
		initialize: function() {
			BS.events(events, this);
			Character.initialize();
			if(typeof(userData.head) != "undefined") {
				// console.log(userData);
				Character.setHeadSkinChange(parseInt(userData.head), parseInt(userData.gender));
				Character.setHairChange(parseInt(userData.hair), parseInt(userData.gender));
				Character.setShoesChange(parseInt(userData.shoes), parseInt(userData.gender));
				Character.setBottomChange(parseInt(userData.bottom), parseInt(userData.gender));
				$('input:radio[name="gender"]').each(function(i, v) {
					if($(this).val() == userData.gender) {
						$(this).prop('checked', true);
					} else {
						$(this).prop('checked', false);
					}
				});
				$('#accessories input[type="radio"]').each(function(i,v) {
					if($(this).val() == userData.accessories) {
						$(this).next('label').find('img').css('border', '2px solid white');
					} else {
						$(this).next('label').find('img').css('border', 'none');
					}
				});
				$('.attr').each(function(i,v) {
					$(this).attr('data-value', userData[$(this).attr('data-attr')]);
				});
				
				Character.setAccessory(userData.accessories, true);
			} else {
				Character.setHeadSkinChange(1,0);
				Character.setHairChange(1,0);
				Character.setShoesChange(1,0);
				Character.setBottomChange(1,0);
			}
			$('#accessories input[type="radio"]').css('opacity', '0');
			
			var iconWidth = $('#icons img').outerWidth(true);
			// console.log(iconWidth);
			var width = (iconWidth * $('#icons img').length);
			$('#iconContainer').width(width);
		},
		checkboxChange: function(e) {
			$this = $(e.target);
			$('input:radio[name=accessories]').each(function(i,v) {
				$(this).next('label').find('img').css('border', 'none');
			});
			$this.next('label').find('img').css('border', '2px solid #ffffff');
			var value = $this.val();
			Character.setAccessory(value);
		},
		deselect:function(e) {
			if($(this).attr('id') == currentAccessory) {
				$(this).prop('checked', false);
				$this.next('label').find('img').css('border', 'none');
				Character.setAccessory(0);
				currentAccessory = "";
			} else {
				currentAccessory = $(this).attr('id');
			}
		},
		genderChange: function(e){
			//Character.setBottomChange(1, $('input:radio[name=gender]:checked').val());
			Character.setHeadSkinChange(1, $('input:radio[name=gender]:checked').val());
			$('.hair.attr').attr('data-value', 1);
			$('.head.attr').attr('data-value', 1);
		},
		attributeChange: function(e) {
			if($(e.currentTarget).hasClass('accessory')) {
				$.each([$('.hair.attr'), $('.head.attr')], function(i, v) {
					var mouseX = e.pageX;
					var mouseY = e.pageY;
					var offset = v.offset();
					var width = v.width();
					var height = v.height();

					if (mouseX > offset.left && mouseX < offset.left+width && mouseY > offset.top && mouseY < offset.top+height) {
						v.click(); // force click event
					}
				});
			} else {
				var val = parseInt($(this).attr("data-value"));
				if(val == maxVals[$(this).attr('data-attr')]){
					val = 1;
				}else{
					val++;
				}
			
				GA.trackEvent('Character Page', 'Feature Change', $(this).attr('data-attr'));
			
				$(this).attr("data-value",val);
				switch($(this).attr('data-attr')) {
					case 'head':			
						$('#headhotspot').css('display', 'none');
						$('.character').attr("data-value",val);
						Character.setHeadSkinChange(val, $('input:radio[name=gender]:checked').val());
						break;
					case 'hair':
						$('#hairhotspot').css('display', 'none');
						Character.setHairChange(val, $('input:radio[name=gender]:checked').val());
						break;
					case 'bottom':
						$('#bottomhotspot').css('display', 'none');
						Character.setBottomChange(val, $('input:radio[name=gender]:checked').val());
						break;
					case 'shoes':
						$('#shoeshotspot').css('display', 'none');
						Character.setShoesChange(val, $('input:radio[name=gender]:checked').val());
						break;
				}
			}
		},
		prevAccessories: function(e) {
			e.preventDefault();
			var curr = parseInt($('#iconContainer').css('margin-left'));
			var width = $('#icons').width();
			var containerWidth = $('#iconContainer').width();
			var itemWidth = $('#icons img').outerWidth(true);
			if(curr != 0) {
				var left = curr + itemWidth;
				if(left > 0) {
					left = 0;
				}
				$('#iconContainer').css('margin-left', left+"px");
			}
		},
		nextAccessories: function(e) {
			e.preventDefault();
			var curr = parseInt($('#iconContainer').css('margin-left'));
			var width = $('#icons').width();
			var containerWidth = $('#iconContainer').width();
			var itemWidth = $('#icons img').outerWidth(true);
			// console.log(curr);
			if(curr != (-containerWidth + width)) {
				var left = curr - itemWidth;
				if(left < (-containerWidth + width)) {
					left = (-containerWidth + width);
				}
				// console.log(left);
				$('#iconContainer').css('margin-left', left+"px");
			}
		},
		submit: function(e) {
			e.preventDefault();
			var data = [
				{title: 'gender', value:$('input:radio[name=gender]:checked').val(), type:$('input:radio[name=gender]').attr('data-type'), required:false},
				{title: 'accessories', value:$('input:radio[name=accessories]:checked').val(), type:$('input:radio[name=accessories]').attr('data-type'), required:false},
				{title: 'accessoryType', value:$('input:radio[name=accessories]:checked').data('acctype'), type:$('input:radio[name=accessories]').attr('data-type'), required:false},
			];
			$('.attr').each(function(i,v) {
				data.push({title: $(this).attr('data-attr'), value:$(this).attr('data-value'), type:'auto', required:false});
			});
			
			var submitForm = Form.submitForm(data);
			if(submitForm.success == 1) {
				var saveData = submitForm.data;
				// console.log(submitForm.data);
				$.extend(userData, submitForm.data);
				if(loggedin) {
					saveData.userID = userData.id;
					$.ajax({
						type: 'post',
						data: saveData,
						dataType: 'json',
						url: $('#character-creation').attr('action'),
						success: function(response, status) {
							if(response == 1) {
								// console.log(userData);
								BS.changePage('/menu', 'Menu');
							} else {
								var message = "<div id='error'>";
								message += "<p>An error occurred, please try again</p>";
								message += "</div>";
								if($('#error').length > 0) {
									$('#error').replaceWith(message);
								} else {
									$('form').prepend(message);
								}
							}
						}
					});
				} else {
					$.extend(userData, submitForm.data);
					if(signedup == true) {
						BS.changePage('/menu', 'Menu');
					} else {
						BS.changePage('/goals', 'Goals');
					}
				}
			} else {
				var message = "<div id='error'>";
				message += "<p>Please fix the following errors</p>";
				message += "<ul>";
				$.each(submitForm.error, function(i,v) {
					message += "<li>";
					message += v.field.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) + " - ";
					if(v.reason == "required") {
						message += "This is a required field";
					} else {
						if($("#"+v.field).attr('data-type') == "text") {
							message += "Only letters and spaces are allowed";
						} else {
							message += "Incorrect value entered";
						}
					}
					message += "</li>";
				});
				message += "</ul>";
				message += "</div>";
				
				if($('#error').length > 0) {
					$('#error').replaceWith(message);
				} else {
					$('form').prepend(message);
				}
			}
		},
	}
});