<template>
  <div class="good-item">
    <div class="container">
      {{$route.params.id}}
    </div>
    {{ itemData.brand }}
    {{ itemData.title }}
    {{ itemData.body }}
    {{ itemData.price }}
    {{ itemData.name }}
    {{ itemData.brand }}
    {{ itemData.brand }}
    {{ itemData.brand }}
  </div>
</template>

<script>
import Model from "../api"

export default {
  data() {
    return {
      id: this.$route.params.id,
      itemData: {}
    }
  },
  methods: {},
  async mounted() {
    this.itemData = await Model.loadSingleItem(this.id)
    console.log(this.itemData);
  }
}
</script>

<style lang="scss" scoped>

</style>