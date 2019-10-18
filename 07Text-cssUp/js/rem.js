(function rem(win,doc){
	var oRoot = doc.getElementsByTagName('html')[0];
	function refresh(){
		var width = doc.body.clientWidth || doc.documentElement.clientWidth;
		console.log(width)
		var oFsize = width / 10;
		oRoot.style.fontSize = oFsize + 'px';
	}
	
	win.addEventlistener('DOMContentLoaded',refresh,false)
	win.addEventlistener('load',refresh,false)
	win.addEventlistener('resize',refresh,false)
})(window,document)