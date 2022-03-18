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
    background-color: var(--c-accent);
    color: var(--c-white);
    border: none;
    padding: 8px 16px;
    cursor: pointer;
  }
</style>