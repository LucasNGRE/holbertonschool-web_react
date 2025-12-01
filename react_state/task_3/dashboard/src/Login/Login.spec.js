import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

test('renders 2 labels, 2 inputs and 1 submit button', () => {
  render(<Login />);

  const inputElements = screen.getAllByLabelText(/email|password/i);
  const submitButton = screen.getByRole('button', { name: /OK/i });

  expect(inputElements).toHaveLength(2);
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

test('email input gets focus when its label is clicked', async () => {
  render(<Login />);
  const user = userEvent.setup();

  const emailLabel = screen.getByText(/Email/i);
  const emailInput = screen.getByLabelText(/Email/i);

  await user.click(emailLabel);

  await waitFor(() => {
    expect(emailInput).toHaveFocus();
  });
});

test('password input gets focus when its label is clicked', async () => {
  render(<Login />);
  const user = userEvent.setup();

  const passwordLabel = screen.getByText(/Password/i);
  const passwordInput = screen.getByLabelText(/Password/i);

  await user.click(passwordLabel);

  await waitFor(() => {
    expect(passwordInput).toHaveFocus();
  });
});

test('submit button is disabled by default', () => {
  render(<Login />);
  const submitButton = screen.getByRole('button', { name: /OK/i });
  expect(submitButton).toBeDisabled();
});

test('submit button enables only when email is valid and password has at least 8 chars', async () => {
  render(<Login />);
  const user = userEvent.setup();

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /OK/i });

  // Email invalide + mot de passe valide
  await user.type(emailInput, 'invalid');
  await user.type(passwordInput, '12345678');
  expect(submitButton).toBeDisabled();

  // Email valide + mot de passe trop court
  await user.clear(emailInput);
  await user.clear(passwordInput);
  await user.type(emailInput, 'user@example.com');
  await user.type(passwordInput, '1234567');
  expect(submitButton).toBeDisabled();

  // Email valide + mot de passe correct
  await user.clear(passwordInput);
  await user.type(passwordInput, 'strongpass');
  expect(submitButton).toBeEnabled();
});
