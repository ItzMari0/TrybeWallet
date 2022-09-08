import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import renderWithRouterAndRedux from './renderWith';
import mockData from './mockData';
import INITIAL_STATE from './InitialStateMock';

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const EMAIL_TEST = 'tryber@trybe.com';
const DESCRIPTION_INPUT = 'description-input';

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

      const descriptionInput = screen.getByTestId(DESCRIPTION_INPUT);
      expect(descriptionInput).toBeInTheDocument();

      const currencyInput = screen.getByTestId('currency-input');
      expect(currencyInput).toBeInTheDocument();

      const methodInput = screen.getByTestId('method-input');
      expect(methodInput).toBeInTheDocument();

      const tagInput = screen.getByTestId('tag-input');
      expect(tagInput).toBeInTheDocument();

      const addExpenseBtn = screen.getByRole('button', { name: /Adicionar despesa/i });
      expect(addExpenseBtn).toBeInTheDocument();
    });

    it('a função handleChange altera o valor do estado ao digitar no campo correspondente', () => {
      const { history } = renderWithRouterAndRedux(<App />);

      const emailInput = screen.getByTestId(EMAIL_INPUT);
      const passwordInput = screen.getByTestId(PASSWORD_INPUT);
      const loginBtn = screen.getByRole('button', { name: /Entrar/i });

      userEvent.type(emailInput, EMAIL_TEST);
      userEvent.type(passwordInput, '123456');
      userEvent.click(loginBtn);
      expect(history.location.pathname).toBe('/carteira');

      const valueInput = screen.getByTestId('value-input');
      userEvent.type(valueInput, '100');
      // const currencyInput = screen.getByTestId('currency-input');
      // userEvent.selectOptions(currencyInput, ['USD']);
      // expect(currencyInput).toHaveProperty('value', 'USD');
      expect(valueInput).toHaveProperty('value', '100');
      expect(valueInput).toBeInTheDocument();
    });

    it('a despesa é adicionada na tabela', async () => {
      const { history, store } = renderWithRouterAndRedux(<App />);

      const emailInput = screen.getByTestId(EMAIL_INPUT);
      const passwordInput = screen.getByTestId(PASSWORD_INPUT);
      const loginBtn = screen.getByRole('button', { name: /Entrar/i });
      userEvent.type(emailInput, EMAIL_TEST);
      userEvent.type(passwordInput, '123456');
      userEvent.click(loginBtn);
      expect(history.location.pathname).toBe('/carteira');

      const descriptionInput = screen.getByTestId(DESCRIPTION_INPUT);
      userEvent.type(descriptionInput, 'iFood');

      const addExpenseBtn = screen.getByRole('button', { name: /Adicionar despesa/i });
      userEvent.click(addExpenseBtn);
      expect(descriptionInput).toBeInTheDocument();

      const { wallet: { editor } } = store.getState();
      expect(editor).toBeFalsy();
      expect(typeof (editor)).toBe('boolean');

      const deleteBtn = await screen.findByRole('button', { name: /Excluir/i });
      expect(deleteBtn).toBeInTheDocument();
      const editBtn = await screen.findByRole('button', { name: /Editar/i });
      expect(editBtn).toBeInTheDocument();
    });

    it('a despesa é excluída da tabela ao clicar no botão Excluir', async () => {
      const { history, store } = renderWithRouterAndRedux(<App />);

      const emailInput = screen.getByTestId(EMAIL_INPUT);
      const passwordInput = screen.getByTestId(PASSWORD_INPUT);
      const loginBtn = screen.getByRole('button', { name: /Entrar/i });
      userEvent.type(emailInput, EMAIL_TEST);
      userEvent.type(passwordInput, '123456');
      userEvent.click(loginBtn);
      expect(history.location.pathname).toBe('/carteira');

      const addExpenseBtn = screen.getByRole('button', { name: /Adicionar despesa/i });
      userEvent.click(addExpenseBtn);

      const { wallet: { editor } } = store.getState();
      expect(editor).toBeFalsy();
      expect(typeof (editor)).toBe('boolean');

      const deleteBtn = await screen.findByRole('button', { name: /Excluir/i });
      expect(deleteBtn).toBeInTheDocument();
      const editBtn = await screen.findByRole('button', { name: /Editar/i });
      expect(editBtn).toBeInTheDocument();
      userEvent.click(deleteBtn);
      expect(deleteBtn).not.toBeInTheDocument();
    });

    it('é possivel editar despesas', () => {
      renderWithRouterAndRedux(<App />, { initialState: INITIAL_STATE, initialEntries: ['/carteira'] });

      const editBtn = screen.getAllByRole('button', { name: /editar/i });
      expect(editBtn).toHaveLength(2);
      userEvent.click(editBtn[1]);

      const valueInput = screen.getByLabelText(/despesa/i);
      const descriptionInput = screen.getByLabelText(/descrição/i);
      const currencyInput = screen.getByLabelText(/moeda/i);
      const methodInput = screen.getByLabelText(/forma de pagamento/i);
      const tagInput = screen.getByLabelText(/categoria/i);
      const saveEditExpenseBtn = screen.getByRole('button', { name: /editar despesa/i });

      userEvent.type(valueInput, '100');
      userEvent.type(descriptionInput, 'Restaurante');

      userEvent.selectOptions(currencyInput, 'CAD');

      userEvent.selectOptions(methodInput, 'Dinheiro');
      userEvent.selectOptions(tagInput, 'Alimentação');
      userEvent.click(saveEditExpenseBtn);

      // expect(screen.getByText('100.00')).toBeInTheDocument();
      // expect(screen.getByText('Restaurante')).toBeInTheDocument();
    });

    it('é possível salvar a despesa editada', async () => {
      const { history, store } = renderWithRouterAndRedux(<App />);

      const emailInput = screen.getByTestId(EMAIL_INPUT);
      const passwordInput = screen.getByTestId(PASSWORD_INPUT);
      const loginBtn = screen.getByRole('button', { name: /Entrar/i });
      userEvent.type(emailInput, EMAIL_TEST);
      userEvent.type(passwordInput, '123456');
      userEvent.click(loginBtn);
      expect(history.location.pathname).toBe('/carteira');

      const addExpenseBtn = screen.getByRole('button', { name: /Adicionar despesa/i });
      userEvent.click(addExpenseBtn);

      const editBtn = await screen.findByRole('button', { name: /Editar/i });
      userEvent.click(editBtn);
      const { wallet: { editor } } = store.getState();
      expect(editor).toBeTruthy();
      expect(typeof (editor)).toBe('boolean');

      const descriptionInput = screen.getByTestId(DESCRIPTION_INPUT);
      userEvent.type(descriptionInput, 'combustível');

      const saveEditExpenseBtn = screen.getByRole('button', { name: /Editar despesa/i });
      expect(saveEditExpenseBtn).toBeInTheDocument();
      userEvent.click(saveEditExpenseBtn);
      expect(descriptionInput).toHaveProperty('value', 'combustível');
    });

    it('a API foi chamada', async () => {
      global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve(mockData),
      }));
      const { history, store } = renderWithRouterAndRedux(<App />);

      const emailInput = screen.getByTestId(EMAIL_INPUT);
      const passwordInput = screen.getByTestId(PASSWORD_INPUT);
      const loginBtn = screen.getByRole('button', { name: /Entrar/i });
      userEvent.type(emailInput, EMAIL_TEST);
      userEvent.type(passwordInput, '123456');
      userEvent.click(loginBtn);
      expect(history.location.pathname).toBe('/carteira');

      const addExpenseBtn = screen.getByRole('button', { name: /Adicionar despesa/i });
      userEvent.click(addExpenseBtn);
      expect(global.fetch).toBeCalledTimes(2);

      const { wallet: { editor } } = store.getState();
      expect(editor).toBeFalsy();
      expect(typeof (editor)).toBe('boolean');
    });
  });
});
