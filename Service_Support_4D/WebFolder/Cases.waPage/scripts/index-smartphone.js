﻿var showInforms;
var spinnerLoading;
var opts = {
	  lines: 13, // The number of lines to draw
  length: 21, // The length of each line
  width: 11, // The line thickness
  radius: 25, // The radius of the inner circle
  corners: 1, // Corner roundness (0..1)
  rotate: 31, // The rotation offset
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#000', // #rgb or #rrggbb or array of colors
  speed: 1.1, // Rounds per second
  trail: 57, // Afterglow percentage
  shadow: false, // Whether to render a shadow
  hwaccel: false, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  top: '50%', // Top position relative to parent
  left: '50%' // Left position relative to parent
};

WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var icon6 = {};	// @icon
	var eMPRESASEvent = {};	// @dataSource
	var section3 = {};	// @section
	var image3 = {};	// @image
	var icon5 = {};	// @icon
	var icon3 = {};	// @icon
	var icon4 = {};	// @icon
	var container18 = {};	// @container
	var button2 = {};	// @button
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

	icon6.click = function icon6_click (event)// @startlock
	{// @endlock
		waf.widgets.nvAppSupport.goToView(10);
		
		
	};// @lock

	eMPRESASEvent.onCollectionChange = function eMPRESASEvent_onCollectionChange (event)// @startlock
	{// @endlock
		refreshDataInform();
	};// @lock

	section3.touchstart = function section3_touchstart (event)// @startlock
	{// @endlock
		var target = document.getElementById('Loading');
		spinnerLoading = new Spinner(opts).spin(target);
		
		var seccionSelected = event.srcElement.id;
		var year = $$(seccionSelected).getValue();
		waf.widgets.pMenuYear.hide();
		waf.widgets.image3.setValue('/Images/001_26.png');
//		debugger;
		refreshDataInform(year);
		varYearReport = year;
		sources.varYearReport.sync();

		
	};// @lock

	image3.click = function image3_click (event)// @startlock
	{// @endlock
		var srcImage = this.getValue();
		if(srcImage.indexOf(26) > -1){
			waf.widgets.pMenuYear.show();
			this.setValue('/Images/001_28.png');
		}else{
			waf.widgets.pMenuYear.hide();
			this.setValue('/Images/001_26.png');
		}
		
	};// @lock

	icon5.click = function icon5_click (event)// @startlock
	{// @endlock
		source.cmpEditMessage_uSUARIOS.query('ID_Directory = :1', {
			onSuccess:function(entity){
			 	var currentUser = entity.dataSource.Adquirido.load({					
			    	onSuccess: function(relation){
			   			currentPerson = relation.entity;
						sources.Respondido.newEntity();
						sources.Respondido.Cod_Caso = source.cASOS.Codigo;
						sources.Respondido.Cuerpo = response;
						sources.Respondido.Fecha = new Date();
						sources.Respondido.Hora = source.Respondido.Fecha.getTime();
						sources.Respondido.Contesto = currentPerson;
						sources.Respondido.Cod_Persona = currentPerson.Codigo.value;
						var tipoPersona = currentPerson.Cod_Tipo.value;
						if((tipoPersona ==1) || (tipoPersona ==3)){ 
							sources.Respondido.Tipo = 'Pregunta';
						}else{
							sources.Respondido.Tipo = 'Respuesta';
						}
						sources.Respondido.save({
							onSuccess:function(event){
		  							sources.Respondido.addEntity(source.Respondido.getCurrentElement());
		  							sources.Respondido.serverRefresh();
		  							sources.Respondido.orderBy('Fecha desc, Hora desc');
			    			}
						});
					}
				});
			}, 
			params: [waf.directory.currentUser().ID]
		});
	};// @lock

	icon3.click = function icon3_click (event)// @startlock
	{// @endlock
		waf.widgets.nvAppSupport.goToView(9);
		sources.Respondido.addNewElement();
	};// @lock

	icon4.click = function icon4_click (event)// @startlock
	{// @endlock
		waf.widgets.nvAppSupport.goToView(9);
		sources.Respondido.addNewElement()
	};// @lock

	container18.click = function container18_click (event)// @startlock
	{// @endlock
		waf.widgets.nvAppSupport.goToView(8);
	};// @lock

	button2.click = function button2_click (event)// @startlock
	{// @endlock
		waf.widgets.nvAppSupport.goToView(7);
	};// @lock

	row1.click = function row1_click (event)// @startlock
	{// @endlock
		waf.widgets.nvAppSupport.goToView(6);
		
		try{
			var entityCase = sources.cASOS.getCurrentElement();
			var importantCase = entityCase.Importante.value;
			var complexityCase = entityCase.Cod_Complejidad.value;
			
			if(importantCase){
				$$('imageImportant').setValue('/Images/onebit_44.png');
			}else{
				$$('imageImportant').setValue('/Images/onebit_46.png');
			}
			$$('imageComplexy').show('');
		
			switch(complexityCase) {
				case 1:
					$$('imageComplexy').setValue('/Images/onebit_50.png');
					break;
				case 2:
					$$('imageComplexy').setValue('/Images/onebit_48.png');
					break;
				case 3:
					$$('imageComplexy').hide('');
					break;
				case 4:
					$$('imageComplexy').setValue('/Images/onebit_47.png');
					break;
				case 5:
					$$('imageComplexy').setValue('/Images/onebit_49.png');
					break;
			}
		}catch(e){
		}
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
		if(pageView == 3){
			showInforms = true;
			sources.eMPRESAS.collectionRefresh();
		}
		waf.widgets.nvAppSupport.goToView(pageView);
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		var target = document.getElementById('Loading');
		spinnerLoading = new Spinner(opts).spin(target);
				
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
	WAF.addListener("icon6", "click", icon6.click, "WAF");
	WAF.addListener("eMPRESAS", "onCollectionChange", eMPRESASEvent.onCollectionChange, "WAF");
	WAF.addListener("section3", "touchstart", section3.touchstart, "WAF");
	WAF.addListener("image3", "click", image3.click, "WAF");
	WAF.addListener("icon5", "click", icon5.click, "WAF");
	WAF.addListener("icon3", "click", icon3.click, "WAF");
	WAF.addListener("icon4", "click", icon4.click, "WAF");
	WAF.addListener("container18", "click", container18.click, "WAF");
	WAF.addListener("button2", "click", button2.click, "WAF");
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

function refreshDataInform(pYear){
	if(showInforms){
		if(pYear == ""){
			pYear = "2014";
		}
		
		arrCasosRespondidos = new Array;
		sources.eMPRESAS.Info_Informe_Casos("Empresas", pYear, {
			onSuccess: function(event){
				event.result.Casos.forEach(function(valor, i){
					arrCasosRespondidos.push({
						Key: i, 
						Valor: valor.Nombre,
						Tam: valor.Tam
					});
					sources.arrCasosRespondidos.sync();
				});
			}
		});
			
		sources.eMPRESAS.Info_Informe_Casos("Meses", pYear, {
			onSuccess: function(event){
				arrCasosRespondidos = new Array;
				event.result.Casos.forEach(function(valor, i){
					arrCasosRespondidos.push({
						Key: i, 
						Valor: valor.Nombre,
						Tam: valor.Tam
					});
					sources.arrCasosRespondidos.sync();
					creatChartPie();
				});			
			}
		});
		
		sources.pERSONAS.Info_Informe_Incidencias("show", pYear, {
			onSuccess: function(event){
				arrEmpresas = new Array;
				event.result.empresas.forEach(function(empresa, i){
					arrEmpresas.push({
						Key: i, 
						Nombre: empresa.nombre,
						Incidencias: empresa.numCasos,
						Mensajes: empresa.numMensj
					});
					sources.arrEmpresas.sync();
					sources.arrEmpresas.orderBy("Incidencias Desc");
				});
				spinnerLoading.stop();
				createChartColumn();
			}
		});	
	}
}

function createChartColumn(){
	var chart;

        
		     // SERIAL CHART
            chart = new AmCharts.AmSerialChart();
            chart.dataProvider = arrEmpresas;
            chart.categoryField = "Valor";
            // the following two lines makes chart 3D
            chart.depth3D = 20;
            chart.angle = 30;

            // AXES
            // category
            var categoryAxis = chart.categoryAxis;
            categoryAxis.labelRotation = 90;
            categoryAxis.dashLength = 5;
            categoryAxis.gridPosition = "start";

            // value
            var valueAxis = new AmCharts.ValueAxis();
            valueAxis.title = "Incidencias";
            valueAxis.dashLength = 5;
            chart.addValueAxis(valueAxis);

            // GRAPH
            var graph = new AmCharts.AmGraph();
            graph.valueField = "Tam";
//            graph.colorField = "color";
            graph.balloonText = "<span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>";
            graph.type = "column";
            graph.lineAlpha = 0;
            graph.fillAlphas = 1;
            chart.addGraph(graph);

            // CURSOR
            var chartCursor = new AmCharts.ChartCursor();
            chartCursor.cursorAlpha = 0;
            chartCursor.zoomable = false;
            chartCursor.categoryBalloonEnabled = false;
            chart.addChartCursor(chartCursor);

            chart.creditsPosition = "top-right";

            // WRITE
            chart.write("spaceChartColumn");
}

function creatChartPie(){
	chart = new AmCharts.AmPieChart();

    // title of the chart
    chart.addTitle("", 16);

    chart.dataProvider = arrCasosRespondidos;
    chart.titleField = "Valor";
    chart.valueField = "Tam";
    chart.sequencedAnimation = true;
    chart.startEffect = "elastic";
    chart.innerRadius = "30%";
    chart.startDuration = 2;
    chart.labelRadius = 15;
    chart.balloonText = "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>";
    // the following two lines makes the chart 3D
    chart.depth3D = 10;
    chart.angle = 15;

    // WRITE                                 
    chart.write("spaceChartPie");
}