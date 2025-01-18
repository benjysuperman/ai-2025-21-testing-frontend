import {Component, EventEmitter, inject, signal, WritableSignal} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {TodosService} from '../../services/todos.service';
import {Todo} from '../../entities/Todo';
import {catchError, throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {FeedBackMessage} from '../../entities/FeedBackMessage';
import {CommonModule} from '@angular/common';
import {FeedbackMessagesComponent} from '../common/feedback-messages/feedback-messages.component';
import {TodoComponent} from './todo/todo.component';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-todos',
  imports: [
    TranslatePipe,
    FeedbackMessagesComponent,
    CommonModule,
    TodoComponent,
    ReactiveFormsModule
  ],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent {

  private todosService: TodosService = inject(TodosService);
  private formBuilder: FormBuilder = inject(FormBuilder);
  protected todos: WritableSignal<Todo[]|null> = signal(null);
  protected feedback_messages: FeedBackMessage[]|null;
  protected $deleteObserver: EventEmitter<string> = new EventEmitter<string>();
  protected $editObserver: EventEmitter<string> = new EventEmitter<string>();
  protected $doneObserver: EventEmitter<string> = new EventEmitter<string>();
  public formOpen: WritableSignal<boolean> = signal(false);
  public todoForm: FormGroup;
  public ctlTitle: FormControl;
  public ctlId: FormControl;

  constructor() {
    this.feedback_messages = null;
    this.ctlTitle = this.formBuilder.control("");
    this.ctlId = this.formBuilder.control("");
    this.todoForm = this.formBuilder.group({
      "ctlTitle": this.ctlTitle,
      "ctlId": this.ctlId
    });
    this.$deleteObserver.subscribe(id => this.delete(id));
    this.$editObserver.subscribe(id => this.edit(id));
    this.$doneObserver.subscribe(id => this.done(id));
    this.loadUserTodos();
  }

  private loadUserTodos(){
    this.todosService.getAll()
      .pipe(catchError((error: HttpErrorResponse) => throwError(() => error)))
      .subscribe({
        next: (data:any) => this.todos?.set(data.todos),
        error: error => {
          this.feedback_messages = [new FeedBackMessage("error", error.error.msg, error.status)];

        }
      });
  }


  new() {
    this.formOpen.set(true);
    this.todoForm.get("ctlTitle")?.setValue("");
  }

  edit(id: string){
    let todo = this.todos()!.find(t => t.id === id);
    this.todoForm.get("ctlTitle")!.setValue(todo?.title);
    this.todoForm.get("ctlId")!.setValue(todo?.id);
    this.formOpen.set(true);
  }

  done(id: string){
    let todo = this.todos()!.find(t => t.id === id);
    if(todo){
      todo.done = !todo.done;
      this.todosService.save(todo).pipe(catchError((error: HttpErrorResponse) => throwError(() => error)))
        .subscribe({
          next: (data:any) => this.loadUserTodos(),
          error: error => {
            this.feedback_messages = [new FeedBackMessage("error", error.error.msg, error.status)]

          }
        });
    }
  }


  submit($event: SubmitEvent) {
    $event.preventDefault();
    const todo = new Todo();
    todo.title = this.ctlTitle.value.trim();
    todo.id = this.ctlId.value;
    if(todo.id !== ""){
      this.todosService.save(todo).pipe(catchError((error: HttpErrorResponse) => throwError(() => error)))
        .subscribe({
          next: (data:any) => this.loadUserTodos(),
          error: error => {
            this.feedback_messages = [new FeedBackMessage("error", error.error.msg, error.status)]

          }
        });
    } else {
      this.todosService.add(todo).pipe(catchError((error: HttpErrorResponse) => throwError(() => error)))
        .subscribe({
          next: (data:any) => this.loadUserTodos(),
          error: error => {
            this.feedback_messages = [new FeedBackMessage("error", error.error.msg, error.status)]

          }
        });
    }
    this.closeForm();
  }

  closeForm(){
    this.formOpen.set(false);
    this.todoForm.get("ctlTitle")?.setValue("");
    this.todoForm.get("ctlId")?.setValue("");
  }

  delete(id: string){
    this.todosService.delete(id).pipe(catchError((error: HttpErrorResponse) => throwError(() => error)))
      .subscribe({
        next: (data:any) => {
          this.loadUserTodos();
        },
        error: error => {
          this.feedback_messages = [new FeedBackMessage("error", error.error.msg, error.status)]
        }
      });
  }
}
