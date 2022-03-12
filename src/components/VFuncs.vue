<template>
  <div class="funcs">
    <router-link to="/favorite">
      <i class="fa-solid fa-heart"></i>
    </router-link>
    <router-link to="/auth">
      <i class="fa-regular fa-circle-user"></i>
    </router-link>
    <router-link to="/store-page">
      <i class="fa-solid fa-basket-shopping"></i>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "v-funcs"
}
</script>

<style lang="scss" scoped>
.funcs {
  display: flex;
  margin-left: auto;
  padding-left: 16px;
}

a {
  padding: 8px;
  color: var(--c-text);
  &:hover {
    i {
      color: var(--c-accent);
    }
  }
}

i {
  font-size: 24px;
  transition: color 0.3s;
}
</style>