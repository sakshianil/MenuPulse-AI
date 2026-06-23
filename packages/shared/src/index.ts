import { z } from "zod";

export const evidenceSchema = z.object({
  label: z.string().min(3).max(140),
  value: z.string().min(1).max(80)
});

export const recommendationSchema = z.object({
  title: z.string().min(8).max(120),
  summary: z.string().min(20).max(500),
  expectedImpact: z.object({
    amount: z.number().min(-100000).max(100000),
    unit: z.enum(["EUR_PER_WEEK", "PERCENT", "ORDERS_PER_WEEK"]),
    explanation: z.string().min(8).max(180)
  }),
  confidence: z.number().min(0).max(1),
  evidence: z.array(evidenceSchema).min(2).max(5),
  risks: z.array(z.string().min(5).max(180)).max(4),
  experiment: z.object({
    hypothesis: z.string().min(10).max(220),
    durationDays: z.number().int().min(3).max(30),
    primaryMetric: z.string().min(3).max(80),
    guardrailMetric: z.string().min(3).max(80)
  })
});

export type Recommendation = z.infer<typeof recommendationSchema>;

export const copilotRequestSchema = z.object({
  question: z.string().trim().min(3).max(500),
  restaurantId: z.string().uuid().optional()
});

export type CopilotRequest = z.infer<typeof copilotRequestSchema>;

export interface DashboardPayload {
  restaurant: { id: string; name: string; city: string };
  period: { current: string; comparison: string };
  kpis: Array<{
    key: string;
    label: string;
    value: string;
    delta: number;
    suffix?: string;
  }>;
  revenueSeries: Array<{ day: string; current: number; previous: number }>;
  channels: Array<{
    name: string;
    revenue: number;
    delta: number;
    orders: number;
    conversion: number;
    averageBasket: number;
  }>;
  opportunities: Array<{
    rank: number;
    title: string;
    subtitle: string;
    impact: number;
    confidence: "High" | "Medium" | "Low";
  }>;
  menuItems: Array<{
    id: string;
    name: string;
    description: string;
    category: string;
    conversion: number;
    delta: number;
    orders: number;
    revenue: number;
    status: "Low conversion" | "Below potential" | "Watch";
    image: string;
  }>;
}
