export const authenticate = () => dispatch => {
  dispatch({ type: "AUTHENTICATION", payload: true });
};
