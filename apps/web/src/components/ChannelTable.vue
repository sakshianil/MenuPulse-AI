<script setup lang="ts">
defineProps<{ channels: Array<{ name: string; revenue: number; delta: number; orders: number; conversion: number; averageBasket: number }> }>();
const money = new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
</script>

<template>
  <section class="panel half-panel">
    <div class="section-heading compact"><h2>Channel performance <span class="info">i</span></h2></div>
    <div class="data-table channel-table">
      <div class="table-row table-head"><span>Channel</span><span>Revenue</span><span>vs prev.</span><span>Orders</span><span>Conversion</span><span>Avg. basket</span></div>
      <div v-for="(channel, index) in channels" :key="channel.name" class="table-row">
        <span><i :class="`channel-${index}`"></i>{{ channel.name }}</span>
        <span>{{ money.format(channel.revenue) }}</span>
        <span class="positive">+{{ channel.delta }}%</span>
        <span>{{ channel.orders }}</span>
        <span>{{ channel.conversion }}%</span>
        <span>€{{ channel.averageBasket.toFixed(2) }}</span>
      </div>
      <div class="table-row total"><span>Total</span><span>€28,430</span><span class="positive">+12.6%</span><span>1,162</span><span>6.21%</span><span>€24.45</span></div>
    </div>
    <button class="text-link">View channel breakdown →</button>
  </section>
</template>
