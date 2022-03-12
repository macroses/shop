<template>
  <div class="catalog-wrap">
    <div class="catalog">
      <i class="fa-solid fa-bars"></i>
      Каталог
    </div>
    <ul class="catalog-list">
      <li>
        <router-link to="">Смартфоны и планшеты</router-link>
      </li>
      <li>
        <router-link to="">Ноутбуки и настольные ПК</router-link>
      </li>
      <li>
        <router-link to="">Стиральные машины</router-link>
      </li>
      <li>
        <router-link to="">Холодильники</router-link>
      </li>
      <li>
        <router-link to="">Игры и развлечения</router-link>
      </li>
      <li>
        <router-link to="">Техника для кухни</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'v-catalog'
}
</script>

<style lang="scss" scoped>
.catalog-wrap {
  position: relative;
}

.catalog {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--c-neutral);
  background: var(--c-accent);
  height: 42px;
  padding: 0 16px;
  border-radius: 4px;
  margin-right: 16px;
  cursor: pointer;
  i {
    margin-right: 8px;
  }
}

.catalog-list {
  position: absolute;
  background-color: var(--c-white);
  top: 100%;
  left: 0;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  overflow: hidden;
  box-shadow: 0 0 20px 0 rgba(0,0,0, 0.2);

  a {
    white-space: nowrap;
    display: block;
    padding: 8px 16px;
    transition: 0.3s;
    &:hover {
      background-color: var(--c-accent);
      color: var(--c-white);
    }
  }
}
</style>