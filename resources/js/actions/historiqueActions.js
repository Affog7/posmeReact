
import web from '../utils/web'
 
export const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE"
export const FETCH_DATA_SUCCESS1 = "FETCH_DATA_H_SUCCESS"
export const FETCH_DATA_SUCCESS_H_ALL = "FETCH_DATA_H_SUCCESS_ALL"
export const FETCH_DATA_SUCCESS_REPORTS = "FETCH_DATA_SUCCESS_REPORT"

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
  export const fetchAllHistorique = () =>  {
    return async (dispatch) => {
      try {
        const response = await web('/getAllTasks');
        const data = await response.data;

        dispatch({ type: FETCH_DATA_SUCCESS_H_ALL, payload: data });
      } catch (error) {
     console.log(error)
        dispatch({ type: FETCH_DATA_FAILURE, payload: error.message });
      }
    };
  };

  export const fetchDayHistorique = (dateat) =>  {
    return async (dispatch) => {
      await web.post('/myalltask/at/', {
        dateat: dateat,
    })
    .then((response) => {
        if(response.status === 200 ) { 
         const data =  response.data;
          dispatch({ type: FETCH_DATA_SUCCESS1, payload: data });
        } else {
            alert('Error. Please try again 0');
        }
    } )
    .catch((error) => {
        console.log(error)
        alert('Error. Please try again 1');
        dispatch({ type: FETCH_DATA_FAILURE, payload: error.message });
    })
    };
  };

  export const fetchReportData = (dateat) =>  {
    return async (dispatch) => {
      await web.post('/myallreports', {
        dateat: dateat,
    })
    .then((response) => {
        if(response.status === 200 ) { 
         const data =  response.data;
          dispatch({ type: FETCH_DATA_SUCCESS_REPORTS, payload: data });
        } else {
            alert('Error. Please try again 0');
        }
    } )
    .catch((error) => {
        console.log(error)
        alert('Error. Please try again 1');
        dispatch({ type: FETCH_DATA_FAILURE, payload: error.message });
    })
    };
  };
 
  export const fetchDataReportSuccess = (data) => ({
    type: FETCH_DATA_SUCCESS_REPORTS,
    payload: data,
  });

  export const fetchDataHSuccess = (data) => ({
    type: FETCH_DATA_SUCCESS1,
    payload: data,
  });

  export const fetchDataAHSuccess = (data) => ({
    type: FETCH_DATA_SUCCESS_H_ALL,
    payload: data,
  });
  