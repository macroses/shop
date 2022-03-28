<template>
  <ul v-if="uniqueAttrNames" class="filters-collection">
    <li
        v-for="[key, value] in Object.entries(uniqueAttrNames)"
        :key="key"
        class="filters-collection__item">
      <v-filter-by-attr
          :title="key"
          :selected-filter-category="selectedFilterCategory"
          :value="value"/>
    </li>
  </ul>
</template>
<script>
import VFilterByAttr from "@/components/VFilterByAttr"

export default {
  name: 'v-filters-attrs-list',
  components: {VFilterByAttr},
  props: {
    selectedFilterCategory: {},
    uniqueAttrNames: {}
  }
}
</script>
<style lang="scss" scoped>
.filters-collection__item {
  border-bottom: 1px solid var(--c-border);
}
</style>