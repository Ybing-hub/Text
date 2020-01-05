<template>
  <div id="Content">
    <Item />
    <Item />
  </div>
</template>

<script>
  	export default {
    name:'Content',
    components:{
    	Item
    }
  }
</script>

<style scoped>
	#Content{
		width: 100%;
		margin-top:10px; 
	}
</style>
