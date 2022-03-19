<template>
  <div class="v-select">
    <div
        @click="toggleOptions"
        class="chosen-value">
      {{selected}}
      <svg class="icon">
        <use :xlink:href="`/thin.svg#${isVisible ? 'angle-up' : 'angle-down'}`"></use>
      </svg>
    </div>
    <v-transition>
      <ul
          v-if="isVisible"
          class="options">
        <li
            v-for="option in options"
            :key="option.value"
            @click="chooseOption(option)"
            class="option">
          {{ option.name }}
        </li>
      </ul>
    </v-transition>
  </div>
</template>

<script>
import VTransition from "@/components/UI/VTransition";
export default {
  name: 'v-select',
  components: {VTransition},
  props: {
    options: {
      type: Array,
      required: true,
      default: () => []
    },
    selected: String
  },
  data() {
    return {
      isVisible: false,
      caretIcon: 'fa-solid fa-angle-down'
    }
  },
  methods: {
    chooseOption(option) {
      this.$emit('select', option)
      console.log(option)
    },
    toggleOptions() {
      this.isVisible = !this.isVisible

    },
    hideOptions() {
      this.isVisible = false
    }
  },
  mounted() {
    document.addEventListener('click', this.hideOptions, true)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.hideOptions, true)
  }
}
</script>

<style lang="scss" scoped>
.v-select {
  position: relative;
  width: 100%;
}

.chosen-value {
  height: 42px;
  background: rgba(255,255,255, 0.1);
  border-bottom: 1px solid rgba(255,255,255,0.2);
  border-right: 1px solid rgba(255,255,255,0.3);
  border-left: 1px solid rgba(255,255,255,0.3);
  border-top: 1px solid rgba(255,255,255,0.4);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  padding: 4px 8px;
  cursor: pointer;
  border-radius: 6px;

  color: var(--c-white);

  justify-content: space-between;
}

.options {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 100%;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  background-color: var(--c-white);
  border: 1px solid var(--c-text);
  border-top: none;
  z-index: 10;
  li {
    cursor: pointer;
    padding: 4px 8px;
    transition: background-color 0.3s, color 0.3s;
    &:hover {
      background-color: var(--c-accent);
      color: var(--c-white);
    }
  }
}

.icon {
  fill: var(--c-white);
}

.slide-enter-active {
  transition-duration: 0.3s;
  transition-timing-function: ease-in;
}

.slide-leave-active {
  transition-duration: 0.3s;
}

.slide-enter-to, .slide-leave {
  max-height: 100px;
  overflow: hidden;
}

.slide-enter, .slide-leave-to {
  overflow: hidden;
  max-height: 0;
}
</style>