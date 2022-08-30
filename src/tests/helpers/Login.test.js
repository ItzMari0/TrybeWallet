import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import renderWithRouterAndRedux from './renderWith';

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const EMAIL_TEST = 'tryber@trybe.com';

describe('Testa os componentes do Projeto', () => {
  describe('Testa a tela inicial de Login', () => {
    it('a tela é renderizada corretamente', () => {
      renderWithRouterAndRedux(<App />);

      const emailInput = screen.getByTestId(EMAIL_INPUT);
      expect(emailInput).toBeInTheDocument();

      const passwordInput = screen.getByTestId(PASSWORD_INPUT);
      expect(passwordInput).toBeInTheDocument();

      const loginBtn = screen.getByRole('button', { name: /Entrar/i });
      expect(loginBtn).toBeInTheDocument();
    });

    it('o email/password são válidos e é feito o login, redirecionando para o componente Wallet', () => {
      const { history, store } = renderWithRouterAndRedux(<App />);

      const emailInput = screen.getByTestId(EMAIL_INPUT);
      const passwordInput = screen.getByTestId(PASSWORD_INPUT);
      const loginBtn = screen.getByRole('button', { name: /Entrar/i });

      userEvent.type(emailInput, EMAIL_TEST);
      expect(emailInput).toHaveValue(EMAIL_TEST);

      userEvent.type(passwordInput, '123456');
      expect(passwordInput).toHaveValue('123456');

      userEvent.click(loginBtn);
      expect(history.location.pathname).toBe('/carteira');

      const { user } = store.getState();
      expect(user.email).toBe(EMAIL_TEST);
    });
  });

  describe('Testa o componente WalletForm', () => {
    it('a página /carteira é renderizada', () => {
      const { history, store } = renderWithRouterAndRedux(<App />);

      const emailInput = screen.getByTestId(EMAIL_INPUT);
      const passwordInput = screen.getByTestId(PASSWORD_INPUT);
      const loginBtn = screen.getByRole('button', { name: /Entrar/i });

      userEvent.type(emailInput, EMAIL_TEST);
      expect(emailInput).toHaveValue(EMAIL_TEST);

      userEvent.type(passwordInput, '123456');
      expect(passwordInput).toHaveValue('123456');

      userEvent.click(loginBtn);
      expect(history.location.pathname).toBe('/carteira');

      const { user } = store.getState();
      expect(user.email).toBe(EMAIL_TEST);

      const valueInput = screen.getByTestId('value-input');
      expect(valueInput).toBeInTheDocument();

      const descriptionInput = screen.getByTestId('description-input');
      expect(descriptionInput).toBeInTheDocument();

      const currencyInput = screen.getByTestId('currency-input');
      expect(currencyInput).toBeInTheDocument();

      const methodInput = screen.getByTestId('method-input');
      expect(methodInput).toBeInTheDocument();

      const tagInput = screen.getByTestId('tag-input');
      expect(tagInput).toBeInTheDocument();

      const addExpenseBtn = screen.getByRole('button', { name: /Adicionar Despesas/i });
      expect(addExpenseBtn).toBeInTheDocument();
    });
  });
});
