import {Component, inject, signal, WritableSignal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './components/common/header/header.component';
import {FooterComponent} from './components/common/footer/footer.component';
import {HomeComponent} from './components/home/home.component';
import {TodosComponent} from './components/todos/todos.component';
import {ContactComponent} from './components/contact/contact.component';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {User} from './entities/User';
import {ListenersService} from './services/listeners.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    TodosComponent,
    ContactComponent,
    TranslateModule,
    NgIf
  ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  current_user: User|null;
  private translate: TranslateService = inject(TranslateService);

  constructor() {
    this.current_user = null;
    this.translate.addLangs(['fr', 'nl', 'en']);
    this.translate.setDefaultLang('fr');
    this.translate.use('fr');
  }
}
