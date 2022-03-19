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
  color: var(--c-white);
  transition: border-color 0.3s;
  background: rgba(255,255,255, 0.1);
  border-bottom: 1px solid rgba(255,255,255,0.2);
  border-right: 1px solid rgba(255,255,255,0.3);
  border-left: 1px solid rgba(255,255,255,0.3);
  border-top: 1px solid rgba(255,255,255,0.4);
  backdrop-filter: blur(10px);
  border-radius: 6px;
  outline: 0;

  &::placeholder {
    color: rgba(255,255,255, 0.3);
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