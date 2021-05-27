import { Component, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'

@Component({
  template: ''
})
export abstract class GlobalAction implements OnDestroy {
  subscription: Subscription = new Subscription()

  protected constructor() {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
