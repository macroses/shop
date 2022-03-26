<template>
  <div>
    Избранное
    <p v-for="item in favoriteItems" :key="item.id">
      {{item.name}}
    </p>
  </div>
</template>

<script>
import Model from "@/api";

export default {
  name: 'favorite',
  data() {
    return {
      favoriteItems: []
    }
  },
  async created() {
    this.favoriteItems = await Model.loadFavoriteItems(this.$store.state.favorites)
  }
}
</script>

<style lang="scss" scoped>

</style>