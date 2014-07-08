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
	
//	Mousetrap.bind("up", NextCase);
//	Mousetrap.bind("down", PreviousCase);
//	Mousetrap.bind("right", NextMessage);
//	Mousetrap.bind("left", PreviousMessage);

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

// eventHandlers// @lock

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
				$$('imageNewMsj').hide();
			}else{
				$$('imageNewMsj').show();
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
	var url = window.location.href;
	var index =  getUrlVars()["Index"];
	if(index == undefined){
		document.location = "/?callback="+url.substring(25);
	}
})();