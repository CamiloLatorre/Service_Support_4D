﻿
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'searchCase';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var image1 = {};	// @image
	var button1 = {};	// @button
	var cbOptions = {};	// @combobox
	// @endregion// @endlock

	// eventHandlers// @lock

	image1.click = function image1_click (event)// @startlock
	{// @endlock
		$$(id).removeComponent();
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
	
	function SearchCases(vtoptionConsult, vtLineConsult, pVdStart, pVdEnd){
		var vQueryArray;
		debugger;
		var vdStart = new Date(pVdStart);
		var vdEnd = new Date(pVdEnd);
		
		switch(vtoptionConsult) {
			case "SO":
				vQueryArray = 'So == "'+vtLineConsult+'"';
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
				vQueryArray = 'Obtenido.Nombre == '+'"*'+arrParams[0]+'*" && '+'Obtenido.Apellido == '+'"*'+arrParams[1]+'*"';
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
		
		vQueryArray+=' && Fecha_Inicio >= '+vdStart.toISOString()+' && Fecha_Final <= '+vdEnd.toISOString();

		sources.cASOS.query(vQueryArray, {
        onSuccess: function(){
            var vCountCases = sources.cASOS.length;
			$$(id+'_tfCountCases').setValue(vCountCases);
			 try{
           	 	sources.cASOS.orderBy('Fecha_Final desc, Hora_Final desc');
//           	 	sources.cASOS.sync();
           	 }catch(e){}
            }
        });
	}


}// @startlock
return constructor;
})();// @endlock

function searchCases(option, keyWord, dStart, dEnd){
	var countCases;
	switch(option) {
		case "Nombre del caso":
			break;
		case "SO":
			break;
		case "Contacto":
			break;
		case "Empresa":
			break;
		case "Versión":
			break;
		case "Clasificación":
			break;
		case "Complejidad":
			break;
		case "Tema":
			break;		
	}
	
	if((dStart!="00/00/0000") && (dEnd!="00/00/0000")){
	
	}
	
	return countCases;
}
	