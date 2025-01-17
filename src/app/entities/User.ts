import {Todo} from './Todo';

export class User {
  public id: number;
  public username: string;
  public password: string;
  public role: string;
  private todos: Todo[];

  constructor() {
    this.id = 0;
    this.username = "";
    this.password = "";
    this.role = "";
    this.todos = [];
  }

  addTodo(todo:Todo){
    this.todos.push(todo);
  }

}
