import { RECEIVED_CURRENCIES,
  REQUEST_CURRENCY,
  EXPENSES_LIST,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  SAVE_EDIT,
} from '../actions/index';

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
  case EDIT_EXPENSE: return {
    ...state,
    editor: true,
    idToEdit: Number(action.editId),
  };
  case SAVE_EDIT: return {
    ...state,
    expenses: [...state.expenses.map((editExpense) => {
      if (editExpense.id === state.idToEdit) {
        return { ...editExpense, ...action.edited };
      }
      return editExpense;
    })],
    editor: false,
    idToEdit: 0,
  };
  default: return state;
  }
};

export default wallet;
