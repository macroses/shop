<template>
  <div class="inp-wrap">
    <input
        type="text"
        :placeholder="pholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'v-input',
  props: {
    pholder: {type: String, required: true},
    modelValue: [Number, String]
  }
}
</script>

<style lang="scss" scoped>
input {
  width: 100%;
  outline: none;
  border: 1px solid var(--c-text);
  padding: 8px;
  color: var(--c-text);
  transition: border-color 0.3s;
  &:focus {
    border-color: var(--c-accent);
  }
}

.inp-wrap {
  position: relative;
  width: 300px;
  transition: width 0.3s;
  &:focus-within {
    width: 100%;
  }
}


</style>