import web from '../utils/web'

export const fetchData = () => {
    return async (dispatch) => {
      try {
        const response = await web('/invoices');
        const data = await response.json();
        dispatch({ type: 'FETCH_DATA_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_DATA_FAILURE', payload: error.message });
      }
    };
  };
  