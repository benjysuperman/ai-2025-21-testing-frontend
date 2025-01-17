import {Component, ElementRef, inject, Input, OnInit} from '@angular/core';
import {FeedBackMessage} from '../../../../entities/FeedBackMessage';
import {elementAt} from 'rxjs';

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
