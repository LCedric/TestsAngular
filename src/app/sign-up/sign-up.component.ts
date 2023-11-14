import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  password = signal<string>('');
  passwordRepeat = signal<string>('');
  isDisabled = computed<boolean>(() =>
    this.password() ? this.password() !== this.passwordRepeat() : true
  );

  onChangePassword(event: Event): void {
    this.password.set((event.target as HTMLInputElement).value);
  }
  onChangePasswordRepeat(event: Event): void {
    this.passwordRepeat.set((event.target as HTMLInputElement).value);
  }
}
