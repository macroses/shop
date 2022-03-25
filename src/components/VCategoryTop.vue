<template>
  <div class="category_top">
    <h1>
      {{ categoryName }}
      <svg class="icon">
        <use :xlink:href="`/thin.svg#${categoryImage}`"></use>
      </svg>
    </h1>
    <div class="category-view">
          <span
              :class="[categoryViewType ? 'active' : '']"
              @click="$emit('toggleView')">
            <svg class="icon">
              <use :xlink:href="`/thin.svg#${categoryViewType ? 'table-cells-large' : 'list-ul'}`"></use>
            </svg>
          </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    categoryName: String,
    categoryImage: String,
    categoryViewType: Boolean
  }
}
</script>

<style lang="scss" scoped>
h1 {
  font-weight: 500;
  display: flex;
  align-items: center;
  color: var(--c-text-dark);
  .icon {
    fill: var(--c--text--dark);
    height: 42px;
    margin-left: 8px;
  }
}
.category-view {
  span {
    display: inline-block;
    margin-left: 16px;
    cursor: pointer;
    fill: var(--c-text--dark);
  }

  .active {
    color: var(--c-text-dark)
  }
}
.category_top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
</style>