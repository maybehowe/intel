(function(){
	window.intel = {
		over_link: ['http://v.youku.com/v_show/id_XMTM0ODU1NDI4OA==.html',
					'http://v.youku.com/v_show/id_XMTM0ODU1ODI1Mg==.html',
					'http://v.youku.com/v_show/id_XMTM0ODU1ODcwNA==.html',
					'http://v.youku.com/v_show/id_XMTM0ODU1OTg0NA==.html'],
		one_line: 'http://prcappzone.intel.com/it-management/it-future-phone/index.html?utm_source=Social&utm_medium=h5&utm_campaign=biz_pc_preference_campaign',

		showBegin: function () {
			$('.intel_wrap').removeClass('active');
			$('.intel_begin').addClass('active');
		},
		hideBegin: function () {
			$('.intel_begin').removeClass('active');
		}
		showOver: function (status, linkIndex) {
			if(status == 'pass'){
				$('intel_over_pass').addClass('active');
			}else if(status == 'fail'){
				$('intel_over_fail').addClass('active');
			}
		},
		selectImg: function (obj) {
			$('.intel_img_item').removeClass('active');
			obj.addClass('active');
		},
		gameBegin: function (index) {
			alert(index);
		}
	}

	$('.intel_event_body').on('click', function () {
		var parent_obj = $(this).closest('.intel_img_item');
		if(parent_obj.hasClass('active')){
			var index = parent_obj.attr('id').split('_')[1];
			intel.gameBegin(index);
		}else{
			intel.selectImg(parent_obj);
		}
	});

	$('.intel_ctrl_other').on('click', function () {
		intel.showBegin();
	})
})();