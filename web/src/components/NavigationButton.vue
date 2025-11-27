<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: String,
  isActive: Boolean,
  onClick: Function
})

const handleClick = () => {
  if (props.onClick) {
    props.onClick()
  }
}
</script>

<template>
  <button
    class="nav-button"
    :class="{ 'active': isActive }"
    @click="handleClick"
  >
    {{ label }}
  </button>
</template>

<style lang="scss" scoped>
@use '../assets/styles/colors' as *;
@use '../assets/styles/typography' as *;

.nav-button {
  @include subtitle1-style;
  padding: 22px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  transition: all 500ms ease;
  color: $text-primary;
  white-space: nowrap;

  &.active {
    background-color: $white-05;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }
}
</style>
