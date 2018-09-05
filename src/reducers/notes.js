// Expenses Reducer


const initialState = [];

export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_NOTES':
      return [
        ...state,
        ...action.note
      ];
     case 'REMOVE_NOTES':
      return state.filter(item => (item._id !== action.id)) ;
      case 'RESET' :
          return initialState;
    default:
      return state;
  }
};
