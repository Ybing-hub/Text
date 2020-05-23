function toSmall(){
	var bdiv=document.getElementById('box')
	bdiv.style.width='150px';
	bdiv.style.height='150px';
	bdiv.style.background='green';
}function toBig1(){
	var bdiv1=document.getElementById('box1')
	bdiv1.style.width='300px';
	bdiv1.style.height='300px';
	bdiv1.style.background='cyan';
}
function toSmall1(){
	var bdiv1=document.getElementById('bo1x')
	bdiv1.style.width='150px';
	bdiv1.style.height='150px';
	bdiv1.style.background='green';
}
function toBig(){
	var bdiv=document.getElementById('box')
	bdiv.style.width='300px';
	bdiv.style.height='300px';
	bdiv.style.background='cyan';
}
var bdiv=document.getElementById('box')
// bdiv.onmousemove=toBig;
// bdiv.onmouseout=toSmall;
/*匿名函数*/
bdiv.onmousemove=function(){
	toSmall();
}
bdiv1.onmousemove=function(){
	toBig1();
}
bdiv.onmouseout=function(){
	toBig();
}
bdiv1.onmouseout=function(){
	toSmall1();
}
