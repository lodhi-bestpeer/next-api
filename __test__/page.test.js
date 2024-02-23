import React from 'react';
import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom';
import Home from '../src/app/page';

import { within } from '@testing-library/react';
describe('Home Component', () => {

it('renders specific content in the Featured Section', () => {
  render(<Home />);

  const featuredSection = screen.getByText('Featured Section').closest('.MuiCardContent-root');
  const { getByText } = within(featuredSection);

  expect(getByText(/This is the featured content of your home page./i)).toBeInTheDocument();
});

it('renders specific content in Another Section', () => {
  render(<Home />);

  const anotherSection = screen.getByText('Another Section').closest('.MuiCardContent-root');
  const { getByText } = within(anotherSection);

  expect(getByText(/You can add more sections and content to showcase different parts of your website./i)).toBeInTheDocument();
});
  
});
