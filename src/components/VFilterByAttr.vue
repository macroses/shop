<template>
  <div class="filter-header" @click="toggleAccordion">
    {{title}}
    <svg class="icon">
      <use :xlink:href="`/thin.svg#${isCurrentFilterOpen ? 'angle-up' : 'angle-down'}`"></use>
    </svg>
  </div>
  <ul v-if="isCurrentFilterOpen">
    <li v-for="item in value" :key="item">
      <v-checkbox
          :value="item"
          v-model="selectedFilterCategory[key]"
      />
    </li>
  </ul>
</template>
<script>
import VCheckbox from "@/components/UI/VCheckbox"

export default {
  name: 'v-filter-by-attr',
  components: {VCheckbox},
  props: {
    isCurrentFilterOpen: {},
    title: String,
    selectedFilterCategory: {},
    toggleAccordion: {},
    value: {}
  },
  data() {
    return {
      isCurrentFilterOpen: false,
    }
  },
  methods: {
    toggleAccordion() {
      this.isCurrentFilterOpen = !this.isCurrentFilterOpen
    }
  }
}
</script>
<style lang="scss" scoped>
.filter-header {
  padding: 14px;
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
}


</style>