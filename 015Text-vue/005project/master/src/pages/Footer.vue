<template>
  <div id="Footer">
    <input type="checkbox" name="" v-model="allDone">
    <span>{{totalDone}}/{{total}}</span>
    <button @click="handleDelSelectDone">删除选中</button>
  </div>
</template>

<script>
export default {
    name: 'Footer',
    computed: {
        total: function() {
            return this.todos.length
        },
        totalDone:function(){
            return this.todos.reduce((total,item)=>{
                if (item.done) {
                    total = total+1
                }
                return total
            },0)
        },
        allDone:{
            get(){
                return this.total == this.totalDone && (this.total != 0)
            },
            set(value){
                this.selectAllDone(value)
            }
        }
    },
    props: {
        todos: Array,
        selectAllDone:Function,
        deleteSelectDone:Function
    },
    methods:{
        handleDelSelectDone:function(){
            if (window.confirm('你确定删除选中?')) {
                this.deleteSelectDone()
            }
        }
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
