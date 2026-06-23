<script setup lang="ts">
import { BarChart3, Building2, FlaskConical, LayoutGrid, MessageSquare, UsersRound } from "lucide-vue-next";

const items = [
  { label: "Overview", icon: LayoutGrid },
  { label: "Restaurants", icon: Building2 },
  { label: "Competitors", icon: UsersRound },
  { label: "Menu Lab", icon: FlaskConical },
  { label: "Copilot", icon: MessageSquare },
  { label: "Experiments", icon: BarChart3 }
];
</script>

<template>
  <aside class="sidebar">
    <div class="brand">MenuPulse AI</div>
    <nav aria-label="Primary">
      <button v-for="item in items" :key="item.label" :class="{ active: item.label === 'Overview' }">
        <component :is="item.icon" :size="19" :stroke-width="1.7" />
        <span>{{ item.label }}</span>
      </button>
    </nav>
    <button class="collapse">← <span>Collapse</span></button>
  </aside>
</template>
