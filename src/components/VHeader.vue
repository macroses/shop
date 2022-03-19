<template>
  <header>
    <div class="header-top">
      <div class="container">
        <div class="header-top-content">
          <router-link to="/" class="logo">
            <img src="/logo.svg" alt="Лого">
          </router-link>
          <v-catalog />
          <v-input :pholder="placeholder">
            <button class="search-submit">
              <svg class="icon">
                <use xlink:href="/thin.svg#magnifying-glass"></use>
              </svg>
            </button>
          </v-input>
          <v-funcs />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import VInput from "@/components/UI/Vinput";
import VFuncs from "@/components/VFuncs";
import VCatalog from "@/components/VCatalog";
export default {
  name: 'v-header',
  components: {VCatalog, VInput, VFuncs},
  data() {
    return {
      placeholder: 'Поиск'
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  margin-bottom: 32px;
}

.header-top-content {
  display: flex;
  align-items: center;
  padding: 16px 0;
}

.search-submit {
  background: none;
  border: none;
  outline: none;
  display: flex;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 42px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--c-text);
}

.logo {
  margin-right: 16px;
}

.icon {
  width: 20px;
  height: 20px;
  fill: var(--c-white);
}
</style>