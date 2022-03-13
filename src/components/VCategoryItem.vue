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
          <li
              class="good-item"
              v-for="good in goods" :key="good.id">
            <router-link :to="'/goodItem/' + good.id">
              <img class="good-img" :src="good.imgSet[0]" alt="">
            </router-link>
            <div class="good-price">{{ good.price }} ₽</div>
            <div class="good-name">{{ good.name }}</div>

          </li>


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
      id: this.$route.params.id,
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
    $route(toR) {
      this.id = toR.params.id
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

  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(250px,1fr));
  height: min-content;
  grid-gap: 1px;
}

.good-img {
  max-width: 200px;
}

.good-price {
  font-weight: 600;
  font-size: 18px;
}
</style>