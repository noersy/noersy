<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import NavigationButton from './NavigationButton.vue'

const props = defineProps({
  currentSection: {
    type: Number,
    default: 0
  },
  sections: {
    type: Array,
    required: true
  },
  onNavigate: {
    type: Function,
    required: true
  }
})

const windowWidth = ref(window.innerWidth)
const isMobileMenuOpen = ref(false)

const isMobile = computed(() => windowWidth.value < 930)
const currentSectionName = computed(() => props.sections[props.currentSection] || 'Home')

const updateWidth = () => {
  windowWidth.value = window.innerWidth
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const navigateToSection = (index) => {
  props.onNavigate(index)
  isMobileMenuOpen.value = false
}

const otherSections = computed(() => {
  return props.sections
    .map((section, index) => ({ section, index }))
    .filter((_, index) => index !== props.currentSection)
})

onMounted(() => {
  window.addEventListener('resize', updateWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth)
})
</script>

<template>
  <nav class="navigation-bar">
    <!-- Desktop Navigation -->
    <div v-if="!isMobile" class="desktop-nav">
      <NavigationButton
        v-for="(section, index) in sections"
        :key="index"
        :label="section"
        :isActive="currentSection === index"
        :onClick="() => navigateToSection(index)"
      />
    </div>

    <!-- Mobile Navigation -->
    <div v-else class="mobile-nav">
      <NavigationButton
        :label="currentSectionName"
        :isActive="true"
        :onClick="toggleMobileMenu"
      />

      <!-- Mobile Menu Dropdown -->
      <transition name="menu-fade">
        <div v-if="isMobileMenuOpen" class="mobile-menu-overlay" @click="toggleMobileMenu">
          <div class="mobile-menu" @click.stop>
            <NavigationButton
              v-for="{ section, index } in otherSections"
              :key="index"
              :label="section"
              :isActive="false"
              :onClick="() => navigateToSection(index)"
            />
          </div>
        </div>
      </transition>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@import '../assets/styles/colors';

.navigation-bar {
  position: fixed;
  top: 8px;
  left: 0;
  right: 0;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 0 20px;

  .desktop-nav {
    display: flex;
    flex-direction: row;
    gap: 8px;
    background-color: rgba(0, 0, 0, 0.3);
    padding: 12px 16px;
    border-radius: 12px;
    backdrop-filter: blur(10px);
  }

  .mobile-nav {
    position: relative;

    .mobile-menu-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(36, 47, 63, 0.9);
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding-top: 100px;
      z-index: 999;

      .mobile-menu {
        display: flex;
        flex-direction: column;
        gap: 12px;
        background-color: rgba(0, 0, 0, 0.5);
        padding: 20px;
        border-radius: 12px;
        backdrop-filter: blur(10px);
        min-width: 200px;
      }
    }
  }
}

.menu-fade-enter-active {
  transition: opacity 200ms ease;
}

.menu-fade-leave-active {
  transition: opacity 0ms;
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
}
</style>
