
var MikeDev9000 = {};

/**
 * Responsible for managing all of the Widget instances.
 * Watche for widgets to update, and updates related widgets as needed.
 */
MikeDev9000.WidgetManager = {
		
	/**
	 * An array of Widget instances
	 */
	widgets: [],
	
	/**
	 * Creates a new Widget with the provided configuration
	 * and adds it to WidgetManager.widgets
	 */
	addWidget: function(options){
		var widget = new MikeDev9000.Widget(options);
	
		MikeDev9000.WidgetManager.widgets.push(widget);
		
		return widget;
	},
	
	/**
	 * Calls the load() function on each widget in the 
	 * WidgetManager.widgets array
	 */
	loadAll: function(){
		for(i = 0; i < MikeDev9000.WidgetManager.widgets.length; i++){
			MikeDev9000.WidgetManager.widgets[i].load();
		}
	}
};

/**
 * Creates a new Widget instance.
 * @param options
 */
MikeDev9000.Widget = function(options){
	
	this.url = null;
	
	this.element = null;
	
	jQuery.extend(this, options);
	
	if(this.element == null){
		alert('element must be defined in the options provided to new Widget()');
	}
	
	this.eventHandlers = {
		form: {
			submit: function(responseText, textStatus, XMLHttpRequest){}
		}
	};
	
	this.element.addClass('mikedev9000-widget');
};

/**
 * Loads content into the widget's container from its url.
 * @param data
 * @returns void
 */
MikeDev9000.Widget.prototype.load = function(data){
	var widgetInstance = this;

	widgetInstance.element.addClass('widget-loading');
	
	this.element.load(this.url, data, function(responseText, textStatus, XMLHttpRequest){
			
		widgetInstance.element.find('form').submit(function(event){
			if(!jQuery(this).hasClass('widget-no-load')){
				event.preventDefault();					
				widgetInstance.load(jQuery(this).serializeArray());
				
				widgetInstance.eventHandlers.form.submit(responseText, textStatus, XMLHttpRequest);
			}
		});
		
		widgetInstance.element.find('a').click(function(event){
			if(!jQuery(this).hasClass('widget-no-load')){
				event.preventDefault();
				widgetInstance.load();
			}
		});
		
		widgetInstance.element.removeClass('widget-loading');
	});
};

jQuery(document).ready(function($){
	MikeDev9000.WidgetManager.loadAll();
});