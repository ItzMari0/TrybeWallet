import { RECEIVED_CURRENCIES, REQUEST_CURRENCY, EXPENSES_LIST } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
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
      { id: state.expenses.length, ...action.expenses }],
  };
  default: return state;
  }
};

export default wallet;
