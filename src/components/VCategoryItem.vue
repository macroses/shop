<template>
  <div class="category">
    <div class="container">
      <VCategoryTop
        :categoryName="category.name"
        :categoryImage="category.image"
        :categoryViewType="categoryView"
        @toggle-view="toggleCategoryView"
      />

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
                    <v-checkbox
                      :value="item"
                      v-model="selectedFilterCategory[key]"
                    />
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <v-goods-list
            v-if="!hasAnyFilter"
            :goods="goods"
            :is-category-list="categoryView"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Model from "@/api";
import VSelect from "@/components/UI/VSelect";
import VInput from "@/components/UI/Vinput";
import VCheckbox from "@/components/UI/VCheckbox";
import VButton from "@/components/UI/VButton";
import VGoodsList from "@/components/VGoodsList";
import VCategoryTop from "@/components/VCategoryTop";
import { debounce } from 'lodash';

export default {
  components: { VCategoryTop, VInput, VSelect, VButton, VGoodsList, VCheckbox },

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
      selectedFilterCategory: {},
      checkedCollection: []
    }
  },
  methods: {
    optionSelected: function (option) {
      this.selected = option.name
      this.selectValue = option.value
      this.goods = Model.sortGoodsByPrice(option.value, this.goods)
    },
    toggleCategoryView: function () {
      this.categoryView = !this.categoryView
    },
    debounceGetGoods: debounce(async function() {
      await this.getGoods()
    }, 1000),
    getData: async function () {
      this.category = await Model.loadSingleCategory(this.id)
    },
    getGoods: async function () {
      const {items, minPrice, maxPrice} = await Model.loadItems(
          this.id,
          this.checkedCollection,
          this.minPrice,
          this.maxPrice
      )

      this.goods = items
      this.minItemPrice = minPrice
      this.maxItemPrice = maxPrice

      this.uniqueAttrNames = Model.getUniqueFilterParameters(this.goods)
      this.selectedFilterCategory = Object.assign({},
          ...Object.keys(this.uniqueAttrNames)
              .map(key => ({[key]: []})
              ))
    },
  },
  computed: {
    selectedFilters: function () {
      return Object.assign(
          {},
          ...Object.entries(this.selectedFilterCategory)
              .filter(([_, value]) => value.length)
              .map(([key, value]) => ({[key]: value}))
      )
    },
    hasAnyFilter: function () {
      return !!Object.keys(this.selectedFilters).length
    },
    checkedCollection() {
      return Object.values(this.selectedFilters)
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