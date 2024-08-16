import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../app/components/SearchBar';

describe('SearchBar Component', () => {
  it('should render the input element', () => {
    render(<SearchBar onSearch={jest.fn()} />);
    const inputElement = screen.getByPlaceholderText(/Buscar productos.../i);
    expect(inputElement).toBeInTheDocument();
  });

  it('should call onSearch with the correct query', () => {
    const onSearchMock = jest.fn();
    render(<SearchBar onSearch={onSearchMock} debouncedSearch={onSearchMock} />);
    const inputElement = screen.getByPlaceholderText(/Buscar productos.../i);

    fireEvent.change(inputElement, { target: { value: 'test' } });
    expect(onSearchMock).toHaveBeenCalledWith('test');
  });
});
