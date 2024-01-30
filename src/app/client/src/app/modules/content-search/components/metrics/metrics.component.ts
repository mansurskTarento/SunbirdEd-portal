import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss']
})
export class MetricsComponent implements OnInit {

  @Input() metricsList: any[];

  constructor() { }

  ngOnInit(): void {
  }

}
