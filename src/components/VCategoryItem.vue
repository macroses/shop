<template>
  <div class="category-box">
<!--    <h1>category id {{id}}</h1>-->
    <div class="container">
      <div class="category">
        {{category.id}}
        {{category.name}}
        <i :class="category.image"></i>
      </div>
      {{id}}
    </div>
  </div>
</template>

<script>
import Model from "@/api";

export default {
  data() {
    return {
      id: this.$route.params['id'],
      category: {}
    }
  },
  watch: {
    // $route(toR, fromR) {
    //   this.id = toR.params['id']
    // }
  },
}
</script>

<style scoped>

</style>