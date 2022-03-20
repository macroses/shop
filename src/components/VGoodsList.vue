<template>
  <ul
      class="goods-list"
      :class="[isCategoryList ? 'grid' : 'list']">
    <li
        class="good-item"
        v-for="good in goods"
        :key="good.id">
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
</template>

<script>
import VButton from "@/components/UI/VButton";
export default {
  components: { VButton },
  props: {
    goods: {
      type: Array
    },
    isCategoryList: false
  }
}
</script>

<style lang="scss" scoped>
.good-item {
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 6px;
  border-bottom: 1px solid rgba(255,255,255,0.3);
  border-right: 1px solid rgba(255,255,255,0.2);
  border-left: 1px solid rgba(255,255,255,0.2);
  border-top: 1px solid rgba(255,255,255,0.1);
  backdrop-filter: blur(10px) brightness(150%);
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
  color: var(--c-white);
}

.good-name {
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: var(--c-white);
}
</style>