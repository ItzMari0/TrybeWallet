import fetchCurrencies from '../../api/Api';

export const USER_ACTIONS = 'USER_ACTIONS';
export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const RECEIVED_CURRENCIES = 'RECEIVED_CURRENCIES';
export const FAILED_REQUEST = 'FAILED_REQUEST';
export const EXPENSES_LIST = 'EXPENSES_LIST';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export function userLoginAction(state) {
  return {
    type: USER_ACTIONS,
    state,
  };
}

export function requestCurrency() {
  return {
    type: REQUEST_CURRENCY,
  };
}

export function receivedCurrencies(currencies) {
  return {
    type: RECEIVED_CURRENCIES,
    currencies,
  };
}

export function failedRequest(error) {
  return {
    type: FAILED_REQUEST,
    error,
  };
}

export function expensesList(expenses) {
  return {
    type: EXPENSES_LIST,
    expenses,
  };
}

export function deleteExpense(expenseDetails) {
  return {
    type: DELETE_EXPENSE,
    expenseDetails,
  };
}

export const currencyAction = () => async (dispatch) => {
  dispatch(requestCurrency());
  try {
    const response = await fetchCurrencies();
    dispatch(receivedCurrencies(response));
  } catch (error) {
    dispatch(failedRequest(error));
  }
};
