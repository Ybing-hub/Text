<template>
  <div id="App">
    <Header />
    <Item />
    <Footer />
  </div>
</template>

<script>
  import Header from './pages/Header.vue'
  import Item from './pages/Item.vue'
  import Footer from './pages/Footer.vue'
  export default {
    name:'App',
    components:{
      Header,
      Item,
      Footer
    },
    method:{
      handleAdd:function(){

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
