import { USER_ACTIONS } from '../actions';

const INITIAL_STATE = {
  user: {},
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_ACTIONS: return {
    ...state,
    email: action.state.email,
  };
  default: return state;
  }
}

export default userReducer;
