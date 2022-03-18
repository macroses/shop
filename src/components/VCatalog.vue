<template>
  <div class="catalog-wrap">
    <div class="catalog" @click="toggleCatalog">
      <i class="fa-solid fa-bars"></i>
      Каталог
    </div>
    <transition name="fade">
      <ul class="catalog-list" v-if="isVisible">
        <li
            v-for="categoryItem in loadedCategory"
            :key="categoryItem.id">
          <router-link
              :to="'/category/' + categoryItem.id">
            <span class="icon-wrap">
              <i :class="categoryItem.image"></i>
            </span>
            {{ categoryItem.name }}
          </router-link>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
import Model from "@/api";

export default {
  name: 'v-catalog',
  data() {
    return {
      isVisible: false,
      loadedCategory: []
    }
  },
  methods: {
    toggleCatalog() {
      this.isVisible = !this.isVisible
    },
    hideCatalog() {
      this.isVisible = false
    },
  },
  async mounted() {
    this.loadedCategory = await Model.loadCategories();
    document.addEventListener('click', this.hideCatalog, true)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.hideCatalog, true)
  }
}
</script>

<style lang="scss" scoped>
.catalog-wrap {
  position: relative;
}

.catalog {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--c-neutral);
  background: var(--c-accent);
  height: 42px;
  padding: 0 16px;
  border-radius: 4px;
  margin-right: 16px;
  cursor: pointer;
  i {
    margin-right: 8px;
  }
}

.icon-wrap {
  display: inline-block;
  width: 30px;
  text-align: center;
}

.catalog-list {
  position: absolute;
  background-color: var(--c-white);
  top: 100%;
  left: 0;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 0 20px 0 rgba(0,0,0, 0.2);
  z-index: 10;

  a {
    white-space: nowrap;
    display: block;
    padding: 8px 16px;
    transition: 0.3s;
    &:hover {
      background-color: var(--c-accent);
      color: var(--c-white);
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>