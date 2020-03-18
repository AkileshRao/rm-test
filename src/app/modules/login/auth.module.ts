import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { MaterialModule } from 'src/app/util/material.module';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        LoginComponent,
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
export class AuthModule { }
