var UiMainTab = (function(){
  var _btnTab = '';
  var _tabGroups = '';
  var _this = '';

  function UiMainTab(){
    _this = this;
    _btnTab = document.querySelector('.tab_wrap .tab_list');
    _tabGroups = document.querySelectorAll('.tab_wrap .tab_content .tab_group');

    _this.eventTab();
  }
  
  UiMainTab.prototype.eventTab = function(){
    _btnTab.addEventListener('click', function(event){
      _this.executiveTabs(event);
    });
  };

  UiMainTab.prototype.executiveTabs = function(e){
    var nodes = _btnTab.children;
    for(var i=0;i<nodes.length;i++){
      nodes[i].classList.remove('active');
    }
    var currentBtnTab = e.target.closest('li');
    currentBtnTab.classList.add('active');
    
    for(var i=0;i<_tabGroups.length;i++){
      _tabGroups[i].classList.remove('active');
    }
    var currentDataMenu = e.target.dataset.menu;
    var targetTabGroup = document.querySelector('.tab_wrap .tab_content .tab_group[data-menu="'+currentDataMenu+'"]');
    targetTabGroup.classList.add('active');
  }

  return UiMainTab;
}());

var uiMainTab = new UiMainTab();

var mainTabSlider = (function(){
  var swiperArray = [];
  var slideIndex = [];
  var slideNumber = [];
  var loopCheck = '';
  var viewNumber = '';
  var deviceCheck = '';
  var _this = this;
  // var funcs = [];

  function mainTabSlider(){
    _this = this;
    _this.setSlideItem();
    _this.setDeviceCheck();
  }

  mainTabSlider.prototype.setSlideItem = function(){
    swiperArray.push(undefined);
    var mainFatureSwiper = document.querySelector('.main_feature_swiper');
    var mainFatrueSlides = mainFatureSwiper.querySelectorAll('.main_feature_slide_list_item');
    slideNumber.push(mainFatrueSlides.length);
    slideIndex.push(0);
  }

  mainTabSlider.prototype.setDeviceCheck = function(){
    window.addEventListener('load', function(){
      _this.checkDevice();
    });

    window.addEventListener('resize', function(){
      _this.checkDevice();
    });
  }

  mainTabSlider.prototype.checkDevice = function(){
    var winWidth = window.innerWidth;
      if(deviceCheck !== 'pc' && winWidth > 1280){ //PC 버전
        deviceCheck = 'pc';
        _this.executiveSlide();
      }else if(deviceCheck !== 'tablet' && 1281 > winWidth && winWidth > 767){ //태블릿 버전
        deviceCheck = 'tablet';
        _this.executiveSlide();
      }else if(deviceCheck !== 'mobile' && winWidth < 768){ //모바일 버전
        deviceCheck = 'mobile';
        _this.executiveSlide();
      }
  }

  mainTabSlider.prototype.executiveSlide = function(){
    var mainFatureSwipers = document.querySelectorAll('.main_feature_swiper');

    for(var i=0;i<mainFatureSwipers.length;i++){
      (function(index){
      // 슬라이드 초기화
      if(swiperArray[index] !== undefined) {
        swiperArray[index].destroy();
        swiperArray[index] = undefined;
      }

      // slidePerView 옵션 설정
      if (deviceCheck === 'pc'){
        viewNumber = 4;
      }else if(deviceCheck === 'tablet'){
        viewNumber = 3;
      }else if(deviceCheck === 'mobile'){
        viewNumber = 2;
      }

      // loop옵션 체크
      slideNumber[index] > viewNumber ? loopCheck = true : loopCheck = false;

      swiperArray[index] = new Swiper(mainFatureSwipers[index].querySelector('.main_feature_inner'), {
        slidesPerView: viewNumber,
        initialSlide : slideIndex[index],
        spaceBetween: 14,
        observer: true, 
        observeParents: true,
        loop: loopCheck,
        navigation: {
          nextEl: mainFatureSwipers[index].querySelector('.swiper-next'),
          prevEl: mainFatureSwipers[index].querySelector('.swiper-prev'),
        },
        on: {
          activeIndexChange: function(){
            if(mainFatureSwipers[index].parentNode.style.display !== 'none'){
              slideIndex[index] = this.realIndex; // 현재 슬라이드 index 갱신
            }
          }
        }
      });

      // 슬라이드 배열 값 추가
      if(swiperArray[index] === undefined){
        swiperArray[index] = swiper;
      }
      }(i));
      
    }
  }

  return mainTabSlider;
}());

var main_tab_slider = new mainTabSlider();