<script setup lang="ts">
import { Bell, CalendarDays, ChevronDown, CircleHelp } from "lucide-vue-next";
</script>

<template>
  <header class="topbar">
    <button class="restaurant-select">
      <span class="restaurant-thumb">LK</span>
      <span>Lisbon Kitchen</span>
      <ChevronDown :size="15" />
    </button>
    <div class="topbar-actions">
      <button class="date-select">
        <CalendarDays :size="16" />
        <span><strong>May 5 – May 11, 2025</strong><small>vs Apr 28 – May 4, 2025</small></span>
        <ChevronDown :size="15" />
      </button>
      <button class="icon-button notification"><Bell :size="18" /><span>3</span></button>
      <button class="icon-button"><CircleHelp :size="18" /></button>
      <button class="profile"><span>SB</span><ChevronDown :size="14" /></button>
    </div>
  </header>
</template>
