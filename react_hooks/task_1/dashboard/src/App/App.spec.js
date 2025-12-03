import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';

describe('App login / logout state behavior', () => {
  test('The App component renders without crashing', () => {
    render(<App />);
  });

  test('By default, Login is displayed and CourseList is NOT displayed', () => {
    render(<App />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(screen.queryByRole('table')).toBeNull();
  });

  test('After login, CourseList is displayed', () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@test.com' },
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: '1234' },
    });

    fireEvent.click(screen.getByRole('button', { name: /ok/i }));

    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();
  });

  test('After logout, CourseList is hidden and Login is displayed again', () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@test.com' },
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: '1234' },
    });

    fireEvent.click(screen.getByRole('button', { name: /ok/i }));

    fireEvent.click(screen.getByText(/logout/i));

    expect(screen.queryByRole('table')).toBeNull();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  test('Ctrl + h logs out the user and shows alert', () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(<App />);

    // Login first
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@test.com' },
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: '1234' },
    });

    fireEvent.click(screen.getByRole('button', { name: /ok/i }));

    // Trigger Ctrl + h
    fireEvent.keyDown(document, {
      ctrlKey: true,
      key: 'h',
    });

    expect(alertSpy).toHaveBeenCalledWith('Logging you out');
    expect(screen.queryByText(/logout/i)).toBeNull();

    alertSpy.mockRestore();
  });

  test('it should display "News from the School" title and paragraph by default', () => {
    render(<App />);

    const newsTitle = screen.getByRole('heading', {
      name: /news from the school/i,
    });

    const newsParagraph = screen.getByText(
      /holberton school news goes here/i
    );

    expect(newsTitle).toBeInTheDocument();
    expect(newsParagraph).toBeInTheDocument();
  });

  // ✅ NOUVEAU TEST : Notifications
  test('Clicking on a notification removes it and logs the correct message', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    render(<App />);

    // Ouvre le panneau de notifications
    fireEvent.click(screen.getByText(/your notifications/i));

    // Vérifie qu'une notification est présente
    const notification = screen.getByText(/new course available/i);
    expect(notification).toBeInTheDocument();

    // Clique sur la notification
    fireEvent.click(notification);

    // La notification doit être supprimée
    expect(screen.queryByText(/new course available/i)).toBeNull();

    // Le bon log doit être envoyé
    expect(consoleSpy).toHaveBeenCalledWith(
      'Notification 1 has been marked as read'
    );

    consoleSpy.mockRestore();
  });
});
