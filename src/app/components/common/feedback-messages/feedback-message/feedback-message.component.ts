import {Component, ElementRef, inject, Input} from '@angular/core';
import {FeedBackMessage} from '../../../../entities/FeedBackMessage';

@Component({
  selector: 'app-feedback-message',
  imports: [],
  templateUrl: './feedback-message.component.html',
  styleUrl: './feedback-message.component.css'
})
export class FeedbackMessageComponent {
  @Input({required: true})
  public message: FeedBackMessage;
}
