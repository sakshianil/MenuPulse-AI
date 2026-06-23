import { describe, expect, it } from "vitest";
import { recommendationSchema } from "@menupulse/shared";
import { fallbackDashboard, fallbackRecommendation } from "./fallback";

describe("portfolio fixtures", () => {
  it("keeps the dashboard internally consistent", () => {
    const channelRevenue = fallbackDashboard.channels.reduce((total, channel) => total + channel.revenue, 0);
    expect(channelRevenue).toBe(28430);
    expect(fallbackDashboard.revenueSeries).toHaveLength(7);
  });

  it("ships a schema-valid safe fallback recommendation", () => {
    expect(recommendationSchema.safeParse(fallbackRecommendation).success).toBe(true);
  });
});
