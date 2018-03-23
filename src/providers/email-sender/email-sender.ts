import { Injectable } from '@angular/core';

declare var emailjs;

@Injectable()
export class EmailSenderProvider {

  //https://www.emailjs.com/docs/api-reference/emailjs-send/
  send(template: string, params: any){
    let service = "mailgun";
    return emailjs.send(service,template,params);
  }

  //sendForm
}
