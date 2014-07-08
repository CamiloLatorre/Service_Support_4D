var Width;
var Height;

WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		Width = $(window).innerWidth();
		Height = $(window).innerHeight(); // returns height of browser viewport
		$$('wysiwyg1').setWidth(Width-9);
		$$('wysiwyg1').setHeight(Height-50);
		setTimeout('firtsBody()', 1000);
		
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock

function firtsBody(){
	$4d.V_WA_GET_BODY_MSN(function(varCBody){
			$$("wysiwyg1").setValue(varCBody);
		});
}

function SetBodyMsg(varCBody){
	$$("wysiwyg1").setValue(varCBody);
}

function GetBodyMsg(){
	varCBody = $$("wysiwyg1").getValue();
	return varCBody;
}

function CleanBodyMsg(){
	$$("wysiwyg1").setValue("");
}

//setInterval(function () {
//	var WidthCurrent = $(window).innerWidth();
//	var HeightCurrent = $(window).innerHeight()
//	if((WidthCurrent!=Width) || (HeightCurrent!=Height)){
//		Width = WidthCurrent;
//		Height = HeightCurrent;
//		$$('wysiwyg1').setWidth(WidthCurrent-9);
//		$$('wysiwyg1').setHeight(HeightCurrent-50);
//	}
//}, 300)
