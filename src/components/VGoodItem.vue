<template>
  <div class="good-item" >
    <div v-if="itemData" class="container">
      <h1>{{ itemData.name }}</h1>
      <span 
        @click="toggleFavorite"
        class="add_to_favorite">
        <i :class="[isFavorite ? 'fa-solid fa-heart active' : 'fa-regular fa-heart']"></i>
        {{ isFavorite ? "В избранном" : "Добавить в избранное" }}
      </span>

      <div class="item_container">
        <div class="item_img_box">
          <img :src="itemData.imgSet[0]" alt="">
        </div>
        <div class="item_feature"></div>
        <div class="item_price">₽</div>
      </div>
    </div>
  </div>
</template>

<script>
import Model from "../api"

export default {
  data() {
    return {
      id: this.$route.params.id,
      itemData: null,
      isFavorite: false,
      categoryName: ''
    }
  },
  methods: {
    toggleFavorite: function () {
      this.isFavorite = !this.isFavorite
    }
  },
  async created() {
    this.itemData = await Model.loadSingleItem(this.id)
  }
}
</script>

<style lang="scss" scoped>
  h1 {
    font-size: 25px;
    font-weight: 600;
    margin: 32px 0 16px;

    background-size: 200% auto;
    color: var(--c-text);
  }

  .add_to_favorite {
    user-select: none;
    cursor: pointer;
    display: inline;
    margin-bottom: 16px;

    .active {
      color: var(--c-accent);
    }
  }
</style>