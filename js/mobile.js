$(document).ready(function(e){
	$(".ui-loader").hide();

	//메뉴 관련
	// $('{/*.mts-menu-icon').on("click",function() {
	// 	var menu =  $(this).attr('class').split(' ').pop();
	// 	showMenu(menu);
	// });
	// $('.mts-menu .close').on("click",function() {
	// 	var menu =  $(this).closest('.mts-menu').attr('class').split(' ').pop();
	// 	hideMenu(menu);
	// });
	// $('body').on('swipeleft', function(menuEvent) {
	// 	var swipeX = $(window).width() -80;
	// 	if (!$(menuEvent.target).is('.mts-menu .back') && !$(menuEvent.target).is('.mts-menu .wrapper') && menuEvent.swipestart.coords[0] > swipeX) {
	// 		showMenu('member');
	// 	}
	// });
	// $('body').on('swiperight', function(menuEvent) {
	// 	if (!$(menuEvent.target).is('.mts-menu .back') && !$(menuEvent.target).is('.mts-menu .wrapper') && menuEvent.swipestart.coords[0] < 80) {
	// 		showMenu('gnb')\;
	// 	}
	//
	// });
	// $('.mts-menu.gnb .wrapper').on('swipeleft',function(){
	//   hideMenu('gnb');
	// });
	// $('.mts-menu.member .wrapper').on('swiperight',function(){
	//   hideMenu('member');
	// });
	// // 메뉴 관련*/}



	//종목선택
	// $('.mts-trading-wrapper .selector .btn').on("click",function() {
	// 	if ($(this).hasClass('close')) {
	// 		$('.mts-trading-wrapper .selector .select').getNiceScroll().hide();
	// 		$('.mts-trading-wrapper .selector .select').slideUp(327);
	// 		$('.mts-trading-wrapper .selector .select .fix-header').slideUp(100);
	// 		$(this).removeClass('close');
	// 	} else {
	// 		if ($('.mts-trading-wrapper .selector').hasClass('option')) {
	// 			var selHeight = $(window).height() -150;
	// 		} else {
	// 			var selHeight = $(window).height() -150;
	// 		}
	// 		$('.mts-trading-wrapper .selector .select').slideDown(327);
	// 		$('.mts-trading-wrapper .selector .select .fix-header').slideDown(100);
	// 		$('.mts-trading-wrapper .selector .select').css({ 'max-height': selHeight + "px" });
	// 		$('.mts-trading-wrapper .selector .select').niceScroll({
	// 			cursorcolor: "#5b5b5b",
	// 			cursorwidth:"3px",
	// 			cursoropacitymin: 0.3,
	// 			cursorborder: "0",
	// 			cursorborderradius:"0",
	// 			autohidemode: true,
	// 			cursorminheight: 10
	// 		});
	// 		$('.mts-trading-wrapper .selector .select').getNiceScroll().show();
	// 		$(this).addClass('close');
	// 	}
	// });


	/*
	$('.mts-trading-wrapper .selector .select > ul > li').on("click",function() {
		var tickItem = $(this).find('em').text();
		tickItem = tickItem.replace("(", "");
		tickItem = tickItem.replace(")", "");
		$('.mts-trading-wrapper .selector > .title > .tick').text("");
		$('.mts-trading-wrapper .selector > .title > .tick').text(tickItem);

		$('.mts-trading-wrapper .selector .select').getNiceScroll().hide();
		$('.mts-trading-wrapper .selector .select').slideUp(327);
		$('.mts-trading-wrapper .selector .btn').removeClass('close');

	});
	*/
	// $('.mts-trading-wrapper .selector .select > ul > li,.mts-trading-wrapper .selector table td:nth-child(1),.mts-trading-wrapper .selector table td:nth-child(3)').on("click",function() {
	// 	$('.mts-trading-wrapper .selector .select').getNiceScroll().hide();
	// 	$('.mts-trading-wrapper .selector .select .fix-header').slideUp(100);
	// 	$('.mts-trading-wrapper .selector .select').slideUp(327);
	// 	$('.mts-trading-wrapper .selector .btn').removeClass('close');
	// });


	//종목선택


	//탭전환
	// $('.mts-trading-wrapper .order-tab .tab').on("click",function() {
	// 	var viewID = $(this).attr('class').match(/[\w-]*view-[\w-]*/g);
	// 	$('.mts-trading-wrapper .order-tab .tab').removeClass('on');
	// 	$(this).addClass('on');
	// 	$('.mts-trading-wrapper .order-wrapper .order section').removeClass('on');
	// 	$('.mts-trading-wrapper .order-wrapper .order section.'+viewID).addClass('on');
	// });
	//탭전환

	commonFunc();

	//차트탭
	// $('.mts-trading-wrapper .mts-chart .tab > li').on("click",function() {
	// 	$('.mts-trading-wrapper .mts-chart .tab > li').removeClass('on');
	// 	$(this).addClass('on');
	// });
	//차트탭

	//이너콘텐츠 오픈 (스탑로스/차트)
	// $('.mts-add-row').on("click",function() {
	// 	var viewID = $(this).attr('class').split('insert-').pop().split(' ')[0];
	// 	if (!$(this).hasClass('on')) {
	// 		$('.mts-trading.'+viewID).slideDown(300);
	// 		$(this).addClass('on');
	// 	} else {
	// 		$('.mts-trading.'+viewID).slideUp(300);
	// 		$(this).removeClass('on');
	// 	}
	// });
	// $('.mts-trading .bt.close').on("click",function() {
	// 	var viewClass = $(this).closest('.mts-trading').attr('class').split(' ').pop();
	// 	$('.mts-trading.'+viewClass).slideUp(300);
	// 	$('.mts-add-row.insert-'+viewClass).removeClass('on');
	// });
	//이너콘텐츠 오픈 (스탑로스/차트)


	//팝업
	$('.mts-pop .pop-close').on("click",function() {
		popClose();
	});
	//팝업


});



$(window).scroll(function() {

});
