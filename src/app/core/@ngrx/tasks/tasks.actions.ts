import { createAction, props } from '@ngrx/store';

import { TaskModel } from './../../../tasks/models/task.model';

export const getTasks = createAction('[Task List Page (App)] GET_TASKS');

export const getTask = createAction(
  '[Add/Edit Task Page (App)] GET_TASK',
  props<{ taskID: number }>()
);

export const createTask = createAction(
  '[Task Form Page] CREATE_TASK',
  props<{ task: TaskModel }>()
);

export const updateTask = createAction(
  '[Task Form Page] UPDATE_TASK',
  props<{ task: TaskModel }>()
);

export const completeTask = createAction(
  '[Task List Page] COMPLETE_TASK',
  props<{ task: TaskModel }>()
);

export const deleteTask = createAction(
  '[Task List Page] DELETE_TASK',
  props<{ task: TaskModel }>()
);

export const getTasksSuccess = createAction(
  '[Get Tasks Effect] GET_TASKS_SUCCEESS',
  props<{ tasks: TaskModel[] }>()
);

export const getTasksError = createAction(
  '[Get Tasks Effect] GET_TASKS_ERROR',
  props<{ error: Error | string | null }>()
);

export const getTaskSuccess = createAction(
  '[Get Task Effect] GET_TASK_SUCCESS',
  props<{ task: TaskModel }>()
);

export const getTaskError = createAction(
  '[Get Task Effect] GET_TASK_ERROR',
  props<{ error: Error | string | null }>()
);

export const updateTaskSuccess = createAction(
  '[Update Task Effect] UPDATE_TASK_SUCCESS',
  props<{ task: TaskModel }>()
);

export const updateTaskError = createAction(
  '[Update Task Effect] UPDATE_TASK_ERROR',
  props<{ error: Error | string | null }>()
);

export const createTaskSuccess = createAction(
  '[Create Task Effect] CREATE_TASK_SUCCESS',
  props<{ task: TaskModel }>()
);

export const createTaskError = createAction(
  '[Create Task Effect] CREATE_TASK_ERROR',
  props<{ error: Error | string }>()
);

export const deleteTaskSuccess = createAction(
  '[Delete Task Effect] DELETE_TASK_SUCCESS',
  props<{ task: TaskModel }>()
);

export const deleteTaskError = createAction(
  '[Delete Task Effect] DELETE_TASK_ERROR',
  props<{ error: Error | string | null }>()
);

export function TaskListComponentIsDestroyed(TaskListComponentIsDestroyed: any): import("rxjs").OperatorFunction<import("@ngrx/store").Action, any> {
  throw new Error('Function not implemented.');
}
