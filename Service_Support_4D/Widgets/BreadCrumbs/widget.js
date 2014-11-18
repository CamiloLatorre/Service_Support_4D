WAF.define('BreadCrumbs', ['waf-core/widget'], function(widget) {
	
    var BreadCrumbs = widget.create('BreadCrumbs', {
        init: function() {
        	
	    	sources.arrBreadCrums.addNewElement({
				Name: 'Home',
				Link: '/',
				Her: 0
			});
			$("#"+this.id).append('<a class="current">Home</a>');

        },
        
//        /* Create a property */
        test: widget.property({
            onChange: function(newValue) {
                this.node.innerHTML = this.test(); /* this contains the widget and newValue contains its current value */
            }
        })
    });
    
    BreadCrumbs.prototype.pushItem = function(pItem, pHer){
    	if(arrBreadCrums[arrBreadCrums.length-1].Her == pHer){
	    	this.popItem();
    	}
    	    	
    	arrBreadCrums.push({
			Name: pItem.Title,
			Link: pItem.Link,
			Her: pHer
		});

		sources.arrBreadCrums.sync();

    	$("#"+this.id).children().remove();
	
        for (var i = 0; i < arrBreadCrums.length; i++) {
        	if(i > 0){
		    	$("#"+this.id).append('<div class="breadcrumb_divider"></div>');
			}	
			
        	if(i == arrBreadCrums.length-1){
		   		$("#"+this.id).append('<a class="current">'+arrBreadCrums[i].Name+'</a>');	
        	}else{
        		$("#"+this.id).append('<a href="'+arrBreadCrums[i].Link+'">'+arrBreadCrums[i].Name+'</a>')
        	}
		};
	    
	};
	
	BreadCrumbs.prototype.popItem = function(){
		try{
        	$("#"+this.id).children()[$("#"+this.id).children().length-1].remove();
        	$("#"+this.id).children()[$("#"+this.id).children().length-1].remove();
			arrBreadCrums.pop();
    	}catch(e){}
	};
	

//    /* Map the custom event above to the DOM click event */
//    BreadCrumbs.mapDomEvents({
//        'click': 'action'
//    });

    return BreadCrumbs;

});

/* For more information, refer to http://doc.wakanda.org/Wakanda0.DevBranch/help/Title/en/page3871.html */