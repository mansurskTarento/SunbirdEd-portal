import { Injectable } from '@angular/core';
import { ConfigService } from '../../shared/services/config/config.service';
import { LearnerService } from '@sunbird/core';

@Injectable({
  providedIn: 'root'
})
export class CompetencyService {

  constructor(
    private learnerService: LearnerService,
    private configService: ConfigService,
    ) {
  }

  getPassbookDetails(reqBody) {
    const options = {
      url: this.configService.urlConFig.URLS.COMPETENCY.READ,
      data: reqBody
    };
    return this.learnerService.post(options)
  }
}
