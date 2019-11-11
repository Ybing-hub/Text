

handleCart();
handleNavContent();
handleCarouse();
handleCate();
handleTime();
handleFlashPart();
handleElecPart();
//购物车
function handleCart(){
	var oCart = document.querySelector('.top .cart');
	var oCartBox = document.querySelector('.top .cart .cart-box a');
	var oCartCont = document.querySelector('.top .cart .cart-content');
	var oLoader = document.querySelector('.loader');
	var oSpan = oCartCont.querySelector('span');
	oCart.onmouseenter = function(){
		oLoader.style.display = 'block';
		oCartBox.style.backgroundColor = '#fff'
		oCartBox.style.color = '#ff6700';
		animation(oCartCont,{height:100},true,function(){
			oLoader.style.display = 'none'
			oSpan.style.display = 'block';
		})	
	}
	oCart.onmouseleave = function(){
		oCartBox.style.backgroundColor = '#424242'
		oCartBox.style.color = '#b0b0b0';
		animation(oCartCont,{height:0},true,function(){
			oLoader.style.display = 'none';
			oSpan.style.display = 'none';
		});
	}
}

//下拉菜单
function handleNavContent(){
	var aNavitem = document.querySelectorAll('.header .header-nav-item');
	var oNavContent = document.querySelector('.header .nav-content');
	var oNavContentBox = oNavContent.querySelector('.container')
	var hideTimer = 0;
	for(var i = 0;i<aNavitem.length-2;i++){
		aNavitem[i].index = i;
		aNavitem[i].onmouseenter = function(){
			clearTimeout(hideTimer)
			oNavContent.style.borderTop = '1px solid #ccc';
			animation(oNavContent,{height:200})
			//加载数据
			loadDate(this.index)
		}
		aNavitem[i].onmouseleave = function(){
			handleHide();
		}
	}
	oNavContent.onmouseenter = function(){
		clearTimeout(hideTimer);
	}
	oNavContent.onmouseleave = function(){
			handleHide();
	}
	function handleHide(){
		hideTimer = setTimeout(function(){
			animation(oNavContent,{height:0},true,function(){
				oNavContent.style.borderTop = '';
			})
		},2000)	
	}
	function loadDate(index){
		var date = aNavContentDate[index];
		var html = '<ul>';
		for(var i=0;i<date.length;i++){
			html +=' <li>';
			html +='	<div class="img-box">';
			html +='		<a href="'+date[i].url+'">';
			html +='			<img src="'+date[i].img+'" alt="">';
			html +='		</a>';
			html +='		<p class="product-name">'+date[i].name+'</p>';
			html +='		<p class="product-price">'+date[i].price+'元起</p>';
			html +='	</div>';
			html +=' </li>';
			}	
		html +='</ul>';
		oNavContentBox.innerHTML = html;
	}
}
//轮播图
function handleCarouse(){
	new Carousel({
		id:'carousel',
		aImg:['images/carousel1.jpg','images/carousel2.jpg','images/carousel3.jpg'],
		width:1226,
		height:460,
		autoPlayTime:2000
	})
}
//分类列表交互
function handleCate(){
	var oCateBox = document.querySelector('.home .banner .cate-box');
	var aCateitem = document.querySelectorAll('.home .banner .cate .cate-item');
	var oCateCont = document.querySelector('.home .banner .cate-content');
	for(var i = 0;i<aCateitem.length;i++){
		aCateitem[i].index = i
		aCateitem[i].onmouseenter = function(){
			for(var j = 0;j<aCateitem.length;j++){
				aCateitem[j].className = 'cate-item'
			}
			oCateCont.style.display = 'block';
			this.className = 'cate-item active'
			//加载数据
			loadDate(this.index);
		}
	}
	oCateBox.onmouseleave = function(){
		oCateCont.style.display = 'none';
		for(var j = 0;j<aCateitem.length;j++){
				aCateitem[j].className = 'cate-item';
		}
	}
	function loadDate(index){
		var date = aCateContentDate[index];
		console.log(date)
		var html = '<ul>';
		for(var i = 0;i<date.length;i++){
			html += '<li>';
			html += '	<a href="'+date[i].url+'">';
			html += '		<img src="'+date[i].img+'" alt="">';
			html += '		<span>'+date[i].name+'</span>';
			html += '	</a>';
			html += '</li>';
		}
		html += '</ul>'
		oCateCont.innerHTML = html;
	}
}
//倒计时
function handleTime(){

	var aTimeNum = document.querySelectorAll('.flash .bd .timer-num');
	var endDate = new Date('2019-9-5 19:00:00');
	var timer = 0;
	function toStr(num){
		return num < 10 ? "0"+ num : ""+ num;
	}
	function handTimes(){
		var endTime = endDate.getTime();
		var allTime = parseInt(endTime - Date.now())/1000;
		if (allTime < 0) {
			allTime = 0;
			clearInterval(timer);
		}
		var iHours = parseInt(allTime/3600);
		var iMinutes = parseInt((allTime%3600)/60);
		var iSecond = parseInt(allTime%3600)%60
		aTimeNum[0].innerHTML=toStr(iHours);
		aTimeNum[1].innerHTML =toStr(iMinutes);
		aTimeNum[2].innerHTML =toStr(iSecond);
	}
	timer = setInterval(handTimes,500);
	handTimes();
}
//闪购部分
function handleFlashPart(){
	var aSpan = document.querySelectorAll('.flash .more span')
	var oFlashBox = document.querySelector('.flash .bd .bd-right');
	var oProductList = document.querySelector('.flash .bd .bd-right .product-list')
	var now = 0;
	aSpan[0].onclick = function(){
		now--;
		oProductList.style.marginLeft = now*978+'px';
	}
	aSpan[1].onclick = function(){
		now++;
		oProductList.style.marginLeft = -978*now+'px';
	}
}
//选项卡
function handleElecPart(){
	var aTabList = document.querySelectorAll('.main .elec .tab-item');
	var oTabContent = document.querySelector('.main .elec .bd .bd-list .product-list');
	for(var i = 0;i<aTabList.length;i++){
		aTabList[i].index = i;
		aTabList[i].onmouseenter = function(){
			for(var j = 0;j<aTabList.length;j++){
				aTabList[j].className = 'tab-item'
			}
			this.className = 'tab-item active'
			//加载数据
			loadDate(this.index);
		}
	}
	function loadDate(index){
		var date = aTabContentDate[index];
		console.log(date)
		var html = '';
		for(var i = 0;i<date.length-1;i++){
			html +='<li class="product-item product-item-m transition-box">';
			html +='	<a href="'+date[i].url+'" class="item-ctr">';
			html +='		<img  class="product-img" src="'+date[i].img+'" alt="">';
			html +='		<p class="product-name">'+date[i].name+'我是被省略的</p>';
			html +='	</a>';
			html +='	<p class="product-desc">'+date[i].desc+'</p>';
			html +='	<p class="product-price">';
			html +='		<span>'+date[i].price+'元</span>';
			html +='		<del>'+date[i].del+'元</del>';
			html +='	</p>';
			if (date[i].flag) {
				html +='	<span class="flag '+date[i].flag.name+'">'+date[i].flag.content+'</span>';
			}
			if (date[i].comment) {
				html +='	<div class="comment">';
				html +='		<p class="comment-content">'+date[i].comment.content+'</p>';
				html +='		<p class="comment-author">来自于 <span>'+date[i].comment.author+'</span> 的评价</p>';
				html +='	</div>';
			}
			html +='</li>';
		}
		var lastDate = date[date.length-1];
		html +=' <li class="product-item product-item-s transition-box">';
		html +=' 	<div class="product-item-s-desc">';
		html +=' 		'+lastDate.top.desc+'';
		html +=' 		<p><span>'+lastDate.top.price+'</span>元</p>';
		html +=' 	</div>';
		html +=' 	<div class="product-item-s-img">';
		html +=' 		<a href="'+lastDate.top.url+'">';
		html +=' 			<img src="'+lastDate.top.img+'" alt="">';
		html +=' 		</a>';
		html +=' 	</div>';
		html +=' </li>';
		html +=' <li class="product-item product-item-s transition-box">';
		html +=' 	<div class="product-item-s-more">';
		html +=' 		浏览更多';
		html +=' 		<p>'+lastDate.bottom.name+'</p>';
		html +=' 	</div>';
		html +=' 	<div class="product-item-s-img">';
		html +=' 		<a href="'+lastDate.bottom.url+'">';
		html +=' 			<img src="'+lastDate.bottom.img+'" alt="">';
		html +=' 		</a>';
		html +=' 	</div>';
		html +=' </li>';
		oTabContent.innerHTML = html;
		console.log(html);
	}
}