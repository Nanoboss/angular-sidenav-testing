import { SprintCreateComponent } from './sprints/sprint-create/sprint-create.component';
import { SprintOngoingComponent } from './sprints/sprint-ongoing/sprint-ongoing.component';
import { AuthGuard } from './auth/auth.guard';

import { TaskListComponent } from './tasks/task-list/task-list.component';
import { TaskCreateComponent } from './tasks/task-create/task-create.component';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectCreateComponent } from './projects/project-create/project-create.component';

// path empty means landing page
const routes: Routes = [
	{ path: '', redirectTo: '/', pathMatch: 'full' },

	{ path: 'signup', component: SignupComponent },
	{ path: 'login', component: LoginComponent },

	{ path: 'list', component: TaskListComponent, canActivate: [AuthGuard] },
	{ path: 'create', component: TaskCreateComponent, canActivate: [AuthGuard] },
	{
		path: 'edit/:taskId',
		component: TaskCreateComponent,
		canActivate: [AuthGuard]
	},

	{
		path: 'project-list',
		component: ProjectListComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'project-create',
		component: ProjectCreateComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'sprint-ongoing',
		component: SprintOngoingComponent,

	},
	{
		path: 'sprint-create',
		component: SprintCreateComponent,
		canActivate: [AuthGuard]
	},
	{ path: '', component: HomepageComponent }
];
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [AuthGuard]
})
export class AppRoutingModule {}
