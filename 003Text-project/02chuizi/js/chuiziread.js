handleCart();
handleCarouse();
handleQRcode();
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

//二维码显示
function handleQRcode(){
	var oQrbtn = document.querySelector('.content .content-download .download-box .btn-erweima');
	var oQrbtnBox = document.querySelector('.content .content-download .erweima-box');
	oQrbtn.onmouseenter = function(){
		oQrbtnBox.style.display = 'block'
	}
	oQrbtn.onmouseleave = function(){
		oQrbtnBox.style.display = 'none'
	}
}

// 轮播图
function handleCarouse(){
	new Carousel({
		id:'carousel-phone',
		aImg:['images/acticle-1.jpg','images/acticle-2.jpg','images/acticle-3.jpg','images/acticle-4.jpg','images/acticle-5.jpg'],
		width:392,
		height:650,
		autoPlayTime:3000
	})
}

