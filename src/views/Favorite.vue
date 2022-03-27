<template>
  <div class="container">
    <button @click="toggleCategoryView">вид</button>
    <v-goods-list
        :goods="favoriteItems"
        :is-category-list="categoryView"
    />
  </div>
</template>

<script>
import Model from "@/api";
import VGoodsList from "@/components/VGoodsList";

export default {
  name: 'favorite',
  components: {VGoodsList},
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