const helper=(function(w,u){
	
	function isScrollAtBottom(elid){
		let content=scrollOffset=null;
		elid=elid||null;
		if(elid===null){
			content=document.body;
		}
		else{
			content=document.getElementById(elid);
		}
		scrollOffset=window.innerHeight + window.scrollY;
		console.log(scrollOffset>=content.offsetHeight);
		return scrollOffset>=content.offsetHeight;
	}
	
	function generateColorItem(tag,i){
		i=i||randomInt(0,0xffffff);
		tag=tag||'span';
		hex=i.toString(16).padStart(6,'0');
		el=document.createElement(tag);
		el.style.backgroundColor="#"+hex;
		el.innerHTML='#'+hex;
		el.onclick=function(e){
			$(this).addClass("active");
		};
		el.onmousemove=function(e){
			$(this).addClass("hover");
		};
		el.onmouseout=function(e){
			$(this).removeClass("active");
			$(this).removeClass("hover");
		};
		return el;
	}
	
	function randomInt(min,max){
		const random=Math.random();
		const randomInt=min+Math.floor(random*(max-min+1));
		return randomInt;
	}
	
	function handleFileSelect(){
		return new Promise((resolve,reject)=>{
			const file = event.target.files[0];
			const reader = new FileReader();
			reader.onload = function (event) {
				try{
					let img = new Image();
					let canvas=document.createElement("canvas");
					let ctx=canvas.getContext("2d");
					img.onload = function () {
						canvas.width = img.width;
						canvas.height = img.height;
						ctx.drawImage(img, 0, 0, img.width, img.height);
						const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
						const data = imageData.data;
						ctx.putImageData(imageData, 0, 0);
					};
					img.src = event.target.result;
					let data={
						"img":img,
						"canvas":canvas,
						"ctx":ctx,
					};
					resolve(data);
				}catch(error){
					reject(error);
				}				
			};
			reader.readAsDataURL(file);
		});
	}
	
	return{
		isScrollAtBottom:isScrollAtBottom,
		generateColorItem:generateColorItem,
		handleFileSelect:handleFileSelect
	}
	
})(window,undefined);
/*
 * Author:ssolidsnake
 * Threads:https://www.threads.net/@solidsnakee_
 * Nitter:https://nitter.net/solidsnakee_
 * X:https://x.com/solidsnakee_
 * */
