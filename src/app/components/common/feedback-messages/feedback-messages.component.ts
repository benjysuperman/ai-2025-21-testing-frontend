import {Component, Input} from '@angular/core';
import {FeedBackMessage} from '../../../entities/FeedBackMessage';
import {CommonModule} from '@angular/common';
import {FeedbackMessageComponent} from './feedback-message/feedback-message.component';

@Component({
  selector: 'app-feedback-messages',
  imports: [
    CommonModule,
    FeedbackMessageComponent
  ],
  standalone: true,
  templateUrl: './feedback-messages.component.html',
  styleUrl: './feedback-messages.component.css'
})
export class FeedbackMessagesComponent {
  @Input({required: true})
  public messages: FeedBackMessage[]|null;
}
