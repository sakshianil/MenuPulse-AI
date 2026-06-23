import type { DashboardPayload, Recommendation } from "@menupulse/shared";

export const fallbackDashboard: DashboardPayload = {
  restaurant: { id: "11111111-1111-4111-8111-111111111111", name: "Lisbon Kitchen", city: "Lisbon" },
  period: { current: "May 5 – May 11, 2025", comparison: "Apr 28 – May 4, 2025" },
  kpis: [
    { key: "revenue", label: "Revenue", value: "€28,430", delta: 12.6 },
    { key: "orders", label: "Orders", value: "1,162", delta: 9.3 },
    { key: "basket", label: "Average basket", value: "€24.45", delta: 3.0 },
    { key: "conversion", label: "Conversion", value: "6.21%", delta: -0.4, suffix: "pp" }
  ],
  revenueSeries: [
    { day: "Mon", current: 2860, previous: 2070 }, { day: "Tue", current: 3900, previous: 3180 },
    { day: "Wed", current: 3400, previous: 2740 }, { day: "Thu", current: 4080, previous: 3360 },
    { day: "Fri", current: 5900, previous: 4580 }, { day: "Sat", current: 4810, previous: 3610 },
    { day: "Sun", current: 3180, previous: 2260 }
  ],
  channels: [
    { name: "Uber Eats-style", revenue: 18246, delta: 13.8, orders: 742, conversion: 6.31, averageBasket: 24.58 },
    { name: "Glovo-style", revenue: 8312, delta: 9.4, orders: 356, conversion: 5.98, averageBasket: 23.37 },
    { name: "Own direct", revenue: 1872, delta: 5.1, orders: 64, conversion: 11.02, averageBasket: 29.25 }
  ],
  opportunities: [
    { rank: 1, title: 'Add "Grilled Octopus" to featured section', subtitle: "Lift conversion on seafood seekers", impact: 1240, confidence: "High" },
    { rank: 2, title: "Reduce delivery fee threshold to €18", subtitle: "Increase order frequency", impact: 960, confidence: "High" },
    { rank: 3, title: 'Bundle "Bacalhau + Drink"', subtitle: "Increase average basket", impact: 780, confidence: "Medium" },
    { rank: 4, title: "Improve photos for 6 underperforming items", subtitle: "Lift conversion", impact: 520, confidence: "Medium" },
    { rank: 5, title: "Promote on Fri–Sat 18:00–21:00", subtitle: "Capture peak demand", impact: 410, confidence: "Low" }
  ],
  menuItems: [
    { id: "1", name: "Grilled Octopus", description: "Polvo Grelhado", category: "Seafood", conversion: 2.14, delta: -0.78, orders: 28, revenue: 672, status: "Low conversion", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=160&q=80" },
    { id: "2", name: "Bacalhau à Brás", description: "Codfish with potatoes & egg", category: "Portuguese Classics", conversion: 2.38, delta: -0.41, orders: 31, revenue: 804, status: "Below potential", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=160&q=80" },
    { id: "3", name: "Prego no Pão", description: "Steak sandwich", category: "Sandwiches", conversion: 1.62, delta: -0.66, orders: 19, revenue: 418, status: "Low conversion", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=160&q=80" },
    { id: "4", name: "Pastel de Nata (2x)", description: "Custard tarts", category: "Desserts", conversion: 4.91, delta: 0.32, orders: 74, revenue: 592, status: "Watch", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=160&q=80" },
    { id: "5", name: "Salada de Polvo", description: "Octopus salad", category: "Salads", conversion: 1.47, delta: -0.59, orders: 16, revenue: 304, status: "Low conversion", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=160&q=80" }
  ]
};

export const fallbackRecommendation: Recommendation = {
  title: "Reduce delivery fee threshold to €18",
  summary: "Lowering the free-delivery threshold from €20 to €18 should recover conversion by reducing cart abandonment while preserving a healthy contribution margin.",
  expectedImpact: { amount: 960, unit: "EUR_PER_WEEK", explanation: "+0.35 percentage-point conversion lift" },
  confidence: 0.78,
  evidence: [
    { label: "Cart abandonment in the €18–€20 range", value: "23%" },
    { label: "Average competitor threshold", value: "€16" },
    { label: "Previous threshold test lift", value: "+0.32pp" }
  ],
  risks: ["Estimated fee subsidy may increase by approximately €120 per week."],
  experiment: {
    hypothesis: "Reducing the threshold to €18 increases completed orders without reducing contribution margin by more than 2%.",
    durationDays: 7,
    primaryMetric: "Checkout conversion",
    guardrailMetric: "Contribution margin per order"
  }
};
