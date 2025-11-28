<script setup>
import { computed } from 'vue'

const props = defineProps({
  icon: String,
  url: String,
  label: String
})

const iconPath = computed(() => {
  return new URL(`../assets/icons/${props.icon}.svg`, import.meta.url).href
})

const openLink = () => {
  window.open(props.url, '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <button
    class="social-button"
    @click="openLink"
    :aria-label="label"
  >
    <img :src="iconPath" :alt="label" class="social-icon" />
  </button>
</template>

<style lang="scss" scoped>
@use '../assets/styles/colors' as *;

.social-button {
  background-color: transparent;
  border: none;
  padding: 16px 11px;
  cursor: pointer;
  transition: all 300ms ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-2px);

    .social-icon {
      filter: brightness(0) invert(1);
      opacity: 0.8;
    }
  }

  .social-icon {
    width: 36px;
    height: 36px;
    filter: brightness(0) invert(1);
    transition: all 300ms ease;
  }
}
</style>
