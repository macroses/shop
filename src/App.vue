<template>
  <div class="wrapper">
    <v-header></v-header>
    <main>
      <router-view/>
    </main>
    <footer>3123123</footer>
  </div>
</template>

<script>
import VHeader from "@/components/VHeader";
export default {
  components: {VHeader},
}
</script>


<style lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#app {
  position: relative;
}

main {
  flex: 1 0 auto;
}

footer {
  flex: 0 0 auto;
}
</style>