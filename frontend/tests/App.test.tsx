import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { App } from '../src/App';

test('renders title', () => {
  render(
    <MockedProvider>
      <App />
    </MockedProvider>
  );
  expect(screen.getByText(/REE Electric Balance/i)).toBeInTheDocument();
});
