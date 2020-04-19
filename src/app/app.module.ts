import { from } from 'rxjs';

import { AuthInterceptor } from './auth/auth-interceptor';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MyMaterialModule } from './material.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { TaskCreateComponent } from './tasks/task-create/task-create.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { ProjectCreateComponent } from './projects/project-create/project-create.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { SprintCreateComponent } from './sprints/sprint-create/sprint-create.component';
import { SprintOngoingComponent } from './sprints/sprint-ongoing/sprint-ongoing.component';

import { GridResponsiveDirective } from './layout//directives/grid-responsive.directive';


@NgModule({
	declarations: [
		AppComponent,
		ToolbarComponent,
		HomepageComponent,
		FooterComponent,
		SignupComponent,
		LoginComponent,
		SidenavComponent,
		ProjectListComponent,
		TaskCreateComponent,
		TaskListComponent,
		ProjectCreateComponent,
		GridResponsiveDirective,
		SprintCreateComponent,
    SprintOngoingComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		MyMaterialModule,
		HttpClientModule,
		LayoutModule,
    FlexLayoutModule,
    DragDropModule
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
