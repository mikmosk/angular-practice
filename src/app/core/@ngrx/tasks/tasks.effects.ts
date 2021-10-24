import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TasksActions from './tasks.actions';

import { Router } from '@angular/router';
import { TaskModel } from '../../../tasks/models/task.model';

import { TaskObservableService } from './../../../tasks/services';
import { getTasks } from './tasks.actions';
// rxjs
import { Observable, of } from 'rxjs';
import {
  switchMap,
  map,
  concatMap,
  takeUntil,
  catchError,
  pluck
} from 'rxjs/operators';

@Injectable()
export class TasksEffects {
  constructor(
    private router: Router,
    private actions$: Actions,
    private taskObservableService: TaskObservableService
  ) {
    console.log('[TASKS EFFECTS]');
  }

  getTasks$: any = createEffect((): any =>
    this.actions$.pipe(
      ofType(TasksActions.getTasks),
      switchMap((action) =>
        this.taskObservableService.getTasks().pipe(
          map((tasks) => TasksActions.getTasksSuccess({ tasks })),
          catchError((error) => of(TasksActions.getTasksError({ error })))
        )
      )
    )
  );

  getTask$: any = createEffect((): any =>
    this.actions$.pipe(
      ofType(TasksActions.getTask),
      map((action) => action.taskID),
      switchMap((taskID) =>
        this.taskObservableService.getTask(taskID).pipe(
          map((task) => TasksActions.getTaskSuccess({ task })),
          catchError((error) => of(TasksActions.getTaskError({ error })))
        )
      )
    )
  );

  updateTask$: any = createEffect((): any  =>
    this.actions$.pipe(
      ofType(TasksActions.updateTask, TasksActions.completeTask),
      map((action) => action.task),
      concatMap((task: TaskModel) =>
        this.taskObservableService.updateTask(task).pipe(
          map(updatedTask => {
            this.router.navigate(['/home', { editedTaskID: updatedTask.id }]);
            return TasksActions.updateTaskSuccess({ task: updatedTask });
          }),
          catchError(error => of(TasksActions.updateTaskError({ error })))
        )
      )
    )
  );

  createTask$: any = createEffect((): any =>
    this.actions$.pipe(
      ofType(TasksActions.createTask),
      pluck('task'),
      concatMap((task: TaskModel) =>
        this.taskObservableService.createTask(task).pipe(
          map(createdTask => {
            this.router.navigate(['/home',  { createdTaskID: createdTask.id }]);
            return TasksActions.createTaskSuccess({ task: createdTask });
          }),
          catchError(error => of(TasksActions.createTaskError({ error })))
        )
      )
    )
  );

  deleteTask$: any = createEffect((): any =>
    this.actions$.pipe(
      ofType(TasksActions.deleteTask),
      pluck('task'),
      concatMap((task: TaskModel) =>
        this.taskObservableService.deleteTask(task).pipe(
          map(() => TasksActions.deleteTaskSuccess({ task })),
          catchError(error => of(TasksActions.deleteTaskError({ error })))
        )
      )
    )
  );

}
