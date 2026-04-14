import {
  Component, ChangeDetectionStrategy, inject, signal
} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { EmailService, ContactFormData } from '../../core/services/email.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  private readonly fb      = inject(FormBuilder);
  private readonly emailSvc = inject(EmailService);
  private readonly toast   = inject(ToastService);

  readonly sending = signal(false);
  readonly sent    = signal(false);

  readonly form: FormGroup = this.fb.group({
    name:    ['', [Validators.required, Validators.minLength(2)]],
    email:   ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(4)]],
    message: ['', [Validators.required, Validators.minLength(20)]],
  });

  get f() { return this.form.controls; }

  hasError(field: string, error: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl?.errors?.[error] && ctrl?.touched);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.sending.set(true);
    const formData = this.form.getRawValue() as ContactFormData;

    this.emailSvc.sendEmail(formData)
      .then(() => {
        this.sent.set(true);
        this.toast.success('Message sent! I\'ll get back to you soon. 🎉');
        this.form.reset();
      })
      .catch(() => {
        this.toast.error('Failed to send. Please try emailing directly at piyushkumar30066@gmail.com');
      })
      .finally(() => {
        this.sending.set(false);
      });
  }

  readonly contactInfo = [
    {
      icon: '📧',
      label: 'Email',
      value: 'piyushkumar30066@gmail.com',
      href: 'mailto:piyushkumar30066@gmail.com',
    },
    {
      icon: '📱',
      label: 'Phone',
      value: '+91 6202079747',
      href: 'tel:+916202079747',
    },
    {
      icon: '📍',
      label: 'Location',
      value: 'Bihar, India',
      href: null,
    },
  ];
}
