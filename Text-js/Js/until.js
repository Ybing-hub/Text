	
	function anmiate(obj,attr,target){
			clearInterval(obj.timer)
			obj.timer = setInterval(function(){
				var conner = parseFloat(getComputedStyle(obj,false)[attr]);
				if (attr == 'opacity') {
					conner = Math.round(conner * 100)
				}
				var iSzf = 0;
				if (conner<target) {
					iSzf = 10;
				}else{
					iSzf = -10;
				}
				if (Math.abs(target-conner) < Math.abs(iSzf)){
					if (attr == 'opacity') {
						obj.style[attr] = target/100;
					}else{
						obj.style[attr] = target + 'px'
					}
					clearInterval(obj.timer);
				}
				else{
					if (attr == 'opacity') {
						obj.style[attr] = (conner + iSzf)/100;
					}else{
						obj.style[attr] = conner + iSzf + 'px';
					}	
				}
			},30)
		}
	function getscrollTop(){
		return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
	}
	function getscrollLeft(){
		return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
	}
	//多值动画
	function anmiation(obj,options,iSliner,fnEnd){
		if (iSliner == undefined) {
			iSliner = true;
		}
		var iSzf = 0;
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			var isStopAll = true;	
			for(var attr in options){
				var conner = parseFloat(getComputedStyle(obj,false)[attr]);
				if (attr == 'opacity') {
					 conner = Math.round(conner*100);
				}
				if (iSliner) {
					if (conner<options[attr]) {
						iSzf = 10;
					}else{
						iSzf = -10;
					}
					if (Math.abs(options[attr]-conner) < Math.abs(iSzf)){
						if (attr == 'opacity') {
							obj.style[attr]= options[attr]/100;
						}else{
							obj.style[attr] = options[attr]+'px';
						}
					}else{
						isStopAll = false;
					}
				}else{
					iSzf = (options[attr] - conner)/10;
					iSzf = iSzf >0 ? Math.ceil(iSzf) : Math.floor(iSzf);
					if(iSzf){
						isStopAll = false;
					}
				}
				if (isStopAll) {
					clearInterval(obj.timer);
					// if (fuEnd) {
					// 	fuEnd()
					// }
					typeof fnEnd == 'function' && fnEnd()
				}else{
					if (attr == 'opacity') {
						obj.style[attr]= (conner + iSzf)/100;
					}else{
						obj.style[attr] = (conner + iSzf)+'px';
					}
				}
			}	
		},30)
	}
	//生成随机数
	function getRandom(min,max){
		return Math.round(min + (max - min)*Math.random());
	}