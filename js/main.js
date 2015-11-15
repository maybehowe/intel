(function(){
	window.intel = {
		over_link: ['http://v.youku.com/v_show/id_XMTM0ODU1NDI4OA==.html',
					'http://v.youku.com/v_show/id_XMTM0ODU1ODI1Mg==.html',
					'http://v.youku.com/v_show/id_XMTM0ODU1ODcwNA==.html',
					'http://v.youku.com/v_show/id_XMTM0ODU1OTg0NA==.html'],
		over_text: ['带你见识未来IT办公环境</br>多么简单！',
					'带你见识未来IT办公会议</br>多么智能！',
					'带你见识未来IT办公管理</br>多么轻松！',
					'带你见识未来IT办公效率</br>多么迅捷！'],
		one_line: 'http://prcappzone.intel.com/it-management/it-future-phone/index.html?utm_source=Social&utm_medium=h5&utm_campaign=biz_pc_preference_campaign',

		showBegin: function () {
			$('.intel_wrap').removeClass('active');
			$('.intel_begin').addClass('active');
		},
		hideBegin: function () {
			$('.intel_begin').removeClass('active');
		},
		showOver: function (status, linkIndex) {
			if(status == 'pass'){
				$('.intel_over_pass').addClass('active');
			}else if(status == 'fail'){
				$('.intel_over_fail').addClass('active');
			}
			if(linkIndex){
				$('.intel_over_text').html(intel.over_text[linkIndex]);
				$('.intel_hotlink').attr('href', intel.over_link[linkIndex]);
			}
		},
		selectImg: function (obj) {
			$('.intel_img_item').removeClass('active');
			obj.addClass('active');
		},
		gameBegin: function (index) {
			this.hideBegin()
			oDiff.play(index-1);
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
		oDiff.hide()
		intel.showBegin();
	});

	$('.intel_over_share').on('click', function () {
		$(this).html('点击右上角分享').addClass('active');
	})
})();

var oDiff = {
	iGame: 0,
	iTime: 60,
	iNow: 0,
	iCircle: 5,
	iCircleNow: 0,
	oInterval: {},
	oDiffWrap: $('#diff_wrap'),
	oTimeLeft: $('#time_left'),
	oCountAll: $('#count_all'),
	oCountCurrent: $('#count_current'),
	oBarWrap: $("#countdown"),
	oCountBar: $("#countdown_bar"),
	iBarWidth: 178,
	init: function(){
		var self = this
		self.bind()

		//游戏总数
		self.oCountAll.html(self.oDiffWrap.find('.diff').length)
	},
	bind: function(){
		var self = this
		$('.map li').click(function(event) {
			var oThis = $(this),
				iIdx = oThis.index()-1

			if(!oThis.hasClass('found')){
				oThis
					.addClass('found')
					.parent().siblings('.map').find('li').eq(iIdx).addClass('found')
				self.iCircleNow ++
				if(self.iCircleNow >= self.iCircle){
					clearInterval(self.oInterval)
					// console.log('成功弹窗')
					intel.showOver('pass', self.iGame)
				}
			}
		})
	},
	play: function(eq){
		var self = this

		//当前游戏
		self.iGame = eq+1
		self.oCountCurrent.html(eq+1)

		//显示游戏并初始化
		self.oDiffWrap
			.addClass('show')
			.find('.diff').eq(eq).addClass('show')
				.siblings('.diff.show').removeClass('show')

		self.oDiffWrap.find('li.found').removeClass('found')
		clearInterval(self.oInterval)
		self.iCircleNow = 0
		self.oTimeLeft.html(self.iTime)

		//设置倒计时条长度
		self.iBarWidth = self.oBarWrap.width()
		self.oCountBar.width(self.iBarWidth)

		self.iNow = self.iTime
		self.oInterval = setInterval('oDiff.countdown()', 1000)

	},
	countdown: function(){
		var self = this,
			iWidthNow = 0

		self.iNow --
		if(self.iNow < 0){
			clearInterval(self.oInterval)
			// console.log('失败弹窗')
			intel.showOver('fail', self.iGame)
		}else{
			self.oTimeLeft.html(self.iNow)
			if(self.iNow <= 10){
				self.oCountBar.addClass('countdown_bar_red')
			}

			iWidthNow = (self.iNow/self.iTime)*self.iBarWidth
			self.oCountBar.width(iWidthNow)
		}
	},
	hide: function(){
		var self = this

		clearInterval(self.oInterval)
		self.oDiffWrap.removeClass('show')
	}
}

$(function() {
    FastClick.attach(document.body);
    oDiff.init()
    // oDiff.play(3)
})