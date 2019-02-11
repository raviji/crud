import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
// import { PagesModule } from '../pages/pages.module';

const sharedModules: any[] = [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    // PagesModule
];

@NgModule({
    imports: sharedModules,
    exports: sharedModules,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class SharedModule { }
