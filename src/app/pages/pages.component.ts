import { Component, OnInit } from '@angular/core'

import { getMenuItemsByRole, MENU_ITEMS } from './pages-menu'
import { UserService } from './user/user.service'

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `
})
export class PagesComponent implements OnInit {
  menu = MENU_ITEMS

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.userSubject.subscribe(currentUser => {
      this.menu = getMenuItemsByRole(currentUser.person?.role)
    })
  }
}
