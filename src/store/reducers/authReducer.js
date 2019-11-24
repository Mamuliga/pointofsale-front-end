export default (state = {}, action) => {
  switch (action.type) {
    case "AUTHENTICATION":
      return {
        isAuthenticated: action.payload
      };
    default:
      return state;
  }
};
