import { Action, createReducer, on } from '@ngrx/store';

import { TasksState, initialTasksState } from './tasks.state';
import * as TasksActions from './tasks.actions';
import { TaskModel } from './../../../tasks/models/task.model';

const reducer = createReducer(
  initialTasksState,
  on(TasksActions.getTasks, (state) => {
    console.log('GET_TASKS action being handled!');
    return {
      ...state,
      loading: true,
    };
  }),

  on(TasksActions.createTask, (state) => {
    console.log('CREATE_TASK action being handled!');
    return { ...state };
  }),

  on(TasksActions.updateTask, (state) => {
    console.log('UPDATE_TASK action being handled!');
    return { ...state };
  }),

  on(TasksActions.deleteTask, (state) => {
    console.log('DELETE_TASK action being handled!');
    return { ...state };
  }),

  on(TasksActions.getTasksSuccess, (state, { tasks }) => {
    console.log('GET_TASKS_SUCCESS action being handled!');
    const data = [...tasks];
    return {
      ...state,
      data,
      loading: false,
      loaded: true,
    };
  }),

  on(
    TasksActions.getTasksError,
    (state, { error }) => {
      console.log('GET_TASKS_ERROR action being handled!');
      return {
        ...state,
        loading: false,
        loaded: false,
        error,
      };
    }
  ),

  on(TasksActions.updateTaskSuccess, (state, { task }) => {
    console.log('UPDATE_TASK_SUCCESS action being handled!');
    const data = [...state.data];

    const index = data.findIndex((t) => t.id === task.id);

    data[index] = { ...task };

    return {
      ...state,
      data,
    };
  }),

  on(
    TasksActions.createTaskError,
    TasksActions.updateTaskError,
    TasksActions.deleteTaskError,
    (state, { error }) => {
    console.log('CREATE/UPDATE/DELETE_TASK_ERROR action being handled!');
    return {
      ...state,
      error,
    };
  }),

  on(TasksActions.createTaskSuccess, (state, { task }) => {
    console.log('CREATE_TASK_SUCCESS action being handled!');
    const data = [...state.data, { ...task }];

    return {
      ...state,
      data
    };
  }),

  on(TasksActions.deleteTaskSuccess, (state, { task }) => {
    console.log('DELETE_TASK_SUCCESS action being handled!');
    const data = state.data.filter(t => t.id !== task.id);

    return {
      ...state,
      data
    };
  }),

);


export function tasksReducer(state: TasksState | undefined, action: Action) {
  return reducer(state, action);
}
