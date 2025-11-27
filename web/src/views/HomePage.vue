<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import SocialButton from '../components/SocialButton.vue'
import TimelineItem from '../components/TimelineItem.vue'

const windowWidth = ref(window.innerWidth)
const windowHeight = ref(window.innerHeight)

const showTimeline = computed(() => {
  return windowWidth.value >= 1269 && windowHeight.value >= 750
})

const timelineItems = [
  {
    date: 'October 1999',
    title: 'Born to the world 👶',
    subtitle: '',
    items: []
  },
  {
    date: 'January 2019',
    title: 'Student 💻',
    subtitle: '',
    items: []
  },
  {
    date: 'July 2020',
    title: 'Laboratory Assistant',
    subtitle: '',
    items: []
  },
  {
    date: 'May 2021',
    title: 'Build Community',
    subtitle: '',
    items: []
  }
]

const socialLinks = [
  { icon: 'twitter', url: 'https://twitter.com/NurSyahfei', label: 'Twitter' },
  { icon: 'github', url: 'https://github.com/noersy', label: 'GitHub' },
  { icon: 'linkedin', url: 'https://www.linkedin.com/in/noersy', label: 'LinkedIn' },
  { icon: 'instagram', url: 'https://www.instagram.com/nursyahfei', label: 'Instagram' }
]

const updateDimensions = () => {
  windowWidth.value = window.innerWidth
  windowHeight.value = window.innerHeight
}

onMounted(() => {
  window.addEventListener('resize', updateDimensions)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateDimensions)
})
</script>

<template>
  <div class="home-page">
    <div class="content-wrapper">
      <div class="left-section">
        <p class="greeting">Hello,</p>
        <h1 class="name">I'm Nur Syahfei</h1>
        <h2 class="subtitle">Flutter Developer, specialized in Mobile.</h2>

        <div class="social-buttons">
          <SocialButton
            v-for="social in socialLinks"
            :key="social.icon"
            :icon="social.icon"
            :url="social.url"
            :label="social.label"
          />
        </div>
      </div>

      <transition name="fade">
        <div v-if="showTimeline" class="timeline-section">
          <div class="timeline-line"></div>
          <div class="timeline-content">
            <TimelineItem
              v-for="(item, index) in timelineItems"
              :key="index"
              :date="item.date"
              :title="item.title"
              :subtitle="item.subtitle"
              :items="item.items"
            />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/colors';
@import '../assets/styles/typography';

.home-page {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 40px;

  .content-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    max-width: 1400px;
    width: 100%;
    gap: 60px;
  }

  .left-section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .greeting {
      @include headline5-style;
      margin: 0 0 8px 0;
    }

    .name {
      @include headline2-style;
      margin: 0 0 16px 0;
    }

    .subtitle {
      @include headline5-style;
      margin: 0 0 32px 0;
    }

    .social-buttons {
      display: flex;
      flex-direction: row;
      gap: 8px;
      margin-top: 16px;
    }
  }

  .timeline-section {
    position: relative;
    padding-left: 240px;

    .timeline-line {
      position: absolute;
      left: 140px;
      top: 0;
      bottom: 0;
      width: 2px;
      background-color: $text-secondary;
    }

    .timeline-content {
      padding: 20px 0;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 500ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 1269px) {
  .home-page {
    .content-wrapper {
      justify-content: flex-start;
    }
  }
}

@media (max-width: 768px) {
  .home-page {
    padding: 0 20px;

    .left-section {
      .name {
        font-size: 36px;
      }

      .subtitle {
        font-size: 18px;
      }
    }
  }
}
</style>
