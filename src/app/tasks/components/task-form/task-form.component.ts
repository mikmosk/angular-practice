import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskModel } from './../../models/task.model';
import { TaskArrayService } from './../../services/task-array.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
// rxjs
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
// @NgRx
import { Store } from '@ngrx/store';
import { AppState, TasksState } from './../../../core/@ngrx';
import * as TasksActions from './../../../core/@ngrx/tasks/tasks.actions';

@Component({
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent implements OnInit, OnDestroy {
  task!: TaskModel;
  private componentDestroyed$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    let observer: any = {
      next: (tasksState: TasksState) => {
        if (tasksState.selectedTask) {
          this.task = {...tasksState.selectedTask} as TaskModel;
        } else {
          this.task = new TaskModel();
        }
      },
      error(err: any) {
        console.log(err);
      },
      complete() {
        console.log('Stream is completed');
      },
    };

    this.store
      .select('tasks')
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(observer);

    observer = {
      ...observer,
      next: (params: ParamMap) => {
        const id = params.get('taskID');
        if (id) {
          this.store.dispatch(TasksActions.getTask({ taskID: +id }));
        }
      },
    };

    this.route.paramMap.subscribe(observer);
  }

  onSaveTask(): void {
    const task = { ...this.task } as TaskModel;
    if (task.id) {
      this.store.dispatch(TasksActions.updateTask({ task }));
    } else {
      this.store.dispatch(TasksActions.createTask({ task }));
    }

    this.onGoBack();
  }

  onGoBack(): void {
    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}
