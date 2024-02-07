const initialState = {
  //Initializes a redux state
  user: {},
}; // Initial state of application's store

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload, //payload contains user information after successful login
      };
    case "LOGIN_ERROR":
      return initialState;
    default:
      return initialState;
  }
};
