import { AuthService } from './../../auth/auth.service';
import { Task } from './../task.model';
import { TasksService } from './../tasks.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  private tasksSub: Subscription;
  isLoading = false;
  userId: string;

  constructor(
    public tasksService: TasksService,
    private authservice: AuthService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.tasksService.getTasks();
    this.userId = this.authservice.getUserId();
    this.tasksSub = this.tasksService
      .getTaskUpdateListener()
      .subscribe((tasks: Task[]) => {
        this.isLoading = false;
        this.tasks = tasks;
        this.userId = this.authservice.getUserId();
      });
  }

  onDelete(taskId: string) {
    this.tasksService.deleteTask(taskId);
  }

  ngOnDestroy() {
    this.tasksSub.unsubscribe();
  }
}
