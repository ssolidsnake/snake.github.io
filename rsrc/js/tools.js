var colorsInPalette=0;
const tool=(function(w,undefined){
	function generateColorPalette(){
		let el=i=null;
		while(i<1000){
			el=helper.generateColorItem('button');
			document.getElementById('colorPalette').appendChild(el);
			i++;
		}
		handler.infinityScroll(function(){
			i=0;
			while(i<1000){
				el=helper.generateColorItem('button');
				document.getElementById('colorPalette').appendChild(el);
				i++;
			}
			colorsInPalette+=1000;
			console.log(colorsInPalette);
		});
	}
	return{
		"generateColorPalette":generateColorPalette
	}
})(window);
/*
 * Author:ssolidsnake
 * Threads:https://www.threads.net/@solidsnakee_
 * Nitter:https://nitter.net/solidsnakee_
 * X:https://x.com/solidsnakee_
 * */
