import { Component, OnInit } from '@angular/core';
import { Project } from '../project.model';
import { ProjectsService } from '../projects.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  project: Project;
  isLoading = false;
  private mode = 'create';
  private projectId: string;

  constructor(
    public projectsService: ProjectsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('projectId')) {
        this.mode = 'edit';
        this.projectId = paramMap.get('projectId');
        this.isLoading = true;
        this.projectsService
          .getProject(this.projectId)
          .subscribe(projectData => {
            this.isLoading = false;
            this.project = {
              id: projectData._id,
              title: projectData.title,
              content: projectData.content,
              creator: projectData.creator
            };
          });
      } else {
        this.mode = 'create';
        this.projectId = null;
      }
    });
  }

  onSaveProject(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.projectsService.addProject(form.value.title, form.value.content);
    } else {
      this.projectsService.updateProject(
        this.projectId,
        form.value.title,
        form.value.content
      );
    }
    form.resetForm();
  }
}
