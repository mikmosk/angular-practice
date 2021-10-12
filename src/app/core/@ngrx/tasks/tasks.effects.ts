import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TasksActions from './tasks.actions';
// rxjs
import { Observable, of } from 'rxjs';
import { switchMap, map, takeUntil, catchError } from 'rxjs/operators';

import { TaskObservableService } from './../../../tasks/services';
import { getTasks } from './tasks.actions';

@Injectable()
export class TasksEffects {
  constructor(
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
      map(action => action.taskID),
      switchMap(taskID => this.taskObservableService.getTask(taskID).pipe(
        map((task) => TasksActions.getTaskSuccess({ task })),
        catchError((error) => of(TasksActions.getTaskError({ error })))
        )
      )
    )
  );

}
