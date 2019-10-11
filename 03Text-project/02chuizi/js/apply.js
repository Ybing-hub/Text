
handleCart();
handleCarouse();
handleApp();
//购物车
function handleCart(){
	var oCart = document.querySelector('.herder .user .cart');
	var oCartBox = document.querySelector('.herder .cart-box');
	var hideTime = 0
	// console.log(oCart);
	// console.log(oCartBox);
	oCart.onmouseenter = function(){
		oCartBox.style.display = 'block';
		animation(oCartBox,{opacity:100})
	}
	oCart.onmouseleave = function(){
		handleHide();
	}
	oCartBox.onmouseenter = function(){
		clearTimeout(hideTime);
	}
	oCartBox.onmouseleave = function(){
		handleHide();
	}
	function handleHide(){
		hideTime = setTimeout(function(){
			animation(oCartBox,{opacity:0},true,function(){
				oCartBox.style.display = 'none';
			})
		},500)
	}
}
// 轮播图
function handleCarouse(){
	new Carousel({
		id:'carousel',
		aImg:['images/lunbo1.png','images/lunbo2.png','images/5G3.gif','images/5G1.gif'],
		width:1220,
		height:501,
		autoPlayTime:2000
	})
}
//APP下载
function handleApp(){
	var oAppBox = document.querySelector('.content .app .app-list');
	var oAppDisblk = document.querySelector('.content .app .app-disblk');
	var aAppitem = document.querySelectorAll('.content .app .app-list .app-item');
	var aAppDisblk = oAppDisblk.querySelectorAll('.content .app .app-disblk li');
	/*console.log(oAppBox);
	console.log(oAppDisblk);
	console.log(aAppitem);
	console.log(aAppDisblk);*/
	for(var i = 0;i<aAppitem.length;i++){
		aAppitem[i].index = i;
		aAppitem[i].onmouseenter = function(){
			this.style.opacity = 0;
			aAppDisblk[this.index].style.zIndex = 9;
			aAppDisblk[this.index].style.opacity = 1;
		}
		aAppitem[i].onmouseleave = function(){
			this.style.opacity = 1;
			aAppDisblk[this.index].style.zIndex = 0;
			aAppDisblk[this.index].style.opacity = 0;
		}
	}
}