import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompetencyRoutingModule } from './competency-routing.module';
import { CompetencyPassbookComponent } from './competency-passbook/competency-passbook.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';



@NgModule({
  declarations: [
    CompetencyPassbookComponent
  ],
  imports: [
    CommonModule,
    CompetencyRoutingModule,
    MatExpansionModule,
    MatDividerModule
  ]
})
export class CompetencyModule {
  constructor(){
    console.log('module Load')
  }
 }
