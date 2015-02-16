

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

		var vtLineConsult = $$(id+'_cbOptionsSearch').$domNode[0].childNodes[1].value;
		if(vtLineConsult == '')
			vtLineConsult = $$(id+'_cbOptionsSearch').getValue();
		var vtoptionConsult = $$(id+'_cbOptions').getValue();

		if(vdStart == vdEnd){
			$comp.SearchCases(-1, vtLineConsult, vtoptionConsult);		
		}else{
			$comp.SearchCases(-1, vtLineConsult, vtoptionConsult, vdStart, vdEnd);			
		}
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
	
	$comp.SearchCases = function (i, vtLineConsult, vtoptionConsult, pVdStart, pVdEnd){
		var vQueryArray;
		var vdStart = new Date(pVdStart);
		var	vdEnd = new Date(pVdEnd);
		var optionSelector = i;
		if(optionSelector == -1)
			vtLineConsult = "*"+vtLineConsult;
		vtLineConsult = vtLineConsult.trim();

		try{
			if(optionSelector != -1)
			vtoptionConsult = optionChoose(vtLineConsult, optionSelector);		
				switch(vtoptionConsult) {
					case "SO":
						vQueryArray = 'So == "'+vtLineConsult+'*"';
						break;
					case "Contacto":
						var arrParams = vtLineConsult.split(' ');
						var arrParams1 = new Array();
						
						for(var i=0; i <= arrParams.length; i++){
							if((arrParams[i] != '') && (arrParams[i] != undefined)){
							   arrParams1.push(arrParams[i]);
							}
						}
						
						arrParams = arrParams1;
						
						if(arrParams.length >= 2){
							vQueryArray = 'Obtenido.Nombre == '+'"'+arrParams[0]+'*" && '+'Obtenido.Apellido == '+'"'+arrParams[1]+'*"';
						}else{
							vQueryArray = 'Obtenido.Nombre == '+'"'+arrParams[0]+'*"';
						}
						break;
					case "Empresa":
						vQueryArray = 'Obtenido.Integra.Nombre == "'+vtLineConsult+'*"';
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
					case "Título":
						vQueryArray = 'Nombre == "*'+vtLineConsult+'*"';
						break;
					case "Descripción":
						vQueryArray = 'Descripcion % "'+vtLineConsult+'"';
						break;
					case "Mensajes":
						vQueryArray = 'Respondido.Cuerpo == "*'+vtLineConsult+'*"';
						break;
				}
				
				if(vdStart != "Invalid Date"){
					vQueryArray += ' && Fecha_Inicio >= '+vdStart.toISOString()+' && Fecha_Final <= '+vdEnd.toISOString();
				}
				
				vQueryArray = vQueryArray.trim();
				sources.cASOS.query(vQueryArray, {
			        onSuccess: function(e){
			            var vCountCases = sources.cASOS.length;
						try{
							if((vCountCases <= 3) && (optionSelector != -1)) throw "Not Entities";
							sources.cASOS.orderBy('Fecha_Final desc, Hora_Final desc');
			           	}catch(e){
							var opts = waf.widgets.cpmSearchCase.widgets.cbOptions.domNode.firstChild;
							if(optionSelector <= opts.length+1){
			           	 		optionSelector++;
			           	 		waf.widgets.cpmSearchCase.SearchCases(optionSelector, vtLineConsult, vtoptionConsult, pVdStart, pVdEnd);
			           		}
			           	}
			        },
		    		progressBar: waf.widgets.pbSearchedCases.id
		       	});	  		           	
	     	image1.click();
	     	
		}catch(e){
			console.log(e.message);
		}
	};
	
	function optionChoose(pTextQuery, pSelector){
		var option;
		var vFound;
		
		if(pSelector == 0){		
			vFound = pTextQuery.charAt(0);
			if(vFound.toLocaleUpperCase() == "V")
			option = "Versión";
			
			var arrSOs = this.sources.cASOS.GET_LIST_SO().soS;
			vFound = arrSOs.join(" ").search(pTextQuery.replace(pTextQuery.charAt(0), pTextQuery.charAt(0).toUpperCase()));
			
			if(vFound != -1)
			option = "SO";
			result = option;
		}	
		
		var opts = waf.widgets.cpmSearchCase.widgets.cbOptions.domNode.firstChild;
		result = opts[pSelector].innerText;
						
	return result;
	};
}// @startlock
return constructor;
})();// @endlock

	