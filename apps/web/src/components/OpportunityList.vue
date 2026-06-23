<script setup lang="ts">
defineProps<{ opportunities: Array<{ rank: number; title: string; subtitle: string; impact: number; confidence: string }> }>();
</script>

<template>
  <section class="panel half-panel">
    <div class="section-heading compact"><h2>Growth opportunities <span class="info">i</span></h2><button class="text-link">View all</button></div>
    <ol class="opportunity-list">
      <li v-for="item in opportunities" :key="item.rank">
        <span class="rank">{{ item.rank }}</span>
        <span class="opportunity-copy"><strong>{{ item.title }}</strong><small>{{ item.subtitle }}</small></span>
        <span class="impact"><strong>+€{{ item.impact.toLocaleString() }} / wk</strong><small>{{ item.confidence }} impact</small></span>
      </li>
    </ol>
    <button class="text-link">See all opportunities →</button>
  </section>
</template>
