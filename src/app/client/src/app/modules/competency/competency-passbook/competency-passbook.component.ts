import { Component, OnInit } from '@angular/core';
import { CompetencyService } from '../services/competency.service';
import { HttpErrorResponse } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as _ from 'lodash-es'
import { CourseBatchService } from '../../learn/services/course-batch/course-batch.service';

@Component({
  selector: 'app-competency-passbook',
  templateUrl: './competency-passbook.component.html',
  styleUrls: ['./competency-passbook.component.scss']
})
export class CompetencyPassbookComponent implements OnInit {
  panelOpenState = false;
  passbookDetails = [];
  selectedProficiencyIndex = -1;
  selectedDisplayLevel = -1;
  constructor(
    private competencyService: CompetencyService,
    private courseBatchService: CourseBatchService,
  ) { }

  ngOnInit(): void {
    this.getPassbookDetails();
  }

  getPassbookDetails() {
    const reqBody = {
      "request": {
        "typeName": "competency"
      }
    }
    this.competencyService.getPassbookDetails(reqBody)
    .pipe(mergeMap((response: any) => {
      return this.formatePassbookData(response.result.content);
    }))
    .subscribe ({
      next: (response) => {
        this.passbookDetails = response;
        console.log('passbook response', response);
      },
      error: (error: HttpErrorResponse) => {
        console.log('error', error.error.params.errmsg)
      }
    })
  }

  formatePassbookData(response: any) {
    const formatedData = [];
    if(response) {
      response.forEach((element) => {
        const competenciesList = element.competencies ? element.competencies : {};
        const keys = Object.keys(competenciesList);
        keys.forEach((key) => {
          const acquiredDetails = _.get(competenciesList[key], 'acquiredDetails');
          const passbook = {
            title: _.get(competenciesList[key],'additionalParams.competencyName'),
            logs: this.passBookLogs(acquiredDetails),
            proficiencyLevels: this.formateLevelColors(acquiredDetails),
          }
          formatedData.push(passbook);
        })
      })
    }
    return of(formatedData);
  }

  passBookLogs(acquiredDetails) {
    let response  = []
    if(acquiredDetails.length>0){
      _.forEach(acquiredDetails,(value:any)=>{
          response.push({
            header: _.get(value, 'acquiredChannel'),
            date:  _.get(value,'createdDate'),
            description: _.get(value, 'additionalParams.description'),
            keyboardArrowUp: true,
            level: _.toNumber(_.get(value,'competencyLevelId'))
          })
      })
    }
   return response
  }

  formateLevelColors(acquiredDetails:any){
    let response  = [
     {
       'color': '#FFFBB0',
       'displayLevel': 1,
       'selected': false,
     },
     {
       'color': '#FFFBB0',
       'displayLevel': 2,
       'selected': false,
     },
     {
       'color': '#FFFBB0',
       'displayLevel': 3,
       'selected': false,
     },
     {
       'color': '#FFFBB0',
       'displayLevel': 4,
       'selected': false,
     },
     {
       'color': '#FFFBB0',
       'displayLevel': 5,
       'selected': false,
     }
    ]
   
   _.forEach(acquiredDetails,(value:any)=>{
       const channel = _.get(value,'acquiredChannel')
       switch(channel) {
         case 'course':{
           _.forEach(response, (level:any)=>{
             if(level.displayLevel == _.get(value,'competencyLevelId')){
               level.color = '#FFFBB0';
               level.selected = true
             }
           } )
           
           break; 
         }
         case 'Course':{
          _.forEach(response, (level:any)=>{
            if(level.displayLevel == _.get(value,'competencyLevelId')){
              level.color = '#FFFBB0';
              level.selected = true
            }
          } )
          
          break; 
        }
         case 'selfAssessment':{
           _.forEach(response, (level:any)=>{
             if(level.displayLevel == _.get(value,'competencyLevelId')){
               level.color = '#A4DFCA';
               level.selected = true
               
             }
           } )
         
           break; 
         }
         case 'admin':{
           _.forEach(response, (level:any)=>{
             if(level.displayLevel == _.get(value,'competencyLevelId')){
               level.color = '#7cb5e6';
               level.selected = true
             }
           } )
           
           break; 
         }
         default: { 
           _.forEach(response, (level:any)=>{
             if(level.displayLevel == _.get(value,'competencyLevelId')){
               level.color = '#FFFBB0';
               level.selected = false;
             }
           } )
           
           break; 
         }
       }
   })
   return response
 }

  selectLevel(selectedProficiencyIndex, selectedDisplayLevel) {
    if ((selectedProficiencyIndex === this.selectedProficiencyIndex) && (selectedDisplayLevel === -1 ||
      selectedDisplayLevel === this.selectedDisplayLevel)) {
      this.selectedProficiencyIndex = -1
    } else {
      this.selectedProficiencyIndex = selectedProficiencyIndex
    }
    this.selectedDisplayLevel = selectedDisplayLevel
  }

}
