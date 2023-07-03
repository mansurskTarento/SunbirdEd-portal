import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentLoginComponent } from './components/student-login.component';
const telemetryEnv = 'studentLogin';
import { UUID } from 'angular2-uuid';
const uuid = UUID.UUID();

const routes: Routes = [
  {
    path: '', component: StudentLoginComponent,
    data: {
      hideHeaderNFooter : true,
      telemetry: {
        env: telemetryEnv, pageid: 'studentLogin', uri: '/login',
        type: 'view', mode: 'self', uuid: uuid
      }
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
