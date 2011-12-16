(function(window,$){var document=window.document;var defaults={fontsize:12,lineheight:24,font:"12px Courier",baseline:"top",yoffset:(24-12)/2-2,linecolor:"blue",codecolor:"black",rowcolor:"LightCyan",top:10,left:15,indent:8,width:600,filterexp:null};function Lockdown(options){var lockdown=window.Lockdown||this;lockdown.init(options);return lockdown;}Lockdown.prototype={init:function(options){this.settings=$.extend({},defaults,options);},lock:function($elements){var self=this;if($elements){$elements=$elements.map(function(i,element){return self._replaceCodeBlock(element);});}return $elements;},_getCode:function(innerText,className){var s=this.settings;if(/base64/.test(className)){innerText=decodeURIComponent(innerText);}var code=$.trim(innerText).split("\n");if(s.filterexp){code=$.grep(code,function(line,i){return !s.filterexp.test(line);});}return code;},_getCanvas:function(code){var s=this.settings;var canvas=document.createElement("canvas");canvas.width=s.width;canvas.height=code.length*s.lineheight+s.top*2;canvas.style.width=canvas.width+"px";canvas.style.height=canvas.height+"px";if(typeof FlashCanvas!=="undefined"){FlashCanvas.initElement(canvas);}return canvas;},_writeText:function(context,text,x,y,color,align){var s=this.settings;context.font=s.font;context.textAlign=align||"left";context.textBaseline=s.baseline;context.fillStyle=color;context.fillText(text,x,y);},_writeTextRight:function(context,text,x,y,color){this._writeText(context,text,x,y,color,"right");},_writeLine:function(context,i,line){var s=this.settings;var linex=s.left+s.indent-defaults.indent;var liney=i*s.lineheight+s.top+s.yoffset;var codex=s.left+s.indent;var codey=i*s.lineheight+s.top+s.yoffset;if(i%2){context.fillStyle=s.rowcolor;context.fillRect(0,i*s.lineheight+s.top,s.width,s.lineheight);}this._writeTextRight(context,i+1,linex,liney,s.linecolor);this._writeText(context,line,codex,codey,s.codecolor);},_replaceCodeBlock:function(element){var self=this;var s=this.settings;var code=this._getCode($(element).text(),element.className);s.indent=defaults.indent*(code.length+"").length;var canvas=this._getCanvas(code);var $canvas=$(canvas);$(element).replaceWith(canvas);var context=canvas.getContext("2d");$.each(code,function(i,line){self._writeLine(context,i,line);});$canvas.data("code",code.join("\n")).addClass("lockdown");return $canvas;}};window.Lockdown=new Lockdown();})(window,jQuery);