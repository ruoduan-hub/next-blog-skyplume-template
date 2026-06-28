export type AnalyticsConfig = {
  plausibleAnalytics?: Record<string, unknown>
  simpleAnalytics?: Record<string, unknown>
  posthogAnalytics?: Record<string, unknown>
  umamiAnalytics?: Record<string, unknown>
  googleAnalytics?: Record<string, unknown>
  clarityAnalytics?: Record<string, unknown>
}

export function Analytics({
  analyticsConfig: _analyticsConfig,
}: {
  analyticsConfig: AnalyticsConfig
}) {
  return null
}
