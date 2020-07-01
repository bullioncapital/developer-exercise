import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

test('renders filter button', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText('Apply');
  expect(linkElement).toBeInTheDocument();
});

test('renders table', () => {
  const { getByRole } = render(<App />);
  const linkElement = getByRole('table');
  expect(linkElement).toBeInTheDocument();
});
