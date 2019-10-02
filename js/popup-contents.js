function popContensFunc() {

	$('.mts-scroll-wrapper').scroll(function() {
		activePositionY = $('.mts-scroll-wrapper').scrollTop();
	});
	// 팝업 탭메뉴
	$('.mts-tab-menu > ul > li > a').on("click", function() {
		var viewID = $(this).parent('li').attr('class').split('tab').pop().split(' ')[0];
		$('.mts-tab-menu > ul > li').removeClass('on');
		$(this).parent('li').addClass('on');
		$('.mts-tab-contents').removeClass('on');
		$('.mts-tab-contents.tab' + viewID).addClass('on');
		$('.mts-scroll-wrapper').animate({
			scrollTop: '0'
		}, 300);
		// 부모탭메뉴에서 되돌아왔을때 처음탭으로 초기화 되는 것 처리하기 위해
		activeTab = $('.mts-tab-menu > ul > li.on').index();
		if ($(this).parent('li').find('div').hasClass('mts-select-menu')) {
			$('.mts-popup-basic .popup-contents').animate({
				marginTop: '45px'
			}, 100);
		} else {
			$('.mts-popup-basic .popup-contents').animate({
				marginTop: '0'
			}, 100);
		}
		$('.mts-select-menu > ul > li').removeClass('on');
		$('.mts-select-menu > ul > li:first-child').addClass('on');
		$('.mts-tab-contents.on .mts-select-contents').removeClass('on');
		$('.mts-tab-contents.on .mts-select-contents:nth-child(1)').addClass('on');

	});
	if ($('.mts-tab-menu > ul > li.on').find('div').hasClass('mts-select-menu')) {
		$('.mts-popup-basic .popup-contents').animate({
			marginTop: '45px'
		}, 100);
	} else {
		$('.mts-popup-basic .popup-contents').animate({
			marginTop: '0'
		}, 100);
	}
	// 팝업 탭메뉴

	// 팝업 셀렉트 메뉴
	$('.mts-select-menu > ul > li > a').on("click", function() {
		var view2ID = $(this).parent('li').attr('class').split('sel').pop().split(' ')[0];
		$('.mts-select-menu > ul > li').removeClass('on');
		$(this).parent('li').addClass('on');
		$('.mts-select-contents').removeClass('on');
		$('.mts-select-contents.sel' + view2ID).addClass('on');
		$('.mts-scroll-wrapper').animate({
			scrollTop: '0'
		}, 300);
		activeSel = $('.mts-select-menu > ul > li.on').index();
	});

	$('.mts-select-menu > i').on("click", function() {
		if (!$(this).parent('.mts-select-menu').hasClass('on')) {
			$(this).parent('.mts-select-menu').find('li').slideDown(100);
			$(this).parent('.mts-select-menu').addClass('on');
		} else {
			$(this).parent('.mts-select-menu.on').find('li').slideUp(100);
			$(this).parent('.mts-select-menu.on').find('li.on').slideDown(0);
			$(this).parent('.mts-select-menu.on').removeClass('on');
		}
		reHeight();
	});
	$('.mts-select-menu > ul > li').on("click", function() {
		$(this).closest('.mts-select-menu').removeClass('on');
		$(this).parent('ul').find('li').removeClass('on');
		$(this).addClass('on');
		$(this).parent('ul').find('li').slideUp(100);
		$(this).parent('ul').find('li.on').slideDown(0);
	});

	function reHeight() {
		var maxH = $(window).height() - 160;
		$('.mts-select-menu > ul').css('max-height', maxH + 'px');
	}

	$(window).resize(function() {
		reHeight();
		popBoxing();
	});

	// 팝업 셀렉트 메뉴

	// faq,게시판 등 토글
	$('.mts-toggle-content dt').on("click", function() {
		if (!$(this).parent('dl').hasClass('on')) {
			toggleIndex = $(this).parent('dl').index();
			$('.mts-toggle-content > dl').removeClass('on');
			$(this).parent('dl').addClass('on');
		} else {
			$(this).parent('dl').removeClass('on');
		}
	});

	$.datepicker.setDefaults({
		dateFormat: 'yy-mm-dd',
		prevText: '이전 달',
		nextText: '다음 달',
		monthNames: [
			'1월',
			'2월',
			'3월',
			'4월',
			'5월',
			'6월',
			'7월',
			'8월',
			'9월',
			'10월',
			'11월',
			'12월'
		],
		monthNamesShort: [
			'1월',
			'2월',
			'3월',
			'4월',
			'5월',
			'6월',
			'7월',
			'8월',
			'9월',
			'10월',
			'11월',
			'12월'
		],
		dayNames: [
			'일',
			'월',
			'화',
			'수',
			'목',
			'금',
			'토'
		],
		dayNamesShort: [
			'일',
			'월',
			'화',
			'수',
			'목',
			'금',
			'토'
		],
		dayNamesMin: [
			'일',
			'월',
			'화',
			'수',
			'목',
			'금',
			'토'
		],
		showMonthAfterYear: true,
		yearSuffix: '년'
	});

	$(function() {
		$(".mts-search .input").datepicker({inline: true, showOtherMonths: true}).datepicker('widget').wrap('<div class="mts-calendar"/>');
		$(".mts-search .input").datepicker("setDate" , new Date());
	});

	$('.mts-over-tab-menu > ul > li > a').on("click", function() {
		var viewID = $(this).parent('li').attr('class').split('tab').pop().split(' ')[0];
		$('.mts-over-tab-menu > ul > li').removeClass('on');
		$(this).parent('li').addClass('on');
		$('.mts-over-tab-contents').removeClass('on');
		$('.mts-over-tab-contents.tab' + viewID).addClass('on');
		$('.mts-pop-over .mts-scroll-wrapper').animate({
			scrollTop: '0'
		}, 300);
	});

}
