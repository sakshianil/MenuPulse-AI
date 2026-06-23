<script setup lang="ts">
defineProps<{ kpis: Array<{ key: string; label: string; value: string; delta: number; suffix?: string }> }>();
</script>

<template>
  <section class="kpi-strip" aria-label="Key performance indicators">
    <article v-for="(kpi, index) in kpis" :key="kpi.key" class="kpi" :class="{ last: index === kpis.length - 1 }">
      <div>
        <p>{{ kpi.label }} <span class="info">i</span></p>
        <strong>{{ kpi.value }}</strong>
        <small :class="kpi.delta >= 0 ? 'positive' : 'negative'">
          {{ kpi.delta >= 0 ? "+" : "" }}{{ kpi.delta }}{{ kpi.suffix ?? "%" }}
          <span>vs previous 7 days</span>
        </small>
      </div>
      <svg viewBox="0 0 72 34" role="img" :aria-label="`${kpi.label} trend`">
        <path d="M2 26 C10 28, 12 13, 20 17 S30 29, 36 16 S47 4, 52 15 S62 23, 70 7" fill="none" stroke="#6545f6" stroke-width="2" />
      </svg>
    </article>
  </section>
</template>
