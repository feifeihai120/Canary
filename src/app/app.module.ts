import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { HttpModule } from '@angular/http'

// storage
import { Ng2Webstorage } from 'ng2-webstorage';
// cookie
import { CookieService } from 'angular2-cookie/services/cookies.service';

// ng2-bootstrap
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';

// primeng
import { SharedModule } from 'primeng/primeng';

// shared
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
// import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';

// Routing Module
import { AppRoutingModule } from './app.routing';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component'
import { RunMeetingLayoutComponent } from './layouts/run-meeting-layout.component'
import { LookMeetingLayoutComponent } from './layouts/look-material-layout.component'

// 自定义 组件
import { AppComponent } from './app.component';
import { RegisterComponent } from './pages/register.component'
import { LoginComponent } from './pages/login.component'

// service
import { UserService } from './service/user.service'
import { HttpService } from './service/http.service'

@NgModule({
  imports: [
    BrowserModule,
    DropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    FormsModule,
    HttpModule,
    RouterModule,
    AppRoutingModule,
    Ng2Webstorage,
    SharedModule
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    SimpleLayoutComponent,
    RunMeetingLayoutComponent,
    LookMeetingLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    // AsideToggleDirective,
    RegisterComponent,
    LoginComponent,
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },
    UserService,
    CookieService,
    HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
