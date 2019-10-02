$(document).ready(function(e) {
    commonFunc();
});
var serverUrl = "http://211.119.137.198:8080/api";
var serverUrl1 = "http://211.233.33.251:8876";
var getTr = null;
var idcheck = false;
var delayCheck = true;

function commonFunc() {
    $('a[href*=#]:not([href=#])').on("click", function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length
                ? target
                : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });

    $('.validation-numberonly').bind('keyup paste', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    // 체크박스
    $('.mts-chk').each(function() {
        if ($(this).find('.check').is(":checked")) {
            $(this).addClass('on');
        } else {
            $(this).removeClass('on');
        }
    });
    $('.mts-chk .check').change(function() {
        if ($(this).is(":checked")) {
            $(this).closest('.mts-chk').addClass('on');
        } else {
            $(this).closest('.mts-chk').removeClass('on');
        }
    });
    // 체크박스

    // 라디오
    $('.mts-rad').each(function() {
        if ($(this).find('.radio').is(":checked")) {
            var thisName = $(this).find('.radio').attr('name');
            $(this).closest('.mts-rad').addClass('on');
        }
    });
    $('.mts-rad .radio').change(function() {
        if ($(this).is(":checked")) {
            var thisName = $(this).attr('name');
            $(this).closest('.mts-rad').addClass('on');
            $("input[name = " + thisName + "]:not(:checked)").closest('.mts-rad').removeClass('on');
        }
    });
    // 라디오

    //로그인
    $('.mts-login .fld .bt.del').on("click", function() {
        $(this).closest('.fld').find('.input').val('').focus();
    });
    $('.mts-login .fld .bt.view').on("click", function() {
        if ($(this).hasClass('on')) {
            $(this).removeClass('on');
            $(this).closest('.fld').find('.input').attr('type', 'password').focus();
        } else {
            $(this).addClass('on');
            $(this).closest('.fld').find('.input').attr('type', 'text').focus();
        }
    });
    //로그인
    $(document).on('click', '.mts-pop-over .pop-close', function() {
        popOverClose();
    });

}

function showMenu(menu) {
    popClose();
    $("body,html").css({"overflow": "hidden"});
    $('.mts-menu.' + menu).fadeIn(300);
    $('.mts-menu.' + menu + ' .close').fadeIn(600);
    setTimeout(function() {
        if (menu == 'gnb') {
            $('.mts-menu.' + menu + ' .wrapper').animate({
                marginLeft: 0
            }, 300);
        } else if (menu == 'member') {
            $('.mts-menu.' + menu + ' .wrapper').animate({
                marginRight: 0
            }, 300);
        }
    }, 300);
    setTimeout(function() {
        $('.mts-menu.' + menu + ' .wrapper').niceScroll({
            cursorcolor: "#94dbff",
            cursorwidth: "3px",
            cursoropacitymin: 0.3,
            cursorborder: "0",
            cursorborderradius: "0",
            autohidemode: true,
            cursorminheight: 10
        });
        $('.mts-menu.' + menu + ' .wrapper').getNiceScroll().show();
    }, 700);
}

function hideMenu(menu) {
    $("body,html").css({"overflow": ""});
    $('.mts-menu.' + menu + ' .wrapper').getNiceScroll().hide();
    if (menu == 'gnb') {
        $('.mts-menu.' + menu + ' .wrapper').animate({
            marginLeft: '-100%'
        }, 300);
    } else if (menu == 'member') {
        $('.mts-menu.' + menu + ' .wrapper').animate({
            marginRight: '-100%'
        }, 300);
    }
    $('.mts-menu.' + menu).fadeOut(300);
    $('.mts-menu.' + menu + ' .close').fadeOut(500);
}

function hideAll() {
    $("body,html").css({"overflow": ""});
    $('.mts-menu').getNiceScroll().hide();
    $('.mts-menu.gnb .wrapper').animate({
        marginLeft: '-100%'
    }, 300);
    $('.mts-menu.member .wrapper').animate({
        marginRight: '-100%'
    }, 300);
    $('.mts-menu').fadeOut(300);
    $('.mts-menu .close').fadeOut(500);
    popClose();
}

function popClose() {
    $(".mts-pop .insert-content").html('');
    $("body,html").css({"overflow": ""});
    $('.mts-pop').fadeOut(100);
    $('.mts-pop .insert-content').slideUp(300);
    setTimeout(function() {
        $('.mts-pop .pop-close').stop().animate({
            marginRight: '-100px'
        }, 0);
        $('.mts-pop .pop-prev').stop().animate({
            marginLeft: '-100px'
        }, 0);
    }, 100);
    $('.mts-pop').removeClass('basic');
    $('.mts-pop').removeClass('boxing');
    $('.mts-pop').css('height', 'auto');
    $('.mts-pop').css('marginTop', '0');
    popBoxing();
}
var loadArr = [];
var prevPage = "";
var prevIndex = 0;
var loadFile = "";
var activeTab = 0;
var activeSel = 0;
var activePositionY = 0;
var toggleIndex = 0;
// 팝컨텐츠 오픈
function popOpen(pop) {
    loadFile = pop.split('.htm')[0] + ".htm";
    hideAll();
    $(".mts-pop .insert-content").load('contents/' + loadFile, function() {
        loadArr = [];
        loadArr.push(loadFile);
        commonFunc();
        popContensFunc();
        if ($(".mts-popup-basic").hasClass('boxing')) {
            $('.mts-pop').addClass('boxing');
        } else if ($(".mts-pop div").hasClass('mts-popup-basic')) {
            $('.mts-pop').addClass('basic');
        } else {
            $('.mts-pop').removeClass('basic');
            $('.mts-pop').removeClass('boxing');
        }
        if ($(".mts-popup-basic").hasClass('boxing')) {
            $('.mts-pop').slideDown(300);
            $('.mts-pop .insert-content').slideDown(0);
            $("body,html").css({"overflow": ""});
        } else {
            $('.mts-pop').fadeIn(300);
            $('.mts-pop .insert-content').slideDown(300);
            $("body,html").css({"overflow": "hidden"});
        }
        setTimeout(function() {
            $('.mts-pop .pop-close').stop().animate({
                marginRight: '0'
            }, 300);
        }, 300);
        activePositionY = $('.mts-scroll-wrapper').scrollTop();
        activeTab = $('.mts-tab-menu > ul > li.on').index(); // 추가
        popBoxing();
    });
}

function popOpenHome(pop, homeData) {
    loadFile = pop.split('.htm')[0] + ".htm";
    hideAll();
    $(".mts-pop .insert-content").load('contents/' + loadFile, function() {
        loadArr = [];
        loadArr.push(loadFile);
        commonFunc();
        popContensFunc();
        if ($(".mts-popup-basic").hasClass('boxing')) {
            $('.mts-pop').addClass('boxing');
        } else if ($(".mts-pop div").hasClass('mts-popup-basic')) {
            $('.mts-pop').addClass('basic');
        } else {
            $('.mts-pop').removeClass('basic');
            $('.mts-pop').removeClass('boxing');
        }
        if ($(".mts-popup-basic").hasClass('boxing')) {
            $('.mts-pop').slideDown(300);
            $('.mts-pop .insert-content').slideDown(0);
            $("body,html").css({"overflow": ""});
        } else {
            $('.mts-pop').fadeIn(300);
            $('.mts-pop .insert-content').slideDown(300);
            $("body,html").css({"overflow": "hidden"});
        }
        setTimeout(function() {
            $('.mts-pop .pop-close').stop().animate({
                marginRight: '0'
            }, 300);
        }, 300);
        activePositionY = $('.mts-scroll-wrapper').scrollTop();
        activeTab = $('.mts-tab-menu > ul > li.on').index(); // 추가
        popBoxing();
    });
}

function popOpenMsg(pop, msg) {
    loadFile = pop.split('.htm')[0] + ".htm";
    hideAll();
    $(".mts-pop .insert-content").load('contents/' + loadFile, function() {
        loadArr = [];
        loadArr.push(loadFile);
        commonFunc();
        popContensFunc();
        if ($(".mts-popup-basic").hasClass('boxing')) {
            $('.mts-pop').addClass('boxing');
        } else if ($(".mts-pop div").hasClass('mts-popup-basic')) {
            $('.mts-pop').addClass('basic');
        } else {
            $('.mts-pop').removeClass('basic');
            $('.mts-pop').removeClass('boxing');
        }
        if ($(".mts-popup-basic").hasClass('boxing')) {
            $('.mts-pop').slideDown(300);
            $('.mts-pop .insert-content').slideDown(0);
            $("body,html").css({"overflow": ""});
        } else {
            $('.mts-pop').fadeIn(300);
            $('.mts-pop .insert-content').slideDown(300);
            $("body,html").css({"overflow": "hidden"});
        }
        setTimeout(function() {
            $('.mts-pop .pop-close').stop().animate({
                marginRight: '0'
            }, 100);
        }, 100);
        activePositionY = $('.mts-scroll-wrapper').scrollTop();
        activeTab = $('.mts-tab-menu > ul > li.on').index(); // 추가
        popBoxing();
        $('#msgdata').text(msg);
    });
}

function popOpenLogin(pop, callback) {
    loadFile = pop.split('.htm')[0] + ".htm";
    hideAll();
    $(".mts-pop .insert-content").load('contents/' + loadFile, function(response, status, xhr) {
        if(status=="error"){
            alert("인터넷이 불안정합니다. 다시시도 해 주세요");
        }else{
        loadArr = [];
        loadArr.push(loadFile);
        commonFunc();
        popContensFunc();
        if ($(".mts-popup-basic").hasClass('boxing')) {
            $('.mts-pop').addClass('boxing');
        } else if ($(".mts-pop div").hasClass('mts-popup-basic')) {
            $('.mts-pop').addClass('basic');
        } else {
            $('.mts-pop').removeClass('basic');
            $('.mts-pop').removeClass('boxing');
        }
        if ($(".mts-popup-basic").hasClass('boxing')) {
            $('.mts-pop').slideDown(300);
            $('.mts-pop .insert-content').slideDown(0);
            $("body,html").css({"overflow": ""});
        } else {
            $('.mts-pop').fadeIn(300);
            $('.mts-pop .insert-content').slideDown(300);
            $("body,html").css({"overflow": "hidden"});
        }
        setTimeout(function() {
            $('.mts-pop .pop-close').stop().animate({
                marginRight: '0'
            }, 300);
        }, 300);
        activePositionY = $('.mts-scroll-wrapper').scrollTop();
        activeTab = $('.mts-tab-menu > ul > li.on').index(); // 추가
        popBoxing();
        if (localStorage.getItem("storedId") != null) {
            $('#username').val(localStorage.getItem("storedId"));
            $('#idCheck').attr("checked", true);
            $('#idCheckLabel').addClass('on');
        }
        $('#loginButton').click((e) => {
            callback($('#username').val().replace(/ /gi, ''), $('#password').val(), $('#idCheck').is(":checked"));
            popClose()
        });
        }
    });
}

function popOpenOrderCofirm(pop, name, codeName, div, type, amount, price, func) {
    loadFile = pop.split('.htm')[0] + ".htm";
    hideAll();
    $(".mts-pop .insert-content").load('contents/' + loadFile, function() {
        loadArr = [];
        loadArr.push(loadFile);
        commonFunc();
        popContensFunc();
        if ($(".mts-popup-basic").hasClass('boxing')) {
            $('.mts-pop').addClass('boxing');
        } else if ($(".mts-pop div").hasClass('mts-popup-basic')) {
            $('.mts-pop').addClass('basic');
        } else {
            $('.mts-pop').removeClass('basic');
            $('.mts-pop').removeClass('boxing');
        }
        if ($(".mts-popup-basic").hasClass('boxing')) {
            $('.mts-pop').slideDown(1);
            $('.mts-pop .insert-content').slideDown(0);
            $("body,html").css({"overflow": ""});
        } else {
            $('.mts-pop').fadeIn(1);
            $('.mts-pop .insert-content').slideDown(1);
            $("body,html").css({"overflow": "hidden"});
        }
        setTimeout(function() {
            $('.mts-pop .pop-close').stop().animate({
                marginRight: '0'
            }, 300);
        }, 300);
        activePositionY = $('.mts-scroll-wrapper').scrollTop();
        activeTab = $('.mts-tab-menu > ul > li.on').index(); // 추가
        popBoxing();
        $('#name').text(codeName);
        $('#div').text(div == "B"
            ? "매수"
            : "매도");
        $('#type').text(type == "oder_mark"
            ? "시장가"
            : "지정가");
        $('#amount').text(amount);
        $('#price').text(price);
        $('#okButton').click(() => {
            func(price, amount, div, type);
            popClose()
        });
    });
}

function popOpenOrderCancel(pop, ordNum, amount, func) {
    loadFile = pop.split('.htm')[0] + ".htm";
    hideAll();
    $(".mts-pop .insert-content").load('contents/' + loadFile, function() {
        loadArr = [];
        loadArr.push(loadFile);
        commonFunc();
        popContensFunc();
        if ($(".mts-popup-basic").hasClass('boxing')) {
            $('.mts-pop').addClass('boxing');
        } else if ($(".mts-pop div").hasClass('mts-popup-basic')) {
            $('.mts-pop').addClass('basic');
        } else {
            $('.mts-pop').removeClass('basic');
            $('.mts-pop').removeClass('boxing');
        }
        if ($(".mts-popup-basic").hasClass('boxing')) {
            $('.mts-pop').slideDown(1);
            $('.mts-pop .insert-content').slideDown(0);
            $("body,html").css({"overflow": ""});
        } else {
            $('.mts-pop').fadeIn(1);
            $('.mts-pop .insert-content').slideDown(1);
            $("body,html").css({"overflow": "hidden"});
        }
        setTimeout(function() {
            $('.mts-pop .pop-close').stop().animate({
                marginRight: '0'
            }, 300);
        }, 300);
        activePositionY = $('.mts-scroll-wrapper').scrollTop();
        activeTab = $('.mts-tab-menu > ul > li.on').index(); // 추가
        popBoxing();
        $('#ordNum').text(ordNum);
        $('#amount').text(amount);
        $('#okButton').click(() => {
            func(ordNum, amount);
            popClose()
        });
    });
}

function popOpenOrderMod(pop, code, ordNum, position, hoga, price, amount, func, dotgb, untprc) {
    loadFile = pop.split('.htm')[0] + ".htm";
    hideAll();
    $(".mts-pop .insert-content").load('contents/' + loadFile, function() {
        loadArr = [];
        loadArr.push(loadFile);
        commonFunc();
        popContensFunc();
        if ($(".mts-popup-basic").hasClass('boxing')) {
            $('.mts-pop').addClass('boxing');
        } else if ($(".mts-pop div").hasClass('mts-popup-basic')) {
            $('.mts-pop').addClass('basic');
        } else {
            $('.mts-pop').removeClass('basic');
            $('.mts-pop').removeClass('boxing');
        }
        if ($(".mts-popup-basic").hasClass('boxing')) {
            $('.mts-pop').slideDown(1);
            $('.mts-pop .insert-content').slideDown(0);
            $("body,html").css({"overflow": ""});
        } else {
            $('.mts-pop').fadeIn(1);
            $('.mts-pop .insert-content').slideDown(1);
            $("body,html").css({"overflow": "hidden"});
        }
        setTimeout(function() {
            $('.mts-pop .pop-close').stop().animate({
                marginRight: '0'
            }, 300);
        }, 300);
        activePositionY = $('.mts-scroll-wrapper').scrollTop();
        activeTab = $('.mts-tab-menu > ul > li.on').index(); // 추가
        popBoxing();
        $('#ordNum').text(ordNum);
        $('#type').text(hoga == "oder_mark"
            ? "시장가"
            : "지정가");
        $('#amount').text(amount);
        $('#price').text(price);

        $('#okButton').click(() => {
            func(ordNum, code, position, hoga == "oder_mark"
                ? "1"
                : "0", price, amount, dotgb, untprc);
            popClose()
        });
    });
}

function popOpenOrderClear(pop, code, codeName, func) {
    loadFile = pop.split('.htm')[0] + ".htm";
    hideAll();
    $(".mts-pop .insert-content").load('contents/' + loadFile, function() {
        loadArr = [];
        loadArr.push(loadFile);
        commonFunc();
        popContensFunc();
        if ($(".mts-popup-basic").hasClass('boxing')) {
            $('.mts-pop').addClass('boxing');
        } else if ($(".mts-pop div").hasClass('mts-popup-basic')) {
            $('.mts-pop').addClass('basic');
        } else {
            $('.mts-pop').removeClass('basic');
            $('.mts-pop').removeClass('boxing');
        }
        if ($(".mts-popup-basic").hasClass('boxing')) {
            $('.mts-pop').slideDown(1);
            $('.mts-pop .insert-content').slideDown(0);
            $("body,html").css({"overflow": ""});
        } else {
            $('.mts-pop').fadeIn(1);
            $('.mts-pop .insert-content').slideDown(1);
            $("body,html").css({"overflow": "hidden"});
        }
        setTimeout(function() {
            $('.mts-pop .pop-close').stop().animate({
                marginRight: '0'
            }, 300);
        }, 300);
        activePositionY = $('.mts-scroll-wrapper').scrollTop();
        activeTab = $('.mts-tab-menu > ul > li.on').index(); // 추가
        popBoxing();
        $('#code').text(code == "ALL"
            ? "전체"
            : codeName);
        $('#okButton').click(() => {
            func(code);
            popClose()
        });
    });
}

function login(username, password, idSaveCheck, loginSaveCheck) {
    console.log(username);
    console.log(password);
    console.log(idSaveCheck);
    console.log(loginSaveCheck);
}

// 오픈된 팝업에서 페이지전환시
function popChange(pop) {
    loadFile = pop.split('.htm')[0] + ".htm";
    $('.mts-pop .pop-prev').stop().animate({
        marginLeft: '-100px'
    }, 0);
    $('.mts-pop').removeClass('boxing');
    $('.mts-pop').css('height', 'auto');
    $('.mts-pop').css('marginTop', '0');
    $(".mts-pop .insert-content").load('contents/' + loadFile, function() {
        loadArr.push(loadFile);
        var found = $.inArray(loadFile, loadArr);
        var prevIndex = found - 1;
        if (prevIndex >= 0)
            prevPage = loadArr[prevIndex];
        else
            prevPage = "";
        if (prevPage) {
            $('.mts-pop .pop-prev').stop().animate({
                marginLeft: '0'
            }, 300);
            $('.mts-pop .pop-prev').on("click", function() {
                popChange(prevPage);
            });
        }
        // 탭페이지 리셋방지
        if (activeTab > 0) {
            $('.mts-tab-menu > ul > li').removeClass('on');
            $('.mts-tab-menu > ul > li').eq(activeTab).addClass('on');
            $('.mts-tab-contents').removeClass('on');
            $('.mts-tab-contents').eq(activeTab).addClass('on');
        }
        if (activeSel > 0) {
            $('.mts-select-menu > ul > li').removeClass('on');
            $('.mts-select-menu > ul > li').eq(activeSel).addClass('on');
            $('.mts-select-contents').removeClass('on');
            $('.mts-select-contents').eq(activeSel).addClass('on');
        }
        if (toggleIndex > 0) {
            $('.mts-toggle-content  > dl').eq(toggleIndex).addClass('on');
        }
        $('.mts-scroll-wrapper').animate({
            scrollTop: activePositionY
        }, 300);
        commonFunc();
        popContensFunc();
        if ($(".mts-popup-basic").hasClass('boxing')) {
            $('.mts-pop').addClass('boxing');
            $("body,html").css({"overflow": ""});
        } else if ($(".mts-pop div").hasClass('mts-popup-basic')) {
            $('.mts-pop').addClass('basic');
        } else {
            $('.mts-pop').removeClass('basic');
            $('.mts-pop').removeClass('boxing');
        }
        popBoxing();
    });
}
popBoxing();

function popBoxing() {
    setTimeout(function() {
        var boxingH = $('.mts-pop.boxing .mts-scroll-wrapper')[0].scrollHeight + 50;
        if ($('.mts-pop').hasClass('boxing')) {
            if (boxingH > $(window).height()) {
                var boxingHalf = Math.floor($(window).height() / 2) - 46;
                var boxingHeight = $(window).height() - 46;
            } else {
                var boxingHalf = Math.floor(boxingH / 2);
                var boxingHeight = boxingH;
            }
            $('.mts-pop').stop().animate({
                height: boxingHeight + 'px',
                marginTop: '-' + boxingHalf + 'px'
            }, 300);
        } else {
            $('.mts-pop').css('height', 'auto');
            $('.mts-pop').css('marginTop', '0');
            $('.mts-pop').removeClass('boxing');
        }
    }, 200);
    // 테마수정 추가
    // 테마수정 추가
}

// 팝업 위에 팝업 오버레이
var popOverH = 0;

function popOver(pop) {
    popOverH = $(window).height() - 180;
    $('.mts-pop-over').append($('<a class="pop-close">닫기</a>'));
    $('.mts-pop-over .pop-close').stop().animate({
        marginRight: '-100px'
    }, 0);
    $('.mts-pop-over .mts-scroll-wrapper').css('max-height', popOverH + 'px');
    $('.mts-pop-over.' + pop).slideDown(300);
    setTimeout(function() {
        $('.mts-pop-over.' + pop + ' .pop-close').stop().animate({
            marginRight: '0'
        }, 300);
    }, 300);
}

function popOverClose() {
    $('.mts-pop-over').slideUp(300);
}

// 종목선택 입니다.

// 종목선택 입니다.
function itemSelect(title1, title2, num, id) {
    $('.mts-trading-wrapper .item-target').text(title2);
    $('.mts-trading-wrapper .selector .select').getNiceScroll().hide();
    $('.mts-trading-wrapper .selector .select .fix-header').slideUp(100);
    $('.mts-trading-wrapper .selector .select').slideUp(327);
    $('.mts-trading-wrapper .selector .btn').removeClass('close');
}

function itemOptionSelect() {
    $('.mts-trading-wrapper .selector .select').getNiceScroll().hide();
    $('.mts-trading-wrapper .selector .select .fix-header').slideUp(100);
    $('.mts-trading-wrapper .selector .select').slideUp(327);
    $('.mts-trading-wrapper .selector .btn').removeClass('close');
}

function itemListClick() {
    if ($('.mts-trading-wrapper .selector .btn').hasClass('close')) {
        $('.mts-trading-wrapper .selector .select').getNiceScroll().hide();
        $('.mts-trading-wrapper .selector .select').slideUp(327);
        $('.mts-trading-wrapper .selector .select .fix-header').slideUp(100);
        $('.mts-trading-wrapper .selector .btn').removeClass('close');
    } else {
        if ($('.mts-trading-wrapper .selector').hasClass('option')) {
            var selHeight = $(window).height() - 150;
        } else {
            var selHeight = $(window).height() - 150;
        }
        $('.mts-trading-wrapper .selector .select').slideDown(327);
        $('.mts-trading-wrapper .selector .select .fix-header').slideDown(100);
        $('.mts-trading-wrapper .selector .select').css({
            'max-height': selHeight + "px"
        });
        $('.mts-trading-wrapper .selector .select').niceScroll({
            cursorcolor: "#5b5b5b",
            cursorwidth: "3px",
            cursoropacitymin: 0.3,
            cursorborder: "0",
            cursorborderradius: "0",
            autohidemode: true,
            cursorminheight: 10
        });
        $('.mts-trading-wrapper .selector .select').getNiceScroll().show();
        $('.mts-trading-wrapper .selector .btn').addClass('close');
    }
}

function orderTabClick(target) {
    var viewID = $(target).attr('class').match(/[\w-]*view-[\w-]*/g);
    $('.mts-trading-wrapper .order-tab .tab').removeClass('on');
    $(target).addClass('on');
    $('.mts-trading-wrapper .order-wrapper .order section').removeClass('on');
    $('.mts-trading-wrapper .order-wrapper .order section.' + viewID).addClass('on');
}

function chartTabClick(target) {
    $('.mts-trading-wrapper .mts-chart .tab > li').removeClass('on');
    $(target).addClass('on');
}

function openContents(target) {
    var viewID = $(target).attr('class').split('insert-').pop().split(' ')[0];
    if (!$(target).hasClass('on')) {
        $('.mts-trading.' + viewID).slideDown(300);
        $(target).addClass('on');
    } else {
        $('.mts-trading.' + viewID).slideUp(300);
        $(target).removeClass('on');
    }
}

function closeContents(target) {
    var viewClass = $(target).closest('.mts-trading').attr('class').split(' ').pop();
    $('.mts-trading.' + viewClass).slideUp(300);
    $('.mts-add-row.insert-' + viewClass).removeClass('on');
}

function openMenuHeaderLogin(target, username) {
    var menu = $(target).attr('class').split(' ').pop();
    $.ajax({
        type: "GET",
        url: serverUrl + "/user/userJoinTimeInfo?username=" + username,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        error: function() {
            alert('통신실패!!');
        },
        success: function(data) {
            $('#userRecentLogin').text(data[0].time.substring(0, 16));
        }
    });
    $.ajax({
        type: "GET",
        url: serverUrl + "/user/userDepositInfo?username=" + username,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        error: function() {
            alert('통신실패!!');
        },
        success: function(data) {
            $('#userDepositNow').text(numberWithCommas((((data[0].bankBalance * 1) > 0)
                ? data[0].bankBalance * 1
                : 0).toFixed(0)));
        }
    });
    showMenu(menu);
}

function openMenuHeaderNoLogin(target) {
    var menu = $(target).attr('class').split(' ').pop();
    showMenu(menu);
}

function closeMenuHeader(target) {
    var menu = $(target).closest('.mts-menu').attr('class').split(' ').pop();
    hideMenu(menu);
}

function openDatePickerStart() {
    $('#startDate').datepicker({inline: true, showOtherMonths: true}).datepicker('widget').wrap('<div class="mts-calendar"/>');
}

function openDatePickerEnd() {
    $('#endDate').datepicker({inline: true, showOtherMonths: true}).datepicker('widget').wrap('<div class="mts-calendar"/>');
}

function popOpenOrderLimit(data) {
    loadFile = 'guide-order-limit'.split('.htm')[0] + ".htm";
    hideAll();
    $(".mts-pop .insert-content").load('contents/' + loadFile, function() {
        loadArr = [];
        loadArr.push(loadFile);
        commonFunc();
        popContensFunc();
        if ($(".mts-popup-basic").hasClass('boxing')) {
            $('.mts-pop').addClass('boxing');
        } else if ($(".mts-pop div").hasClass('mts-popup-basic')) {
            $('.mts-pop').addClass('basic');
        } else {
            $('.mts-pop').removeClass('basic');
            $('.mts-pop').removeClass('boxing');
        }
        if ($(".mts-popup-basic").hasClass('boxing')) {
            $('.mts-pop').slideDown(300);
            $('.mts-pop .insert-content').slideDown(0);
            $("body,html").css({"overflow": ""});
        } else {
            $('.mts-pop').fadeIn(300);
            $('.mts-pop .insert-content').slideDown(300);
            $("body,html").css({"overflow": "hidden"});
        }
        setTimeout(function() {
            $('.mts-pop .pop-close').stop().animate({
                marginRight: '0'
            }, 300);
        }, 300);
        activePositionY = $('.mts-scroll-wrapper').scrollTop();
        activeTab = $('.mts-tab-menu > ul > li.on').index(); // 추가
        popBoxing();
        $('#foreignFuturesMaxContract').val(numberWithCommas(data.foreignFuturesMaxContract));
        $('#futuresMaxContract').val(numberWithCommas(data.futuresMaxContract));
        $('#optionsBuyMaxContract').val(numberWithCommas(data.optionsBuyMaxContract));
        $('#optionsSellMaxContract').val(numberWithCommas(data.optionsSellMaxContract));
        $('#cmemaxContract').val(numberWithCommas(data.cmemaxContract));
        $('#eurexbuyMaxContract').val(numberWithCommas(data.eurexbuyMaxContract));
        $('#eurexsellMaxContract').val(numberWithCommas(data.eurexsellMaxContract));
    });
}

function popOpenUsername(pop, username) {
    loadFile = pop.split('.htm')[0] + ".htm";
    hideAll();
    $(".mts-pop .insert-content").load('contents/' + loadFile, function() {
        loadArr = [];
        loadArr.push(loadFile);
        commonFunc();
        popContensFunc();
        if ($(".mts-popup-basic").hasClass('boxing')) {
            $('.mts-pop').addClass('boxing');
        } else if ($(".mts-pop div").hasClass('mts-popup-basic')) {
            $('.mts-pop').addClass('basic');
        } else {
            $('.mts-pop').removeClass('basic');
            $('.mts-pop').removeClass('boxing');
        }
        if ($(".mts-popup-basic").hasClass('boxing')) {
            $('.mts-pop').slideDown(300);
            $('.mts-pop .insert-content').slideDown(0);
            $("body,html").css({"overflow": ""});
        } else {
            $('.mts-pop').fadeIn(300);
            $('.mts-pop .insert-content').slideDown(300);
            $("body,html").css({"overflow": "hidden"});
        }
        setTimeout(function() {
            $('.mts-pop .pop-close').stop().animate({
                marginRight: '0'
            }, 300);
        }, 300);
        activePositionY = $('.mts-scroll-wrapper').scrollTop();
        activeTab = $('.mts-tab-menu > ul > li.on').index(); // 추가
        popBoxing();
        $('#username').val(username);
    });
}

function popOpenUsernameBalance(pop, username, func) {
    loadFile = pop.split('.htm')[0] + ".htm";
    hideAll();
    $(".mts-pop .insert-content").load('contents/' + loadFile, function() {
        loadArr = [];
        loadArr.push(loadFile);
        commonFunc();
        popContensFunc();
        if ($(".mts-popup-basic").hasClass('boxing')) {
            $('.mts-pop').addClass('boxing');
        } else if ($(".mts-pop div").hasClass('mts-popup-basic')) {
            $('.mts-pop').addClass('basic');
        } else {
            $('.mts-pop').removeClass('basic');
            $('.mts-pop').removeClass('boxing');
        }
        if ($(".mts-popup-basic").hasClass('boxing')) {
            $('.mts-pop').slideDown(300);
            $('.mts-pop .insert-content').slideDown(0);
            $("body,html").css({"overflow": ""});
        } else {
            $('.mts-pop').fadeIn(300);
            $('.mts-pop .insert-content').slideDown(300);
            $("body,html").css({"overflow": "hidden"});
        }
        setTimeout(function() {
            $('.mts-pop .pop-close').stop().animate({
                marginRight: '0'
            }, 300);
        }, 300);
        activePositionY = $('.mts-scroll-wrapper').scrollTop();
        activeTab = $('.mts-tab-menu > ul > li.on').index(); // 추가
        popBoxing();
        $('#username').val(username);
        getTr = func;
    });
}

function popOpenOvernight(pop, username) {
    loadFile = pop.split('.htm')[0] + ".htm";
    hideAll();
    $(".mts-pop .insert-content").load('contents/' + loadFile, function() {
        loadArr = [];
        loadArr.push(loadFile);
        commonFunc();
        popContensFunc();
        if ($(".mts-popup-basic").hasClass('boxing')) {
            $('.mts-pop').addClass('boxing');
        } else if ($(".mts-pop div").hasClass('mts-popup-basic')) {
            $('.mts-pop').addClass('basic');
        } else {
            $('.mts-pop').removeClass('basic');
            $('.mts-pop').removeClass('boxing');
        }
        if ($(".mts-popup-basic").hasClass('boxing')) {
            $('.mts-pop').slideDown(300);
            $('.mts-pop .insert-content').slideDown(0);
            $("body,html").css({"overflow": ""});
        } else {
            $('.mts-pop').fadeIn(300);
            $('.mts-pop .insert-content').slideDown(300);
            $("body,html").css({"overflow": "hidden"});
        }
        setTimeout(function() {
            $('.mts-pop .pop-close').stop().animate({
                marginRight: '0'
            }, 300);
        }, 300);
        activePositionY = $('.mts-scroll-wrapper').scrollTop();
        activeTab = $('.mts-tab-menu > ul > li.on').index(); // 추가
        popBoxing();
        $('#username').val(username);
        $.ajax({
            type: "GET",
            url: serverUrl + "/user/userOvernightInfo?username=" + username,
            dataType: "json",
            error: function() {
                alert('통신실패!!');
            },
            success: function(data) {
              if(data[0].enableOvernight=="0"){
                $('#overNightFalse').prop("checked", true);
              }else{
                $('#overNightTrue').prop("checked", true);
              }
                $('.mts-rad').each(function() {
                    if ($(this).find('.radio').is(":checked")) {
                        var thisName = $(this).find('.radio').attr('name');
                        $(this).closest('.mts-rad').addClass('on');
                    }
                });
                $('.mts-rad .radio').change(function() {
                    if ($(this).is(":checked")) {
                        var thisName = $(this).attr('name');
                        $(this).closest('.mts-rad').addClass('on');
                        $("input[name = " + thisName + "]:not(:checked)").closest('.mts-rad').removeClass('on');
                    }
                });
            }
        });
        $.ajax({
            type: "GET",
            url: serverUrl + "/company/fkDepositInfo?username=" + username,
            dataType: "json",
            error: function() {
                alert('통신실패!!');
            },
            success: function(data) {
              $('#kospi').text(numberWithCommas(data[1].value*1));
              $('#oversea').text(numberWithCommas(data[0].value*1));
            }
        });
    });
}

function popOpenMargin(pop, username) {
    loadFile = pop.split('.htm')[0] + ".htm";
    hideAll();
    $(".mts-pop .insert-content").load('contents/' + loadFile, function() {
        loadArr = [];
        loadArr.push(loadFile);
        commonFunc();
        popContensFunc();
        if ($(".mts-popup-basic").hasClass('boxing')) {
            $('.mts-pop').addClass('boxing');
        } else if ($(".mts-pop div").hasClass('mts-popup-basic')) {
            $('.mts-pop').addClass('basic');
        } else {
            $('.mts-pop').removeClass('basic');
            $('.mts-pop').removeClass('boxing');
        }
        if ($(".mts-popup-basic").hasClass('boxing')) {
            $('.mts-pop').slideDown(300);
            $('.mts-pop .insert-content').slideDown(0);
            $("body,html").css({"overflow": ""});
        } else {
            $('.mts-pop').fadeIn(300);
            $('.mts-pop .insert-content').slideDown(300);
            $("body,html").css({"overflow": "hidden"});
        }
        setTimeout(function() {
            $('.mts-pop .pop-close').stop().animate({
                marginRight: '0'
            }, 300);
        }, 300);
        activePositionY = $('.mts-scroll-wrapper').scrollTop();
        activeTab = $('.mts-tab-menu > ul > li.on').index(); // 추가
        popBoxing();
        $('#username').val(username);
        $.ajax({
            type: "GET",
            url: serverUrl + "/overnight/userOverseaInfo?username=" + username,
            dataType: "json",
            error: function() {
                alert('통신실패!!');
            },
            success: function(data) {
                for (let i = 0; i < data.length; i++) {
                    let jsonData = data[i];
                    $('#overseaList').append("<tr><td style='padding:3px 3px'>" + jsonData.hcodeName.trim() + "</td><td style='padding:3px 3px'><label class='mts-rad' style='min-width:70px'><input type='radio' name='" + jsonData.hbasicCode.trim() + "' value='" + jsonData.hmargin1 + "' class='radio' " + (jsonData.userMarginIdx == 0
                        ? 'checked'
                        : '') + " id='marginRadio1" + i + "1'>USD " + jsonData.hmargin1 + "<i></i></label></td><td style='padding:3px 3px'><label class='mts-rad' style='min-width:70px'><input type='radio' name='" + jsonData.hbasicCode.trim() + "' value='" + jsonData.hmargin2 + "' class='radio' " + (jsonData.userMarginIdx == 1
                        ? 'checked'
                        : '') + " id='marginRadio1" + i + "2'>USD " + jsonData.hmargin2 + "<i></i></label></td><td style='padding:3px 3px'><label class='mts-rad' style='min-width:70px'><input type='radio' name='" + jsonData.hbasicCode.trim() + "' value='" + jsonData.hmargin3 + "' class='radio' " + (jsonData.userMarginIdx == 2
                        ? 'checked'
                        : '') + " id='marginRadio1" + i + "3'>USD " + jsonData.hmargin3 + "<i></i></label></td><td style='padding:3px 3px'><button type='button' class='btn' name='" + jsonData.hbasicCode.trim() + "' onClick='sendTrMargin(1," + i + ")'>변경</button></td></tr>");
                }
                $('.mts-rad').each(function() {
                    if ($(this).find('.radio').is(":checked")) {
                        var thisName = $(this).find('.radio').attr('name');
                        $(this).closest('.mts-rad').addClass('on');
                    }
                });
                $('.mts-rad .radio').change(function() {
                    if ($(this).is(":checked")) {
                        var thisName = $(this).attr('name');
                        $(this).closest('.mts-rad').addClass('on');
                        $("input[name = " + thisName + "]:not(:checked)").closest('.mts-rad').removeClass('on');
                    }
                });
            }
        });
        $.ajax({
            type: "GET",
            url: serverUrl + "/overnight/userFutureInfo?username=" + username,
            dataType: "json",
            error: function() {
                alert('통신실패!!');
            },
            success: function(data) {
                for (let i = 0; i < data.length; i++) {
                    let jsonData = data[i];
                    $('#otherList').append("<tr><td>" + (jsonData.tcode == "LOCAL"
                        ? '선물/야간선물'
                        : '옵션/야간옵션') + "</td><td><label class='mts-rad'><input type='radio' name='" + jsonData.tcode.trim() + "' value='250000' class='radio' " + (jsonData.userMarginIdx == 0
                        ? 'checked'
                        : '') + " id='marginRadio2" + i + "1'>250,000<i></i></label></td><td><label class='mts-rad'><input type='radio' name='" + jsonData.tcode.trim() + "' value='500000' class='radio' " + (jsonData.userMarginIdx == 1
                        ? 'checked'
                        : '') + " id='marginRadio2" + i + "2'>500,000<i></i></label></td><td><label class='mts-rad'><input type='radio' name='" + jsonData.tcode.trim() + "' value='750000' class='radio' " + (jsonData.userMarginIdx == 2
                        ? 'checked'
                        : '') + " id='marginRadio2" + i + "3'>750,000<i></i></label></td><td><button type='button' class='btn' name='" + jsonData.tcode.trim() + "' onClick='sendTrMargin(2," + i + ")'>변경</button></td></tr>");
                }
                $('.mts-rad').each(function() {
                    if ($(this).find('.radio').is(":checked")) {
                        var thisName = $(this).find('.radio').attr('name');
                        $(this).closest('.mts-rad').addClass('on');
                    }
                });
                $('.mts-rad .radio').change(function() {
                    if ($(this).is(":checked")) {
                        var thisName = $(this).attr('name');
                        $(this).closest('.mts-rad').addClass('on');
                        $("input[name = " + thisName + "]:not(:checked)").closest('.mts-rad').removeClass('on');
                    }
                });
            }
        });
    });
}

function profitSearch(number) {
    if (delayCheck) {
        delayCheck = false;
        setTimeout(() => {
            delayCheck = true;
        }, 2000);
        if( ( Date.parse($('#startDate' + number).val()) <= Date.parse($('#endDate' + number).val()) ) && ( Date.parse($('#endDate' + number).val()) <= (Date.parse($('#startDate' + number).val()) + 3 * 30 * 24 * 60 * 60* 1000) ) ){
            let username = $('#username').val();
            let bdate = $('#startDate' + number).val().replace(/\-/g, '');
            let edate = $('#endDate' + number).val().replace(/\-/g, '');
            let props;
            if (number == 1) {
                props = ("/oversea?username=" + username + "&bdate=" + bdate + "&edate=" + edate);
            } else if (number == 2) {
                props = ("/future?username=" + username + "&bdate=" + bdate + "&edate=" + edate + "&btype=" + 0);
            } else if (number == 3) {
                props = ("/future?username=" + username + "&bdate=" + bdate + "&edate=" + edate + "&btype=" + 1);
            } else if (number == 4) {
                props = ("/option?username=" + username + "&bdate=" + bdate + "&edate=" + edate + "&btype=" + 0);
            } else if (number == 5) {
                props = ("/option?username=" + username + "&bdate=" + bdate + "&edate=" + edate + "&btype=" + 1);
            }
            $.ajax({
                type: "GET",
                url: serverUrl + "/profit" + props,
                dataType: "json",
                error: function() {
                    alert('통신실패!!');
                },
                success: function(data) {
                    let jsonData = data[0];
                        $.each(jsonData, function(key, value) {
                            $('#' + key + number).val(numberWithCommas((value * 1).toFixed(0)));
                        });
                }
            });
        }else{
            alert("잘못된 기간 설정입니다.");
        }
    }
}

function tradingSearch(number) {
    if (delayCheck) {
        delayCheck = false;
        setTimeout(() => {
            delayCheck = true;
        }, 2000);
        if( ( Date.parse($('#startDate' + number).val()) <= Date.parse($('#endDate' + number).val()) ) && ( Date.parse($('#endDate' + number).val()) <= (Date.parse($('#startDate' + number).val()) + 1 * 30 * 24 * 60 * 60* 1000) ) ){
            let username = $('#username').val();
            let bdate = $('#startDate' + number).val().replace(/\-/g, '');
            let edate = $('#endDate' + number).val().replace(/\-/g, '');
            let props;
            if (number == 1) {
                props = ("/totOversea?username=" + username + "&bdate=" + bdate + "&edate=" + edate);
            } else if (number == 2) {
                props = ("/totFuture?username=" + username + "&bdate=" + bdate + "&edate=" + edate + "&btype=" + 0);
            } else if (number == 3) {
                props = ("/totFuture?username=" + username + "&bdate=" + bdate + "&edate=" + edate + "&btype=" + 1);
            } else if (number == 4) {
                props = ("/totOption?username=" + username + "&bdate=" + bdate + "&edate=" + edate + "&btype=" + 0);
            } else if (number == 5) {
                props = ("/totOption?username=" + username + "&bdate=" + bdate + "&edate=" + edate + "&btype=" + 1);
            }
            $.ajax({
                type: "GET",
                url: serverUrl + "/profit" + props,
                dataType: "json",
                error: function() {
                    alert('통신실패!!');
                },
                success: function(data) {
                    for (let i = 0; i < data.length; i++) {
                        let jsonData = data[i];
                        $.each(jsonData, function(key, value) {
                            if (number == 1) {
                                if (key == "약정수량") {
                                    $('#' + key + i + number).text(numberWithCommas((value * 1)));
                                } else if (key == "손익률") {
                                    $('#' + key + i + number).text(numberWithCommas((value * 100).toFixed(0)) + " %");
                                } else {
                                    $('#' + key + i + number).text(numberWithCommas((value * 1)));
                                }
                            } else {
                                if (key == "손익률") {
                                    $('#' + key + i + number).text(numberWithCommas((value * 100).toFixed(0)) + " %");
                                } else {
                                    $('#' + key + i + number).text(numberWithCommas((value * 1)));
                                }
                            }
                        });
                    }
                }
            });
        }else{
            alert("잘못된 기간 선택입니다.");
        }
    }
}

function bankingSearch(number) {
    if (delayCheck) {
        delayCheck = false;
        setTimeout(() => {
            delayCheck = true;
        }, 2000);
        if( ( Date.parse($('#startDate' + number).val()) <= Date.parse($('#endDate' + number).val()) ) && ( Date.parse($('#endDate' + number).val()) <= (Date.parse($('#startDate' + number).val()) + 30 * 24 * 60 * 60* 1000) ) ){
            let username = $('#username').val();
            let bdate = $('#startDate' + number).val().replace(/\-/g, '');
            let edate = $('#endDate' + number).val().replace(/\-/g, '');
            let props;
            if (number == 1) {
                props = ("?username=" + username + "&bdate=" + bdate + "&edate=" + edate + "&btype=" + 0);
            } else if (number == 2) {
                props = ("?username=" + username + "&bdate=" + bdate + "&edate=" + edate + "&btype=" + 1);
            }
            $.ajax({
                type: "GET",
                url: serverUrl + "/bank/history" + props,
                dataType: "json",
                error: function() {
                    alert('통신실패!!');
                },
                success: function(data) {
                    $('.data' + number).remove();
                    if (data.length == 0) {
                        alert("조회된 내역이 없습니다.");
                    } else {
                        for (let i = 0; i < data.length; i++) {
                            $('#datalist' + number).append("<tr class='data" + number + "'><td>" + data[i].dateRequest.substring(0, 16) + "</td><td>" + data[i].bankingIOType + "</td><td class='price'>" + numberWithCommas(data[i].amountRequest) + "</td><td>" + ((data[i].dateConfirm==null)?"미승인":data[i].dateConfirm.substring(0, 16))  + "</td><td class='price'>" + numberWithCommas(data[i].amountConfirm) + "</td></tr>");
                        }

                    }
                }
            });
        }else{
            alert("잘못된 기간 설정입니다.");
        }
    }
}

function historySearch(tab, selector) {
    if (delayCheck) {
        delayCheck = false;
        setTimeout(() => {
            delayCheck = true;
        }, 2000);
        if( ( Date.parse($('#startDate' + tab + selector).val()) <= Date.parse($('#endDate' + tab + selector).val()) ) && ( Date.parse($('#endDate' + tab + selector).val()) <= (Date.parse($('#startDate' + tab + selector).val()) + 30 * 24 * 60 * 60* 1000) ) ){
            let username = $('#username').val();
            let bdate = $('#startDate' + tab + selector).val().replace(/\-/g, '');
            let edate = $('#endDate' + tab + selector).val().replace(/\-/g, '');
            let props = "?username=" + username + "&bdate=" + bdate + "&edate=" + edate + "&orderid=" + ((selector * 1) - 1)
            if (tab == 1) {
                props += ("&merchandiseid=" + 2 + "&marketid=" + 0);
            } else if (tab == 2) {
                props += ("&merchandiseid=" + 0 + "&marketid=" + 0);
            } else if (tab == 3) {
                props += ("&merchandiseid=" + 0 + "&marketid=" + 1);
            } else if (tab == 4) {
                props += ("&merchandiseid=" + 1 + "&marketid=" + 0);
            } else if (tab == 5) {
                props += ("&merchandiseid=" + 1 + "&marketid=" + 2);
            }
            $.ajax({
                type: "GET",
                url: serverUrl + "/trade/userHistory" + props,
                dataType: "json",
                error: function() {
                    alert('통신실패!!');
                },
                success: function(data) {
                    if (data.length == 0) {
                        alert("조회된 내역이 없습니다.");
                    }
                    $('.data' + tab + selector).remove();
                    if (tab == 1) {
                        for (let i = 0; i < data.length; i++) {
                            $('#dataTable' + tab + selector).append("<tr class='data" + tab + selector + "'><td>" + data[i].ordNum + "</td><td>" + (data[i].codeName == null
                                ? "만기종목"
                                : data[i].codeName) + "</td><td class=" + (data[i].positionTypeID == "66"
                                ? "mts-color-red"
                                : "mts-color-blue") + ">" + (data[i].positionTypeID == "66"
                                ? "매수"
                                : "매도") + "</td><td>" + (data[i].hogaTypeID == "1"
                                ? "시장가"
                                : "지정가") + "</td><td class='price'>" + data[i].volOrder + "</td><td class='price'>" + (data[i].priceOrder * 1).toFixed(5) + "</td><td >" + data[i].date + " " + data[i].time.substring(0, 5) + "</td></tr>");
                            }
                        } else {
                            for (let i = 0; i < data.length; i++) {
                                $('#dataTable' + tab + selector).append("<tr class='data" + tab + selector + "'><td>" + data[i].ordNum + "</td><td>" + (data[i].codeName == null
                                    ? "만기종목"
                                    : data[i].codeName) + "</td><td class=" + (data[i].positionTypeID == "66"
                                    ? "mts-color-red"
                                    : "mts-color-blue") + ">" + (data[i].positionTypeID == "66"
                                    ? "매수"
                                    : "매도") + "</td><td>" + (data[i].hogaTypeID == "1"
                                    ? "시장가"
                                    : "지정가") + "</td><td class='price'>" + data[i].volOrder + "</td><td class='price'>" + numberWithCommas((data[i].priceOrder * 1).toFixed(2)) + "</td><td >" + data[i].date + " " + data[i].time.substring(0, 5) + "</td></tr>");
                                }
                            }
                        }
                    });
        }else{
            alert("잘못된 기간 설정입니다.");
        }
    }
}

function sendTrDeposit() {
    if (delayCheck) {
        delayCheck = false;
        setTimeout(() => {
            delayCheck = true;
        }, 2000);
        let trData = JSON.stringify({
                tr: "0008",
                id: $('#username').val(),
                name: $('#depositName').val(),
                amount: numberRemoveCommas($('#depositAmount').val()),
                bank: "",
                bankowner: "",
                bankaccount: "",
                memo: ""
        });
        if (numberRemoveCommas($('#depositAmount').val()) != "" && (numberRemoveCommas($('#depositAmount').val()) * 1) != 0) {
            $.ajax({
                type: "POST",
                url: serverUrl1 + "/deposit",
                contentType: "application/json;charset=UTF-8",
                dataType: "json",
                data: trData,
                error: function() {
                    alert('통신실패!!');
                },
                success: function(data) {
                    console.log(data);
                }
            });

        } else {
            alert("잘못된 입금신청 데이터입니다.");
        }
    }
}

function sendTrWithdraw() {
    if (delayCheck) {
        delayCheck = false;
        setTimeout(() => {
            delayCheck = true;
        }, 2000);
        let trData = JSON.stringify({
                tr: "0009",
                id: $('#username').val(),
                name: $('#withdrawName').val(),
                amount: numberRemoveCommas($('#withdrawAmount').val()),
                bank: $('#withdrawBank').val(),
                bankowner: $('#withdrawName').val(),
                bankaccount: $('#withdrawBankAddr').val(),
                memo: $('#withdrawMemo').val()
        });
        if((numberRemoveCommas($('#userDeposit').text())*1) >= (numberRemoveCommas($('#withdrawAmount').val())*1)){
            if (bank != "" || bankowner != "" || bankaccount != "") {
                if (numberRemoveCommas($('#withdrawAmount').val()) != "" && (numberRemoveCommas($('#withdrawAmount').val()) * 1) != 0) {
                    $.ajax({
                        type: "POST",
                        url: serverUrl1 + "/withdraw",
                        contentType: "application/json;charset=UTF-8",
                        dataType: "json",
                        data: trData,
                        error: function() {
                            alert('통신실패!!');
                        },
                        success: function(data) {
                            console.log(data);
                        }
                    });

                } else {
                    alert("잘못된 출금신청 데이터입니다.");
                }
            } else {
                alert("출금계좌가 없는경우 고객센터로 전화 문의가 필요합니다");
            }
        }else{
            alert("출금신청 금액이 가능금액을 초과하였습니다");
        }
    }
}

function sendTrOverNight() {
    if (delayCheck) {
        delayCheck = false;
        setTimeout(() => {
            delayCheck = true;
        }, 2000);
        let overnight = "0";
        if ($('#overNightTrue').is(":checked")) {
            overnight = "1";
        }
        let trData = JSON.stringify({
                tr: "0010",
                id: $('#username').val(),
                overnight: overnight
        });
        $.ajax({
            type: "POST",
            url: serverUrl1 + "/overnight",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            data: trData,
            error: function() {
                alert('통신실패!!');
            },
            success: function(data) {
                console.log(data);
                // if (JSON.parse(data.response).result == "s_ok") {
                //     if(JSON.parse(data.response).overnight == "1"){
                //         alert("오버나잇이 설정 되었습니다.");
                //     }else{
                //         alert("오버나잇이 해제 되었습니다.");
                //     }
                // } else {
                //     alert("오버나잇 설정에 실패하였습니다.");
                // }
            }
        })
    }
}

function sendTrMargin(tab, selector) {
    if (delayCheck) {
        delayCheck = false;
        setTimeout(() => {
            delayCheck = true;
        }, 2000);
        let selectRadioNum
        for (let i = 1; i < 4; i++) {
            if ($('#marginRadio' + tab + selector + i).is(":checked")) {
                selectRadioNum = i;
            }
        }
        let trData = JSON.stringify({
            requestdata: JSON.stringify({
                tr: "0011",
                id: $('#username').val(),
                codeid: $('#marginRadio' + tab + selector + selectRadioNum).attr('name'),
                marginindex: (selectRadioNum - 1) + "",
                margin: $('#marginRadio' + tab + selector + selectRadioNum).val()
            })
        });
        $.ajax({
            type: "POST",
            url: serverUrl + "/sise/trans",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            data: trData,
            error: function() {
                alert('통신실패!!');
            },
            success: function(data) {
                if (JSON.parse(data.response).result == "s_ok") {
                    alert("증거금 설정 변경에 성공하였습니다.");
                } else {
                    alert(JSON.parse(data.response).message);
                }
            }
        });
    }
}

function sendTrBalance(username) {
    if (delayCheck) {
        delayCheck = false;
        setTimeout(() => {
            delayCheck = true;
        }, 2000);
        let trData = JSON.stringify({
            tr: "0019",
            id: username
        });
        $.ajax({
            type: "POST",
            url: serverUrl1 + "/Balance",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            data: trData,
            error: function() {
                alert('통신실패!!');
            },
            success: function(data) {
                console.log(data);
            }
        });
    }
}

function setBalance(data, numeral){
    $('#won').text(numeral(data.won).format('0,0') + " 원");
    $('#losscut').text(numeral(data.losscut).format('0,0') + " 원");

    $('#tot_eval').text(numeral(data.tot_eval).format('0,0') + " 원");
    if((data.tot_eval*1)>= 0){
        $('#tot_eval').attr('class',"price mts-color-red");
    }else{
        $('#tot_eval').attr('class',"price mts-color-blue");
    }
    $('#real_tot_sum').text(numeral(data.real_tot_eval).format('0,0') + " 원");
    if((data.real_tot_eval*1)>= 0){
        $('#real_tot_sum').attr('class',"price mts-color-red");
    }else{
        $('#real_tot_sum').attr('class',"price mts-color-blue");
    }
    $('#account_eval').text(numeral(data.account_eval).format('0,0') + " 원");
    if((data.account_eval*1)>= 0){
        $('#account_eval').attr('class',"price mts-color-red");
    }else{
        $('#account_eval').attr('class',"price mts-color-blue");
    }

    $('#future_ov').text(numeral(data.future_ov).format('0,0') + " 원");
    $('#oversea_ov').text(numeral(data.oversea_ov).format('0,0') + " 원");
}

function sendApiCheckid() {
    if ($('#username').val().length > 4) {
        idcheck = false;
        $.ajax({
            type: "GET",
            url: serverUrl + "/user/userIdChk?username=" + $('#username').val(),
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            error: function() {
                alert('통신실패!!');
            },
            success: function(data) {
                if (data.length != 0) {
                    alert("사용 불가능한 아이디입니다. 다른 아이디를 입력해주세요");
                    idcheck = false;
                } else {
                    alert("사용 가능한 아이디입니다.");
                    idcheck = true;
                }
            }
        });
    } else {
        alert("아이디가 너무 짧습니다.");
    }
}

function sendApiJoin() {
  if ($('#password').val() == $('#confirm').val() && $('#password').val()!="" && idcheck==true && $('#password').val().length > 3 && $('#email').val().length>0 && $('#name').val().length>0 && $('#phone').val().length>0 ) {

			$.ajax({
				type: "GET",
				url: serverUrl + "/user/newMember?username=" + $('#username').val().toLowerCase().replace(/ /gi, '') + "&password=" + $('#password').val() + "&name=" + $('#name').val() + "&mobile=" + $('#phone').val() + "&recommender=" + $("#recommender").val() + "&bank=" + $("#bank").val() + "&bankAccount=" + $("#bankAccount").val() + "&bankOwner=" + $("#bankOwner").val() + "&email="+$('#email').val(),
				contentType: "application/json;charset=UTF-8",
				dataType: "text",
				error: function(e) {
					alert('통신실패!!');
				},
				success: function() {
					let trData = JSON.stringify({
							tr: "0018",
							id: $('#username').val().replace(/ /gi, '')
					});
					$.ajax({
						type: "POST",
						url: serverUrl1 + "/RegisterMember",
						contentType: "application/json;charset=UTF-8",
						dataType: "json",
						data: trData,
						error: function() {
							alert('통신실패!!');
						},
						success: function(data) {
                            console.log(data);
						}
					});
				}
			});

  } else {
    alert("필수 입력정보에 문제가 있습니다. 다시 확인해주세요");
  }
}

function sendApiDepositInfo(username) {
    if (username == 'null') {
        username = $('#username').val();
    }
    $.ajax({
        type: "GET",
        url: serverUrl + "/deposit/userDepositInfo?username=" + username,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        error: function(e) {
            alert('통신실패!!');
        },
        success: function(resp) {
            if (resp[0].foreignEnableBalance * 1 > 0) {
                $('#foreignEnableBalance').text(numberWithCommas(resp[0].foreignEnableBalance));
                $('#enableOrderBalance').text(numberWithCommas(resp[0].foreignEnableBalance));
                $('#foreignEnableBalance1').val(numberWithCommas((resp[0].foreignEnableBalance * 1)));
                $('#foreignEnableBalance2').val(numberWithCommas((resp[0].foreignEnableBalance * 1)));
            } else {
                $('#foreignEnableBalance').text(numberWithCommas(0));
                $('#enableOrderBalance').text(numberWithCommas(0));
                $('#foreignEnableBalance1').val(numberWithCommas(0));
                $('#foreignEnableBalance2').val(numberWithCommas(0));
            }
            $('#foreignBuyBalance').text(numberWithCommas(resp[0].foreignBuyBalance));
            $('#foreignOvernight').text(numberWithCommas(resp[0].foreignOvernight));
            $('#futureBuyBalance').text(numberWithCommas((resp[0].futureBuyBalance * 1).toFixed(0)));
            $('#futureOvernight').text(numberWithCommas((resp[0].futureOvernight * 1).toFixed(0)));
            $('#nfutureBuyBalance').text(numberWithCommas((resp[0].nfutureBuyBalance * 1).toFixed(0)));
            $('#nfutureOvernight').text(numberWithCommas((resp[0].nfutureOvernight * 1).toFixed(0)));
            $('#optionLoan').text(numberWithCommas((resp[0].optionLoan * 1).toFixed(0)));
            $('#optionBuyBalance').text(numberWithCommas((resp[0].optionBuyBalance * 1).toFixed(0)));
            $('#optionOvernight').text(numberWithCommas((resp[0].optionOvernight * 1).toFixed(0)));
            $('#noptionLoan').text(numberWithCommas((resp[0].noptionLoan * 1).toFixed(0)));
            $('#noptionBuyBalance').text(numberWithCommas((resp[0].noptionBuyBalance * 1).toFixed(0)));
            $('#noptionOvernight').text(numberWithCommas((resp[0].noptionOvernight * 1).toFixed(0)));

            if (resp[0].enableOrderBalance * 1 > 0) {
                $('#enableOrderBalance0').text(numberWithCommas((resp[0].enableOrderBalance * 1).toFixed(0)));
                $('#enableOrderBalance1').text(numberWithCommas((resp[0].enableOrderBalance * 1).toFixed(0)));
                $('#enableOrderBalance2').text(numberWithCommas((resp[0].enableOrderBalance * 1).toFixed(0)));
                $('#enableOrderBalance3').text(numberWithCommas((resp[0].enableOrderBalance * 3).toFixed(0)));
                $('#enableOrderBalance4').text(numberWithCommas((resp[0].enableOrderBalance * 3).toFixed(0)));
                $('#enableOrderBalanceAvail1').text(numberWithCommas(((resp[0].enableOrderBalance * 4)) - ((resp[0].enableOrderBalance * 1) % 1)));
                $('#enableOrderBalanceAvail2').text(numberWithCommas(((resp[0].enableOrderBalance * 4)) - ((resp[0].enableOrderBalance * 1) % 1)));
                $('#ableChangeAmount1').val(numberWithCommas((resp[0].enableOrderBalance * 1) - ((resp[0].enableOrderBalance * 1) % 1)));
                $('#ableChangeAmount2').val(numberWithCommas((resp[0].enableOrderBalance * 1) - ((resp[0].enableOrderBalance * 1) % 1)));
            } else {
                $('#enableOrderBalance0').text(numberWithCommas(0));
                $('#enableOrderBalance1').text(numberWithCommas(0));
                $('#enableOrderBalance2').text(numberWithCommas(0));
                $('#enableOrderBalance3').text(numberWithCommas(0));
                $('#enableOrderBalance4').text(numberWithCommas(0));
                $('#enableOrderBalanceAvail1').text(numberWithCommas(0));
                $('#enableOrderBalanceAvail2').text(numberWithCommas(0));
                $('#ableChangeAmount1').val(numberWithCommas(0));
                $('#ableChangeAmount2').val(numberWithCommas(0));
            }
        }
    });
    $.ajax({
        type: "GET",
        url: serverUrl + "/exchange/history?username=" + username,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        error: function() {
            alert('통신실패!!');
        },
        success: function(data) {
            $('.data').remove();
            for (let i = 0; i < data.length; i++) {
                $('#dataTable').append("<tr class='data'><td>" + (data[i].type == "0"
                    ? "달러로환전"
                    : "원화로환전") + "</td><td class='price'>" + numberWithCommas((data[i].won * 1).toFixed(0)) + "</td><td class='price'>" + numberWithCommas((data[i].usd * 1).toFixed(2)) + "</td><td>" + numberWithCommas((data[i].exchangeRate * 1).toFixed(2)) + "</td><td>" + data[i].date.substring(0, 16) + "</td></tr>");
            }
        }
    });
}

function sendApiDepositInfo2(username) {
    if (delayCheck) {
        delayCheck = false;
        setTimeout(() => {
            delayCheck = true;
        }, 2000);
        if (username == 'null') {
            username = $('#username').val();
        }
        $.ajax({
            type: "GET",
            url: serverUrl + "/deposit/userDepositInfo?username=" + username,
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            error: function(e) {
                alert('통신실패!!');
            },
            success: function(resp) {
                if (resp[0].foreignEnableBalance * 1 > 0) {
                    $('#foreignEnableBalance').text(numberWithCommas(resp[0].foreignEnableBalance));
                    $('#enableOrderBalance').text(numberWithCommas(resp[0].foreignEnableBalance));
                    $('#foreignEnableBalance1').val(numberWithCommas((resp[0].foreignEnableBalance * 1)));
                    $('#foreignEnableBalance2').val(numberWithCommas((resp[0].foreignEnableBalance * 1)));
                } else {
                    $('#foreignEnableBalance').text(numberWithCommas(0));
                    $('#enableOrderBalance').text(numberWithCommas(0));
                    $('#foreignEnableBalance1').val(numberWithCommas(0));
                    $('#foreignEnableBalance2').val(numberWithCommas(0));
                }
                $('#foreignBuyBalance').text(numberWithCommas(resp[0].foreignBuyBalance));
                $('#foreignOvernight').text(numberWithCommas(resp[0].foreignOvernight));
                $('#futureBuyBalance').text(numberWithCommas((resp[0].futureBuyBalance * 1).toFixed(0)));
                $('#futureOvernight').text(numberWithCommas((resp[0].futureOvernight * 1).toFixed(0)));
                $('#nfutureBuyBalance').text(numberWithCommas((resp[0].nfutureBuyBalance * 1).toFixed(0)));
                $('#nfutureOvernight').text(numberWithCommas((resp[0].nfutureOvernight * 1).toFixed(0)));
                $('#optionLoan').text(numberWithCommas((resp[0].optionLoan * 1).toFixed(0)));
                $('#optionBuyBalance').text(numberWithCommas((resp[0].optionBuyBalance * 1).toFixed(0)));
                $('#optionOvernight').text(numberWithCommas((resp[0].optionOvernight * 1).toFixed(0)));
                $('#noptionLoan').text(numberWithCommas((resp[0].noptionLoan * 1).toFixed(0)));
                $('#noptionBuyBalance').text(numberWithCommas((resp[0].noptionBuyBalance * 1).toFixed(0)));
                $('#noptionOvernight').text(numberWithCommas((resp[0].noptionOvernight * 1).toFixed(0)));

                if (resp[0].enableOrderBalance * 1 > 0) {
                    $('#enableOrderBalance0').text(numberWithCommas((resp[0].enableOrderBalance * 1).toFixed(0)));
                    $('#enableOrderBalance1').text(numberWithCommas((resp[0].enableOrderBalance * 1).toFixed(0)));
                    $('#enableOrderBalance2').text(numberWithCommas((resp[0].enableOrderBalance * 1).toFixed(0)));
                    $('#enableOrderBalance3').text(numberWithCommas((resp[0].enableOrderBalance * 3).toFixed(0)));
                    $('#enableOrderBalance4').text(numberWithCommas((resp[0].enableOrderBalance * 3).toFixed(0)));
                    $('#enableOrderBalanceAvail1').text(numberWithCommas(((resp[0].enableOrderBalance * 4)) - ((resp[0].enableOrderBalance * 1) % 1)));
                    $('#enableOrderBalanceAvail2').text(numberWithCommas(((resp[0].enableOrderBalance * 4)) - ((resp[0].enableOrderBalance * 1) % 1)));
                    $('#ableChangeAmount1').val(numberWithCommas((resp[0].enableOrderBalance * 1) - ((resp[0].enableOrderBalance * 1) % 1)));
                    $('#ableChangeAmount2').val(numberWithCommas((resp[0].enableOrderBalance * 1) - ((resp[0].enableOrderBalance * 1) % 1)));
                } else {
                    $('#enableOrderBalance0').text(numberWithCommas(0));
                    $('#enableOrderBalance1').text(numberWithCommas(0));
                    $('#enableOrderBalance2').text(numberWithCommas(0));
                    $('#enableOrderBalance3').text(numberWithCommas(0));
                    $('#enableOrderBalance4').text(numberWithCommas(0));
                    $('#enableOrderBalanceAvail1').text(numberWithCommas(0));
                    $('#enableOrderBalanceAvail2').text(numberWithCommas(0));
                    $('#ableChangeAmount1').val(numberWithCommas(0));
                    $('#ableChangeAmount2').val(numberWithCommas(0));
                }
            }
        });
        $.ajax({
            type: "GET",
            url: serverUrl + "/exchange/history?username=" + username,
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            error: function() {
                alert('통신실패!!');
            },
            success: function(data) {
                $('.data').remove();
                for (let i = 0; i < data.length; i++) {
                    $('#dataTable').append("<tr class='data'><td>" + (data[i].type == "0"
                    ? "달러로환전"
                    : "원화로환전") + "</td><td class='price'>" + numberWithCommas((data[i].won * 1).toFixed(0)) + "</td><td class='price'>" + numberWithCommas((data[i].usd * 1).toFixed(2)) + "</td><td>" + numberWithCommas((data[i].exchangeRate * 1).toFixed(2)) + "</td><td>" + data[i].date.substring(0, 16) + "</td></tr>");
                }
            }
        });
    }
}

function sendApiExchange() {
    $.ajax({
        type: "GET",
        url: serverUrl + "/exchange/currExchange",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        error: function(e) {
            alert('통신실패!!');
        },
        success: function(resp) {
            $('#exRate').text(resp[0].exRate);
        }
    });
}

function sendTrExchange(kind) {
    if (delayCheck) {
        delayCheck = false;
        setTimeout(() => {
            delayCheck = true;
        }, 2000);
        let amountwonData;
        let amountusdData;
        if (kind == 0) {
            amountwonData = numberRemoveCommas($('#won').val());
            amountusdData = 0;
        } else {
            amountwonData = 0;
            amountusdData = numberRemoveCommas($('#usd').val());
        }
        let trData = JSON.stringify({
            requestdata: JSON.stringify({
                tr: "0012",
                id: $('#username').val(),
                kind: kind + "",
                amountwon: amountwonData + "",
                amountusd: amountusdData + ""
            })
        });
        if (kind == 0 && amountwonData != "" || kind == 1 && amountusdData != "") {
            if (numberRemoveCommas($('#ableChangeAmount1').val()) >= (amountwonData * 1) && numberRemoveCommas($('#foreignEnableBalance1').val()) >= (amountusdData * 1) && (amountwonData > 0 || amountusdData > 0)) {
                $.ajax({
                    type: "POST",
                    url: serverUrl + "/sise/trans",
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    data: trData,
                    error: function() {
                        alert('통신실패!!');
                    },
                    success: function(data) {
                        if (JSON.parse(data.response).result == "s_ok") {
                            sendApiDepositInfo($('#username').val());
                            alert("환전처리 되었습니다.");
                        } else {
                            alert(JSON.parse(data.response).message);
                        }
                    }
                });
            } else {
                alert("환전 요청 금액이 잘못 설정되었습니다.");
            }
        } else {
            alert("환전 요청 금액이 잘못 설정되었습니다.");
        }
    }
}

function sendApiGetUserDeposit(username) {
    $.ajax({
        type: "GET",
        url: serverUrl + "/user/userDepositInfo?username=" + username,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        error: function(e) {
            alert('통신실패!!');
        },
        success: function(resp) {
            $('#userDeposit').text(numberWithCommas((resp[0].bankBalance * 1).toFixed(0)));
        }
    });
    $.ajax({
        type: "GET",
        url: serverUrl + "/user/userOutBalanceInfo?username=" + username,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        error: function(e) {
            alert('통신실패!!');
        },
        success: function(resp) {
            console.log(resp);
            $('#withdrawing').val(numberWithCommas((resp[0].bankOutBalance * 1).toFixed(0)));
        }
    });
    $.ajax({
        type: "GET",
        url: serverUrl + "/user/userBankInfo?username=" + username,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        error: function(e) {
            alert('통신실패!!');
        },
        success: function(resp) {
            if (resp.length > 0) {
                $('#withdrawBank').val(resp[0].bank);
                $('#withdrawBankAddr').val(resp[0].bankAccount);
                $('#withdrawName').val(resp[0].bankOwner);
                $('#depositName').val(resp[0].bankOwner);
            }
        }
    });
    $.ajax({
        type: "GET",
        url: serverUrl + "/company/bankinfo",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        error: function(e) {
            alert('통신실패!!');
        },
        success: function(resp) {
            $('#bank').text(resp[0].value);
            $('#bankAddr').text(resp[1].value);
            $('#bankName').text(resp[2].value);
        }
    });
}

function sendApiNoice() {
    setTimeout(() => {
        $.ajax({
            type: "GET",
            url: serverUrl + "/notice/list?username=12345678910",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            error: function(e) {
                alert('통신실패!!');
            },
            success: function(resp) {
                if (resp.length == 0) {
                    alert("공지사항이 없습니다.");
                } else {
                    for (let i = 0; i < resp.length; i++) {
                        $('#noticeList').append("<dl><dt><em>[" + resp[i].time + "]</em>" + resp[i].title + "</dt><dd>" + resp[i].body + "</dd></dl>");
                    }
                }
                $('.mts-toggle-content dt').on("click", function() {
                    if (!$(this).parent('dl').hasClass('on')) {
                        toggleIndex = $(this).parent('dl').index();
                        $('.mts-toggle-content > dl').removeClass('on');
                        $(this).parent('dl').addClass('on');
                    } else {
                        $(this).parent('dl').removeClass('on');
                    }
                });
            }
        });
    }, 500);
}

function balanceReal(numeral, won, losscut, tot_eval, real_tot_eval, account_eval){
  $('#won').text(numeral(won).format('0,0')+" 원");
  $('#losscut').text(numeral(losscut).format('0,0')+" 원");
  $('#tot_eval').text(numeral(tot_eval).format('0,0')+" 원");
  $('#real_tot_sum').text(numeral(real_tot_eval).format('0,0')+" 원");
  $('#account_eval').text(numeral(account_eval).format('0,0')+" 원");
  if((tot_eval*1)>= 0){
      $('#tot_eval').attr('class',"price mts-color-red");
  }else{
      $('#tot_eval').attr('class',"price mts-color-blue");
  }
  if((real_tot_eval*1)>= 0){
      $('#real_tot_sum').attr('class',"price mts-color-red");
  }else{
      $('#real_tot_sum').attr('class',"price mts-color-blue");
  }
  if((account_eval*1)>= 0){
      $('#account_eval').attr('class',"price mts-color-red");
  }else{
      $('#account_eval').attr('class',"price mts-color-blue");
  }
}

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1]
        ? "." + parts[1]
        : "");
}

function numberRemoveCommas(x) {
    return x.toString().replace(/\,/g, '');
}

var rgx1 = /[^0-9]/g; // /[^0-9]/g 와 같은 표현
var rgx2 = /(\d+)(\d{3})/;
var rgx3 = /[^\.0-9]/g; // /[^0-9]/g 와 같은 표현

function getNumber(obj) {

    var num01;
    var num02;
    num01 = obj.value;
    num02 = num01.replace(rgx1, "");
    obj.value = setComma(num02);

}

function getNumber2(obj) {
    var num01;
    var num02;
    var num03;
    num01 = obj.value;
    num02 = num01.replace(rgx3, "");
    var parts = num02.toString().split(".");
    obj.value = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts.length > 1
        ? "." + parts[1]
        : "");
}

function setComma(inNum) {
    var rgx2 = /(\d+)(\d{3})/;
    var outNum;
    outNum = inNum;
    while (rgx2.test(outNum)) {
        outNum = outNum.replace(rgx2, '$1' + ',' + '$2');
    }
    return outNum;
}

function strip_comma(data) {
    var flag = 1;
    var valid = "1234567890";
    var output = '';
    if (data.charAt(0) == '-') {
        flag = 0;
        data = data.substring(1);
    }

    for (var i = 0; i < data.length; i++) {
        if (valid.indexOf(data.charAt(i)) != -1)
            output += data.charAt(i)
    }

    if (flag == 1)
        return output;
    else if (flag == 0)
        return ('-' + output);
    }

function add_comma(what) {
    var flag = 1;
    var data = what;
    var len = data.length;
    var split1;
    var split2;
    var split3;
    /*
		   if (data.charAt(0) == '-')
		   {
		       flag = 0;
		       data = data.substring(1);
		   }
		   if (data.charAt(0) == '0' && data.charAt(1) == '-')
		   {
		       flag = 0;
		       data = data.substring(2);
		   }
		*/
    if (data.charAt(0) == '-') {
        flag = 0;
        data = data.substring(1);
    }
    if (data.charAt(0) == '0' && data.charAt(1) == '-') {
        flag = 0;
        data = data.substring(2);
    }
    if (data.indexOf('.') >= 0) {
        split2 = data.substring(0, data.indexOf('.'));
        split3 = data.substr(data.indexOf('.'));
    } else {
        split2 = data;
        split3 = '';
    }
    var number = strip_comma(split2);
    number = '' + number;
    //            alert(number);
    if (number.length > 3) {
        var mod = number.length % 3;
        var output = (mod > 0
            ? (number.substring(0, mod))
            : '');
        for (i = 0; i < Math.floor(number.length / 3); i++) {
            if ((mod == 0) && (i == 0))
                output += number.substring(mod + 3 * i, mod + 3 * i + 3);
            else
                output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
            }
        if (flag == 0) {
            if (split3.substring(0, 2) == ".." || split3.substring(0, 3) == "...") {
                split3_1 = split3.substring(0, 1);
                return '-' + output + split3_1;
            } else if (!(split3.substring(1, 2) >= '0' && split3.substring(1, 2) <= '9')) {
                split3_1 = split3.substring(0, 1);
                return '-' + output + split3_1;
            } else if (!(split3.substring(2, 3) >= '0' && split3.substring(2, 3) <= '9')) {
                split3_1 = split3.substring(0, 2);
                return '-' + output + split3_1;
            } else {
                split3_1 = split3.substring(0, 3);
                return '-' + output + split3_1;
            }
        } else {
            if (split3.substring(0, 2) == ".." || split3.substring(0, 3) == "...") {
                split3_1 = split3.substring(0, 1);
                return output + split3_1;
            } else if (!(split3.substring(1, 2) >= '0' && split3.substring(1, 2) <= '9')) {
                split3_1 = split3.substring(0, 1);
                return output + split3_1;
            } else if (!(split3.substring(2, 3) >= '0' && split3.substring(2, 3) <= '9')) {
                split3_1 = split3.substring(0, 2);
                return output + split3_1;
            } else {
                split3_1 = split3.substring(0, 3);
                return output + split3_1;
            }
        }
    } else {
        if (flag == 0) {
            if (split3.substring(0, 2) == ".." || split3.substring(0, 3) == "...") {
                split3_1 = split3.substring(0, 1);
                return '-' + number + split3_1;
            } else if (!(split3.substring(1, 2) >= '0' && split3.substring(1, 2) <= '9')) {
                split3_1 = split3.substring(0, 1);
                return '-' + number + split3_1;
            } else if (!(split3.substring(2, 3) >= '0' && split3.substring(2, 3) <= '9')) {
                split3_1 = split3.substring(0, 2);
                return '-' + number + split3_1;
            } else {
                split3_1 = split3.substring(0, 3);
                return '-' + number + split3_1;
            }
        } else {
            if (split3.substring(0, 2) == ".." || split3.substring(0, 3) == "...") {
                split3_1 = split3.substring(0, 1);
                return number + split3_1;
            } else if (!(split3.substring(1, 2) >= '0' && split3.substring(1, 2) <= '9')) {
                split3_1 = split3.substring(0, 1);
                return number + split3_1;
            } else if (!(split3.substring(2, 3) >= '0' && split3.substring(2, 3) <= '9')) {
                split3_1 = split3.substring(0, 2);
                return number + split3_1;
            } else {
                split3_1 = split3.substring(0, 3);
                return number + split3_1;
            }
        }
    }

}

function replace(str, original, replacement) {
    var result;
    result = "";
    while (str.indexOf(original) != -1) {
        if (str.indexOf(original) > 0)
            result = result + str.substring(0, str.indexOf(original)) + replacement;
        else
            result = result + replacement;
        str = str.substring(str.indexOf(original) + original.length, str.length);
    }
    return result + str;
}

function comma13(what) {
    var data = what.value;

    if ((event.keyCode == 107) || (event.keyCode == 187)) {
        if ((data == "+") || (data == "0+") || (Math.floor(replace((replace(data, "+", "")), ",", "")) == 0)) {
            dataval = "";
        } else {
            var dataval = data + '000';
            dataval = replace(dataval, "+", "");
        }
    } else {
        if (Math.floor(data) == 0) {
            // dataval = "";
            dataval = data;
        } else {
            var dataval = data;
        }
    }

    what.value = add_comma(dataval);
}

Date.prototype.format = function(f) {
    if (!this.valueOf())
        return " ";
    var weekName = [
        "일요일",
        "월요일",
        "화요일",
        "수요일",
        "목요일",
        "금요일",
        "토요일"
    ];
    var d = this;
    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy":
                return d.getFullYear();
            case "yy":
                return (d.getFullYear() % 1000).zf(2);
            case "MM":
                return (d.getMonth() + 1).zf(2);

            case "dd":
                return d.getDate().zf(2);

            case "E":
                return weekName[d.getDay()];

            case "HH":
                return d.getHours().zf(2);

            case "hh":
                return ((h = d.getHours() % 12)
                    ? h
                    : 12).zf(2);

            case "mm":
                return d.getMinutes().zf(2);

            case "ss":
                return d.getSeconds().zf(2);

            case "a/p":
                return d.getHours() < 12
                    ? "오전"
                    : "오후";

            default:
                return $1;

        }

    });

};

String.prototype.string = function(len) {
    var s = '',
        i = 0;
    while (i++ < len) {
        s += this;
    }
    return s;
};
String.prototype.zf = function(len) {
    return "0".string(len - this.length) + this;
};
Number.prototype.zf = function(len) {
    return this.toString().zf(len);
};
