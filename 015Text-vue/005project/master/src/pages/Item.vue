<template>
    <div id="Item">
        <input type="checkbox">
        <span>吃饭</span>
        <button>删除</button>
    </div>
</template>

<script>
  export default {
    name:'Item'
  }
</script>

<style>
	#Item{
        width: 100%;
        line-height: 40px;
        margin-top: 5px;
        border: 1px dashed #ccc;
        box-sizing: border-box;
    }
    button{
        float: right;
        margin-top: 8px;
        margin-right: 5px;
    }
</style>
