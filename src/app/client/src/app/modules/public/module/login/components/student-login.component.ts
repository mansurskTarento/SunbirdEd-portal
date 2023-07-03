import { Component, OnInit,Input } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import * as _ from 'lodash-es';
import { Subject, Subscription  } from 'rxjs';
import { TelemetryService } from '@sunbird/telemetry';
import { ResourceService, ServerResponse } from '@sunbird/shared';
import { TenantService } from '@sunbird/core';
import { LoginService } from '../../login';
import dayjs from 'dayjs';


@Component({
  selector: 'student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.scss']
})
export class StudentLoginComponent implements OnInit {
  public unsubscribe$ = new Subject<void>();
  tenantDataSubscription: Subscription;
  public studentLoginForm: FormGroup;
  logo: string;
  tenantName: string;
  instance: string;
  
  constructor(
    public resourceService: ResourceService, public telemetryService: TelemetryService,
    public tenantService: TenantService, public loginService: LoginService) { }
  

  ngOnInit(): void {
    this.instance = 'NIRAMAYA';
    this.tenantDataSubscription = this.tenantService.tenantData$.subscribe(
        data => {
          if (data && !data.err) {
            this.logo = data.tenantData.logo;
            this.tenantName = data.tenantData.titleName;
          }
        }
      );
    this.initializeForm();
  }


  initializeForm(): void {
    this.studentLoginForm = new FormGroup({
      enrollmentNumber: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required])
    });
  }

  

  login(){
    const { enrollmentNumber, dob } = this.studentLoginForm.value;
    console.log("Login form details--->", this.studentLoginForm.value);
    const request = {
        'enrollmentNo': enrollmentNumber,
        'dateOfBirth': dayjs(dob).format('YYYY-MM-DD')
    }

    this.loginService.login(request).subscribe(
        (data: ServerResponse ) =>  {
            console.log("Login successful", data);
        },
        (error) => {
            console.log(" Login error", error);
        }
    );
    
  }


  ngOnDestroy() {
    if (this.tenantDataSubscription) {
      this.tenantDataSubscription.unsubscribe();
    }
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
