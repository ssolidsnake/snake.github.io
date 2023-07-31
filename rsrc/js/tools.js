var colorsInPalette=0;
const tool=(function(w,undefined){
	function generateColorPalette(){
		handler.infinityScroll(function(){
			i=0;
			while(i<1000){
				el=helper.generateColorItem('button');
				document.getElementById('colorPalette').appendChild(el);
				i++;
			}
			colorsInPalette+=1000;
			console.log(colorsInPalette);
		},"colorPalette");
	}
	return{
		"generateColorPalette":generateColorPalette
	}
})(window);
