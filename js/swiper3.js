var UiMainTab = (function(){
  var btnTab = '';
  var tabGroups = '';
  var _this = '';

  function UiMainTab(){
    _this = this;
    btnTab = document.querySelector('.tab_wrap .tab_list');
    tabGroups = document.querySelectorAll('.tab_wrap .tab_content .tab_group');

    _this.eventTab();
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

var MainTabSlider = (function(){
  var slideItemNumber = [];
  var slideIndex = [];
  var mainTabSliderArray = [];
  var mainSwiper = null;
  var _this = null;
  var deviceCheck = '';
  var viewNumber = '';

  function MainTabSlider(props){
    mainSwiper = this.setIndex(document.querySelectorAll('.main_feature_swiper'));
    this.setDeviceCheck();
    this.setSlide();
    return _this = this;
  }
  
  MainTabSlider.prototype.setDeviceCheck = function(){
    window.addEventListener('load', function(){
      _this.getDeviceCheck();
      _this.moveSlide();
    });

    window.addEventListener('resize', function(){
      _this.getDeviceCheck();
      _this.moveSlide();
    });
  }

  MainTabSlider.prototype.getDeviceCheck = function(){
    var winWidth = window.innerWidth;
    if(deviceCheck !== 'pc' && winWidth> 1280){
      deviceCheck = 'pc';
    }else if(deviceCheck !== 'tablet' && 1281 > winWidth && winWidth > 767){
      deviceCheck= 'tablet';
    }else if(deviceCheck !== 'mobile'&& winWidth < 768){
      deviceCheck = 'mobile';
    }

    return deviceCheck;
  }

  MainTabSlider.prototype.setIndex = function(elements){
    return Array.prototype.slice.call(elements)
  }

  MainTabSlider.prototype.setSlide = function(){
    mainTabSliderArray.push(undefined);
    mainSwiper.forEach(function (el,i){
      var items = el.querySelectorAll('.main_feature_slide_list_item');
      slideItemNumber.push(items.length);
      slideIndex.push(0);
    });
  }

  MainTabSlider.prototype.moveSlide = function(){
    mainSwiper.forEach(function(el,i){

      if(mainTabSliderArray[i] !== undefined){
        mainTabSliderArray[i].destroy();
        mainTabSliderArray[i] = undefined;
      }

      if(deviceCheck === 'pc') {
        viewNumber = 4;
      }else if(deviceCheck === 'tablet'){
        viewNumber = 3;
      }else if(deviceCheck === 'mobile'){
        viewNumber = 2;
      }

      mainTabSliderArray[i] = new Swiper(el.querySelector('.main_feature_inner'), {
        slidesPerView: viewNumber,
        initialSlide : slideIndex[i],
        spaceBetween: 14,
        observer: true, 
        observeParents: true,
        loop: true,
        navigation: {
          nextEl: el.querySelector('.swiper-next'),
          prevEl: el.querySelector('.swiper-prev'),
        },
        on :{
          activeIndexChange:function(){
            if(el.parentNode.style.display !== 'none'){
              slideIndex[i] = this.realIndex; // 현재 슬라이드 index 갱신
            }
          }
        },
      });
    });
  }

  return MainTabSlider;
}());

const mainTabSlide= new MainTabSlider();
