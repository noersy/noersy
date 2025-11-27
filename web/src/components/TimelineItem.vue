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
    <div class="spacer"></div>
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
@import '../assets/styles/colors';
@import '../assets/styles/typography';

.timeline-item {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 32px;

  .date {
    @include body-text;
    min-width: 120px;
    text-align: left;
    color: $text-secondary;
  }

  .spacer {
    width: 24px;
  }

  .content {
    flex: 1;

    .title {
      font-size: 21px;
      font-weight: $font-bold;
      color: $text-primary;
      margin-bottom: 8px;
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
