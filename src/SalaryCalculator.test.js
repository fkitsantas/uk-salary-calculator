import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SalaryCalculator from './SalaryCalculator';

test('renders salary calculator', () => {
  render(<SalaryCalculator />);
  const linkElement = screen.getByText(/UK After-Tax Salary Calculator/i);
  expect(linkElement).toBeInTheDocument();
});

test('calculates salary correctly', () => {
  render(<SalaryCalculator />);
  const input = screen.getByTestId('gross-salary');
  fireEvent.change(input, { target: { value: '60000' } });
  fireEvent.click(screen.getByText('Calculate'));

  // Check for the values in the table cells
  expect(screen.getByText('£60000')).toBeInTheDocument();
  expect(screen.getByText('£48568')).toBeInTheDocument();
  expect(screen.getByText('£11432')).toBeInTheDocument();
});


