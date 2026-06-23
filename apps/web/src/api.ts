import type { CopilotRequest, DashboardPayload, Recommendation } from "@menupulse/shared";

export async function getDashboard(): Promise<DashboardPayload> {
  const response = await fetch("/api/dashboard");
  if (!response.ok) throw new Error("Dashboard data is unavailable.");
  return response.json();
}

export async function askCopilot(input: CopilotRequest): Promise<{
  recommendation: Recommendation;
  provider: string;
  model: string;
  latencyMs: number;
}> {
  const response = await fetch("/api/copilot", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input)
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.message ?? "The copilot could not answer.");
  return payload;
}

export async function createExperiment(recommendation: Recommendation) {
  const response = await fetch("/api/experiments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: recommendation.title,
      hypothesis: recommendation.experiment.hypothesis,
      durationDays: recommendation.experiment.durationDays,
      primaryMetric: recommendation.experiment.primaryMetric,
      guardrailMetric: recommendation.experiment.guardrailMetric,
      expectedImpact: recommendation.expectedImpact.amount
    })
  });
  if (!response.ok) throw new Error("Experiment creation failed.");
  return response.json();
}
