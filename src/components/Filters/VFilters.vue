<template>
  <div class="category-filters" v-bind="$props">
    <div class="filter-item">
      <v-select
          @select="$emit('sortByPrice', sortOptions)"
          :selected="selectedSortValue"
          :options="optionsArr"/>
      {{selectedSortValue}}
    </div>
  </div>
</template>

<script>
import VSelect from "@/components/UI/VSelect";
import Vinput from "@/components/UI/Vinput";

export default {
  components: {
    Vinput,
    VSelect
  },
  props: {
    categoryId: Number,
    optionsArr: Array,
    selectedSortValue: String
  },
  data() {
    return {
      sortOptions: [
        {name: "Сначала дешевле", value: 2},
        {name: "Сначала дороже", value: 3},
      ],
      selected: 'Сортировка',
    }
  },
}
</script>

<style lang="scss" scoped>

</style>