import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { Project } from "./project.model";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class ProjectsService {
  private projects: Project[] = [];
  private projectsUpdated = new Subject<Project[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getProjects() {
    this.http
      .get<{ message: string; projects: any }>("http://localhost:3000/projects")
      // convert data from the server before using it in subscribe
      .pipe(
        map(projectData => {
          return projectData.projects.map(project => {
            return {
              title: project.title,
              id: project._id,
              content: project.content,
              creator: project.creator
            };
          });
        })
      )
      .subscribe(projects => {
        this.projects = projects;
        this.projectsUpdated.next([...this.projects]);
      });
  }

  getProjectUpdateListener() {
    return this.projectsUpdated.asObservable();
  }

  getProject(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      creator: string;
    }>("http://localhost:3000/projects/" + id);
  }

  addProject(title: string, content: string) {
    const project: Project = { id: null, title, content, creator: null };
    this.http
      .post<{ message: string; projectId: string }>(
        "http://localhost:3000/projects",
        project
      )
      .subscribe(responseData => {
        const id = responseData.projectId;
        project.id = id;
        this.projects.push(project);
        this.projectsUpdated.next([...this.projects]);
        this.router.navigate(["/sprint-ongoing"]);
      });
  }
  updateProject(id: string, title: string, content: string) {
    const project: Project = { id, title, content, creator: null };
    this.http
      .put("http://localhost:3000/projects/" + id, project)
      .subscribe(response => {
        const updatedProjects = [...this.projects];
        const oldProjectIndex = updatedProjects.findIndex(t => t.id === id);
        updatedProjects[oldProjectIndex] = project;
        this.projects = updatedProjects;
        this.projectsUpdated.next([...this.projects]);
        this.router.navigate(["/project-create"]);
      });
  }

  deleteProject(projectId: string) {
    this.http
      .delete("http://localhost:3000/projects/" + projectId)
      .subscribe(() => {
        console.log(projectId);
        const updatedProjects = this.projects.filter(
          project => project.id !== projectId
        );
        this.projects = updatedProjects;
        this.projectsUpdated.next([...this.projects]);
      });
  }
}
