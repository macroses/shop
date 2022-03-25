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
    color: var(--c-text-dark);
    border: 1px solid var(--c-text);
    padding: 8px 16px;
    cursor: pointer;
    backdrop-filter: blur(10px);
    border-radius: 6px;
  }
</style>