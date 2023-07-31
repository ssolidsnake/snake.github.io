const handler=(function(w,undefined){
	function scroll(callback,elid){
		elid=elid||null;
		if(helper.isScrollAtBottom(elid)){
			if(typeof callback==='function')
				callback();
			else
				console.log("Error: Callback is not a function. Required function");
		}
	}
	function infinityScroll(callback,elid){
		elid=elid||null;
		window.addEventListener('scroll',function(){
			if(typeof callback==='function')
				handler.scroll(callback(),elid);
		});
	}
	return{
		scroll:scroll,
		infinityScroll:infinityScroll
	}
})(window);
/*
 * Author:ssolidsnake
 * Threads:https://www.threads.net/@solidsnakee_
 * Nitter:https://nitter.net/solidsnakee_
 * X:https://x.com/solidsnakee_
 * */
