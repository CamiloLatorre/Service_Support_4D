
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'Profile';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var image2 = {};	// @image
	var tfPdwRepet = {};	// @textField
	var button7 = {};	// @button
	var button8 = {};	// @button
	var button1 = {};	// @button
	var image1 = {};	// @image
	// @endregion// @endlock
	var left = $(window).innerWidth();
	var top = $(window).innerHeight(); // returns height of browser viewport
	this.move(left/2.5, top/4);
	$$(id+'_ctnRestorePWD').move('19px','56px');
	
	currentUser = waf.directory.currentUser();
	if(currentUser != null){
		sources.cpmProfile_pERSONAS.query('Email = '+currentUser.userName,function(){
			var Female = sources.cpmProfile_pERSONAS.Femenino;
			if(Female){
				$$(id+'_imageProfile').setValue('/Images/user_female.png');
			}
		});
	}
	
	var OKPDWChange = false;
	// eventHandlers// @lock

	image2.click = function image2_click (event)// @startlock
	{// @endlock
		try{
			sources.cpmProfile_pERSONAS.save();
			$$(id).removeComponent();
		}catch(e){
			$$(id+'_errorDivProfile').setValue(e);
		}
		
	};// @lock

	tfPdwRepet.change = function tfPdwRepet_change (event)// @startlock
	{// @endlock
		var pdw = $$(id+'_tfPdw').getValue();
		var pdwRepet = $$(id+'_tfPdwRepet').getValue();
		
		if(pdw != pdwRepet){
			$$(id+'_errorDivProfile').setValue('Las contraseñas no coinciden.');
		}else{
			$$(id+'_errorDivProfile').setValue(' ');
			OKPDWChange = true;
		}
	};// @lock

	button7.click = function button7_click (event)// @startlock
	{// @endlock
		if(OKPDWChange){
			var pdw = $$(id+'_tfPdw').getValue();
			pdw = $().crypt({method:"md5",source:pdw});
			sources.cpmProfile_Adquiere.Pass = pdw;
			sources.cpmProfile_Adquiere.save();
			debugger;
			DirectoryRemote.SetPassword(currentUser.ID, pdw);
			$$(id+'_ctnBodyProfile').show();
			$$(id+'_ctnRestorePWD').hide();
		}else{
			$$(id+'_errorDivProfile').setValue('Las contraseñas no coinciden.');
		}
	};// @lock

	button8.click = function button8_click (event)// @startlock
	{// @endlock
		$$(id+'_ctnBodyProfile').show();
		$$(id+'_ctnRestorePWD').hide();
	};// @lock

	button1.click = function button1_click (event)// @startlock
	{// @endlock
		$$(id+'_ctnBodyProfile').hide();
		$$(id+'_ctnRestorePWD').show();
	};// @lock

	image1.click = function image1_click (event)// @startlock
	{// @endlock
		$$(id).removeComponent();
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_image2", "click", image2.click, "WAF");
	WAF.addListener(this.id + "_tfPdwRepet", "change", tfPdwRepet.change, "WAF");
	WAF.addListener(this.id + "_button7", "click", button7.click, "WAF");
	WAF.addListener(this.id + "_button8", "click", button8.click, "WAF");
	WAF.addListener(this.id + "_button1", "click", button1.click, "WAF");
	WAF.addListener(this.id + "_image1", "click", image1.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
