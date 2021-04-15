import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabService {
  private currentTab$ = new ReplaySubject<any>()

  constructor() { }

  setCurrentTab(currentTab: any) {
    this.currentTab$.next(currentTab)
  }

  getCurrentTab(): ReplaySubject<any> {
    return this.currentTab$
  }
}
