<template>
    <div id="App">
        <router-view></router-view>
        <TabBar />
    </div>
</template>
<script>
import TabBar from './components/tab-bar/index.vue'
export default {
    name: 'App',
    components: {
        TabBar
    }
}
</script>
<style lang="less">
	#App {}
</style>
