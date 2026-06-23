<script setup lang="ts">
import { computed, ref } from "vue";
import { AlertTriangle, FlaskConical, Send, Sparkles, X } from "lucide-vue-next";
import type { Recommendation } from "@menupulse/shared";
import { askCopilot, createExperiment } from "../api";

const props = defineProps<{ restaurantId: string; initialRecommendation: Recommendation }>();
const question = ref("Why did our conversion drop this week and what should we do about it?");
const draft = ref("");
const recommendation = ref(props.initialRecommendation);
const loading = ref(false);
const error = ref("");
const experimentStatus = ref("");
const confidence = computed(() => `${Math.round(recommendation.value.confidence * 100)}%`);

async function submit(prompt = draft.value) {
  if (!prompt.trim() || loading.value) return;
  question.value = prompt.trim();
  draft.value = "";
  error.value = "";
  loading.value = true;
  try {
    const result = await askCopilot({ question: question.value, restaurantId: props.restaurantId });
    recommendation.value = result.recommendation;
  } catch (caught) {
    error.value = caught instanceof Error ? caught.message : "The copilot could not answer.";
  } finally {
    loading.value = false;
  }
}

async function makeExperiment() {
  experimentStatus.value = "Creating…";
  try {
    await createExperiment(recommendation.value);
    experimentStatus.value = "Draft experiment created";
  } catch {
    experimentStatus.value = "Could not create experiment";
  }
}
</script>

<template>
  <aside class="copilot">
    <div class="copilot-header"><h2><Sparkles :size="18" /> Copilot</h2><button aria-label="Close copilot"><X :size="18" /></button></div>
    <div class="copilot-body">
      <div class="user-bubble">{{ question }}</div>
      <p v-if="loading" class="thinking">GLM is analysing channel and menu data…</p>
      <p v-if="error" class="error-message">{{ error }}</p>
      <article class="recommendation-card">
        <small>Recommendation</small>
        <h3>{{ recommendation.title }}</h3>
        <p>{{ recommendation.summary }}</p>
        <dl>
          <div><dt>Expected impact</dt><dd><strong>+€{{ recommendation.expectedImpact.amount.toLocaleString() }} / week</strong><small>{{ recommendation.expectedImpact.explanation }}</small></dd></div>
          <div><dt>Confidence</dt><dd><strong class="violet">{{ confidence }}</strong><small>Model calibrated</small></dd></div>
          <div class="evidence-row"><dt>Evidence</dt><dd><ul><li v-for="item in recommendation.evidence" :key="item.label">{{ item.label }}: <strong>{{ item.value }}</strong></li></ul></dd></div>
          <div v-if="recommendation.risks.length" class="risk-row"><dt><AlertTriangle :size="15" /> Risks</dt><dd>{{ recommendation.risks[0] }}</dd></div>
        </dl>
        <button class="primary-action" @click="makeExperiment"><FlaskConical :size="16" /> {{ experimentStatus || "Create experiment" }}</button>
      </article>
      <div class="suggestions">
        <button @click="submit('Explain this recommendation in simple terms')">Explain in simple terms</button>
        <button @click="submit('Show the supporting data behind this recommendation')">Show supporting data</button>
        <button @click="submit('What should we do about our top menu items?')">What about my top items?</button>
      </div>
    </div>
    <form class="copilot-input" @submit.prevent="submit()">
      <input v-model="draft" maxlength="500" aria-label="Ask the copilot" placeholder="Ask anything…" />
      <button :disabled="!draft.trim() || loading" aria-label="Send"><Send :size="18" /></button>
    </form>
    <p class="copilot-disclaimer">MenuPulse AI can make mistakes. Verify important information.</p>
  </aside>
</template>
