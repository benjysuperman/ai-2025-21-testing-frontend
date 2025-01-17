export class ContactForm {
  name: string
  gender: string
  email: string
  tel: string|null
  age: number|null
  website: string|null
  file: string|null
  object: string|number
  reply_on: Date|null
  message: string
  agree: boolean


  constructor(args: any) {
    console.log(args);
    this.name = args.name;
    this.gender = args.gender;
    this.email = args.email;
    this.tel = args.tel;
    this.age = args.age;
    this.website = args.website;
    this.file = args.file;
    this.object = args.object;
    this.reply_on = args.reply_on;
    this.message = args.message;
    this.agree = args.agree;
  }
}
