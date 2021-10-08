import { Component, OnInit } from '@angular/core';
import { TaskModel } from './../../models/task.model';
import { TaskArrayService } from './../../services/task-array.service';
import { Router } from '@angular/router';
// @Ngrx
import { Store } from '@ngrx/store';
import { AppState, TasksState } from './../../../core/@ngrx';
// rxjs
import { Observable } from 'rxjs';

@Component({
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})

export class TaskListComponent implements OnInit {
  tasksState$!: Observable<TasksState>;
  tasks!: Promise<Array<TaskModel>>;

  constructor(
    private taskArrayService: TaskArrayService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.tasks = this.taskArrayService.getTasks();
    console.log('We have a store! ', this.store);
    this.tasksState$ = this.store.select('tasks');
    this.tasksState$.subscribe(task => console.log(task))
  }

  onCompleteTask(task: TaskModel): void {
    const updatedTask = { ...task, done: true };
    this.taskArrayService.updateTask(updatedTask);
  }

  onEditTask(task: TaskModel): void {
    const link = ['/edit', task.id];
    this.router.navigate(link);
  }
}
