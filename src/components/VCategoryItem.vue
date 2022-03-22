<template>
  <div class="category">
    <div class="container">
      <div class="category_top">
        <h1>
          {{ category.name }}
          <svg class="icon">
            <use :xlink:href="`/thin.svg#${category.image}`"></use>
          </svg>
        </h1>
        <div class="category-view">
          <span
            :class="[categoryView ? 'active' : '']"
            @click="toggleCategoryView">
            <svg class="icon">
              <use :xlink:href="`/thin.svg#${categoryView ? 'table-cells-large' : 'list-ul'}`"></use>
            </svg>
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
          <div class="filter-item">
            <ul v-if="uniqueAttrNames" class="filters-collection">
              <li v-for="[key, value] in Object.entries(uniqueAttrNames)" :key="key">
                <span>{{key}}</span>
                <ul>
                  <li v-for="item in value" :key="item">
                    <label>
                      <input type="checkbox" :value="item" v-model="selectedFilterCategory[key]">
                      <span>{{item}}</span>
                    </label>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <v-goods-list
          :goods="goods"
          :is-category-list="categoryView"
          v-if="!hasAnyFilter"
        ></v-goods-list>
      </div>
    </div>
  </div>
</template>

<script>
import Model from "@/api";
import VSelect from "@/components/UI/VSelect";
import VInput from "@/components/UI/Vinput";
import VButton from "@/components/UI/VButton";
import VGoodsList from "@/components/VGoodsList";
import { debounce } from 'lodash';

export default {
  components: {VInput, VSelect, VButton, VGoodsList},

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

      uniqueAttrNames: null,
      selectedFilterCategory: {}
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
      const { items, minPrice, maxPrice } = await Model.loadItems(
          this.id,
          this.selectedFilters,
          this.minPrice,
          this.maxPrice
      )

      this.goods = items
      this.minItemPrice = minPrice
      this.maxItemPrice = maxPrice

      this.uniqueAttrNames = Model.getUniqueFilterParameters(this.goods)
      this.selectedFilterCategory = Object.assign({}, 
        ...Object.keys(this.uniqueAttrNames)
        .map(key => ({[key] : []})
      ))
    },
  },
  computed: {
    selectedFilters() {
      return Object.assign(
        {},
        ...Object.entries(this.selectedFilterCategory)
          .filter(([_, value]) => value.length)
          .map(([key, value]) => ({[key] : value}))
      )
    },
    hasAnyFilter() {
      return !!Object.keys(this.selectedFilters).length
    }
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
h1 {
  font-weight: 500;
  display: flex;
  align-items: center;
  color: var(--c-white);
  .icon {
    fill: var(--c-white);
    height: 42px;
    margin-left: 8px;
  }
}

.filters-collection {
  color: #fff
}

.category-view {
  span {
    display: inline-block;
    margin-left: 16px;
    cursor: pointer;
    fill: var(--c-white);
  }

  .active {
    color: var(--c-text-dark)
  }
}
.category_top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.filter-item {
  margin-bottom: 8px;
}

.filter-title {
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--c-white);
}

.filter-item__wrap {
  display: flex;
  gap: 8px;
}

.category-box {
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-areas: "filters content";
  grid-gap: 16px;
}

.good-item {
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 6px;
  border-bottom: 1px solid rgba(255,255,255,0.2);
  border-right: 1px solid rgba(255,255,255,0.3);
  border-left: 1px solid rgba(255,255,255,0.3);
  border-top: 1px solid rgba(255,255,255,0.4);
  backdrop-filter: blur(10px);
  background: rgba(255,255,255, 0.1);
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


</style>