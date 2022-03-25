<template>
  <div class="catalog-wrap">
    <div class="catalog" @click="toggleCatalog">
      <svg class="icon">
        <use :xlink:href="`/thin.svg#${isVisible ? 'folder-open' : 'folder'}`"></use>
      </svg>
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
              <svg class="icon">
                <use :xlink:href="'/thin.svg#' + categoryItem.image"></use>
              </svg>
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
    toggleCatalog: function () {
      this.isVisible = !this.isVisible
    },
    hideCatalog: function () {
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
  color: var(--c-text-dark);
  height: 42px;
  padding: 0 16px;
  margin-right: 16px;
  cursor: pointer;
  .icon {
    margin-right: 8px;
    fill: var(--c-text-dark);
  }
}

.icon-wrap {
  display: inline-block;
  width: 30px;
  text-align: center;
  margin-right: 8px;
}

.catalog-list {
  position: absolute;
  background-color: var(--c-white);
  border: 1px solid var(--c-text);
  top: 100%;
  left: 0;
  border-radius: 6px;
  overflow: hidden;
  z-index: 12;

  a {
    display: flex;
    align-items: center;
    white-space: nowrap;
    padding: 8px 16px;
    color: var(--c-text-dark);
    transition: border-left-color 0.3s;
    border-left: 3px solid transparent;
    &:hover {
      border-left-color: rgba(0,0,0, 0.7);
    }
  }

  .icon {
    fill: var(--c-text-dark);
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>