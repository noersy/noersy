<script setup>
import ProjectCard from '../components/ProjectCard.vue'

const projects = [
  {
    title: 'Ajari',
    caption: 'mobile-based application for Al-Quran Learning Place (TPQ)',
    gradientFrom: '#4caf50',
    gradientTo: '#69f0ae',
    opacity: 0.2
  },
  {
    title: 'Mi-Lab',
    caption: 'Mobile app integrated with https://infotech.umm.ac.id/',
    gradientFrom: '#ff5722',
    gradientTo: '#ff9800',
    opacity: 0.2
  }
]
</script>

<template>
  <div class="featured-works-page">
    <div class="header">
      <h1 class="page-title">My Recent Work</h1>
      <p class="page-caption">Here are a few projects I've worked on recently.</p>
    </div>

    <div class="projects-grid">
      <ProjectCard
        v-for="(project, index) in projects"
        :key="index"
        :title="project.title"
        :caption="project.caption"
        :gradientFrom="project.gradientFrom"
        :gradientTo="project.gradientTo"
        :opacity="project.opacity"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../assets/styles/colors' as *;
@use '../assets/styles/typography' as *;

.featured-works-page {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;

  .header {
    margin-top: 195px;
    margin-bottom: 75px;
    text-align: center;

    .page-title {
      @include title-style;
      margin: 0 0 32px 0;
    }

    .page-caption {
      @include caption-style;
      margin: 0;
    }
  }

  .projects-grid {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 24px;
    max-width: 1200px;
  }
}

@media (max-width: 1000px) {
  .featured-works-page {
    .header {
      margin-top: 120px;
    }

    .projects-grid {
      flex-direction: column;
    }
  }
}

@media (max-width: 500px) {
  .featured-works-page {
    .projects-grid {
      :deep(.project-card) {
        width: 100%;
        max-width: 450px;
      }
    }
  }
}
</style>
