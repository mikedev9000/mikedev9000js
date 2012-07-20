
var MikeDev9000 = {};

MikeDev9000.Widget = function(options){
	
	// Holds an array of widgets contained in the current widget
	this.children = [];
	
	this.url = null;
	
	// Called within the complete function after .load is completed and Widget.loadComplete() finishes
	this.loadComplete = function(responseText, textStatus, XMLHttpRequest){};
	
	jQuery.extend(this, options);
	
	if(typeof(this.element) == 'undefined'){
		alert('element must be defined in the options provided to new Widget()');
	}
};

MikeDev9000.Widget.prototype.add = function(options){
	this.children.push(new Widget(options));
};

MikeDev9000.Widget.prototype.load = function(){
	var widgetInstance = this;
	
	if( this.url != null){	
		this.element.load(this.url, function(responseText, textStatus, XMLHttpRequest){
			widgetInstance.loadComplete(responseText, textStatus, XMLHttpRequest);
		});
	}
	
	for(i = 0; i < widgetInstance.children.length; i++){
		widgetInstance.children[i].load();
	}
};

MikeDev9000.Widget.top = new Widget({
	element: jQuery(document)
});

jQuery(document).ready(function($){
	Widget.top.load();
});