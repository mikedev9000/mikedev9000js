
var MikeDev9000 = {};

//holds all of the widgets and managers activities between them
MikeDev9000.WidgetManager = {	
	widgets: [],
	
	addWidget: function(options){
		MikeDev9000.WidgetManager.widgets.push(new MikeDev9000.Widget(options));	
	},
	
	loadAll: function(){
		for(i = 0; i < MikeDev9000.WidgetManager.widgets.length; i++){
			MikeDev9000.WidgetManager.widgets[i].load();
		}
	}
};

MikeDev9000.Widget = function(options){
	
	this.url = null;
	
	this.element = null;
	
	jQuery.extend(this, options);
	
	if(this.element == null){
		alert('element must be defined in the options provided to new Widget()');
	}
	
	this.element.addClass('mikedev9000-widget');
};

MikeDev9000.Widget.prototype.load = function(data){
	var widgetInstance = this;
	
	if( MikeDev9000.WidgetManager.loadCalls > 15 ){
		return;
	}
	
	widgetInstance.element.addClass('widget-loading');
	
	var complete = function(responseText, textStatus, XMLHttpRequest){
		
		widgetInstance.element.find('form').submit(function(event){
			if(!jQuery(this).hasClass('widget-no-load')){
				event.preventDefault();					
				widgetInstance.load(jQuery(this).serializeArray());
			}
		});
		
		widgetInstance.element.find('a').click(function(event){
			if(!jQuery(this).hasClass('widget-no-load')){
				event.preventDefault();					
				widgetInstance.load();
			}
		});
		
		widgetInstance.element.removeClass('widget-loading');
	};
	
	if( typeof(data) == 'undefined' ){
		this.element.load(this.url, complete);
	}
	else{
		this.element.load(this.url, data, complete);
	}
};

jQuery(window).load(function($){
	MikeDev9000.WidgetManager.loadAll();
});