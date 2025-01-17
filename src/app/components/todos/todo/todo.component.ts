import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Todo} from '../../../entities/Todo';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-todo',
  imports: [
    CommonModule
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {

  @Input({required: true})
  public todo: Todo;

  @Input({required: true})
  public deleteEmitter: EventEmitter<string>;

  @Input({required: true})
  public editEmitter: EventEmitter<string>;

  @Input({required: true})
  public doneEmitter: EventEmitter<string>;


  delete(event: MouseEvent, id: string) {
    event.preventDefault();
    this.deleteEmitter.emit(id);
  }

  edit(id:string){
    this.editEmitter.emit(id);
  }

  done(event: Event, id: string) {
    this.doneEmitter.emit(id);
  }
}
