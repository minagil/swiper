
// https://www.kobc.or.kr/ebz/kor/main.do
$(document).ready(function(){
  // 메인 비주얼 슬라이드
  var kobcVisualSwiper = new Swiper('.kobc-visual-swiper', {
  //loop: true,
  slidesPerView:1,
  speed: 500,
  effect:'fade',
  observer: true,
  observeParents: true,
  simulateTouch: true,
  autoplay: {
  delay: 5000,
  },
  navigation: {
  nextEl: '.kobc-visual-next',
  prevEl: '.kobc-visual-prev'
  },
  on: {
  init: function () {
  kobcVisualIndex(this);
  },
  slideChangeTransitionStart: function () {
  kobcVisualIndex(this);
  },
  },
  });
  
  // 메인 비주얼 슬라이드 전체 슬라이드 갯수 및 현재 슬라이드 카운팅
  function kobcVisualIndex(data){
  var kobcVisualTotal = data.slides.length;
  var kobcVisualCurrent = data.realIndex + 1;
  
  $('.kobc-visual .inner .total').text(kobcVisualTotal);
  $('.kobc-visual .inner .current').text(kobcVisualCurrent);
  }
  
  // 메인 비주얼슬라이드 정지 버튼
  $('.kobc-visual-pause').click(function(){
  kobcVisualSwiper.autoplay.stop();
  $(this).hide();
  $('.kobc-visual-play').show();
  });
  
  
  // 메인 비주얼슬라이드 플레이 버튼
  $('.kobc-visual-play').click(function(){
  kobcVisualSwiper.autoplay.start();
  $(this).hide();
  $('.kobc-visual-pause').show();
  });
  
  
  
  
  
  // 메인 팝업슬라이드
  var kobcPopupSwiper = new Swiper('.visual-popup-swiper .el', {
  //loop: true,
  slidesPerView:1,
  speed: 1000,
  observer: true,
  observeParents: true,
  simulateTouch: true,
  spaceBetween: 10,
  autoplay: {
  delay: 5000,
  },
  navigation: {
  nextEl: '.visual-popup-next',
  prevEl: '.visual-popup-prev'
  },
  on: {
  init: function () {
  kobcPopIndex(this);
  },
  slideChangeTransitionStart: function () {
  kobcPopIndex(this);
  },
  },
  });
  
  
  // 메인 팝업슬라이드 전체 슬라이드 갯수 및 현재 슬라이드 카운팅
  
  function kobcPopIndex(data) {
      var kobcPopupTotal = data.slides.length;
      var kobcPopupCurrent = data.realIndex + 1;
  
      $('.visual-popup-swiper .total').text(
          kobcPopupTotal);
      $('.visual-popup-swiper .current').text(
          kobcPopupCurrent);
    }
  
    // 메인 팝업슬라이드 정지 버튼
    $('.visual-popup-pause').click(function() {
      kobcPopupSwiper.autoplay.stop();
      $(this).hide();
      $('.visual-popup-play').show();
    });
  
    // 메인 팝업슬라이드 플레이 버튼
    $('.visual-popup-play').click(function() {
      kobcPopupSwiper.autoplay.start();
      $(this).hide();
      $('.visual-popup-pause').show();
    });
  
    // 메인 비주얼 슬라이드 다음 버튼 포커스 아웃 시 팝업 슬라이드 정지 및 순번 초기화
    $('.kobc-visual-next').blur(function() {
      kobcPopupSwiper.autoplay.stop();
  
      kobcPopupSwiper.slideTo(0);
    });
  
    // 메인 팝업슬라이드 탭 포커싱 시 해당 슬라이드로 이동
    $('.visual-popup-swiper .swiper-slide a').focus(function() {
      var i = $(this).parent('.swiper-slide').index();
  
      $('.visual-popup-swiper .swiper-slide').eq(
          i).addClass('focus').siblings()
          .removeClass('focus');
      //console.log(i);
  
      // i 번째 슬라이드로 0.1초 속도로 이동
      kobcPopupSwiper.slideTo(i, 100);
    });
  
    /* 메인 팝업슬라이드 마지막 슬라이드에서 포커스 아웃 시 클래스 제거 */
    $('.visual-popup-swiper .swiper-slide:last-child a')
        .blur(
            function() {
              $(
                  '.visual-popup-swiper .swiper-slide')
                  .removeClass('focus');
            });
  
    /* 메인 팝업슬라이드 클래스 토글(우측으로 숨김처리 에니메이션) */
    $('.visual-popup-swiper-close')
        .click(
            function() {
              $('.visual-popup-swiper')
                  .toggleClass('active');
  
              if ($(
                  ".visual-popup-swiper-close > img")
                  .attr("src") == "/ebz/kor/images/main/pop_cl_btn.png") {
                $(
                    ".visual-popup-swiper-close > img")
                    .attr("src",
                        "/ebz/kor/images/main/pop_open_btn.png");
              } else {
                $(
                    ".visual-popup-swiper-close > img")
                    .attr("src",
                        "/ebz/kor/images/main/pop_cl_btn.png");
              }
  
            });
  
  });