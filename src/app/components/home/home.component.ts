import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {UserService} from '../../services/user.service';
import {catchError, throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {User} from '../../entities/User';
import {FeedBackMessage} from '../../entities/FeedBackMessage';
import {FeedbackMessagesComponent} from '../common/feedback-messages/feedback-messages.component';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-home',
  imports: [
    TranslatePipe,
    ReactiveFormsModule,
    FeedbackMessagesComponent,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  private userService: UserService = inject(UserService);
  protected loginForm: FormGroup;
  protected ctlUsername: FormControl;
  protected ctlPassword: FormControl;
  protected user: User|null;

  private formBuilder: FormBuilder = inject(FormBuilder);
  protected feedback_messages: FeedBackMessage[]|null;

  constructor() {
    this.feedback_messages = null;
    this.user = this.userService.getUser();
    this.ctlUsername = new FormControl("");
    this.ctlPassword = new FormControl("");
    this.loginForm = this.formBuilder.group({
      "ctlUsername": this.ctlUsername,
      "ctlPassword": this.ctlPassword,
    });
  }

  login(event: SubmitEvent) {
    event.preventDefault();
    this.userService.loginByUsernameAndPassword(this.ctlUsername.value, this.ctlPassword.value).pipe(catchError((error: HttpErrorResponse) => throwError(() => error)))
      .subscribe({
        next: (data:any) => {
          let access_token:string = data["access_token"];
          localStorage.setItem("todo-token", access_token);
          this.user = this.userService.getUser();
        },
        error: error => {
          this.feedback_messages = [new FeedBackMessage("error", error.error.msg, error.status)]

        }
      });
  }

  getUser() {
    const user = this.userService.getUser();
    return user ? user : null;
  }
}
