﻿
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'searchCase';
	// @endregion// @endlock
	
	this.load = function (data) {// @lock
		$("#"+id).css("z-index", "6");

	// @region namespaceDeclaration// @startlock
	var image1 = {};	// @image
	var button1 = {};	// @button
	var cbOptions = {};	// @combobox
	// @endregion// @endlock

	// eventHandlers// @lock

	image1.click = function image1_click (event)// @startlock
	{// @endlock
		$$(id).removeComponent();
		$("#"+id).css("z-index", "-100");
	};// @lock
	
	button1.click = function button1_click (event)// @startlock
	{// @endlock
		var vdStart = $$(id+'_tfStartDate').getValue();
		var vdEnd = $$(id+'_tfEndDate').getValue();
		var vtLineConsult = $$(id+'_cbOptionsSearch').getValue();
		var vtoptionConsult = $$(id+'_cbOptions').getValue();
		SearchCases(vtoptionConsult, vtLineConsult, vdStart, vdEnd);		
	};// @lock

	cbOptions.change = function cbOptions_change (event)// @startlock
	{// @endlock
		var option = this.getValue();
		$$(id+'_cbOptionsSearch').rebuild();
		artOptions = sources.cASOS.GET_OPTIONS_SEARCH_CASES(option).ListOptionsResult;
		for (var i = 0; i < artOptions.length; i++) {
			$$(id+'_cbOptionsSearch').addOption(artOptions[i]);
		};
	};// @lock
	

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_image1", "click", image1.click, "WAF");
	WAF.addListener(this.id + "_button1", "click", button1.click, "WAF");
	WAF.addListener(this.id + "_cbOptions", "change", cbOptions.change, "WAF");
	// @endregion// @endlock

	};// @lock
	
	this.SearchCases = function (i, vtLineConsult, vtoptionConsult, pVdStart, pVdEnd){
//		debugger;
		var vQueryArray;
		var vdStart = new Date(pVdStart);
		var	vdEnd = new Date(pVdEnd);
		var optionSelector = i;
		
		try{
			vtoptionConsult = optionChoose(vtLineConsult, optionSelector);			
				switch(vtoptionConsult) {
					case "SO":
						vQueryArray = 'So == "'+vtLineConsult+'*"';
						break;
					case "Contacto":
						var arrParams = vtLineConsult.split(' ');
						var arrParams1 = new Array();
						
						for(var i=0; i <= arrParams.length; i++){
							if(arrParams[i] != ''){
							   arrParams1.push(arrParams[i]);
							}
						}
						
						arrParams = arrParams1;
						vQueryArray = 'Obtenido.Nombre == '+'"*'+arrParams[0]+'*" || '+'Obtenido.Apellido == '+'"*'+arrParams[1]+'*"';
						break;
					case "Empresa":
						vQueryArray = 'Obtenido.Integra.Nombre == "*'+vtLineConsult+'*"';
						break;
					case "Versión":
						vQueryArray = 'Version == "'+vtLineConsult+'"';
						break;
					case "Clasificación":
						vQueryArray = 'Clasifica.Nombre == "'+vtLineConsult+'"';
						break;
					case "Complejidad":
						vQueryArray = 'Compete.Nombre == "'+vtLineConsult+'"';
						break;
					case "Tema":
						vQueryArray = 'Corresponde.Nombre == "'+vtLineConsult+'"';
						break;
				}
				
				if(vdStart != "Invalid Date"){
					vQueryArray += ' && Fecha_Inicio >= '+vdStart.toISOString()+' && Fecha_Final <= '+vdEnd.toISOString();
				}
						
				sources.cASOS.query(vQueryArray, {
			        onSuccess: function(e){
			            var vCountCases = sources.cASOS.length;
						$$(id+'_tfCountCases').setValue(vCountCases);
						try{
							if(vCountCases == 0) throw "Not Entities";
							sources.cASOS.orderBy('Fecha_Final desc, Hora_Final desc');
			           	}catch(e){
							if(e == "Not Entities")
							debugger;
							if(optionSelector < 5){
			           	 		optionSelector++;
			           	 		waf.widgets.cpmSearchCase.SearchCases(optionSelector, vtLineConsult, vtoptionConsult, pVdStart, pVdEnd);
			           		}
			           	}
			        }
		        });	  
		           	
	     	image1.click();
	     	
		}catch(e){
			console.log(e.message);
		}
	};
	
	function optionChoose(pTextQuery, pSelector){
		var option;
		var vFound;
		
		vFound = pTextQuery.charAt(0);
		
		if(vFound.toLocaleUpperCase() == "V")
		option = "Versión";
		
		var arrSOs = this.sources.cASOS.GET_LIST_SO().soS;
		vFound = arrSOs.join(" ").search(pTextQuery.replace(pTextQuery.charAt(0), pTextQuery.charAt(0).toUpperCase()));
		
		if(vFound != -1)
		option = "SO";
		
		var arrOption = new Array();
			arrOption[0] = "Contacto";
			arrOption[1] = "Empresa";
			arrOption[2] = "Clasificación";
			arrOption[3] = "Complejidad";
			arrOption[4] = "Tema";

		if(option == undefined){
			result = arrOption[pSelector];
		}else{
			result = option;
		}
		
		return result;
	};
}// @startlock
return constructor;
})();// @endlock

	