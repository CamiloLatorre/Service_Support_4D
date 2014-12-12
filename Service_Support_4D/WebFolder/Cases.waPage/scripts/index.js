var  vTrImportant= false;

function NextCase(){
		source.cASOS.selectPrevious();
}

function PreviousCase(){
	source.cASOS.selectNext();
}

function NextMessage(){
	source.Respondido.selectNext();
}

function PreviousMessage(){
	source.Respondido.selectPrevious();	
}
	
function SetShortCuts(option){
	var arTKey = new Array();
	var afMethod = new Array();
	
	arTKey.push("up");
	arTKey.push("down");
	arTKey.push("right");
	arTKey.push("left");
	
	afMethod.push(NextCase);
	afMethod.push(PreviousCase);
	afMethod.push(NextMessage);
	afMethod.push(PreviousMessage);
	
	function DisbleKey(){	
	}
	switch(option) {
		case 'Enable':
			for (var i = 0; i < arTKey.length; i++) {
				Mousetrap.bind(arTKey[i], afMethod[i]);
			};
			break;
		case 'Disable':
			for (var i = 0; i < arTKey.length; i++) {
				Mousetrap.bind(arTKey[i], DisbleKey);
			};
			break;
	}
}

WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock	
	var cASOSEvent = {};	// @dataSource
	var documentEvent = {};	// @document
	var KbScCases = {};	// @KeyboardShortcuts
	var image2 = {};	// @image
	var image1 = {};	// @image
	var RespondidoEvent = {};	// @dataSource
// @endregion// @lock
	var stampSearchedCases;
	
// eventHandlers// @lock

	image4.click = function image4_click (event)// @startlock
	{// @endlock
		waf.widgets.textField1.setValue("");
		this.hide();
		image5.click();
	};// @lock

	textField1.keyup = function textField1_keyup (event)// @startlock
	{// @endlock
		if((event.timeStamp-stampSearchedCases) >= 600 || (stampSearchedCases == undefined)){
			stampSearchedCases = event.timeStamp;
			console.log(event.timeStamp);
			var textSearched = this.getValue();
			if(textSearched.length >= 2){
				setTimeout (function (){ 
					waf.widgets.cpmSearchCase.loadComponent();
					waf.widgets.cpmSearchCase.SearchCases(0, textSearched);
					waf.widgets.cpmSearchCase.removeComponent();
				}, 1000);
				
			}
			
			if(textSearched.length == 0){
				waf.widgets.image4.hide();
			}else{
				waf.widgets.image4.show();
			}
		}
		
	};// @lock

	menuItem3.click = function menuItem3_click (event)// @startlock
	{// @endlock
		setStatusCase();
	};// @lock

	menuItem2.click = function menuItem2_click (event)// @startlock
	{// @endlock
		setStatusCase();
	};// @lock

	menuItem1.click = function menuItem1_click (event)// @startlock
	{// @endlock
		setStatusCase();
	};// @lock

	dataGridCases.onRowRightClick = function dataGridCases_onRowRightClick (event)// @startlock
	{// @endlock
		var posX = window.event.clientX;
		var posY = window.event.clientY;
		var menu = waf.widgets.menuStatusCase;
		menu.move(posX, posY);
		menu.show();
		setTimeout (function (){menu.hide()}, 1000); 
	};// @lock

	image7.click = function image7_click (event)// @startlock
	{// @endlock
		$$('cpmSearchCase').loadComponent('/searchCase.waComponent');
	};// @lock

	btnNewCase.click = function btnNewCase_click (event)// @startlock
	{// @endlock
		$$('cpmNewCase').loadComponent('/NewCase.waComponent');
	};// @lock

	imSearchImportant.click = function imSearchImportant_click (event)// @startlock
	{// @endlock
		if(vTrImportant){
			this.setValue('/Images/onebit_46.png');	
			vTrImportant=false;
		}else{
			this.setValue('/Images/onebit_44.png');
			vTrImportant=true;
		}
		sources.cASOS.query('Importante = :1',{
			onSuccess:function(){
				sources.cASOS.orderBy('Fecha_Final desc, Hora_Final desc');
			},
			params: [vTrImportant]
		});

	};// @lock

	image5.click = function image5_click (event)// @startlock
	{// @endlock
		sources.cASOS.all();
		sources.cASOS.orderBy('Fecha_Final desc, Hora_Final desc');
		$$('imSearchImportant').setValue('/Images/onebit_46.png');
		vTrImportant=false;
	};// @lock

	imageNewMsj.click = function imageNewMsj_click (event)// @startlock
	{// @endlock
		$$('cmpEditMessage').loadComponent('/CreateMesagge.waComponent');
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		SetShortCuts('Enable');
		var columnStatus = waf.widgets.dataGridCases.column(3);
		 waf.widgets.dataGridCases.centerRow(3);
		columnStatus.setWidth(100);
		
	};// @lock

	cASOSEvent.onCurrentElementChange = function cASOSEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
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
		
			if(entityCase.Cod_Estado.value == 3){
				waf.widgets.imageNewMsj.hide();
			}else{
				waf.widgets.imageNewMsj.show();
			}
			
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
			
			if(entityCase.Cod_Estado.value == 3){
				varClosed = new Date(entityCase.Fecha_Final.value.toString()).toLocaleDateString();
			}else{
				varClosed = "--/--/--";	
			}
	
			varTime = entityCase.GET_TIME_STM();
			sources.varTime.sync();
			sources.varClosed.sync();
			
			$$("vtCodeCase").setValue(entityCase.Codigo.getValue());			
		}catch(e){
		}
	};// @lock

	image2.click = function image2_click (event)// @startlock
	{// @endlock
		var entitiesMsj = sources.Respondido;
		sources.Respondido.selectPrevious();
	};// @lock

	image1.click = function image1_click (event)// @startlock
	{// @endlock
		source.Respondido.selectNext();
	};// @lock

	RespondidoEvent.onElementSaved = function RespondidoEvent_onElementSaved (event)// @startlock
	{// @endlock
		setDetailMessage(this);
	};// @lock

	RespondidoEvent.onCurrentElementChange = function RespondidoEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
		setDetailMessage(this);
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("image4", "click", image4.click, "WAF");
	WAF.addListener("textField1", "keyup", textField1.keyup, "WAF");
	WAF.addListener("dataGridCases", "onRowRightClick", dataGridCases.onRowRightClick, "WAF");
	WAF.addListener("menuItem3", "click", menuItem3.click, "WAF");
	WAF.addListener("menuItem2", "click", menuItem2.click, "WAF");
	WAF.addListener("menuItem1", "click", menuItem1.click, "WAF");
	WAF.addListener("image7", "click", image7.click, "WAF");
	WAF.addListener("btnNewCase", "click", btnNewCase.click, "WAF");
	WAF.addListener("imSearchImportant", "click", imSearchImportant.click, "WAF");
	WAF.addListener("image5", "click", image5.click, "WAF");
	WAF.addListener("Respondido", "onElementSaved", RespondidoEvent.onElementSaved, "WAF");
	WAF.addListener("imageNewMsj", "click", imageNewMsj.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("cASOS", "onCurrentElementChange", cASOSEvent.onCurrentElementChange, "WAF");
	WAF.addListener("Respondido", "onCurrentElementChange", RespondidoEvent.onCurrentElementChange, "WAF");
	WAF.addListener("KbScCases", "select", KbScCases.select, "WAF");
	WAF.addListener("KbScCases", "focus", KbScCases.focus, "WAF");
	WAF.addListener("KbScCases", "click", KbScCases.click, "WAF");
	WAF.addListener("image2", "click", image2.click, "WAF");
	WAF.addListener("image1", "click", image1.click, "WAF");
// @endregion
};// @endlock

function setStatusCase(){
	var menu = waf.widgets.menuStatusCase;
	var item = menu.getSelectedMenuItem();
	sources.cASOS.Cod_Estado = parseInt(item.id.substring(8));
	sources.cASOS.save();

	setTimeout (source.cASOS.collectionRefresh(), 2000); 
	menu.hide();
	
}


function setDetailMessage(Entity){
	var title = Entity.Tipo;
	var response;	
	if(title == "Respuesta"){
		$$('ctnHeaderMsj').setBackgroundColor("#e8f2f2");			
	}else{
		$$('ctnHeaderMsj').setBackgroundColor("#d4ffaa");
	}
	
	$$('richTextMsg').show();
	try{
		sources.Respondido.Contesto.load({
		   onSuccess: function(event){
		       var persona = event.entity;
		       if(persona != null){
		   	    response = persona.Nombre.value + " " + persona.Apellido.value;
		   		$$('rtResponse').setValue(response);
		   	}
		   }
		});
		
		varTimeMsg = sources.Respondido.GetTime();
		if(varTimeMsg != null){
			sources.varTimeMsg.sync();
		}
		
	}catch(e){
		persona = sources.Respondido.Contesto;
		response = persona.Nombre.value + " " + persona.Apellido.value;
		$$('rtResponse').setValue(response);
	}
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
	var idCase = getUrlVars()["ID"];
	var vlnCookie = document.cookie.split(";")[0];
	vlnCookie = vlnCookie.substr(vlnCookie.indexOf("=")+1);
	if(index != vlnCookie){
		document.location = "/?callback="+url+"&ID="+idCase;
	}else{
		if(idCase > 0){
			setTimeout(function(){
				sources.cASOS.query("Codigo=:1",idCase);
			}, 1000);
			
		}
	}
})();