import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// @NgRx
import { StoreModule } from '@ngrx/store';
import { TasksStoreModule } from './tasks/tasks-store.module';
import { metaReducers } from './meta-reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from './../../../environments/environment';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(
      {},
      {
        metaReducers,
        // All checks will automatically be disabled in production builds
        runtimeChecks: {
          strictStateImmutability: true, // default value is true
          strictActionImmutability: true, // default value is true
          strictStateSerializability: true, // default value is false
          // TaskModel which is used in Actions is not a plain JavaScript Object
          strictActionSerializability: false,  // default value is false
          strictActionWithinNgZone: true, // default value is false
          strictActionTypeUniqueness: true, // default value is false
        },
      }
    ),
    EffectsModule.forRoot([]),
    TasksStoreModule,
    // Instrumentation must be imported after importing StoreModule (config is optional)
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
})
export class RootStoreModule {}
