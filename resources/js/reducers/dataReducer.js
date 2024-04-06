// reducer.js
import { FETCH_DATA_SUCCESS } from '../actions/dataActions';
import { FETCH_DATA_SUCCESS1, FETCH_DATA_SUCCESS_H_ALL } from '../actions/historiqueActions';

const initialState = {
  data: [],
  data1: [],
  dataAH: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case FETCH_DATA_SUCCESS1:
      return {
        ...state,
        data1: action.payload,
      };
    case FETCH_DATA_SUCCESS_H_ALL:
      return {
        ...state,
        dataAH: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
