import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    fixture.detectChanges();
  });

  describe('Layout', () => {
    it('has Sign Up header', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const h1 = signUp.querySelector('h1');
      expect(h1 && h1.textContent).toBe('Sign Up');
    });
    it('has username input', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const label = signUp.querySelector('label[for="username"]');
      const input = signUp.querySelector('input[id="username"]');
      expect(label && label?.textContent).toContain('Username');
      expect(input).toBeTruthy();
    });
    it('has email input', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const label = signUp.querySelector('label[for="email"]');
      const input = signUp.querySelector('input[id="email"]');
      expect(label && label?.textContent).toContain('E-mail');
      expect(input).toBeTruthy();
    });
    it('has password input', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const label = signUp.querySelector('label[for="password"]');
      const input = signUp.querySelector('input[id="password"]');
      expect(label && label?.textContent).toContain('Password');
      expect(input).toBeTruthy();
    });
    it('has password type for password input', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const input = signUp.querySelector('input[id="password"]');
      const type = input?.getAttribute('type');
      expect(type).toBe('password');
    });
    it('has password repeat input', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const label = signUp.querySelector('label[for="passwordRepeat"]');
      const input = signUp.querySelector('input[id="passwordRepeat"]');
      expect(label && label?.textContent).toContain('Password Repeat');
      expect(input).toBeTruthy();
    });
    it('has password type for password repeat input', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const input = signUp.querySelector('input[id="passwordRepeat"]');
      const type = input?.getAttribute('type');
      expect(type).toBe('password');
    });
    it('has Sign Up button', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const button = signUp.querySelector('button');
      expect(button && button?.textContent).toBe('Sign Up');
    });
    it('disables the button initially', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const button = signUp.querySelector('button') as HTMLInputElement;
      expect(button && button?.disabled).toBeTruthy();
    });
  });

  describe('Interactions', () => {
    it('enables the button when the password and password repeat fields have same value', () => {
      const password = 'P4ssword';

      const signUp = fixture.nativeElement as HTMLElement;

      const passwordInput = signUp.querySelector(
        'input[id="password"]'
      ) as HTMLInputElement;
      passwordInput.value = password;
      passwordInput.dispatchEvent(new Event('input'));

      const passwordRepeatInput = signUp.querySelector(
        'input[id="passwordRepeat"]'
      ) as HTMLInputElement;
      passwordRepeatInput.value = password;
      passwordRepeatInput.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      const button = signUp.querySelector('button') as HTMLInputElement;
      expect(button).toBeTruthy();
      expect(button?.disabled).toBeFalsy();
    });
  });
});
