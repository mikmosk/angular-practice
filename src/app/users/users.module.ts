import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersRoutingModule } from './users-routing.module';
import { UserComponent } from './components';

@NgModule({
  declarations: [UserComponent, UsersRoutingModule.components,],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule
  ]
})

export class UsersModule {

}
