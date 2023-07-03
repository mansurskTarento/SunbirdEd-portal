import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentLoginComponent, LoginService } from '../login';
import { LoginRoutingModule } from './login-routing.module';
import { SuiModule } from 'ng2-semantic-ui-v9';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TelemetryModule } from '@sunbird/telemetry';
import { SharedModule } from '@sunbird/shared';
import { SharedFeatureModule } from '@sunbird/shared-feature';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    SuiModule,
    FormsModule,
    ReactiveFormsModule,
    TelemetryModule,
    SharedModule,
    SharedFeatureModule,
  ],
  declarations: [StudentLoginComponent],
  providers: [LoginService]
})
export class LoginModule { }
