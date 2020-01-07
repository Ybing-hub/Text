  <template>
  <div id="Content">
    <Item 
      v-for="(todo,index) in this.$store.state.todos" 
      :key="index"
      :todo="todo"
      :delTodo="delTodo"
    />
  </div>
</template>

<script>
import Item from './Item.vue'
export default {
    name: 'Content',
    components: {
        Item
    },
    props:{
      todos:Array,
      delTodo:Function
    }
}
</script>

<style scoped>
	#Content{
		width: 100%;
		margin-top:10px; 
	}
</style>
