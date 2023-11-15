import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { SignUpComponent } from './sign-up.component';

const setup = async () => {
  await render(SignUpComponent, {
    imports: [HttpClientTestingModule],
  });
};

describe('SignUpComponent', () => {
  describe('Layout', () => {
    it('has Sign Up header', async () => {
      await setup();
      const header = screen.getByRole('heading', { name: 'Sign Up' });
      expect(header).toBeInTheDocument();
    });
    it('has username input', async () => {
      await setup();
      expect(screen.getByLabelText('Username')).toBeInTheDocument();
    });
    it('has email input', async () => {
      await setup();
      expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
    });
    it('has password input', async () => {
      await setup();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
    });
    it('has password type for password input', async () => {
      await setup();
      const input = screen.getByLabelText('Password');
      expect(input).toHaveAttribute('type', 'password');
    });
    it('has password repeat input', async () => {
      await setup();
      expect(screen.getByLabelText('Password Repeat')).toBeInTheDocument();
    });
    it('has password type for password repeat input', async () => {
      await setup();
      const input = screen.getByLabelText('Password Repeat');
      expect(input).toHaveAttribute('type', 'password');
    });
    it('has Sign Up button', async () => {
      await setup();
      const button = screen.getByRole('button', { name: 'Sign Up' });
      expect(button).toBeInTheDocument();
    });
    it('disables the button initially', async () => {
      await setup();
      const button = screen.getByRole('button', { name: 'Sign Up' });
      expect(button).toBeDisabled();
    });
  });

  describe('Interactions', () => {
    it('enables the button when the password and password repeat fields have same value', async () => {
      await setup();
      const password = 'P4ssword';

      const passwordInput = screen.getByLabelText('Password');
      await userEvent.type(passwordInput, password);

      const passwordRepeatInput = screen.getByLabelText('Password Repeat');
      await userEvent.type(passwordRepeatInput, password);

      const button = screen.getByRole('button', { name: 'Sign Up' });
      expect(button).toBeEnabled();
    });
    it('send form when button is clicked', async () => {
      await setup();

      const httpTestingController = TestBed.inject(HttpTestingController);

      const username = 'user';
      const email = 'user@example.com';
      const password = 'P4ssword';

      const usernameInput = screen.getByLabelText('Username');
      await userEvent.type(usernameInput, username);

      const emailInput = screen.getByLabelText('E-mail');
      await userEvent.type(emailInput, email);

      const passwordInput = screen.getByLabelText('Password');
      await userEvent.type(passwordInput, password);

      const passwordRepeatInput = screen.getByLabelText('Password Repeat');
      await userEvent.type(passwordRepeatInput, password);

      const button = screen.getByRole('button', { name: 'Sign Up' });
      await userEvent.click(button);

      const call = httpTestingController.expectOne('/api/1.0/users');
      const requestBody = call.request.body;

      expect(requestBody).toEqual({
        username,
        password,
        email,
      });
    });
  });
});
