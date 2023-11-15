import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  username = signal<string>('');
  email = signal<string>('');
  password = signal<string>('');
  passwordRepeat = signal<string>('');
  isDisabled = computed<boolean>(() =>
    this.password() ? this.password() !== this.passwordRepeat() : true
  );

  constructor(private httpClient: HttpClient) {}

  onChangeUsername(event: Event): void {
    this.username.set((event.target as HTMLInputElement).value);
  }
  onChangeEmail(event: Event): void {
    this.email.set((event.target as HTMLInputElement).value);
  }
  onChangePassword(event: Event): void {
    this.password.set((event.target as HTMLInputElement).value);
  }
  onChangePasswordRepeat(event: Event): void {
    this.passwordRepeat.set((event.target as HTMLInputElement).value);
  }

  onClickSignup(event: Event): void {
    event.preventDefault();

    this.httpClient
      .post('/api/1.0/users', {
        username: this.username(),
        email: this.email(),
        password: this.password(),
      })
      .subscribe(() => {});
  }
}
