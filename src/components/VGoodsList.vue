<template>
  <ul
      :class="[isCategoryList ? 'grid' : 'list']"
      class="goods-list">
    <li
        v-for="good in goods"
        :key="good.id"
        class="good-item">
      <router-link
          :to="'/goodItem/' + good.id"
          class="good-item__img-link">
        <img
            :src="good.imgSet[0]"
            alt="" class="good-img">
      </router-link>
      <div class="good-item__content">
        <div class="good-price">{{ good.price }} ₽</div>
        <router-link
            :to="'/goodItem/' + good.id">
          <div class="good-name">{{ good.name }}</div>
        </router-link>
      </div>
      <v-button>В корзину</v-button>
      <div class="good_funcs">
        <span
            class="add_to_favorite"
            @click="addToFavorites(good.id); good.favorite = !good.favorite">
          <svg
              class="icon"
              :class="{added : good.favorite}">
            <use :xlink:href="`/thin.svg#${good.favorite ? 'heart-filled' : 'heart-circle-plus'}`"></use>
          </svg>  
        </span>
        <span class="add_to_compare">
          <svg class="icon">
            <use xlink:href="/thin.svg#code-compare"></use>
          </svg>  
        </span>
      </div>
    </li>
  </ul>
</template>

<script>
import VButton from "@/components/UI/VButton";
export default {
  components: { VButton },
  props: {
    goods: {
      type: Array
    },
    isCategoryList: false,
  },
  methods: {
    addToFavorites(id) {
      this.$store.commit('addFavorite', id)
    }
  }
}
</script>

<style lang="scss" scoped>
.added {
  fill: orangered;
}

.good_funcs {
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 8px;
  right: 8px;
  z-index: 2;
  span {
    cursor: pointer;
  }
}

.add_to_favorite {
  margin-bottom: 16px;
}
.good-item {
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 6px;
  position: relative;
  border: 1px solid var(--c-text);
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

  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(250px,1fr));
  height: min-content;
  grid-gap: 16px;

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
  color: var(--c-text-dark);
}

.good-name {
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: var(--c-text-dark);
}
</style>