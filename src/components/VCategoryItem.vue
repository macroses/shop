<template>
  <div class="category">
    <div class="container">
      <div class="category_top">
        <h1>
          {{ category.name }}
          <i :class="category.image"></i>
        </h1>
        <div class="category-view">
          <span 
            :class="[categoryView ? 'active' : '']"
            @click="toggleCategoryView">
            <i class="fa-solid fa-table-cells-large"></i>
          </span>
          <span 
            :class="[!categoryView ? 'active' : '']"
            @click="toggleCategoryView">
            <i class="fa-solid fa-list-ul"></i>
          </span>
        </div>
      </div>
      

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
                  :pholder="`от ${minItemPrice}`"
                  v-model.number="minPrice"/>
              <v-input
                  :pholder="`до ${maxItemPrice}`"
                  v-model.number="maxPrice"/>
            </div>
          </div>
<!--          <div class="filter-item">-->
<!--            <ul>-->
<!--              <li v-for="item in uniqueAttrNames">-->
<!--                {{ item }}-->
<!--              </li>-->
<!--            </ul>-->
<!--          </div>-->
        </div>

          <ul 
            class="goods-list"
            :class="[categoryView ? 'grid' : 'list']">
            <li
                class="good-item"
                v-for="good in goods" :key="good.id">
              <router-link
                  class="good-item__img-link"
                  :to="'/goodItem/' + good.id">
                <img class="good-img" :src="good.imgSet[0]" alt="">
              </router-link>
              <div class="good-item__content">
                <div class="good-price">{{ good.price }} ₽</div>
                <router-link
                    :to="'/goodItem/' + good.id">
                  <div class="good-name">{{ good.name }}</div>
                </router-link>
              </div>
              <v-button>В корзину</v-button>
            </li>
          </ul>

      </div>
    </div>
  </div>
</template>

<script>
import Model from "@/api";
import VSelect from "@/components/UI/VSelect";
import VInput from "@/components/UI/Vinput";
import VButton from "@/components/UI/VButton";
import { debounce } from 'lodash';

export default {
  components: {VInput, VSelect, VButton},

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
      minItemPrice: null,
      maxItemPrice: null,
      categoryView: true,

      uniqueAttrNames: [],
      uniqueAttrValues: []
    }
  },
  methods: {
    optionSelected(option) {
      this.selected = option.name
      this.selectValue = option.value
      this.goods = Model.sortGoodsByPrice(option.value, this.goods)
    },
    toggleCategoryView() {
      this.categoryView = !this.categoryView
    },
    debounceGetGoods: debounce(async function() {
      await this.getGoods()
    }, 1000),
    async getData() {
      this.category = await Model.loadSingleCategory(this.id)
    },
    async getGoods() {
      const { items, minPrice, maxPrice } = await Model.loadItems(this.id, null, this.minPrice, this.maxPrice)
      this.goods = items
      this.minItemPrice = minPrice
      this.maxItemPrice = maxPrice

      this.uniqueAttrNames = Model.getUniqueFilterParameters(this.goods)
    },
  },
  watch: {
    $route(toR) {
      this.id = toR.params.id
      this.getData()
      this.getGoods()
    },
    minPrice: {
      async handler(newVal) {
        await this.debounceGetGoods.bind(this)();
      },
    },
    maxPrice: {
      async handler(value) {
        await this.debounceGetGoods.bind(this)();
      }
    }
  },
  mounted() {
    Promise.all([
      this.getData(),
      this.getGoods()
    ])
  }
}
</script>

<style lang="scss" scoped>
.category-view {
  span {
    display: inline-block;
    margin-left: 16px;
    cursor: pointer;
    color: var(--c-text);
  }

  .active {
    color: var(--c-text-dark)
  }
}
.category_top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.good-item__content {
  flex: 1 0 auto;
  a {
    &:hover {
      color: var(--c-accent);
    }
  }
}

.good-item__img-link {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0;
  width: 100%;
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

  &.list {
    grid-template-columns: 1fr;
  }
}

.goods-list.list {
  .good-item {
    display: flex;
    flex-direction: row;
  }

  .good-img {
    max-height: 100px;
  }

  .good-item__content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .good-item__img-link {
    margin-right: 16px;
    width: auto;
  }

  .good-price {
    order: 1;
  }
}

.good-img {
  max-width: 200px;
}

.good-price {
  font-weight: 600;
  font-size: 18px;
  margin: 8px 0;
}

.good-name {
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>