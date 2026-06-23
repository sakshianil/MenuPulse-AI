<script setup lang="ts">
const props = defineProps<{ series: Array<{ day: string; current: number; previous: number }> }>();
const width = 860;
const height = 210;
const max = Math.max(...props.series.flatMap((point) => [point.current, point.previous])) * 1.08;
const x = (index: number) => 45 + index * ((width - 80) / (props.series.length - 1));
const y = (value: number) => height - 34 - (value / max) * (height - 60);
const points = (key: "current" | "previous") => props.series.map((point, index) => `${x(index)},${y(point[key])}`).join(" ");
</script>

<template>
  <section class="panel chart-panel">
    <div class="section-heading">
      <div>
        <h2>Revenue over time <span class="info">i</span></h2>
        <div class="legend"><span class="solid"></span> May 5 – May 11, 2025 <span class="dashed"></span> Apr 28 – May 4, 2025</div>
      </div>
      <button class="select-button">Daily⌄</button>
    </div>
    <svg class="revenue-chart" :viewBox="`0 0 ${width} ${height}`" preserveAspectRatio="none">
      <g v-for="n in 4" :key="n">
        <line x1="45" :x2="width - 30" :y1="35 + (n - 1) * 42" :y2="35 + (n - 1) * 42" stroke="#e8e8ee" />
        <text x="4" :y="40 + (n - 1) * 42" class="chart-label">€{{ 8 - n * 2 }}K</text>
      </g>
      <polyline :points="points('previous')" fill="none" stroke="#9b88ff" stroke-width="2" stroke-dasharray="4 4" />
      <polyline :points="points('current')" fill="none" stroke="#6545f6" stroke-width="3" />
      <g v-for="(point, index) in series" :key="point.day">
        <circle :cx="x(index)" :cy="y(point.current)" r="4" fill="#6545f6" />
        <text :x="x(index)" :y="height - 8" text-anchor="middle" class="chart-day">{{ point.day }}</text>
      </g>
    </svg>
  </section>
</template>
