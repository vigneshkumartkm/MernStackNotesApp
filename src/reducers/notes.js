// Expenses Reducer


const initialState = [];

export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_NOTES':
      return [
        ...state,
        ...action.note
      ];
     case 'UPDATE_NOTES':
      return state.map(item => {
                       if (item._id == action.updatedNote._id) 
                            { return (action.updatedNote) }
                        else 
                            {return item } })
                       ;
     case 'REMOVE_NOTES':
      return state.filter(item => (item._id !== action.id)) ;
      case 'RESET' :
          return initialState;
    default:
      return state;
  }
};
