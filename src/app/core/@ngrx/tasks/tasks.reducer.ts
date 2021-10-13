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

  on(TasksActions.getTask, (state) => {
    console.log('GET_TASK action being handled!');
    return {
      ...state,
      loading: true,
      loaded: false,
    };
  }),

  on(TasksActions.getTaskSuccess, (state, { task }) => {
    console.log('GET_TASK action being handled!');
    const selectedTask = { ...task };
    return {
      ...state,
      loading: false,
      loaded: true,
      selectedTask,
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

  on(TasksActions.completeTask, (state, { task }) => {
    console.log('COMPLETE_TASK action being handled!');

    const id = task.id;
    const data = state.data.map((t) => {
      if (t.id === id) {
        return { ...task, done: true } as TaskModel;
      }

      return t;
    });

    return {
      ...state,
      data,
    };
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
    TasksActions.getTaskError,
    (state, { error }) => {
      console.log('GET_TASKS/TASK_ERROR action being handled!');
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

  on(TasksActions.updateTaskError, (state, { error }) => {
    console.log('UPDATE_TASK_ERROR action being handled!');
    return {
      ...state,
      error,
    };
  })
);

export function tasksReducer(state: TasksState | undefined, action: Action) {
  return reducer(state, action);
}
