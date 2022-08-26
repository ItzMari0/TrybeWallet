export const USER_ACTIONS = 'USER_ACTIONS';

export function userLoginAction(state) {
  return {
    type: USER_ACTIONS,
    state,
  };
}
