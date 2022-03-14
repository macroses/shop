<template>
  <div class="category">
    <div class="container">
      <h1>
        {{ category.name }}
        <i :class="category.image"></i>
      </h1>

      <div class="category-box">
        <div class="category-filters">
          <div class="filter-item">
            <v-select
                @select="optionSelected"
                :selected="selected"
                :options="sortOptions"/>
          </div>
          <div class="filter-item">
            <div class="filter-title">Цена</div>
            <div class="filter-item__wrap">
              <v-input
                  pholder="от"
                  v-model.number="minPrice"/>
              <v-input
                  pholder="до"
                  v-model.number="maxPrice"/>
            </div>
            <p>{{filterItems}}</p>
          </div>
        </div>

          <ul class="goods-list">
            <keep-alive>
              <li
                  class="good-item"
                  v-for="good in goods" :key="good.id">
                <router-link
                    class="good-item__img-link"
                    :to="'/goodItem/' + good.id">
                  <img class="good-img" :src="good.imgSet[0]" alt="">
                </router-link>
                <div class="good-price">{{ good.price }} ₽</div>
                <div class="good-name">{{ good.name }}</div>
                <button class="to-cart__btn">В корзину</button>
              </li>
            </keep-alive>
          </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Model from "@/api";
import VSelect from "@/components/UI/VSelect";
import VInput from "@/components/UI/Vinput";

export default {
  components: {VInput, VSelect},

  data() {
    return {
      id: this.$route.params.id,
      category: {},
      goods: [],
      sortOptions: [
        {name: "Сначала дешевле", value: 2},
        {name: "Сначала дороже", value: 3},
      ],
      selected: 'Сортировка',
      selectValue: 0,
      minPrice: null,
      maxPrice: null,
      filteredArray: []
    }
  },
  methods: {
    optionSelected(option) {
      this.selected = option.name
      this.selectValue = option.value
      this.goods = Model.sortGoodsByPrice(option.value, this.goods)
    },
    async getData() {
      this.category = await Model.loadSingleCategory(this.id)
    },
    async getGoods() {
      this.goods = await Model.loadItems(this.id)
    }
  },
  computed: {
    filterItems() {
      // return this.filteredArray = Model.filterByPrice(
      //     this.id,
      //     this.minPrice,
      //     this.maxPrice
      // )
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
.filter-item {
  margin-bottom: 8px;
}

.filter-title {
  font-weight: 600;
  margin-bottom: 8px;
}

.filter-item__wrap {
  display: flex;
}

.category-box {
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-areas: "filters content";
}

.good-item {
  box-shadow: 0 0 0 1px var(--c-text);
  padding: 16px;
}

.good-item__img-link {
  display: flex;
  align-items: center;
  justify-content: center;
}

.category-filters {
  grid-area: filters;
}

.goods-list {
  grid-area: content;

  margin-top: 1px;
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