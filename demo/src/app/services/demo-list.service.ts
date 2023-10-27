import { Injectable } from "@angular/core";
import { NthdOverview } from "../shared/overview/overview";

export interface NthdDemoConfig {
  id?: string;
  title: string;
  code?: string;
  markup?: string;
  type: any;
  files?: Array<{ [name: string]: string }>;
  showCode?: boolean;
}

export interface NthdDemoListConfig {
  [demo: string]: NthdDemoConfig;
}

export interface NthdDemoOverviewConfig {
  [anchor: string]: string;
}

@Injectable({providedIn: 'root'})
export class NthdDemoListService {
  private _demos: { [component: string]: NthdDemoListConfig } = {};
  private _overviews: { [component: string]: NthdDemoOverviewConfig } = {};

  public register(component: string, list: NthdDemoListConfig, overview?: NthdDemoOverviewConfig): void {
    this._demos[component] = list;
    if (overview) {
      this._overviews[component] = overview;
    }
  }

  public getDemos(component: string): NthdDemoListConfig|undefined {
    return this._demos[component];
  }

  public getOverviewSections(component: string): NthdOverview {
    const overview = this._overviews[component];
    const sections = {};
    if (overview) {
      Object.keys(overview).forEach((fragment) => {
        sections[fragment] = { fragment, title: overview[fragment] };
      });
    }
    return sections;
  }
}
