<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { DashboardPayload } from "@menupulse/shared";
import AppSidebar from "./components/AppSidebar.vue";
import AppHeader from "./components/AppHeader.vue";
import ChannelTable from "./components/ChannelTable.vue";
import CopilotPanel from "./components/CopilotPanel.vue";
import KpiStrip from "./components/KpiStrip.vue";
import MenuItemsTable from "./components/MenuItemsTable.vue";
import OpportunityList from "./components/OpportunityList.vue";
import RevenueChart from "./components/RevenueChart.vue";
import { getDashboard } from "./api";
import { fallbackDashboard, fallbackRecommendation } from "./data/fallback";

const dashboard = ref<DashboardPayload>(fallbackDashboard);

onMounted(async () => {
  try {
    dashboard.value = await getDashboard();
  } catch {
    dashboard.value = fallbackDashboard;
  }
});
</script>

<template>
  <div class="app-shell">
    <AppSidebar />
    <div class="workspace">
      <AppHeader />
      <main class="dashboard">
        <h1>Delivery revenue, made actionable</h1>
        <KpiStrip :kpis="dashboard.kpis" />
        <RevenueChart :series="dashboard.revenueSeries" />
        <div class="two-column">
          <ChannelTable :channels="dashboard.channels" />
          <OpportunityList :opportunities="dashboard.opportunities" />
        </div>
        <MenuItemsTable :items="dashboard.menuItems" />
      </main>
    </div>
    <CopilotPanel :restaurant-id="dashboard.restaurant.id" :initial-recommendation="fallbackRecommendation" />
  </div>
</template>
