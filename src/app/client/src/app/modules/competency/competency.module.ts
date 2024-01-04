import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompetencyRoutingModule } from './competency-routing.module';
import { CompetencyPassbookComponent } from './competency-passbook/competency-passbook.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import { MaterialModule } from '../shared/modules/material/material.module';



@NgModule({
  declarations: [
    CompetencyPassbookComponent
  ],
  imports: [
    CommonModule,
    CompetencyRoutingModule,
    MatExpansionModule,
    MatDividerModule,
    MaterialModule
  ]
})
export class CompetencyModule {
  constructor(){
    console.log('module Load')
  }
 }
