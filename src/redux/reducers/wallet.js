import { RECEIVED_CURRENCIES, REQUEST_CURRENCY } from '../actions/index';

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
    currencies: Object.keys(action.currencies).filter((coin) => coin !== 'USDT'),
  };
  default: return state;
  }
};

export default wallet;
