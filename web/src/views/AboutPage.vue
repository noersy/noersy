<script setup>
</script>

<template>
  <div class="placeholder-page">
    <h1>About</h1>
    <p>Coming soon...</p>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/colors';
@import '../assets/styles/typography';

.placeholder-page {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    @include title-style;
    margin-bottom: 16px;
  }

  p {
    @include caption-style;
    color: $text-secondary;
  }
}
</style>
