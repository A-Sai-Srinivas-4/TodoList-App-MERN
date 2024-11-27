// Define action types
export const SET_TODOS = "SET_TODOS";
export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const UPDATE_TODO = "UPDATE_TODO";
export const UPDATE_FILTERS_STATUS = "UPDATE_FILTERS_STATUS";
// Explanation: ADD_TODO, DELETE_TODO, UPDATE_TODO are action types

// Define the action structure
interface Action {
  type: string;
  payload: any;
}
// Explanation: type is the action type and payload is the action payload

// Define the reducer function
export const todoReducer = (state: any, action: Action) => {
  switch (action.type) {
    case SET_TODOS:
      return { ...state, todos: action.payload };
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload], // Add new todo to the list
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(
          (todo: { _id: string }) => todo._id !== action.payload // Compare directly with the payload
        ),
      };

    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo: { _id: string }) => {
          if (todo._id === action.payload._id) {
            return {
              ...todo,
              title: action.payload.title,
              status: action.payload.status,
            };
          }
          return todo;
        }),
      };

    case UPDATE_FILTERS_STATUS:
      return {
        ...state,
        filterStatus: action.payload,
      };
    default:
      return state;
  }
};

// Explanation: todoReducer is a function that takes the current state and action and returns the new state based on the action type
