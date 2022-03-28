<template>
  <div class="container">
    <VCategoryTop
        categoryName="Избранное"
        categoryImage="heart-filled"
        :categoryViewType="categoryView"
        @toggle-view="toggleCategoryView"
    />
    <v-goods-list
        :goods="favoriteItems"
        :is-category-list="categoryView"
    />
  </div>
</template>

<script>
import Model from "@/api";
import VGoodsList from "@/components/VGoodsList";
import VCategoryTop from "@/components/VCategoryTop";

export default {
  name: 'favorite',
  components: {VGoodsList, VCategoryTop},
  data() {
    return {
      favoriteItems: [],
      categoryView: true
    }
  },
  methods: {
    toggleCategoryView: function () {
      this.categoryView = !this.categoryView
    },
  },
  async created() {
    this.favoriteItems = await Model.loadFavoriteItems(this.$store.state.favorites)
    this.favoriteItems.forEach(favItem => {
      favItem.favorite = true
    })
  }
}
</script>

<style lang="scss" scoped>

</style>