<template>
  <div class="category-box">
<!--    <h1>category id {{id}}</h1>-->
    <div class="container">
      <div class="category">
        {{category.id}}
        {{category.name}}
        <i :class="category.image"></i>
      </div>
    </div>
  </div>
</template>

<script>
import Model from "@/api";

export default {
  data() {
    return {
      id: this.$route.params['id'],
      category: {},
      goods: []
    }
  },
  methods: {
    async getData() {
      const res = new Model()
      this.category = await res.loadSingleCategory(this.id)
    },
    async getGoods() {
      const res = new Model()
      this.goods = await res.loadItems(this.id)
      console.log(this.goods)
    }
  },
  watch: {
    $route(toR, fromR) {
      this.id = toR.params['id']
      this.getData()
      this.getGoods()
    }
  },
   mounted() {
     this.getData()
     this.getGoods()
  }
}
</script>

<style scoped>

</style>