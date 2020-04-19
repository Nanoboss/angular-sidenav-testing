import { GridResponsiveDirective } from './../../layout/directives/grid-responsive.directive';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from './../project.model';
import { ProjectsService } from './../projects.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit, OnDestroy {
  projects: Project[] = [];
  private projectsSub: Subscription;
  isLoading = false;

  userIsAuthenticated = false;
  private authStatusSub: Subscription;

  constructor(
    public projectsService: ProjectsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.projectsService.getProjects();
    this.projectsSub = this.projectsService
      .getProjectUpdateListener()
      .subscribe((projects: Project[]) => {
        this.isLoading = false;
        this.projects = projects;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onDelete(projectId: string) {
    this.projectsService.deleteProject(projectId);
  }

  ngOnDestroy() {
    this.projectsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
