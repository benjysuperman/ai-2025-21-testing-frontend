import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {UserService} from './user.service';
import {BACKEND_URL} from '../../main';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private httpClient: HttpClient = inject(HttpClient);
  private translateService: TranslateService = inject(TranslateService);
  private userService: UserService = inject(UserService);

  send(contactForm: any) {
    return this.httpClient
      .post(BACKEND_URL() + this.translateService.currentLang + "/contact", {...contactForm}, {headers: {"Authorization": "Bearer " + this.userService.getToken()}});
  }

}
