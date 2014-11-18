(function(BreadCrumbs) {

//    /* Default width and height of your widget */
//    BreadCrumbs.setWidth('200');
//    BreadCrumbs.setHeight('20');

//    /* Define custom event for your widget */
//    BreadCrumbs.addEvent('myEvent');
	BreadCrumbs.addProperty('Items');
	
    /* Customize existing properties */
    BreadCrumbs.customizeProperty('Items', {
        sourceTitle: 'Items',
        display: false,
        sourceDisplay: true
    });

//    /* Add a Label property */
//    BreadCrumbs.addLabel({
//        'defaultValue': '',
//        'position': 'top'
//    });

//    /* Set the Design and Styles panels */
//    BreadCrumbs.setPanelStyle({
//        'fClass': true,
//        'text': true,
//        'background': true,
//        'border': true,
//        'sizePosition': true,
//        'label': true,
//        'disabled': ['border-radius']
//    });

    /* Override widget's initialization */
    BreadCrumbs.prototype.init = function() {
        this.node.innerHTML = ' '; /* Include text inside the widget */
    }

});

// For more information, refer to http://doc.wakanda.org/Wakanda0.DevBranch/help/Title/en/page3870.html