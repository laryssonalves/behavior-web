/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { LOCALE_ID, NgModule } from '@angular/core'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { CoreModule } from './@core/core.module'
import { ThemeModule } from './@theme/theme.module'
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { NbDatepickerModule, NbDialogModule, NbMenuModule, NbSidebarModule, NbToastrModule } from '@nebular/theme'
import { NbAuthModule } from '@nebular/auth'
import { appConfig } from './config'
import { AuthTokenInterceptor } from './auth/auth-token.interceptor'
import { ErrorInterceptor } from './interceptors/error.interceptor'

import { registerLocaleData } from '@angular/common'
import localePt from '@angular/common/locales/pt'
import { ModalsModule } from './modals/modals.module'
import { NbMomentDateModule } from '@nebular/moment'

registerLocaleData(localePt)

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ThemeModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbToastrModule.forRoot(),
    CoreModule.forRoot(),
    NbAuthModule.forRoot(appConfig.authOptions),
    ModalsModule,
    NbMomentDateModule
  ],
  bootstrap: [ AppComponent ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'pt' }
  ]
})
export class AppModule {
}
