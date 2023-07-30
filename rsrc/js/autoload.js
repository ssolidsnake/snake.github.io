const appAutoload=(function(w){
	let value=fname=i=el=uri=null;
	const rsrc={
		"js":[
			"jquery.min.js",
			"bootstrap.min.js",
		],
		"css":[
			"bootstrap.min.css",
			"main.css",
		],
	};
	for(const key in rsrc){
		if(rsrc.hasOwnProperty(key))
		{
			value=rsrc[key];
			value.forEach((fname,i)=>{
				if(fname!==null && fname!==''){
					uri="/rsrc/"+key+'/'+fname;
					if(key==='css')
					{
						el=document.createElement("link");
						el.href=uri;
						el.rel='stylesheet';
						document.head.appendChild(el);
					}			
					else if(key==='js')
					{
						el=document.createElement("script");
						el.src=uri;
						document.body.appendChild(el);
					}
				}
			});
		}
	}
})(window,undefined);
/*
 * Author:ssolidsnake
 * Threads:https://www.threads.net/@solidsnakee_
 * Nitter:https://nitter.net/solidsnakee_
 * X:https://x.com/solidsnakee_
 * */
