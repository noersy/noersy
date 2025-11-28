<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import NavigationBar from '../components/NavigationBar.vue'
import HomePage from '../views/HomePage.vue'
import FeaturedWorksPage from '../views/FeaturedWorksPage.vue'
import PlaygroundPage from '../views/PlaygroundPage.vue'
import AboutPage from '../views/AboutPage.vue'
import ContactPage from '../views/ContactPage.vue'

const currentSection = ref(0)
const sections = ['Home', 'Featured_Works', 'Playground', 'About', 'Contact']
const scrollContainer = ref(null)

const components = [
  HomePage,
  FeaturedWorksPage,
  PlaygroundPage,
  AboutPage,
  ContactPage
]

// Simple navigation using native smooth scroll
const navigateToSection = (index) => {
  if (index < 0 || index >= sections.length) return

  currentSection.value = index
  const container = scrollContainer.value

  if (container) {
    const targetScrollTop = index * window.innerHeight
    container.scrollTo({
      top: targetScrollTop,
      behavior: 'smooth'
    })
  }
}

// Track current section based on scroll position
const handleScroll = () => {
  const container = scrollContainer.value
  if (!container) return

  const scrollTop = container.scrollTop
  const sectionHeight = window.innerHeight
  const newSection = Math.round(scrollTop / sectionHeight)

  if (newSection !== currentSection.value && newSection >= 0 && newSection < sections.length) {
    currentSection.value = newSection
  }
}

// Debounced scroll handler
let scrollDebounce = null
const handleScrollDebounced = () => {
  if (scrollDebounce) {
    clearTimeout(scrollDebounce)
  }
  scrollDebounce = setTimeout(handleScroll, 100)
}

onMounted(() => {
  const container = scrollContainer.value
  if (container) {
    container.addEventListener('scroll', handleScrollDebounced, { passive: true })
  }
})

onUnmounted(() => {
  const container = scrollContainer.value
  if (container) {
    container.removeEventListener('scroll', handleScrollDebounced)
  }
  if (scrollDebounce) {
    clearTimeout(scrollDebounce)
  }
})
</script>

<template>
  <div class="dashboard-layout">
    <NavigationBar
      :currentSection="currentSection"
      :sections="sections"
      :onNavigate="navigateToSection"
    />

    <div ref="scrollContainer" class="scroll-container fade-in-delayed">
      <section
        v-for="(component, index) in components"
        :key="index"
        class="page-section"
        :class="{ active: currentSection === index }"
      >
        <component :is="component" />
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../assets/styles/colors' as *;

.dashboard-layout {
  width: 100%;
  height: 100vh;
  position: relative;
  background-color: $primary-bg;
  overflow: hidden;

  .scroll-container {
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    scroll-behavior: smooth;
    scroll-snap-type: y proximity;
    scroll-padding-top: 0;

    // Enable momentum scrolling on iOS
    -webkit-overflow-scrolling: touch;

    /* Hide scrollbar for Chrome, Safari and Opera */
    &::-webkit-scrollbar {
      display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none;
    scrollbar-width: none;

    .page-section {
      width: 100%;
      min-height: 100vh;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      scroll-snap-align: start;
      scroll-snap-stop: normal;
      transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                  opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      will-change: transform, opacity;

      &.active {
        transform: translateY(0) scale(1);
        opacity: 1;
      }

      &:not(.active) {
        opacity: 0.85;
      }
    }
  }
}

@keyframes slideInUp {
  0% {
    transform: translateY(50px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideInDown {
  0% {
    transform: translateY(-50px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideInScale {
  0% {
    transform: translateY(30px) scale(0.95);
    opacity: 0;
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

.section-fade-enter-active {
  transition: opacity 600ms ease 600ms;
}

.section-fade-leave-active {
  transition: opacity 300ms ease;
}

.section-fade-enter-from,
.section-fade-leave-to {
  opacity: 0;
}
</style>
