import {Component, inject, input, signal, WritableSignal} from '@angular/core';
import {LangSwitchComponent} from './lang-switch/lang-switch.component';
import {MainMenuComponent} from './main-menu/main-menu.component';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {UserService} from '../../../services/user.service';
import {CommonModule} from '@angular/common';
import {LogoutComponent} from './logout/logout.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    LangSwitchComponent,
    MainMenuComponent,
    TranslatePipe,
    LogoutComponent,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  protected current_language: WritableSignal<string>;
  private translateService = inject(TranslateService);
  private userService = inject(UserService);

  constructor() {
    this.current_language = signal<string>(this.translateService.currentLang);
    this.translateService.onLangChange.subscribe(evt => {
      this.current_language.set(evt.lang);
    });
  }

  getCurrentUser(){
    const user = this.userService.getUser();
    return user ? user.role : null;
  }
}
