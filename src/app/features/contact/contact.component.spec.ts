import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailService } from '../../core/services/email.service';
import { ToastService } from '../../core/services/toast.service';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  // Mock services — don't actually send emails in tests
  const mockEmailService = {
    sendEmail: jasmine.createSpy('sendEmail').and.returnValue(Promise.resolve()),
  };

  const mockToastService = {
    success: jasmine.createSpy('success'),
    error: jasmine.createSpy('error'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent, ReactiveFormsModule],
      providers: [
        { provide: EmailService,  useValue: mockEmailService },
        { provide: ToastService, useValue: mockToastService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty fields', () => {
    expect(component.form.get('name')?.value).toBe('');
    expect(component.form.get('email')?.value).toBe('');
    expect(component.form.get('subject')?.value).toBe('');
    expect(component.form.get('message')?.value).toBe('');
  });

  it('should be invalid when form is empty', () => {
    expect(component.form.invalid).toBe(true);
  });

  it('should require valid email format', () => {
    component.form.get('email')?.setValue('not-an-email');
    component.form.get('email')?.markAsTouched();
    expect(component.hasError('email', 'email')).toBe(true);
  });

  it('should require name to be at least 2 characters', () => {
    component.form.get('name')?.setValue('A');
    component.form.get('name')?.markAsTouched();
    expect(component.hasError('name', 'minlength')).toBe(true);
  });

  it('should require message to be at least 20 characters', () => {
    component.form.get('message')?.setValue('Too short');
    component.form.get('message')?.markAsTouched();
    expect(component.hasError('message', 'minlength')).toBe(true);
  });

  it('should mark form as touched and not send if invalid', () => {
    component.onSubmit();
    expect(mockEmailService.sendEmail).not.toHaveBeenCalled();
    expect(component.form.touched).toBe(true);
  });

  it('should send email when form is valid', async () => {
    // Fill out the form with valid data
    component.form.patchValue({
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Hello there',
      message: 'This is a test message that is long enough.',
    });

    expect(component.form.valid).toBe(true);
    component.onSubmit();

    // Flush the promise
    await fixture.whenStable();
    expect(mockEmailService.sendEmail).toHaveBeenCalled();
  });

  it('should have 3 contact info items', () => {
    expect(component.contactInfo.length).toBe(3);
  });

  it('should render contact section in the DOM', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#contact')).toBeTruthy();
  });
});
