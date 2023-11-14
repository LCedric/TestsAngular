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

  it('has Sign Up header', () => {
    const signUp = fixture.nativeElement as HTMLInputElement;
    const h1 = signUp.querySelector('h1');
    expect(h1 && h1.textContent).toBe('Sign Up');
  });
});
