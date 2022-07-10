import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {
    this.contactForm = this.formBuilder.group({
      name: '',
      email: ['', [Validators.required, Validators.email]],
      subject: '',
      message: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  submit(): void {
    if (this.contactForm.invalid) {
      this.errorToast();
      return;
    }
    this.successToast();
  }

  successToast(): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Message sent',
      detail: 'Your message has been successfully sent!',
    });
  }

  errorToast(): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'There has been an error when submitting the contact form',
    });
  }

  get email(): AbstractControl | null {
    return this.contactForm.get('email');
  }

  get message(): AbstractControl | null {
    return this.contactForm.get('message');
  }
}