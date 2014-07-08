
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var cASOSEvent = {};	// @dataSource
	var documentEvent = {};	// @document
	var image2 = {};	// @image
	var image1 = {};	// @image
	var RespondidoEvent = {};	// @dataSource
// @endregion// @endlock

// eventHandlers// @lock

	cASOSEvent.onBeforeCurrentElementChange = function cASOSEvent_onBeforeCurrentElementChange (event)// @startlock
	{// @endlock
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
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		shortcut.add("Down",function() {
			source.cASOS.selectNext();
		});
		shortcut.add("Up",function() {
			source.cASOS.selectPrevious();
		});
		shortcut.add("Right",function() {
			source.Respondido.selectNext();
		});
		shortcut.add("Left",function() {
			sources.Respondido.selectPrevious();
		});
		
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

	RespondidoEvent.onBeforeCurrentElementChange = function RespondidoEvent_onBeforeCurrentElementChange (event)// @startlock
	{// @endlock
		
		var title = this.Tipo;
				
		if(title == "Respuesta"){
			$$('ctnHeaderMsj').setBackgroundColor("#d4ffaa");				
		}else{
			$$('ctnHeaderMsj').setBackgroundColor("#e8f2f2");
		}
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("cASOS", "onBeforeCurrentElementChange", cASOSEvent.onBeforeCurrentElementChange, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("Respondido", "onBeforeCurrentElementChange", RespondidoEvent.onBeforeCurrentElementChange, "WAF");
	WAF.addListener("image2", "click", image2.click, "WAF");
	WAF.addListener("image1", "click", image1.click, "WAF");
// @endregion
};// @endlock
