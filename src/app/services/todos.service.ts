import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {UserService} from './user.service';
import {Todo} from '../entities/Todo';
import {BACKEND_URL} from '../../main';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  private httpClient: HttpClient = inject(HttpClient);
  private translateService: TranslateService = inject(TranslateService);
  private userService: UserService = inject(UserService);

  getAll() {
    return this.httpClient
      .get(BACKEND_URL() + this.translateService.currentLang + "/todos", {headers: {"Authorization": "Bearer " + this.userService.getToken()}});
  }

  save(todo: Todo) {
    return this.httpClient
      .put(BACKEND_URL() + this.translateService.currentLang + "/todos/" + todo.id, {...todo}, {headers: {"Authorization": "Bearer " + this.userService.getToken()}});
  }

  add(todo: Todo) {
    return this.httpClient
      .post(BACKEND_URL() + this.translateService.currentLang + "/todos", {...todo}, {headers: {"Authorization": "Bearer " + this.userService.getToken()}});
  }

  delete(id: string) {
    return this.httpClient
      .delete(BACKEND_URL() + this.translateService.currentLang + "/todos/" + id, {
        headers: {
          "Authorization": "Bearer " + this.userService.getToken(),
          "Content-Type": "application/json"
        },
        body: {}
      });
  }
}
