<template>
  <header>
    <div class="header-top">
      <div class="container">
        <div class="header-top-content">
          <router-link to="/">
            <v-logo />
          </router-link>
          <v-catalog />
          <v-input :pholder="placeholder">
            <button class="search-submit">
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </v-input>
          <v-funcs />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import VLogo from "@/components/UI/VLogo";
import VInput from "@/components/UI/Vinput";
import VFuncs from "@/components/VFuncs";
import VCatalog from "@/components/VCatalog";
export default {
  name: 'v-header',
  components: {VCatalog, VInput, VLogo, VFuncs},
  data() {
    return {
      placeholder: 'Поиск'
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  box-shadow: 0 0 5px 0 rgba(0,0,0, 0.3);
  position: sticky;
  top: 0;
}

.header-top-content {
  display: flex;
  align-items: center;
  padding: 8px 0;
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
</style>