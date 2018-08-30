// Expenses Reducer


const initialState = [];

export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_NOTES':
      return [
        ...state,
        ...action.note
      ];
      case 'RESET' :
          return initialState;
    default:
      return state;
  }
};
