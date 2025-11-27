<script setup>
import { computed } from 'vue'

const props = defineProps({
  date: String,
  title: String,
  subtitle: String,
  items: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <div class="timeline-item">
    <div class="date">{{ date }}</div>
    <div class="spacer">
      <div class="timeline-dot"></div>
    </div>
    <div class="content">
      <h3 class="title">{{ title }}</h3>
      <p v-if="subtitle" class="subtitle">{{ subtitle }}</p>
      <ul v-if="items.length > 0" class="items-list">
        <li v-for="(item, index) in items" :key="index">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../assets/styles/colors' as *;
@use '../assets/styles/typography' as *;

.timeline-item {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 32px;

  .date {
    @include body-text;
    min-width: 120px;
    text-align: right;
    color: $text-secondary;
  }

  .spacer {
    width: 24px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    .timeline-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: $rn-blue;
      border: 2px solid $primary-bg;
      position: absolute;
      top: 8px;
      z-index: 1;
      box-shadow: 0 0 0 2px $rn-blue;
    }
  }

  .content {
    flex: 1;

    .title {
      font-size: 21px;
      font-weight: $font-bold;
      color: $text-primary;
      margin-bottom: 8px;
      line-height: 1.2;
    }

    .subtitle {
      @include caption2-style;
      padding: 16px 0;
      margin: 0;
    }

    .items-list {
      @include caption2-style;
      padding-left: 20px;
      margin: 8px 0 0 0;

      li {
        margin-bottom: 4px;
      }
    }
  }
}
</style>
