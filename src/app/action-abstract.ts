import { OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'

export abstract class GlobalAction implements OnDestroy {
  subscription: Subscription = new Subscription()

  protected constructor() {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
