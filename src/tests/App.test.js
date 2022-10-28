import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

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

test('testa se tabela é renderizada', async () => {
  render(<App />);

  const name = await screen.findByText('name')
  expect(name).toBeInTheDocument();
});
});
