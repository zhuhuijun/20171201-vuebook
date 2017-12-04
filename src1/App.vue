<template>
    <div>

      <Counter></Counter>
    </div>
</template>
<style scoped>

</style>

<script>
  import Counter from './components/Counter.vue';
    export default {
        data() {
            return {
              msg:'hello'
            }
        },
        components: {Counter},
        methods: {}
    }
</script>
