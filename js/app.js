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
    
    var currentDataMenu = e.target.dataset.menu;

    for(var i=0;i<tabGroups.length;i++){
      tabGroups[i].classList.remove('active');
    }
    var targetTabGroup = document.querySelector('.tab_wrap .tab_content .tab_group[data-menu="'+currentDataMenu+'"]');
    targetTabGroup.classList.add('active');
  }

  return UiMainTab;
}());

var uiMainTab = new UiMainTab();
