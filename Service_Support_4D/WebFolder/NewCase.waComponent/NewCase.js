
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'NewCase';
	// @endregion// @endlock
	var OK =false;
	var objAttach = {};
	
	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var cASOSEvent = {};	// @dataSource
	var fileUpload1 = {};	// @fileUpload
	var imgSendCase = {};	// @image
	var imgNextStep = {};	// @image
	var image1 = {};	// @image
	// @endregion// @endlock
	
	// eventHandlers// @lock

	var left = $(window).innerWidth();
	var top = $(window).innerHeight();
	this.move(left/4, top/4);
	$$(id+'_menuBar1').hide();
	var currentUser = waf.directory.currentUser();
	source.cpmNewCase_uSUARIOS.query('ID_Directory = :1', {
	onSuccess:function(entity){
		 	entity.dataSource.Adquirido.load({					
		    	onSuccess: function(relation){
					currentPerson = relation.entity;
					currentPerson.IDPersona = currentPerson.Codigo;
					var tipoPersona = currentPerson.Cod_Tipo.value;
					if((tipoPersona ==1) || (tipoPersona ==3)){ 
						currentUser.type = 1;
						$$(id+'_tabView1').selectTab(1);
						$$(id+'_cbContactResponses').hide();
						$$(id+'_tfMsgDate').hide();
						$$(id+'_tfMsgTime').hide();
					}else{
						currentUser.type = 0;
						$$(id+'_tabView1').selectTab(2);
					}
				}
			});
			
		}, 
		params: [waf.directory.currentUser().ID]
	});
	
	try{
		SetShortCuts('Disable');
		$$(id+'_menuBar1').disable(2);
		
		$comp.sources.cASOS.addNewElement();
		$comp.sources.Respondido.addNewElement();
		
		var atListSO = $comp.sources.cASOS.GET_LIST_SO().soS;
		for (var i = 0; i < atListSO.length; i++) {
			$$(id+'_cbListSO').addOption(atListSO[i]);
			$$(id+'_cbListSOAdmin').addOption(atListSO[i]);
		};
				
		var atListVersion = $comp.sources.cASOS.GET_LIST_VERSION().Versiones;
		for (var i = 0; i < atListVersion.length; i++) {
			$$(id+'_cbListVersion').addOption(atListVersion[i]);
			$$(id+'_cbListVersionAdmin').addOption(atListVersion[i]);
		};
		
		var objPeople = $comp.sources.Respondido.GET_PEOPLE(0);
		var atPeopleNames = objPeople.contactNames;
		var atPeopleIDs = objPeople.contactIDs;
		
		for (var i = 0; i < atPeopleNames.length; i++) {
			$$(id+'_cbContacts').addOption(atPeopleIDs[i], atPeopleNames[i]);
		};
		
		var objPeople = $comp.sources.Respondido.GET_PEOPLE(1);
		var atPeopleNames = objPeople.contactNames;
		var atPeopleIDs = objPeople.contactIDs;
		
		for (var i = 0; i < atPeopleNames.length; i++) {
			$$(id+'_cbColaboradores').addOption(atPeopleIDs[i], atPeopleNames[i]);
		};
		
		var objTopics = $comp.sources.cASOS.GET_TOPICS();
		var atTopicIDs = objTopics.ID;
		var atTopics = objTopics.name;

		for (var i = 0; i < atTopicIDs.length; i++) {
			$$(id+'_cbTemas').addOption(atTopicIDs[i], atTopics[i]);
		};
		
		this.sources.cASOS.getCurrentElement().So.setValue(atListSO[0]);
		this.sources.cASOS.getCurrentElement().Version.setValue(atListVersion[0]);
		this.sources.pRODUCTOS.all();
	
	}catch(e){}
	
	cASOSEvent.onDescripcionAttributeChange = function cASOSEvent_onDescripcionAttributeChange (event)// @startlock
	{// @endlock
		var enabledNextStep = 0;
		var description = this.Descripcion;
		switch(enabledNextStep) {
			case 0:
				if(description.length < 8)
				break;
			case 1:
				var titleSize = this.Nombre.length;
				if(( titleSize <= 3) && (titleSize > 50))
				break;
			case 2:
				$comp.widgets.imgNextStep.enable();
				OK = true;
				break;
		}
		
		if(!OK){
			$$($comp.id+'_ctnAlert').show();
			$$($comp.id+'_ctnAlert').move(200, 300);
			$$($comp.id+'_edAlert').setValue('Error');
			setTimeout(function(){
				$$($comp.id+'_ctnAlert').hide();
			}, 1000);
		}
	};// @lock

	fileUpload1.filesUploaded = function fileUpload1_filesUploaded (event)// @startlock
	{// @endlock
		debugger;
		var blob = this.getFiles()[0];
		var reader = new FileReader();
		reader.onload = function(e) {
			objAttach.Attachment = e.target.result;
		};
		objAttach.name  = blob.name;
		objAttach.size = blob.size;
		if(blob.type.indexOf("image") != -1){
			objAttach.kind = "Imagen";
		}else{
			objAttach.kind = blob.type;
		}
		reader.readAsDataURL(blob);
	};// @lock
		
	imgSendCase.click = function imgSendCase_click (event)// @startlock
	{// @endlock
		var message = $$(id+'_detailMsg').getValue();
		var description = $$(id+'_tfDescription').getValue();
		var name = $$(id+'_tfName').getValue();
		
		if((message.length != "") && (description != "") && (name != "")){
			var Respondido = $comp.sources.Respondido;
			var vCase = $comp.sources.cASOS.getCurrentElement(); 
			var tipoPersona = currentUser.type;
			
			if((tipoPersona == 1) || (tipoPersona == 3)){ 
				vCase.Cod_Contacto = currentPerson.IDPersona;
				
				Respondido.Tipo = 'Pregunta';
				Respondido.Fecha = new Date();
				Respondido.Hora = Respondido.Fecha.getTime();
				Respondido.Cod_Persona = currentPerson.IDPersona;
			}
			
			Respondido.Cuerpo = $$(id+'_detailMsg').getValue();
			try{
				Respondido.save({
					onSuccess: function(event){
						if(objAttach.size > 0 ){
							objAttach.IDMsg = event.dataSource.Codigo;
							Respondido.GS_CREATE_ATTACHMENT(objAttach);
							location.reload();
						}
					}
				});
			}catch(e){}
		}else{
			$$($comp.id+'_ctnAlert').show();
			$$($comp.id+'_ctnAlert').move(200, 300);
			$$($comp.id+'_edAlert').setValue('Debe escribir en los campos');			
			setTimeout(function(){
				$$($comp.id+'_ctnAlert').hide();
			}, 1000);
		}
	};// @lock
	
	imgNextStep.click = function imgNextStep_click (event)// @startlock
	{// @endlock
		if(!OK){
			$$($comp.id+'_ctnAlert').show();
			$$($comp.id+'_ctnAlert').move(200, 300);
			$$($comp.id+'_edAlert').setValue('Título y Descripción son requeridos.');
			setTimeout(function(){
				$$($comp.id+'_ctnAlert').hide();
			}, 1000);
		}else{	
			var pos = $$(id+'_tabView1').getSelectedTab();
			var numTab;
			var imageFile;
			switch(pos.index) {
				case 1:
				case 2:
					numTab = 3;
					imageFile = '/images/002_45-hover.png';
					$$(id+'_imgSendCase').show();
					break;
				case 3:
					if(currentUser.type == 0){
						numTab = 2;
					}else{
						numTab = 1;
					}
					imageFile = '/images/002_46-hover.png';
					$$(id+'_imgSendCase').hide();
					break;
			}
				
			$$(id+'_tabView1').selectTab(numTab);
			var contactID = $$(id+'_cbContacts').getValue();
			var objPeople = $comp.sources.Respondido.GET_PEOPLE(2, contactID);
			var atPeopleNames = objPeople.contactNames;
			var atPeopleIDs = objPeople.contactIDs;
			$$(id+'_cbContactResponses').rebuild();
			for (var i = 0; i < atPeopleNames.length; i++) {
				$$(id+'_cbContactResponses').addOption(atPeopleIDs[i], atPeopleNames[i]);
			};
			
			this.setValue(imageFile);
		}
	};// @lock
	
	image1.click = function image1_click (event)// @startlock
	{// @endlock
		try{
			$$(id).removeComponent();
			SetShortCuts('Enable');
			location.reload();
		}catch(e){}
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_cASOS", "onDescripcionAttributeChange", cASOSEvent.onDescripcionAttributeChange, "WAF", "Descripcion");
	WAF.addListener(this.id + "_fileUpload1", "filesUploaded", fileUpload1.filesUploaded, "WAF");
	WAF.addListener(this.id + "_imgSendCase", "click", imgSendCase.click, "WAF");
	WAF.addListener(this.id + "_imgNextStep", "click", imgNextStep.click, "WAF");
	WAF.addListener(this.id + "_image1", "click", image1.click, "WAF");
	// @endregion// @endlock

	};// @lock

}// @startlock
return constructor;
})();// @endlock
