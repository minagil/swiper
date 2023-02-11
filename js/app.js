var UiMainTab = (function(){
  var btnTab = null;
  var tabGroups = null;
  var _this = this;

  function UiMainTab(){
    _this = this;
    btnTab = document.querySelector('.tab_wrap .tab_list');
    tabGroups = document.querySelectorAll('.tab_wrap .tab_content .tab_group');

    this.eventTab();
  }
  
  UiMainTab.prototype.eventTab = function(){
    btnTab.addEventListener('click', function(event){
      _this.executiveTabs(event);
    });
  };

  UiMainTab.prototype.executiveTabs = function(e){
    var nodes = btnTab.children;
    for(var i=0;i<nodes.length;i++){
      nodes[i].classList.remove('active');
    }
    var currentBtnTab = e.target.closest('li');
    currentBtnTab.classList.add('active');
    
    for(var i=0;i<tabGroups.length;i++){
      tabGroups[i].classList.remove('active');
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

    for(let index=0;index<mainFatureSwipers.length;index++){
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
      if (slideNumber[index] > viewNumber){
        loopCheck = true;
      }else{ 
        loopCheck = false;
      }

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
            console.log(mainFatureSwipers[index])
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

    }
  }

  return mainTabSlider;
}());

var main_tab_slider = new mainTabSlider();