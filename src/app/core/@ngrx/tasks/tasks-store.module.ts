import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// @NgRx
import { StoreModule } from '@ngrx/store';
import { tasksReducer } from './tasks.reducer';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('tasks', tasksReducer)
  ]
})
export class TasksStoreModule { }
