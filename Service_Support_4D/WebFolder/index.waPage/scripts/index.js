
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var tfUserName = {};	// @textField
	var container5 = {};	// @container
	var documentEvent = {};	// @document
	var btnLogin = {};	// @richText
// @endregion// @endlock

// eventHandlers// @lock

	tfUserName.click = function tfUserName_click (event)// @startlock
	{// @endlock
		$$('cpmProfile').loadComponent('/Profile.waComponent');
	};// @lock

	container5.click = function container5_click (event)// @startlock
	{// @endlock
		var url = sources.arrMenu.Link;
		history.pushState({
            path: url
        }, url, url);
       
        if(url!=''){
      	  $$('frmBody').setValue(url+"?Index=1");
      	}
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		var currentUser = waf.directory.currentUser();
		
		if( currentUser == null ){
			$$('matrix1').hide();
		}
		
		var Width = $(window).innerWidth();
		var Height = $(window).innerHeight(); // returns height of browser viewport
		$$('cpmProfile').move(-Width+"px", -Height+"px");
		$$('frmBody').setHeight(Height-115);
		$$('frmBody').setWidth(Width-265);
		$$('ctnMenus').setHeight($$('frmBody').getHeight()+40);
		$$('ctnBanner').setWidth(Width-30);
		$$('ctnBreadcrumbs').setWidth(Width-270);
		$$('ctnLogin').setLeft($$('ctnBanner').getWidth()-340);
		$$('ctnCredits').move("0px",$$('ctnMenus').getHeight()-50+"px");
		
		sources.arrMenu.addNewElement({
			ID: 1,
			Title: 'Casos de Estudio',
			Icon: '/images/table.png',
			Link: '/Cases.waPage/index.html',
			Opcion: false
		});
		sources.arrMenu.addNewElement({
			ID: 2,
			Title: 'Informes',
			Icon: '/images/onebit_16.png',
			Link: '/Informes.waPage/index.html',
			Opcion: false
		});
		sources.arrMenu.addNewElement({
			ID: 3,
			Title: 'Configuración',
			Icon: '/images/onebit_09.png',
			Link: '/Cases.waPage/index.html',
			Opcion: false
		});
		
		var url = window.location.href;
		var callback =  getUrlVars()["callback"];
		
		try{
			if(callback.length > 4){
				history.pushState({
		            path: callback
		        }, callback, callback);
		        $$('frmBody').setValue(callback+"?Index=1");
			}
		}catch(e){
		}
	};// @lock

	btnLogin.click = function btnLogin_click (event)// @startlock
	{// @endlock
		if($$("btnLogin").getValue() == "Salir"){
			waf.directory.logout();
			location.reload();
		}else{
			window.location.href = window.location.href+"?Login";
		}
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("tfUserName", "click", tfUserName.click, "WAF");
	WAF.addListener("container5", "click", container5.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("btnLogin", "click", btnLogin.click, "WAF");
// @endregion
};// @endlock

function getUrlVars(){
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}