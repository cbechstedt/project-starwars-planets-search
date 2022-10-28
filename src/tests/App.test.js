import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Ao entrar na aplicação', () => {
test('testa se formulário é renderizado', () => {
  render(<App />);
  const planeta = screen.getByRole('textbox', {
    name: /planeta/i
  })

  const btn = screen.getByRole('button', {
    name: /filtrar/i
  })

  expect(planeta).toBeInTheDocument();
  expect(btn).toBeInTheDocument();
});

test('testa se tabela é renderizada', () => {
  render(<App />);
  const tabela = screen.getByRole('table')

  expect(tabela).toBeInTheDocument();
});

test('testa se é possível digitar planeta e filtrar por nome', () => {
  render(<App />);

  const planetName = screen.getByRole('textbox', {
    name: /planeta/i
  })

  userEvent.type(planetName, 'h');

  waitFor(() => {
    const planets = screen.getAllByTestId('planet-name');
    expect(planets.length).toBe(2)
  })

});

test('testa se é possível filtrar por opções de filtro', async () => {
  render(<App />);

  const coluna = screen.getByRole('combobox', {
    name: /coluna/i
  })
  const operador = screen.getByRole('combobox', {
    name: /operador/i
  })
  const numberValue = screen.getByRole('spinbutton')

  const btn = screen.getByRole('button', {
    name: /filtrar/i
  })

  userEvent.selectOptions(coluna, 'diameter');
  userEvent.selectOptions(operador, 'maior que')
  userEvent.type(numberValue, '7200')
  userEvent.click(btn)

  waitFor(() => {
    const planets = screen.getAllByTestId('planet-name');
    expect(planets.length).toBe(8)
  })

  userEvent.selectOptions(coluna, 'rotation_period');
  userEvent.selectOptions(operador, 'menor que')
  userEvent.type(numberValue, '20')
  userEvent.click(btn)

  waitFor(() => {
    const planets = screen.getAllByTestId('planet-name');
    expect(planets.length).toBe(2)
  })
});

});
