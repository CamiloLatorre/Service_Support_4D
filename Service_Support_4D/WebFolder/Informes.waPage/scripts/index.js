
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var eMPRESASEvent = {};	// @dataSource
	var pERSONASEvent = {};	// @dataSource
// @endregion// @endlock

// eventHandlers// @lock

	eMPRESASEvent.onCollectionChange = function eMPRESASEvent_onCollectionChange (event)// @startlock
	{// @endlock
		arrCasosRespondidos = new Array;
		var result = sources.eMPRESAS.Info_Informe_Casos("Empresas", "2013");
		result.Casos.forEach(function(valor, i){
			arrCasosRespondidos.push({
				Key: i, 
				Valor: valor.Nombre,
				Tam: valor.Tam
			});
			sources.arrCasosRespondidos.sync();
		});
		
		createChartColumn();
		arrCasosRespondidos = new Array;
		var result = sources.eMPRESAS.Info_Informe_Casos("Meses", "2013");
		result.Casos.forEach(function(valor, i){
			arrCasosRespondidos.push({
				Key: i, 
				Valor: valor.Nombre,
				Tam: valor.Tam
			});
			sources.arrCasosRespondidos.sync();
		});
		creatChartPie();
        
	};// @lock

	pERSONASEvent.onCollectionChange = function pERSONASEvent_onCollectionChange (event)// @startlock
	{// @endlock
		arrEmpresas = new Array;
		var result = sources.pERSONAS.Info_Informe_Incidencias("show", "");
		result.empresas.forEach(function(empresa, i){
			arrEmpresas.push({
				Key: i, 
				Nombre: empresa.nombre,
				Incidencias: empresa.numCasos,
				Mensajes: empresa.numMensj
			});
			sources.arrEmpresas.sync();
		});
		

	};// @lock

// @region eventManager// @startlock
	WAF.addListener("eMPRESAS", "onCollectionChange", eMPRESASEvent.onCollectionChange, "WAF");
	WAF.addListener("pERSONAS", "onCollectionChange", pERSONASEvent.onCollectionChange, "WAF");
// @endregion
};// @endlock

function createChartColumn(){
	var chart;

        
		     // SERIAL CHART
            chart = new AmCharts.AmSerialChart();
            chart.dataProvider = arrCasosRespondidos;
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

function getUrlVars(){
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

(function() {
	var url = window.location.href;
	var index =  getUrlVars()["Index"];
	if(index == undefined){
		document.location = "/?callback="+url.substring(22);
	}
})();
