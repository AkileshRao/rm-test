import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { MaterialModule } from 'src/app/util/material.module';

@NgModule({
  declarations: [
    UsersComponent,
  ],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: []
})
export class UsersModule { }
