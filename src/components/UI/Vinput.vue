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
  padding: 8px;
  color: var(--c-text-dark);
  transition: border-color 0.3s;
  border-radius: 6px;
  outline: 0;
  border: 1px solid var(--c-text);

  &::placeholder {
    color: rgba(0,0,0, 0.3);
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