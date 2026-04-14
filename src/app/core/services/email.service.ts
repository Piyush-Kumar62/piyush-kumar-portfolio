import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { environment } from '../../../environments/environment';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class EmailService {

  async sendEmail(form: ContactFormData): Promise<void> {
    const { serviceId, templateId, publicKey } = environment.emailJs;

    // Stop everything and throw an error if the keys are missing.
    if (!serviceId || !templateId || !publicKey) {
      throw new Error('EmailJS is not configured');
    }

    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      subject: form.subject,
      message: form.message,
      to_name: 'Piyush Kumar',
    };

    await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      { publicKey }
    );
  }
}
