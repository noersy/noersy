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

const components = [
  HomePage,
  FeaturedWorksPage,
  PlaygroundPage,
  AboutPage,
  ContactPage
]

const navigateToSection = (index) => {
  if (index < 0 || index >= sections.length || isScrolling.value) return

  isScrolling.value = true
  currentSection.value = index

  const container = scrollContainer.value
  if (container) {
    const targetScrollTop = index * window.innerHeight

    container.scrollTo({
      top: targetScrollTop,
      behavior: 'smooth'
    })

    setTimeout(() => {
      isScrolling.value = false
    }, 2000)
  }
}

const handleScroll = () => {
  if (isScrolling.value) return

  const container = scrollContainer.value
  if (container) {
    const scrollTop = container.scrollTop
    const sectionHeight = window.innerHeight
    const newSection = Math.round(scrollTop / sectionHeight)

    if (newSection !== currentSection.value && newSection >= 0 && newSection < sections.length) {
      currentSection.value = newSection
    }
  }
}

onMounted(() => {
  const container = scrollContainer.value
  if (container) {
    container.addEventListener('scroll', handleScroll)
  }
})

onUnmounted(() => {
  const container = scrollContainer.value
  if (container) {
    container.removeEventListener('scroll', handleScroll)
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
        <transition name="section-fade">
          <component :is="component" v-if="currentSection === index" />
        </transition>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/colors';

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
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;

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
      scroll-snap-align: start;
      scroll-snap-stop: always;
      position: relative;
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
