
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var image1 = {};	// @image
	var combobox1 = {};	// @combobox
// @endregion// @endlock
	
// eventHandlers// @lock

	image1.click = function image1_click (event)// @startlock
	{// @endlock
		waf.widgets.component1.loadComponent();
		sources.pERSONAS.Info_Informe_Incidencias("download", $$("combobox1").getValue(), {
			onSuccess: function(event){
				spinnerLoading.stop();
				
				var link = document.createElement('a');
			    link.download = event.result.fileName;
			    link.href = 'data:application/msexcel;base64,' + event.result.fileBlob;
			    link.click();
				
				$("#"+waf.widgets.component1.id).css("z-index", "-100");
				waf.widgets.component1.removeComponent();
			}
		});
	};// @lock

	combobox1.change = function combobox1_change (event)// @startlock
	{// @endlock
		year = this.getValue();
		waf.widgets.component1.loadComponent();
		refreshDataInform(year);
	};// @lock
	
// @region eventManager// @startlock
	WAF.addListener("image1", "click", image1.click, "WAF");
	WAF.addListener("combobox1", "change", combobox1.change, "WAF");
// @endregion
};// @endlock

function refreshDataInform(pYear){
	if(pYear == ""){
		pYear = new Date().getFullYear();
	}	
	
	$$("vtYear").setValue(new Date().getFullYear());
	$$("vtYear").setValue(pYear);	

	arrCasosRespondidos = new Array;
	sources.eMPRESAS.Info_Informe_Casos("Empresas", pYear, {
		onSuccess: function(event){
			event.result.Casos.forEach(function(valor, i){

				
				if(valor.Tam != 0 ){
					arrCasosRespondidos.push({
						Key: i, 
						Valor: valor.Nombre,
						Tam: valor.Tam
					});
					
				}
			});
					sources.arrCasosRespondidos.sync();
					createChartColumn();
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
			});			
			sources.arrCasosRespondidos.sync();
			creatChartPie();
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
			$("#"+waf.widgets.component1.id).css("z-index", "-100");
			waf.widgets.component1.removeComponent();
		}
	});	
	
}

function createChartColumn(){
	var chart;
		     // SERIAL CHART
            chart = new AmCharts.AmSerialChart();
            chart.dataProvider = arrCasosRespondidos;
            chart.categoryField = "Valor";
			chart.colors = ["#04B486"]; 
			   
            // the following two lines makes chart 3D
            chart.depth3D = 15;
            chart.angle = 40;

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
            graph.balloonText = "<span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>";
            graph.type = "column";
            graph.lineAlpha = 0;
            graph.fillAlphas = 1;
            chart.addGraph(graph);

            // CURSOR
            var chartCursor = new AmCharts.ChartCursor();
            chartCursor.cursorAlpha = 0;
            chartCursor.zoomable = true;
            chartCursor.categoryBalloonEnabled = false;
            chart.addChartCursor(chartCursor);
			

//            for(var i=0; i < chart.columnsArray.length; i++){
//            	if(i>5){
//            		chart.columnsArray[i].bcolor = "#FFBF00";
//            		chart.columnsArray[i].colors = "#FFBF00";
//            	}
//            };
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
    chart.depth3D = 20;
    chart.angle = 30;

    // WRITE                                 
    chart.write("spaceChartPie");
}

function getUrlVars(){
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

(function() {
	var url = window.location.pathname;
	var index = getUrlVars()["Index"];
	var year = getUrlVars()["Year"];
	var vlnCookie = document.cookie.split(";")[0];
	vlnCookie = vlnCookie.substr(vlnCookie.indexOf("=")+1);
	
	if(index != vlnCookie){
		document.location = "/?callback="+url+"&Year="+year;
	}else{
		if(year != ""){
			setTimeout(function(){
				refreshDataInform(year);
				waf.widgets.combobox1.setValue(year);
			}, 500);
			
		}
	}
})();
