export interface NthdOverviewSection {
  title: string | boolean;
  fragment: string;
}

export interface NthdOverview {
  [fragment: string]: NthdOverviewSection;
}
