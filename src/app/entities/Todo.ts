export class Todo {
  public id: number;
  public title: string;
  public done: boolean;
  public user_id: number|null;

  constructor() {
    this.id = 0;
    this.title = "";
    this.done = false;
    this.user_id = null;
  }
}
