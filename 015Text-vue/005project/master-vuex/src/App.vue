<template>
  <div id="App">
    <Header :addTodo="addTodo"/>
    <Content :todos="todos" :delTodo="delTodo"/>
    <Footer :todos="todos"/>
  </div>
</template>

<script>
import Header from './pages/Header.vue'
import Content from './pages/Content.vue'
import Footer from './pages/Footer.vue'
export default {
    name: 'App',
    components: {
        Header,
        Content,
        Footer
    },
    data() {
        return {
            todos: [
                
            ]
        }
    },
    methods: {
        addTodo: function(todo) {
            this.todos.unshift(todo)
        },
        delTodo:function(index){
          this.todos.splice(index,1)
        }
    }
}
</script>

<style scoped>
    #App{
      width: 900px;
      margin: 100px auto;
    }
</style>
