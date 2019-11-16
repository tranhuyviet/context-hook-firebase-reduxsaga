const INITIAL_STATE = {
  value: 0
};

const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        value: state.value + 1
      };
    case "DECREMENT":
      return {
        ...state,
        value: state.value - 1
      };
    default:
      return state;
  }
};

export default appReducer;
