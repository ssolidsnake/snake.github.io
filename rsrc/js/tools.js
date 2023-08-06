var colorsInPalette=0;
class Tool{
	constructor(){
		return{
			"generator":this.generator(),
			"generateColorPalette":this.generateColorPalette
		}
	}
		
	generator(){
		const strUnicode=function(n=10){
			let i=0;
			let unicode='';
			let rn=null;
			while(i<n){
				rn=Math.floor(Math.random() * 50000);
				unicode+=String.fromCharCode(rn);
				i++;
			}
			return unicode;
		}
		const key=function(length=5,flags=''){
			let regExp,validFlags,activedFlags,keygen,i,rflag,rchar=null;
			if(flags==''){
				return strUnicode(length).match(/./g).join('');
			}
			else{
				flags+='';
				regExp={
					"all":/./g,//0
					"upper":/[A-Z]/g,//1
					"lower":/[a-z]/g,//2
					"number":/[\d]/g,//3
					"simbol":/[!"#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~]/g,//4
					"kanji":/[\u4E00-\u9FFF]+/g,//5
					"cyrillic":/[\u0400-\u04FF]+/g,//6
					"arabic":/[\u0600-\u06FF]+/,//7
					"indic":/[\u0900-\u097F]+/g,//8
					"emoji":/[\u{1F300}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u//9
				};
				validFlags=Object.keys(regExp);
				activedFlags=[];
				i=0;
				while(i<flags.length){
					if(typeof validFlags[flags[i]]!=="undefined")
						activedFlags[i]=validFlags[flags[i]];
					i++;
				}
				activedFlags = [...new Set(activedFlags)];
				i=0;
				keygen="";
				while(i<length){
					rflag=activedFlags[Math.floor(Math.random() * activedFlags.length)];
					rchar=strUnicode().match(regExp[rflag]);
					while(rchar==null){
						rchar=strUnicode().match(regExp[rflag]);
					}
					rchar=rchar[Math.floor(Math.random() * rchar.length)];
					keygen+=rchar;
					i++;
				}
				return keygen;
			}
		}
		return{
			strUnicode:strUnicode,
			key:key
		}
	}
			
	generateColorPalette(){
		let el=null;
		let i=null;
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
};

class Filter{
	constructor({canvas=null}={}){
		if(!canvas)
			throw new Error("canvas required");
				
		if(!(canvas instanceof HTMLElement && canvas.tagName=='CANVAS'))
			throw new Error("invalid canvas");
		
		this.canvas=canvas;
		this.ctx=canvas.getContext("2d");
	}

	applyGrayScaleFilter(){
		const canvas=this.canvas;
		const ctx=canvas.getContext("2d");
		const imageData=ctx.getImageData(0,0,canvas.width,canvas.height);
		const data = imageData.data;
		for (let i=0;i<data.length;i+=4) {
			const gray = (data[i]+data[i+1]+data[i+2])/3;
			data[i]=gray;
			data[i+1]=gray;
			data[i+2]=gray;
		}
		ctx.putImageData(imageData, 0, 0);
	}

	applySepiaFilter(){
		const canvas=this.canvas;
		const ctx=canvas.getContext("2d");
		const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		const data = imageData.data;
		for(let i = 0; i < data.length; i += 4){
			const r = data[i];
			const g = data[i + 1];
			const b = data[i + 2];

			const tr = 0.393 * r + 0.769 * g + 0.189 * b;
			const tg = 0.349 * r + 0.686 * g + 0.168 * b;
			const tb = 0.272 * r + 0.534 * g + 0.131 * b;

			data[i] = Math.min(255, tr);
			data[i + 1] = Math.min(255, tg);
			data[i + 2] = Math.min(255, tb);
	  }
	  ctx.putImageData(imageData, 0, 0);
	}



	applyNegativeFilter(){
		const canvas=this.canvas;
		const ctx=canvas.getContext("2d");
		const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		const data = imageData.data;
		for (let i = 0; i < data.length; i += 4) {
			data[i] = 255 - data[i]; // R
			data[i + 1] = 255 - data[i + 1]; // G
			data[i + 2] = 255 - data[i + 2]; // B
		}
		ctx.putImageData(imageData, 0, 0);
	}


	applyBlurFilter() {
		const canvas=this.canvas;
		const ctx=canvas.getContext("2d");
		const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		const data = imageData.data;

		const width = canvas.width;
		const height = canvas.height;
		const n = 3; 

		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				let r = 0;
				let g = 0;
				let b = 0;
				for (let j = -n; j <= n; j++) {
					for (let i = -n; i <= n; i++) {
						const pixelIndex = (y + j) * width + x + i;
						const pixelOffset = pixelIndex * 4;
						r += data[pixelOffset];
						g += data[pixelOffset + 1];
						b += data[pixelOffset + 2];
					}
				}
				const pixelIndex = y * width + x;
				const pixelOffset = pixelIndex * 4;
				const numPixels = (2 * n + 1) * (2 * n + 1);
				data[pixelOffset] = r / numPixels;
				data[pixelOffset + 1] = g / numPixels;
				data[pixelOffset + 2] = b / numPixels;
			}
		}
		ctx.putImageData(imageData, 0, 0);
	}

	applySharpenFilter(){
		const canvas=this.canvas;
		const ctx=canvas.getContext("2d");
		const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		const data = imageData.data;
		const width = canvas.width;
		const height = canvas.height;
		const n = 1;

		for (let y = n; y < height - n; y++) {
			for (let x = n; x < width - n; x++) {
				let r = 0;
				let g = 0;
				let b = 0;
				for (let j = -n; j <= n; j++) {
					for (let i = -n; i <= n; i++) {
						const pixelIndex = (y + j) * width + x + i;
						const pixelOffset = pixelIndex * 4;

						const weight = j === 0 && i === 0 ? 2 : -1;

						r += data[pixelOffset] * weight;
						g += data[pixelOffset + 1] * weight;
						b += data[pixelOffset + 2] * weight;
					}
				}
				const pixelIndex = y * width + x;
				const pixelOffset = pixelIndex * 4;
				data[pixelOffset] = Math.min(255, Math.max(0, data[pixelOffset] + r));
				data[pixelOffset + 1] = Math.min(255, Math.max(0, data[pixelOffset + 1] + g));
				data[pixelOffset + 2] = Math.min(255, Math.max(0, data[pixelOffset + 2] + b));
			}
	  }
	  ctx.putImageData(imageData, 0, 0);
	}
				
}

const tool=new Tool();

/*
 * Author:ssolidsnake
 * Threads:https://www.threads.net/@solidsnakee_
 * Nitter:https://nitter.net/solidsnakee_
 * X:https://x.com/solidsnakee_
 * */
