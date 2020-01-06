<template>
  <div id="Footer">
    <input type="checkbox" name="">
    <span>1/{{total}}</span>
    <button>删除选中</button>
  </div>
</template>

<script>
export default {
    name: 'Footer',
    computed: {
        total: function() {
            return this.todos.length
        }
    },
    props: {
        todos: Array
    }
}
</script>

<style scoped>
	#Footer{
        width: 100%;
        line-height: 40px;
        margin-top: 5px;
        box-sizing: border-box;
    }
    button{
        float: right;
        margin-top: 8px;
        margin-right: 5px;
    }
</style>
