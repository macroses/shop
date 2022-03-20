<template>
  <button>
    <slot />
  </button>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  button {
    background-color: transparent;
    color: var(--c-white);
    border: none;
    padding: 8px 16px;
    cursor: pointer;
    backdrop-filter: blur(10px);
    border-radius: 6px;
  }
</style>