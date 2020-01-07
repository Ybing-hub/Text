<template>
  <div id="Footer">
    <input type="checkbox" name="" v-model="allDone">
    <span>{{totalDone}}/{{total}}</span>
    <button @click="handleDelSelectDone">删除选中</button>
  </div>
</template>

<script>
import {SET_ALL_DONE,DEL_SEL_DONE} from '../store/types.js'
export default {
    name: 'Footer',
    computed: {
        total: function() {
            return this.$store.getters.total
        },
        totalDone:function(){
            return this.$store.getters.totalDone
        },
        allDone:{
            get(){
                return this.$store.getters.allDone
            },
            set(value){
                // this.selectAllDone(value)
                this.$store.dispatch(SET_ALL_DONE,value)
            }
        }
    },
    props:{
        todos: Array,
        selectAllDone:Function,
        delSelectDone:Function
    },
    methods:{
        handleDelSelectDone:function(){
            if (window.confirm('你确定删除选择?')) {
                // this.delSelectDone()
                this.$store.dispatch(DEL_SEL_DONE)
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
