<template>
	<div id="TabBar">
		<van-tabbar v-model="active">
			<van-tabbar-item 
				icon="home-o"
				replace
				to="/home"
			>首页</van-tabbar-item>
		</van-tabbar>
		<van-tabbar v-model="active">
			<van-tabbar-item 
				icon="cart-o"
				replace
				to="/cart"
			>购物车</van-tabbar-item>
		</van-tabbar>
		<van-tabbar v-model="active">
			<van-tabbar-item 
				icon="user-o"
				replace
				to="/user"
			>个人中心</van-tabbar-item>
		</van-tabbar>
	</div>
<van-tabbar v-model="active">
	<van-tabbar-item 
		icon="home-o"
		replace
		to="/home"
	>首页</van-tabbar-item>
</van-tabbar>
</template>

<script type="text/javascript">
export default {
	name:'TabBar',
	data() {
    	return {
      		active: 0
    	}
	}
}
</script>

<style scoped>
	
</style>