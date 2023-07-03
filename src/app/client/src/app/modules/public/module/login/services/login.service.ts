import { Injectable } from '@angular/core';
import { PublicService } from '@sunbird/core';
import { ConfigService } from '@sunbird/shared';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private publicService: PublicService, public configService: ConfigService,
              ) {
  }



  login(data) {
    const options = {
      url: this.configService.urlConFig.URLS.LOGIN.LOGIN,
      data: data
    };
    return this.publicService.post(options);
  }

}
