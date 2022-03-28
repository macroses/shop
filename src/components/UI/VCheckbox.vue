<template>
  <label class="checkbox">
    <input
        type="checkbox"
        :value="value"
        @change="evt => onCheck(evt.target.value)"
    />

    <svg class="icon">
      <use :xlink:href="`/thin.svg#square`"></use>
    </svg>
    <span>{{ value }}</span>
  </label>
</template>

<script>
export default {
  props: {
    value: { type: String },
    modelValue: { type: Array },
  },
  methods: {
    onCheck(value) {
      if(this.modelValue.includes(this.value)) {
        this.$emit('update:modelValue', this.modelValue.filter(el => el !== value))
      }
      else {
        this.$emit('update:modelValue', [...this.modelValue, value])
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.checkbox {
  display: flex;
  align-items: center;
  input {
    position: absolute;
    visibility: hidden;

    &:checked + .icon {
      fill: var(--c-accent);
    }
  }
  .icon {
    width: 18px;
    margin-right: 8px;
  }
}
</style>