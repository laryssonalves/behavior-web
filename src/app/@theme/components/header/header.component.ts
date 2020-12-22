import { Component, OnDestroy, OnInit } from '@angular/core'
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme'
import { LayoutService } from '../../../@core/utils'
import { map, takeUntil } from 'rxjs/operators'
import { Observable, Subject } from 'rxjs'
import { RippleService } from '../../../@core/utils/ripple.service'
import { NbAuthService, NbAuthSimpleToken } from '@nebular/auth'
import { User } from '../../../auth/models/user.model'
import { UserService } from '../../../auth/user.service'
import { GlobalAction } from '../../../action-abstract'
import { SessionStorageService } from '../../../services/session-storage.service'
import { CompanyService } from '../../../pages/company/company.service'

@Component({
  selector: 'ngx-header',
  styleUrls: [ './header.component.scss' ],
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
  userMenu = [ { title: 'Profile' }, { title: 'Log out', link: 'auth/logout' } ]
  private destroy$: Subject<void> = new Subject<void>()

  public constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private rippleService: RippleService,
    private authService: NbAuthService,
    private userService: UserService,
    private sessionStorageService: SessionStorageService,
    private companyService: CompanyService
  ) {
    super()
    this.materialTheme$ = this.themeService.onThemeChange()
    .pipe(map(theme => {
      const themeName: string = theme?.name || ''
      return themeName.startsWith('material')
    }))

    const userSubscription = this.userService.userSubject.subscribe(user => this.user = user)
    const companySubscription = this.companyService.selectedCompanySubject.subscribe(company => {
      this.sessionStorageService.setSelectedCompany(company)
    })

    const tokenSubscription = this.authService.onTokenChange().subscribe((token: NbAuthSimpleToken) => {
      if (token.isValid()) {
        this.userService.getUserDetails()
        this.companyService.getSelectedCompany()
      }
    })

    const subsArr = [ tokenSubscription, userSubscription, companySubscription ]

    subsArr.forEach(sub => this.subscription.add(sub))
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme

    const { xl } = this.breakpointService.getBreakpointsMap()
    this.themeService.onMediaQueryChange()
    .pipe(
      map(([ , currentBreakpoint ]) => currentBreakpoint.width < xl),
      takeUntil(this.destroy$)
    )
    .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl)

    this.themeService.onThemeChange()
    .pipe(
      map(({ name }) => name),
      takeUntil(this.destroy$)
    )
    .subscribe(themeName => {
      this.currentTheme = themeName
      this.rippleService.toggle(themeName?.startsWith('material'))
    })
  }

  ngOnDestroy() {
    super.ngOnDestroy()
    this.destroy$.next()
    this.destroy$.complete()
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName)
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar')
    this.layoutService.changeLayoutSize()

    return false
  }

  navigateHome() {
    this.menuService.navigateHome()
    return false
  }
}
