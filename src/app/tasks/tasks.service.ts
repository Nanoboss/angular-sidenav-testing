import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { Task } from "./task.model";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class TasksService {
  private tasks: Task[] = [];
  private tasksUpdated = new Subject<Task[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getTasks() {
    this.http
      .get<{ message: string; tasks: any }>("http://localhost:3000/tasks")
      // convert data from the server before using it in subscribe
      .pipe(
        map(taskData => {
          return taskData.tasks.map(task => {
            return {
              title: task.title,
              content: task.content,
              id: task._id,
              creator: task.creator
            };
          });
        })
      )
      .subscribe(tasks => {
        console.log(tasks);
        this.tasks = tasks;
        this.tasksUpdated.next([...this.tasks]);
      });
  }

  getTaskUpdateListener() {
    return this.tasksUpdated.asObservable();
  }

  getTask(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      creator: string;
    }>("http://localhost:3000/tasks/" + id);
  }

  addTask(title: string, content: string) {
    const task: Task = { id: null, title, content, creator: null };
    this.http
      .post<{ message: string; taskId: string }>(
        "http://localhost:3000/tasks",
        task
      )
      .subscribe(responseData => {
        const id = responseData.taskId;
        task.id = id;
        // if successfully added to the server, add the taks to the local task array
        this.tasks.push(task);
        this.tasksUpdated.next([...this.tasks]);
        this.router.navigate(["/list"]);
      });
  }
  updateTask(id: string, title: string, content: string) {
    const task: Task = { id, title, content, creator: null };
    this.http
      .put("http://localhost:3000/tasks/" + id, task)
      .subscribe(response => {
        const updatedTasks = [...this.tasks];
        const oldTaskIndex = updatedTasks.findIndex(t => t.id === id);
        updatedTasks[oldTaskIndex] = task;
        this.tasks = updatedTasks;
        this.tasksUpdated.next([...this.tasks]);
        this.router.navigate(["/create"]);
      });
  }

  deleteTask(taskId: string) {
    this.http.delete("http://localhost:3000/tasks/" + taskId).subscribe(() => {
      console.log(taskId);
      const updatedTasks = this.tasks.filter(task => task.id !== taskId);
      this.tasks = updatedTasks;
      this.tasksUpdated.next([...this.tasks]);
    });
  }
}
