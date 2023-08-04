var colorsInPalette=0;
const tool=(function(w,undefined){
	
	const generator=function(){
		const strUnicode=function(n=10){
			let i=0;
			let unicode='';
			while(i<n){
				rn=Math.floor(Math.random() * 50000);
				unicode+=String.fromCharCode(rn);
				i++;
			}
			return unicode;
		}
		const key=function(length=5,flags=''){
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
		"generateColorPalette":generateColorPalette,
		"generator":generator()
	}
})(window);
/*
 * Author:ssolidsnake
 * Threads:https://www.threads.net/@solidsnakee_
 * Nitter:https://nitter.net/solidsnakee_
 * X:https://x.com/solidsnakee_
 * */
