import { Task } from './../task.model';
import { TasksService } from './../tasks.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  task: Task;
  isLoading = false;
  private mode = 'create';
  private taskId: string;

  constructor(
    public tasksService: TasksService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('taskId')) {
        this.mode = 'edit';
        this.taskId = paramMap.get('taskId');
        this.isLoading = true;
        this.tasksService.getTask(this.taskId).subscribe(taskData => {
          this.isLoading = false;
          this.task = {
            id: taskData._id,
            title: taskData.title,
            content: taskData.content,
            creator: taskData.creator
          };
        });
      } else {
        this.mode = 'create';
        this.taskId = null;
      }
    });
  }

  onSaveTask(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.tasksService.addTask(form.value.title, form.value.content);
    } else {
      this.tasksService.updateTask(
        this.taskId,
        form.value.title,
        form.value.content
      );
    }
    form.resetForm();
  }
}
