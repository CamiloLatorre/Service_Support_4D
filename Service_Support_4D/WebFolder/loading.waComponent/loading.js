
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'loading';
	// @endregion// @endlock

	this.load = function (data) {// @lock
	
		var opts = {
			lines: 13, // The number of lines to draw
			length: 21, // The length of each line
			width: 11, // The line thickness
			radius: 25, // The radius of the inner circle
			corners: 1, // Corner roundness (0..1)
			rotate: 31, // The rotation offset
			direction: 1, // 1: clockwise, -1: counterclockwise
			color: '#000', // #rgb or #rrggbb or array of colors
			speed: 1.1, // Rounds per second
			trail: 57, // Afterglow percentage
			shadow: true, // Whether to render a shadow
			hwaccel: true, // Whether to use hardware acceleration
			className: 'spinner', // The CSS class to assign to the spinner
			zIndex: 2e9, // The z-index (defaults to 2000000000)
			top: '50%', // Top position relative to parent
			left: '50%' // Left position relative to parent
		};
	// @region namespaceDeclaration// @startlock
	// @endregion// @endlock

	// eventHandlers// @lock

	// @region eventManager// @startlock
	// @endregion// @endlock
		var target = document.getElementById(this.widgets.Loading.id);
		spinnerLoading = new Spinner(opts).spin(target);
	};// @lock
	

}// @startlock
return constructor;
})();// @endlock
