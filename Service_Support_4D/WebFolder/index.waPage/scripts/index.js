
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var combobox1 = {};	// @combobox
	var tfUserName = {};	// @textField
	var documentEvent = {};	// @document
	var btnLogin = {};	// @richText
// @endregion// @endlock
	var lastItemBreadCrumbs;
	var vlnHistoryPush = 0; 
	var vbChangeState = false;
// eventHandlers// @lock

	combobox1.click = function combobox1_click (event)// @startlock
	{// @endlock
		vbChangeState = true;
	};// @lock

	combobox1.change = function combobox1_change (event)// @startlock
	{// @endlock
		if(vbChangeState){
			sources.arrMenu.selectByKey($$("combobox1").getValue());
			var srcImg = source.arrMenu.Icon;
			waf.widgets.imgMenu.setValue(srcImg);
			
			var url = source.arrMenu.Link;    
			var currentUser = waf.directory.currentUser();
			if((url!= undefined) && (currentUser != null)){
				var vlnCookie = document.cookie.split(";")[0];
				vlnCookie = vlnCookie.substr(vlnCookie.indexOf("=")+1);
	       		
	       		var callback = getUrlVars()["callback"];
	       		  		
		       	if(callback == undefined){
		       		var stateObj = { foo: url };
	       			if(vlnHistoryPush >= 1){
		       			history.replaceState(stateObj, url, url);
			    		$$('frmBody').setValue(url+"?Index="+vlnCookie);
			    		vlnHistoryPush = 0;
			    		
			    		if(source.arrMenu.Title != undefined){
			    			
			    			if(arrBreadCrums.length > 1){
			    				waf.widgets.breadCrumbs1.popItem();
			    			}
							waf.widgets.breadCrumbs1.pushItem(sources.arrMenu.getCurrentElement(), 1);
						}
			    	}else{
			    		vlnHistoryPush += 1;	
			    	}
				}
	      	}
    	}

	};// @lock
	
	tfUserName.click = function tfUserName_click (event)// @startlock
	{// @endlock
		$$('cpmProfile').loadComponent('/Profile.waComponent');
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		waf.widgets.rtCredits.setValue("© "+new Date().getFullYear()+" 4D SAS todos los derechos reservados.");
		
		var currentUser = waf.directory.currentUser();
		if( currentUser == null ){
			$$('combobox1').hide();
			$$('imgMenu').hide();
			$$('frmBody').destroy();
		}else{
			$("#cpmLoginUser").css("z-index", "-100");
		}
		
		var Width = $(window).innerWidth();
		var Height = $(window).innerHeight(); // returns height of browser viewport
		$$('cpmProfile').move(-Width+"px", -Height+"px");
			
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
//		sources.arrMenu.addNewElement({
//			ID: 3,
//			Title: 'Configuración',
//			Icon: '/images/onebit_09.png',
//			Link: '/Cases.waPage/index.html',
//			Opcion: false
//		});
		
		var url = window.location.href;
		var callback = getUrlVars()["callback"];
		var idCase = getUrlVars()["ID"];
		var year = getUrlVars()["Year"];
		var params = {};
		
		if(idCase > 0){
			params = {Name:"ID=", Val:idCase};
		}else if(year > 0){
			params = {Name:"Year=",Val:year};
		}else{ 
			params = {Name: null};
		}
		
	
		try{
			if(callback.length > 4){
				var cookie = document.cookie.split(";")[0];
				cookie = cookie.substr(cookie.indexOf("=")+1); 
		        $$('frmBody').setValue(callback+"?Index="+cookie+"&"+params.Name+params.Val);
		        for (var i = 0; i < arrMenu.length; i++) {
				    if (arrMenu[i].Link === callback) {
				    	sources.arrMenu.selectByKey(arrMenu[i].ID);
						waf.widgets.imgMenu.setValue(sources.arrMenu.Icon);
						
						if(params.Name != null){
							callback = callback+"?"+params.Name+params.Val;
						}
				        
				        var stateObj = { foo: callback };
				        history.replaceState(stateObj, callback, callback);
				        i = arrMenu.length;
				        
				        if(arrBreadCrums.length > 1){
		    				waf.widgets.breadCrumbs1.popItem();
		    			}
		    			
						waf.widgets.breadCrumbs1.pushItem(sources.arrMenu.getCurrentElement(), 1);
				        if(params.Name != null){
					        waf.widgets.breadCrumbs1.pushItem({
								Title: params.Val,
								Link: callback
							}, 2);
						}
				    }
				}

			}
		}catch(e){
		}
	};// @lock

	btnLogin.click = function btnLogin_click (event)// @startlock
	{// @endlock
		if($$("btnLogin").getValue().indexOf("Salir") != -1){
			waf.directory.logout();
			document.cookie = "session4DSupport=;path=/";
			location.reload();
		}else{
			window.location.href = window.location.href;
		}
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("combobox1", "click", combobox1.click, "WAF");
	WAF.addListener("combobox1", "change", combobox1.change, "WAF");
	WAF.addListener("tfUserName", "click", tfUserName.click, "WAF");
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

(function() {
	var vCodeFirst;
	var params = {};
	setInterval(function(){
		if(window.location.pathname == "/Cases.waPage/index.html"){
			var vCodeCase = $("#frmBody > #frmBody-frame").contents().find("#vtCodeCase").text();
			params ={Name:"?ID=", Val:vCodeCase};

		}else if(window.location.pathname == "/Informes.waPage/index.html"){
			var vtYear = $("#frmBody > #frmBody-frame").contents().find("#vtYear").text();
			params ={Name:"?Year=", Val:vtYear};

		}else{}
		
		if(vCodeFirst != params.Val){
			callback = window.location.pathname+params.Name+params.Val;

			waf.widgets.breadCrumbs1.pushItem({
				Title: params.Val,
				Link: callback
			}, 2);

			var stateObj = { foo: callback };
			history.replaceState(stateObj, callback, callback);
			
			vCodeFirst = params.Val;
		}
	}, 1500);	

})();

