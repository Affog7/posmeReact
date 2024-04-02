
import web from '../utils/web'
 
export const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE"
export const FETCH_DATA_SUCCESS1 = "FETCH_DATA_H_SUCCESS"

  export const fetchTodayHistorique = () =>  {
    return async (dispatch) => {
      try {
        const response = await web('/myalltask');
        const data1 = await response.data;
 // console.log(data1);
        dispatch({ type: FETCH_DATA_SUCCESS1, payload: data1 });
      } catch (error) {
     console.log(error)
        dispatch({ type: FETCH_DATA_FAILURE, payload: error.message });
      }
    };
  };
 
  export const fetchDataHSuccess = (data1) => ({
    type: FETCH_DATA_SUCCESS1,
    payload: data1,
  });
  