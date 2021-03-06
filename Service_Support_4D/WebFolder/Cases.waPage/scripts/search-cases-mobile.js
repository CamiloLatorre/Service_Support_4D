﻿var SearchedPlugin = function(){

	$comp = this,
	
	this.arOptionSearch = [],

	this.SearchCases = function (i, vtLineConsult, vtoptionConsult, pVdStart, pVdEnd){
		var vQueryArray;
		var vdStart = new Date(pVdStart);
		var	vdEnd = new Date(pVdEnd);
		var optionSelector = i;
		if(optionSelector == -1)
			vtLineConsult = "*"+vtLineConsult;
		vtLineConsult = vtLineConsult.trim();

		try{
			if(optionSelector != -1)
			vtoptionConsult = $comp.optionChoose(vtLineConsult, optionSelector);		
				switch(vtoptionConsult) {
					case "SO":
						vQueryArray = 'So == "'+vtLineConsult+'*"';
						break;
					case "Contacto":
						var arrParams = vtLineConsult.split(' ');
						var arrParams1 = new Array();
						
						for(var i=0; i <= arrParams.length; i++){
							if((arrParams[i] != '') && (arrParams[i] != 'undefined')){
							   arrParams1.push(arrParams[i]);
							}
						}
						
						arrParams = arrParams1;
						vQueryArray = 'Obtenido.Nombre == '+'"'+arrParams[0]+'*" || '+'Obtenido.Apellido == '+'"'+arrParams[1]+'*"';
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
						vQueryArray = 'Descripcion == "*'+vtLineConsult+'*"';
						break;
					case "Mensajes":
						vQueryArray = 'Respondido.Cuerpo == "*'+vtLineConsult+'*"';
						break;
				}
				
				if(vdStart != "Invalid Date"){
					vQueryArray += ' && Fecha_Inicio >= '+vdStart.toISOString()+' && Fecha_Final <= '+vdEnd.toISOString();
				}
						
				sources.cASOS.query(vQueryArray, {
			        onSuccess: function(e){
			            var vCountCases = sources.cASOS.length;
						try{
							if((vCountCases <= 3) && (optionSelector != -1)) throw "No Entities";
							sources.cASOS.orderBy('Fecha_Final desc, Hora_Final desc');
							$$("rtCountCases").setValue(sources.cASOS.length+" Casos encontrados");
			           	}catch(e){
							var opts = $comp.arOptionSearch;
							if(optionSelector <= opts.length+1){
			           	 		optionSelector++;
			           	 		$comp.SearchCases(optionSelector, vtLineConsult, vtoptionConsult, pVdStart, pVdEnd);
			           		}
			           	}
			        }
		        });	  
		           	    	
		}catch(e){
			console.log(e.message);
		}
	},

	this.optionChoose = function(pTextQuery, pSelector){
		var option;
		var vFound;
		
		if(pSelector == 0){		
			vFound = pTextQuery.charAt(0);
			if(vFound.toLocaleUpperCase() == "V")
			option = "Versión";
			
			var arrSOs = sources.cASOS.GET_LIST_SO().soS;
			vFound = arrSOs.join(" ").search(pTextQuery.replace(pTextQuery.charAt(0), pTextQuery.charAt(0).toUpperCase()));
			
			if(vFound != -1)
			option = "SO";
			result = option;
		}	
		
		result = $comp.arOptionSearch[pSelector];
						
		return result;
	},
	
	this.setOptionSearch = function(pOptions){
		this.arOptionSearch = pOptions;
	}
};
