<template>
    <div id="Item"
		:style="{background:bgColor}"
		@mouseenter="handleIsShow(true)"
		@mouseleave="handleIsShow(false)"
    >
        <input type="checkbox" v-model="todo.done">
        <span>{{todo.task}}</span>
        <button
			v-if="isShow"
            @click="handleDel()"
        >删除</button>
    </div>
</template>

<script>
export default {
    name: 'Item',
    data() {
        return {
            bgColor: '#fff',
            isShow: false
        }
    },
    methods: {
        handleIsShow:function(flag) {
            this.bgColor = flag ? '#ccc' : '#fff';
            this.isShow = flag
        },
        handleDel:function() {
            if (window.confirm('你确定要删除?')) {
                this.delTodo(this.index)
            }
        }
    },
    props: {
        todo: Object,
        index:Number,
        delTodo:Function
    }
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
