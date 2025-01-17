import {Component, inject, signal, WritableSignal} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-lang-switch',
  imports: [],
  templateUrl: './lang-switch.component.html',
  styleUrl: './lang-switch.component.css'
})
export class LangSwitchComponent {

  private translateService = inject(TranslateService);
  protected current_language: WritableSignal<string>;

  constructor() {
    this.current_language = signal<string>(this.translateService.currentLang);
    this.translateService.onLangChange.subscribe(value => this.current_language.set(value.lang));
  }

  switchLang($event: MouseEvent, lang: string) {
    $event.preventDefault();
    if(this.current_language() !== lang)
      this.translateService.use(lang);
  }
}
