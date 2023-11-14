import { render, screen } from '@testing-library/angular';
import { SignUpComponent } from './sign-up.component';
import userEvent from '@testing-library/user-event';
import 'whatwg-fetch';

describe('SignUpComponent', () => {
  describe('Layout', () => {
    it('has Sign Up header', async () => {
      await render(SignUpComponent);
      const header = screen.getByRole('heading', { name: 'Sign Up' });
      expect(header).toBeInTheDocument();
    });
    it('has username input', async () => {
      await render(SignUpComponent);
      expect(screen.getByLabelText('Username')).toBeInTheDocument();
    });
    it('has email input', async () => {
      await render(SignUpComponent);
      expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
    });
    it('has password input', async () => {
      await render(SignUpComponent);
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
    });
    it('has password type for password input', async () => {
      await render(SignUpComponent);
      const input = screen.getByLabelText('Password');
      expect(input).toHaveAttribute('type', 'password');
    });
    it('has password repeat input', async () => {
      await render(SignUpComponent);
      expect(screen.getByLabelText('Password Repeat')).toBeInTheDocument();
    });
    it('has password type for password repeat input', async () => {
      await render(SignUpComponent);
      const input = screen.getByLabelText('Password Repeat');
      expect(input).toHaveAttribute('type', 'password');
    });
    it('has Sign Up button', async () => {
      await render(SignUpComponent);
      const button = screen.getByRole('button', { name: 'Sign Up' });
      expect(button).toBeInTheDocument();
    });
    it('disables the button initially', async () => {
      await render(SignUpComponent);
      const button = screen.getByRole('button', { name: 'Sign Up' });
      expect(button).toBeDisabled();
    });
  });

  describe('Interactions', () => {
    it('enables the button when the password and password repeat fields have same value', async () => {
      await render(SignUpComponent);
      const password = 'P4ssword';

      const passwordInput = screen.getByLabelText('Password');
      await userEvent.type(passwordInput, password);

      const passwordRepeatInput = screen.getByLabelText('Password Repeat');
      await userEvent.type(passwordRepeatInput, password);

      const button = screen.getByRole('button', { name: 'Sign Up' });
      expect(button).toBeEnabled();
    });
    it('send form when button is clicked', async () => {
      const spy = jest.spyOn(window, 'fetch');

      await render(SignUpComponent);
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

      const args = spy.mock.calls[0];
      const secondParam = args[1] as RequestInit;
      expect(secondParam.body).toEqual(
        JSON.stringify({
          username,
          password,
          email,
        })
      );
    });
  });
});
