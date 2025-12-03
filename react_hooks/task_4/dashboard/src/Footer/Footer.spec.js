import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import AppContext from '../Context/context';
import { getCurrentYear, getFooterCopy } from '../utils/utils';

describe('Footer tests', () => {
  test('It should render footer with copyright text', () => {
    render(
      <AppContext.Provider value={{ user: null }}>
        <Footer />
      </AppContext.Provider>
    );

    const footerParagraph = screen.getByText(/copyright/i);

    expect(footerParagraph).toHaveTextContent(
      new RegExp(`copyright ${getCurrentYear()}`, 'i')
    );
    expect(footerParagraph).toHaveTextContent(getFooterCopy(false));
  });

  test('It should not display "Contact us" link when user is logged out', () => {
    render(
      <AppContext.Provider value={{ user: { isLoggedIn: false } }}>
        <Footer />
      </AppContext.Provider>
    );

    const contactLink = screen.queryByText(/contact us/i);
    expect(contactLink).toBeNull();
  });

  test('It should display "Contact us" link when user is logged in', () => {
    render(
      <AppContext.Provider value={{ user: { isLoggedIn: true } }}>
        <Footer />
      </AppContext.Provider>
    );

    const contactLink = screen.getByText(/contact us/i);
    expect(contactLink).toBeInTheDocument();
  });
});
