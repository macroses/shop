<template>
  <div class="category_top">
    <h1>
      {{ categoryName }}
      <svg class="icon">
        <use :xlink:href="`/thin.svg#${categoryImage}`"></use>
      </svg>
    </h1>
    <div class="category-view">
      <span :class="[categoryView ? 'active' : '']" @click="$emit('changeViewType', categoryView)">
        <svg class="icon">
          <use
            :xlink:href="`/thin.svg#${
              categoryView ? 'table-cells-large' : 'list-ul'
            }`"
          ></use>
        </svg>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    categoryName: {
      type: String
    },
    categoryImage: {
      type: String
    }
  },
  data() {
    return {
      categoryView: true
    }
  },
  methods: {
    toggleView() {
      this.$emit('changeViewType', this.categoryView)
    }
  }
};
</script>

<style lang="scss" scoped>
</style>