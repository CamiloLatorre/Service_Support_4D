
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var row1 = {};	// @container
	var tfUserName = {};	// @textField
	var tfSearch = {};	// @textField
	var tfAgainPass = {};	// @textField
	var button3 = {};	// @button
	var icon1 = {};	// @icon
	var icon2 = {};	// @icon
	var button1 = {};	// @button
	var ctnItemMenu = {};	// @container
	var documentEvent = {};	// @document
	var richText1 = {};	// @richText
// @endregion// @endlock
	var ctnChangePwd = waf.widgets.ctnChangePwd;
	var OKPDWChange;
// eventHandlers// @lock

	row1.click = function row1_click (event)// @startlock
	{// @endlock
		waf.widgets.nvAppSupport.goToView(6);
	};// @lock

	tfUserName.click = function tfUserName_click (event)// @startlock
	{// @endlock
		waf.widgets.nvAppSupport.goToView(5);
		currentUser = waf.directory.currentUser();
		sources.pERSONAS.query('Email = '+currentUser.userName,function(){
			var Female = sources.pERSONAS.Femenino;
			if(Female){
				$$('imageProfile').setValue('/Images/user_female.png');
			}
		});
	};// @lock

	tfSearch.keyup = function tfSearch_keyup (event)// @startlock
	{// @endlock
		var vtQuery;
		var valueSearched = WAF.widgets.tfSearch.getValue();
		if(valueSearched.length >= 4){
				var valueSearched = WAF.widgets.tfSearch.getValue();
				vtQuery = 'Fecha_Final == '+valueSearched+' || '+'Fecha_Inicio == '+''+valueSearched;	
				vtQuery = vtQuery+'" || '+'Obtenido.Nombre == '+'"*'+valueSearched+'*" || '+'Obtenido.Apellido == '+'"*'+valueSearched+'*"';
				//vtQuery = vtQuery+'" || '+'Nombre == '+'"*'+valueSearched+'*" || '+'Descripcion == '+'"*'+valueSearched+'*"';
				
				sources.cASOS.query(vtQuery, {
		        	onSuccess: function(){
					 	try{
		           	 		sources.cASOS.orderBy('Fecha_Final desc, Hora_Final desc');
		           	 		clearTimeout(queryTime);
		           		 }catch(e){
		           		 	clearTimeout(queryTime);
		           		 }
		            }
		        });
		    
		}
	};// @lock

	tfAgainPass.change = function tfAgainPass_change (event)// @startlock
	{// @endlock
		var pdw = $$('tfNewPass').getValue();
		var pdwRepet = $$('tfAgainPass').getValue();
		
		if(pdw != pdwRepet){
			alert('Las contraseñas no coinciden.');
		}else{
			OKPDWChange = true;
		}
	};// @lock

	button3.click = function button3_click (event)// @startlock
	{// @endlock
		if(OKPDWChange){
			var pdw = $$('tfNewPass').getValue();
			pdw = $().crypt({method:"md5",source:pdw});
			sources.Adquiere.Pass = pdw;
			sources.Adquiere.save();
			DirectoryRemote.SetPassword(currentUser.ID, pdw);
			ctnChangePwd.hide();
		}else{
			alert('Las contraseñas no coinciden.');
		}
	};// @lock

	icon1.click = function icon1_click (event)// @startlock
	{// @endlock
		sources.pERSONAS.save();
	};// @lock

	icon2.click = function icon2_click (event)// @startlock
	{// @endlock
		ctnChangePwd.hide();
	};// @lock

	button1.click = function button1_click (event)// @startlock
	{// @endlock
		ctnChangePwd.move(10,20);
		ctnChangePwd.show();
	};// @lock

	ctnItemMenu.click = function ctnItemMenu_click (event)// @startlock
	{// @endlock
		var pageView = sources.arrMenu.View;
		waf.widgets.nvAppSupport.goToView(pageView);
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		
		var currentUser = waf.directory.currentUser();
		if(currentUser != null){
			varCurrentName = currentUser.fullName;
			sources.varCurrentName.sync();
			
			sources.arrMenu.addNewElement({
				ID: 1,
				Title: 'Casos de Estudio',
				Icon: '/images/table.png',
				View: 2,
				Opcion: false
			});
			sources.arrMenu.addNewElement({
				ID: 2,
				Title: 'Informes',
				Icon: '/images/onebit_16.png',
				View: 3,
				Opcion: false
			});
			sources.arrMenu.addNewElement({
				ID: 3,
				Title: 'Configuración',
				Icon: '/images/onebit_09.png',
				View: 4,
				Opcion: false
			});
			
		}else{
			location.href = "/";
		}
	};// @lock

	richText1.click = function richText1_click (event)// @startlock
	{// @endlock
		WAF.directory.logout({
	        onSuccess: function(event) { 
	            location.href = "/";
	        },
	        onError: function(error) {
	            alert ("Logout error"); 
	        }
	    });
		
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("row1", "click", row1.click, "WAF");
	WAF.addListener("tfUserName", "click", tfUserName.click, "WAF");
	WAF.addListener("tfSearch", "keyup", tfSearch.keyup, "WAF");
	WAF.addListener("tfAgainPass", "change", tfAgainPass.change, "WAF");
	WAF.addListener("button3", "click", button3.click, "WAF");
	WAF.addListener("icon1", "click", icon1.click, "WAF");
	WAF.addListener("icon2", "click", icon2.click, "WAF");
	WAF.addListener("button1", "click", button1.click, "WAF");
	WAF.addListener("ctnItemMenu", "click", ctnItemMenu.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("richText1", "click", richText1.click, "WAF");
// @endregion
};// @endlock
