<template>
    <div id="Header">
        <h1>TodoList</h1>
        <input type="text" placeholder="请输入游戏" v-model="task" @keyup.enter="handleAdd()">
    </div>
    </template>

<script>
import { ADD_TODO } from '../store/types.js'
export default {
    name: 'Header',
    data() {
        return {
            task: ""
        }
    },
    props: {
        addTodo: Function
    },
    methods: {
        handleAdd: function() {
            //1效验数据
            var task = this.task.trim()
            if (!task) {
                alert("请输入你常玩的游戏")
                return
            }
            //2封装任务对象
            var todo = {
                task,
                done: false
            }
            //3将对象添加到对象数组中
            // this.addTodo(todo)
            this.$store.dispatch(ADD_TODO,todo)
            //4将输入框清空
            this.task = ''
        }
    }
}
</script>

<style scoped>
	#Header{
		text-align: center;
	}
	input{
		width: 100%;
		padding-left: 20px;
		box-sizing: border-box;
		line-height: 34px; 
	}
</style>
