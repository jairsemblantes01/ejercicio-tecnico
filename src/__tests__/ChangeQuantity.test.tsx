import React from 'react';
import { render, screen } from '@testing-library/react';
import ChangeQuantity from '../app/components/ChangeQuantity';

describe('ChangeQuantity Component', () => {
  it('should render the select with the correct options', () => {
    render(
      <ChangeQuantity
        total={10}
        perPage={5}  // Asegúrate de pasar el valor correcto aquí
        onChange={jest.fn()}
      />
    );
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveValue('5');
  });
});
