import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListenersService {

  $urlChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

}
