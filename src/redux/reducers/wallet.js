import { RECEIVED_CURRENCIES,
  REQUEST_CURRENCY,
  EXPENSES_LIST,
  DELETE_EXPENSE } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  id: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCY: return {
    ...state,
  };
  case RECEIVED_CURRENCIES: return {
    ...state,
    currencies: Object.keys(action.currencies).filter((currency) => currency !== 'USDT'),
  };
  case EXPENSES_LIST: return {
    ...state,
    expenses: [...state.expenses.filter((object) => object.currency !== ''),
      { id: state.id, ...action.expenses }],
    id: state.id + 1,
  };
  case DELETE_EXPENSE: return {
    ...state,
    expenses: [...state.expenses
      .filter((deleted) => deleted.id !== Number(action.expenseDetails))],
  };
  default: return state;
  }
};

export default wallet;
