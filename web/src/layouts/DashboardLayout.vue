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
const isScrolling = ref(false)
const scrollTimeout = ref(null)

const components = [
  HomePage,
  FeaturedWorksPage,
  PlaygroundPage,
  AboutPage,
  ContactPage
]

const navigateToSection = (index) => {
  if (index < 0 || index >= sections.length) return

  isScrolling.value = true
  currentSection.value = index

  const container = scrollContainer.value
  if (container) {
    const targetScrollTop = index * window.innerHeight

    // Use smoother scroll with custom easing
    container.scrollTo({
      top: targetScrollTop,
      behavior: 'smooth'
    })

    // Clear existing timeout
    if (scrollTimeout.value) {
      clearTimeout(scrollTimeout.value)
    }

    // Set new timeout
    scrollTimeout.value = setTimeout(() => {
      isScrolling.value = false
    }, 1000)
  }
}

let scrollDebounce = null

const handleScroll = () => {
  const container = scrollContainer.value
  if (container && !isScrolling.value) {
    // Clear previous debounce
    if (scrollDebounce) {
      clearTimeout(scrollDebounce)
    }

    // Debounce scroll detection
    scrollDebounce = setTimeout(() => {
      const scrollTop = container.scrollTop
      const sectionHeight = window.innerHeight
      const threshold = sectionHeight * 0.5 // 50% threshold
      const newSection = Math.floor((scrollTop + threshold) / sectionHeight)

      if (newSection !== currentSection.value && newSection >= 0 && newSection < sections.length) {
        currentSection.value = newSection
      }
    }, 100)
  }
}

const handleScrollEnd = () => {
  const container = scrollContainer.value
  if (container) {
    const scrollTop = container.scrollTop
    const sectionHeight = window.innerHeight
    const newSection = Math.round(scrollTop / sectionHeight)

    if (newSection !== currentSection.value && newSection >= 0 && newSection < sections.length) {
      currentSection.value = newSection
    }

    isScrolling.value = false
  }
}

onMounted(() => {
  const container = scrollContainer.value
  if (container) {
    container.addEventListener('scroll', handleScroll, { passive: true })
    container.addEventListener('scrollend', handleScrollEnd, { passive: true })
  }
})

onUnmounted(() => {
  const container = scrollContainer.value
  if (container) {
    container.removeEventListener('scroll', handleScroll)
    container.removeEventListener('scrollend', handleScrollEnd)
  }
  if (scrollTimeout.value) {
    clearTimeout(scrollTimeout.value)
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
    scroll-snap-type: y mandatory;

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
      scroll-snap-stop: always;
    }
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
