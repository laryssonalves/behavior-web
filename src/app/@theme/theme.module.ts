import { ModuleWithProviders, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatRippleModule } from '@angular/material/core'
import {
  NbActionsModule,
  NbButtonModule,
  NbContextMenuModule,
  NbIconModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSelectModule,
  NbSidebarModule,
  NbThemeModule,
  NbUserModule
} from '@nebular/theme'
import { NbEvaIconsModule } from '@nebular/eva-icons'
import { NbSecurityModule } from '@nebular/security'

import {
  FooterComponent,
  HeaderComponent,
  LayoutDirectionSwitcherComponent,
  SearchInputComponent,
  SwitcherComponent
} from './components'
import { CapitalizePipe, NumberWithCommasPipe, PluralPipe, RoundPipe, TimingPipe } from './pipes'
import { OneColumnLayoutComponent, ThreeColumnsLayoutComponent, TwoColumnsLayoutComponent } from './layouts'
import { DEFAULT_THEME } from './styles/theme.default'
import { COSMIC_THEME } from './styles/theme.cosmic'
import { CORPORATE_THEME } from './styles/theme.corporate'
import { DARK_THEME } from './styles/theme.dark'
import { MATERIAL_LIGHT_THEME } from './styles/material/theme.material-light'
import { MATERIAL_DARK_THEME } from './styles/material/theme.material-dark'

const NB_MODULES = [
  NbLayoutModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbContextMenuModule,
  NbSecurityModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbEvaIconsModule
]
const COMPONENTS = [
  SwitcherComponent,
  LayoutDirectionSwitcherComponent,
  HeaderComponent,
  FooterComponent,
  SearchInputComponent,
  OneColumnLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent
]
const PIPES = [
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe
]

@NgModule({
  imports: [ CommonModule, MatRippleModule, ...NB_MODULES ],
  exports: [ CommonModule, MatRippleModule, ...PIPES, ...COMPONENTS ],
  declarations: [ ...COMPONENTS, ...PIPES ]
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders<ThemeModule> {
    return {
      ngModule: ThemeModule,
      providers: [
        ...NbThemeModule.forRoot(
          {
            name: 'beehave'
          },
          [ DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME, DARK_THEME, MATERIAL_LIGHT_THEME, MATERIAL_DARK_THEME ]
        ).providers
      ]
    }
  }
}
