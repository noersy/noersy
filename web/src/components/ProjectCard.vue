<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: String,
  caption: String,
  gradientFrom: String,
  gradientTo: String,
  opacity: {
    type: Number,
    default: 0.2
  }
})

const isHovered = ref(false)
</script>

<template>
  <div
    class="project-card"
    :style="{
      background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
      opacity: opacity
    }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <transition name="fade">
      <div v-if="!isHovered" class="title-container">
        <h2 class="card-title">{{ title }}</h2>
      </div>
    </transition>

    <transition name="fade">
      <div v-if="isHovered" class="description-container">
        <p class="card-caption">{{ caption }}</p>
        <button class="more-button">More</button>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@use '../assets/styles/colors' as *;
@use '../assets/styles/typography' as *;

.project-card {
  width: 450px;
  height: 250px;
  margin: 12px;
  border-radius: 12px;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: all 300ms ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }

  .title-container,
  .description-container {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32px;
    text-align: center;
  }

  .card-title {
    @include title-style;
    margin: 0;
  }

  .card-caption {
    @include caption-style;
    margin-bottom: 24px;
    max-width: 80%;
  }

  .more-button {
    @include caption-style;
    background-color: transparent;
    border: 2px solid $text-primary;
    border-radius: 7px;
    padding: 12px 23px;
    cursor: pointer;
    transition: all 300ms ease;

    &:hover {
      background-color: $white-05;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
