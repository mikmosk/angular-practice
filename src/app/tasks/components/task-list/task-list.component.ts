import { Component, OnInit } from '@angular/core';
import { TaskModel } from './../../models/task.model';
import { TaskArrayService } from './../../services/';
import { Router } from '@angular/router';
// @Ngrx
import { Store } from '@ngrx/store';
import { AppState, TasksState } from './../../../core/@ngrx';
// rxjs
import { Observable } from 'rxjs';
import * as TasksActions from './../../../core/@ngrx/tasks/tasks.actions';

@Component({
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})

export class TaskListComponent implements OnInit {
  tasksState$!: Observable<TasksState>;

  constructor(
    private router: Router,
    private store: Store<AppState>,
  ) {}

  ngOnInit(): void {
    console.log('We have a store! ', this.store);
    this.tasksState$ = this.store.select('tasks');
    this.store.dispatch(TasksActions.getTasks())
    this.tasksState$.subscribe(task => console.log(task))
  }

  onCompleteTask(task: TaskModel): void {
    this.store.dispatch(TasksActions.completeTask({ task }));
  }

  onEditTask(task: TaskModel): void {
    const link = ['/edit', task.id];
    this.router.navigate(link);
  }
}
