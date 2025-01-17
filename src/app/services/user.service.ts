import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {User} from '../entities/User';
import {HttpClient} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {jwtDecode} from 'jwt-decode';
import {BACKEND_URL} from '../../main';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private current_user: WritableSignal<User | null>;
  private httpClient: HttpClient = inject(HttpClient);
  private translateService: TranslateService = inject(TranslateService);

  constructor() {
    this.current_user = signal(null);
  }

  loginByUsernameAndPassword(username: string, password: string) {
    return this.httpClient
      .post(BACKEND_URL() + this.translateService.currentLang + "/login", {"username": username, "password": password});
  }

  getToken() {
    return localStorage.getItem("todo-token");
  }

  logout() {
    this.current_user.set(null);
    localStorage.removeItem("todo-token");
  }

  getUser() {
    let token = localStorage.getItem("todo-token");
    let user: User | undefined = undefined;
    if (token) {
      const sub = jwtDecode(token).sub as unknown as { role: string, username: string };
      user = new User();
      user.username = sub.username;
      user.role = sub.role;
    }
    return !user ? null : user;
  }
}
