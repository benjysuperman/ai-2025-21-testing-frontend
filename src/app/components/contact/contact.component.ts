import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';
import {FeedBackMessage} from '../../entities/FeedBackMessage';
import {FeedbackMessagesComponent} from '../common/feedback-messages/feedback-messages.component';
import {ContactForm} from '../../entities/ContactForm';
import {ContactService} from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslatePipe,
    FeedbackMessagesComponent
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {

  protected ctlName: FormControl;
  protected ctlGender: FormControl;
  protected ctlEmail: FormControl;
  protected ctlTel: FormControl;
  protected ctlAge: FormControl;
  protected ctlLinked: FormControl;
  protected ctlFile: FormControl;
  protected ctlObject: FormControl;
  protected ctlReplyDate: FormControl;
  protected ctlMessage: FormControl;
  protected ctlAgree: FormControl;
  private file: string|undefined;
  private mock: ContactForm;

  protected contactForm: FormGroup;
  protected subjects: string[];
  private formBuilder = inject(FormBuilder);
  private translateService = inject(TranslateService);
  private contactService = inject(ContactService);
  protected feedback_messages: FeedBackMessage[]|null = null;

  constructor() {
    /**
    this.mock = new ContactForm({
      "name": "Benjamin Wilmet",
      "gender": "M",
      "email": "wilmet.benjamin@hotmail.com",
      "tel": "0493547017",
      "age": 41,
      "website": "https://www.google.be",
      "file": null,
      "object": 1,
      "reply_on": new Date(),
      "message": "Hello from mock",
      "agree": true
    });
    **/
    this.mock = new ContactForm({
      "name": "",
      "gender": "",
      "email": "",
      "tel": "",
      "age": 0,
      "website": "",
      "file": null,
      "object": 1,
      "reply_on": new Date(),
      "message": "",
      "agree": false
    });
  }

  ngOnInit() {
    this.ctlName = this.formBuilder.control(this.mock.name, []);
    this.ctlGender = this.formBuilder.control(this.mock.gender, []);
    this.ctlEmail = this.formBuilder.control(this.mock.email, []);
    this.ctlTel = this.formBuilder.control(this.mock.tel, []);
    this.ctlAge = this.formBuilder.control(this.mock.age, []);
    this.ctlLinked = this.formBuilder.control(this.mock.website, []);
    this.ctlFile = this.formBuilder.control(this.mock.file, []);
    this.ctlObject = this.formBuilder.control(this.mock.object, []);
    this.ctlReplyDate = this.formBuilder.control(this.mock.reply_on, []);
    this.ctlMessage = this.formBuilder.control(this.mock.message, []);
    this.ctlAgree = this.formBuilder.control(this.mock.agree, []);
    this.contactForm = this.formBuilder.group({
      "ctlName": this.ctlName,
      "ctlGender": this.ctlGender,
      "ctlEmail": this.ctlEmail,
      "ctlTel": this.ctlTel,
      "ctlAge": this.ctlAge,
      "ctlLinked": this.ctlLinked,
      "ctlFile": this.ctlFile,
      "ctlObject": this.ctlObject,
      "ctlReplyDate": this.ctlReplyDate,
      "ctlMessage": this.ctlMessage,
      "ctlAgree": this.ctlAgree
    });
    this.subjectDropdown();
    this.translateService.onLangChange.subscribe(l => this.subjectDropdown());
  }

  subjectDropdown(){
    const options = ["CONTACT_OPTION_CONTACT_ADMIN", "CONTACT_OPTION_SAY_HI", "CONTACT_OPTION_OTHER"]
    this.subjects = []
    options.forEach( (k,i) =>  this.translateService.get(k).subscribe(t => this.subjects[i] = t));
  }

  handleUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.file = reader.result?.toString();
    };
  }

  submit($event: SubmitEvent) {
    $event.preventDefault();
    let contactForm: ContactForm = new ContactForm({
      "name": this.ctlName.value,
      "gender": this.ctlGender.value,
      "email": this.ctlEmail.value,
      "tel": this.ctlTel.value,
      "age": parseInt(this.ctlAge.value, 10),
      "website": this.ctlLinked.value,
      "file": this.ctlFile.value ? this.file : null,
      "object": this.subjects[this.ctlObject.value],
      "reply_on": this.ctlReplyDate.value ? new Date(this.ctlReplyDate.value).toISOString().slice(0,10) : null,
      "message": this.ctlMessage.value,
      "agree": this.ctlAgree.value
    });
    this.contactService.send(contactForm).subscribe();
  }
}
