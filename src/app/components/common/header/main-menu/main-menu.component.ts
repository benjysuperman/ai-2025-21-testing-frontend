import {Component, EventEmitter, inject, Input, signal, WritableSignal} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {NavigationEnd, Router} from '@angular/router';
import {UserService} from '../../../../services/user.service';
import {CommonModule} from '@angular/common';
import {ListenersService} from '../../../../services/listeners.service';

@Component({
  selector: 'app-main-menu',
  imports: [
    TranslatePipe,
    CommonModule
  ],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.css'
})
export class MainMenuComponent {

  private router: Router = inject(Router);
  private userService: UserService = inject(UserService);
  protected current_url: WritableSignal<string>;
  private listenersService: ListenersService = inject(ListenersService);

  constructor() {
    this.current_url = signal(this.getUrl());
    this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd){
        this.current_url.set(this.getUrl());
      }
    });
  }

  private getUrl(){
    let url = "home";
    let rUrl = this.router.url.replace("/", "");
    if(rUrl === "contact"){
      url = "contact";
    } else if(rUrl === "todos"){
      url = "todos";
    }
    return url;
  }

  loadUrl(event: MouseEvent, url:string) {
    event.preventDefault();
    this.router.navigateByUrl(url).then(() => this.current_url.set(this.getUrl()));
    this.listenersService.$urlChanged.emit(true);
  }

  getUser(){
    const user = this.userService.getUser();
    return user ? user : null;
  }
}
