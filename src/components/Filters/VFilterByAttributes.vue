<template>
  <div class="filter-header" @click="toggleAccordion()">
    {{key}}
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
import VCheckbox from "@/components/UI/VCheckbox";

export default {
  components: {VCheckbox}
}
</script>

<style lang="scss" scoped>

</style>