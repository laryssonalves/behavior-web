import { Component, OnDestroy, OnInit } from '@angular/core'
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme'
import { LayoutService } from '../../../@core/utils'
import { map, takeUntil } from 'rxjs/operators'
import { Observable, Subject } from 'rxjs'
import { RippleService } from '../../../@core/utils/ripple.service'

import { UserService } from '../../../pages/security/user/user.service'
import { GlobalAction } from '../../../action-abstract'

import { CompanyService } from '../../../pages/company/company.service'
import { Router } from '@angular/router'
import { User } from '../../../pages/security/user/user.model'
import { AuthService } from '../../../auth/auth.service'
import { AuthToken } from '../../../auth/interfaces/token'

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html'
})
export class HeaderComponent extends GlobalAction implements OnInit, OnDestroy {
  public readonly materialTheme$: Observable<boolean>
  userPictureOnly: boolean = false
  user: User
  themes = [
    {
      value: 'default',
      name: 'Light'
    },
    {
      value: 'dark',
      name: 'Dark'
    },
    {
      value: 'cosmic',
      name: 'Cosmic'
    },
    {
      value: 'corporate',
      name: 'Corporate'
    },
    {
      value: 'material-light',
      name: 'Material Light'
    },
    {
      value: 'material-dark',
      name: 'Material Dark'
    }
  ]
  currentTheme = 'default'
  userMenu = [{ title: 'Perfil' }, { title: 'Log out', link: 'auth/logout' }]
  private destroy$: Subject<void> = new Subject<void>()

  public constructor(
    private nbSidebarService: NbSidebarService,
    private nbMenuService: NbMenuService,
    private nbThemeService: NbThemeService,
    private layoutService: LayoutService,
    private nbBreakpointService: NbMediaBreakpointsService,
    private rippleService: RippleService,
    private authService: AuthService,
    private userService: UserService,
    private companyService: CompanyService,
    private router: Router
  ) {
    super()
    this.materialTheme$ = this.nbThemeService.onThemeChange().pipe(
      map(theme => {
        const themeName: string = theme?.name || ''
        return themeName.startsWith('material')
      })
    )

    const userSubscription = this.userService.userSubject.subscribe(user => (this.user = user))
    const tokenSubscription = this.authService.onTokenChange.subscribe((token: AuthToken) => {
      if (token.isValid()) {
        this.userService.getUserDetails()
        this.companyService.getSelectedCompany()
      } else {
        this.router.navigateByUrl('auth/logout')
      }
    })

    const subsArr = [tokenSubscription, userSubscription]

    subsArr.forEach(sub => this.subscription.add(sub))
  }

  ngOnInit() {
    this.currentTheme = this.nbThemeService.currentTheme

    const { xl } = this.nbBreakpointService.getBreakpointsMap()
    this.nbThemeService
      .onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$)
      )
      .subscribe((isLessThanXl: boolean) => (this.userPictureOnly = isLessThanXl))

    this.nbThemeService
      .onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$)
      )
      .subscribe(themeName => {
        this.currentTheme = themeName
        this.rippleService.toggle(themeName?.startsWith('material'))
      })

    this.authService.refreshToken()
  }

  ngOnDestroy() {
    super.ngOnDestroy()
    this.destroy$.next()
    this.destroy$.complete()
  }

  changeTheme(themeName: string) {
    this.nbThemeService.changeTheme(themeName)
  }

  toggleSidebar(): boolean {
    this.nbSidebarService.toggle(true, 'menu-sidebar')
    this.layoutService.changeLayoutSize()

    return false
  }

  navigateHome() {
    this.nbMenuService.navigateHome()
    return false
  }
}
