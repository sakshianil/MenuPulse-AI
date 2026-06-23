<script setup lang="ts">
defineProps<{ items: Array<{ id: string; name: string; description: string; category: string; conversion: number; delta: number; orders: number; revenue: number; status: string; image: string }> }>();
</script>

<template>
  <section class="panel menu-panel">
    <div class="section-heading compact"><h2>Menu items needing attention <span class="info">i</span></h2><button class="text-link">View all items</button></div>
    <div class="menu-table">
      <div class="menu-row menu-head"><span>Item</span><span>Category</span><span>Conversion</span><span>vs prev. 7 days</span><span>Orders</span><span>Revenue</span><span>Status</span></div>
      <div v-for="item in items" :key="item.id" class="menu-row">
        <span class="menu-item"><img :src="item.image" :alt="item.name" /><span><strong>{{ item.name }}</strong><small>{{ item.description }}</small></span></span>
        <span>{{ item.category }}</span>
        <span><strong>{{ item.conversion.toFixed(2) }}%</strong></span>
        <span :class="item.delta >= 0 ? 'positive' : 'negative'">{{ item.delta >= 0 ? "+" : "" }}{{ item.delta.toFixed(2) }}pp</span>
        <span>{{ item.orders }}</span>
        <span>€{{ item.revenue }}</span>
        <span :class="item.status === 'Watch' ? 'watch' : 'negative'">{{ item.status }}</span>
      </div>
    </div>
    <button class="text-link">See full menu performance →</button>
  </section>
</template>
