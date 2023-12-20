import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-competency-passbook',
  templateUrl: './competency-passbook.component.html',
  styleUrls: ['./competency-passbook.component.scss']
})
export class CompetencyPassbookComponent implements OnInit {
  panelOpenState = false;
  logList=[
    {
      name:'Self Assessment',
      date:'20/20/23',
      level:1
    },
    {
      name:'Self Assessment',
      date:'20/20/23',
      level:2
    }, 
     {
      name:'Self Assessment',
      date:'20/20/23',
      level:3
    },
    {
      name:'Self Assessment',
      date:'20/20/23',
      level:4
    },
    {
      name:'Self Assessment',
      date:'20/20/23',
      level:5
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
