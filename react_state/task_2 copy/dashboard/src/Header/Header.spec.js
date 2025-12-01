import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import AppContext from '../App/AppContext';

export const convertHexToRGBA = (hexCode) => {
  let hex = hexCode.replace('#', '');

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return { r, g, b };
};

test('should contain a <h1/> and an <img/>', () => {
  render(
    <AppContext.Provider value={{
      user: { isLoggedIn: false },
      logOut: jest.fn(),
    }}>
      <Header />
    </AppContext.Provider>
  );

  const headingElement = screen.getByRole('heading', { name: /school dashboard/i });
  const imgElement = screen.getByAltText('holberton logo');

  expect(headingElement).toBeInTheDocument();
  expect(imgElement).toBeInTheDocument();
});


test('logoutSection is NOT rendered with default context', () => {
  render(
    <AppContext.Provider value={{
      user: { isLoggedIn: false },
      logOut: jest.fn(),
    }}>
      <Header />
    </AppContext.Provider>
  );

  expect(screen.queryByText(/logout/i)).toBeNull();
});

test('logoutSection is rendered when user is logged in', () => {
  render(
    <AppContext.Provider value={{
      user: {
        isLoggedIn: true,
        email: 'test@test.com',
        password: '1234',
      },
      logOut: jest.fn(),
    }}>
      <Header />
    </AppContext.Provider>
  );

  expect(screen.getByText(/welcome/i)).toBeInTheDocument();
  expect(screen.getByText(/logout/i)).toBeInTheDocument();
});

test('clicking logout calls logOut function', () => {
  const logOutSpy = jest.fn();

  render(
    <AppContext.Provider value={{
      user: {
        isLoggedIn: true,
        email: 'test@test.com',
        password: '1234',
      },
      logOut: logOutSpy,
    }}>
      <Header />
    </AppContext.Provider>
  );

  fireEvent.click(screen.getByText(/logout/i));
  expect(logOutSpy).toHaveBeenCalled();
});
