<template>
  <div class="funcs">
    <router-link to="/favorite">
      <svg class="icon">
        <use xlink:href="/thin.svg#brightness"></use>
      </svg>
    </router-link>
    <router-link to="/favorite">
      <svg class="icon">
        <use xlink:href="/thin.svg#heart"></use>
      </svg>
    </router-link>
    <router-link to="/auth">
      <svg class="icon">
        <use xlink:href="/thin.svg#right-to-bracket"></use>
      </svg>
    </router-link>
    <router-link to="/store-page">
      <svg class="icon">
        <use xlink:href="/thin.svg#cart-shopping"></use>
      </svg>
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
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  transition: 0.3s;
  border-radius: 6px;
  &:hover {
    border-bottom: 1px solid rgba(0,0,0,0.2);
    border-right: 1px solid rgba(0,0,0,0.3);
    border-left: 1px solid rgba(0,0,0,0.3);
    border-top: 1px solid rgba(0,0,0,0.4);
  }
}

.icon {
  fill: var(--c-text-dark);
  transition: 0.3s;
}
</style>