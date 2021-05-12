import { Component, OnDestroy, OnInit } from '@angular/core';
import { GlobalAction } from '../../action-abstract';
import { TabService } from '../../services/tab.service';
import { User } from './user/user.model';
import { UserService } from './user/user.service';

@Component({
  selector: 'ngx-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent extends GlobalAction implements OnInit, OnDestroy {
  private currentTab: any

  user: User
  isLoading = false

  constructor(private tabService: TabService, private userService: UserService) { super() }

  ngOnInit(): void {
    const tabSubscription = this.tabService.getCurrentTab().subscribe(tab => {
      this.currentTab = tab
    })

    const userSubscription = this.userService.userSubject.subscribe(user => (this.user = user))

    this.subscription.add(tabSubscription)
    this.subscription.add(userSubscription)
  }

  ngOnDestroy(): void {
    super.ngOnDestroy()
  }

  isTabActive(tab: any): boolean {
    return this.currentTab === tab
  }

  onChangeTab(event: any): void {
    this.tabService.setCurrentTab(event.tabId)
  }

  checkUserPerm(perm: string) {
    return this.user?.hasPerms([perm])
  }
}
