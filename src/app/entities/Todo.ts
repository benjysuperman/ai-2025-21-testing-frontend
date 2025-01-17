export class Todo {
  public id: string;
  public title: string;
  public done: boolean;
  public user_id: number|null;

  constructor() {
    this.id = "";
    this.title = "";
    this.done = false;
    this.user_id = null;
  }
}
