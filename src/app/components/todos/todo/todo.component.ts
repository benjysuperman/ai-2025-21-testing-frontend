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
  public deleteEmitter: EventEmitter<number>;

  @Input({required: true})
  public editEmitter: EventEmitter<number>;

  @Input({required: true})
  public doneEmitter: EventEmitter<number>;


  delete(event: MouseEvent, id: number) {
    event.preventDefault();
    this.deleteEmitter.emit(id);
  }

  edit(id:number){
    this.editEmitter.emit(id);
  }

  done(event: Event, id: number) {
    this.doneEmitter.emit(id);
  }
}
