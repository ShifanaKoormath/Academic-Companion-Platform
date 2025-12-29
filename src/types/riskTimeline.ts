export type RiskSeverity = "Safe" | "Borderline" | "At Risk";

export interface RiskTimelineEvent {
  date: string;
  title: string;
  description: string;
  severity: RiskSeverity;
}
