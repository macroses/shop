<template>
  <div class="category">
    <div class="container">
      <h1>
        {{ category.name }}
        <i :class="category.image"></i>
      </h1>
      <div class="category-box">
        <div class="category-filters"></div>
        <ul class="goods-list">
          <li class="good-item"></li>
        </ul>
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
      this.category = await Model.loadSingleCategory(this.id)
    },
    async getGoods() {
      this.goods = await Model.loadItems(this.id)
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
.category-box {
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-areas: "filters content";
}

.category-filters {
  grid-area: filters;
}

.goods-list {
  grid-area: content;
}
</style>