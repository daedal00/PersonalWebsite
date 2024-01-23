import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contact = {
    name: '',
    email: '',
    message: ''
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post('http://localhost:3000/send', this.contact)
      .subscribe({
        next: (response) => {
          console.log('Message sent', response);
          this.contact = { name: '', email: '', message: '' }; // Reset the form
        },
        error: (error) => {
          console.error('Error sending message', error);
        }
      });
  }
}
