import { TestBed } from '@angular/core/testing';
import { EmailService, ContactFormData } from './email.service';

describe('EmailService', () => {
  let service: EmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should throw an error when EmailJS keys are missing', async () => {
    // Save original values
    const originalEnv = { ...require('../../../environments/environment').environment };

    // Override environment to simulate missing keys
    const envModule = require('../../../environments/environment');
    envModule.environment.emailJs.serviceId = '';
    envModule.environment.emailJs.templateId = '';
    envModule.environment.emailJs.publicKey = '';

    const formData: ContactFormData = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'Test message body for testing purposes.',
    };

    await expectAsync(service.sendEmail(formData)).toBeRejectedWithError('EmailJS is not configured');

    // Restore original values
    envModule.environment.emailJs = originalEnv.emailJs;
  });

  it('should validate ContactFormData interface structure', () => {
    const formData: ContactFormData = {
      name: 'Piyush Kumar',
      email: 'piyushkumar30066@gmail.com',
      subject: 'Test enquiry',
      message: 'This is a test message.',
    };

    // Verify all fields are present with correct types
    expect(typeof formData.name).toBe('string');
    expect(typeof formData.email).toBe('string');
    expect(typeof formData.subject).toBe('string');
    expect(typeof formData.message).toBe('string');
  });
});
