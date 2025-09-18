import React from 'react'; 
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PillDetail from '../components/pillDetail/PillDetail';

describe('PillDetail component', () => {
  it('renders the label correctly', () => {
    render(<PillDetail label="Paracetamol" type="primary" />);
    const pillElement = screen.getByText('Paracetamol');
    expect(pillElement).toBeInTheDocument();
  });

  it('applies the correct class based on type', () => {
    render(<PillDetail label="Ibuprofeno" type="secondary" />);
    const pillElement = screen.getByText('Ibuprofeno');
    expect(pillElement).toHaveClass('pill');
    expect(pillElement).toHaveClass('pill--secondary');
  });
});
