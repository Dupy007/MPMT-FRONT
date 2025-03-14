import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {HeaderComponent} from "./component/header/header.component";
import {AuthComponent} from "./component/auth/auth.component";
import {TaskComponent} from "./component/task/task.component";
import {HttpClientModule,HTTP_INTERCEPTORS } from "@angular/common/http";
import {ProjectComponent} from "./component/project/project.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthInterceptor } from './interceptors/auth.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardComponent,
    HeaderComponent,
    ProjectComponent,
    TaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
