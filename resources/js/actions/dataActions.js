
import web from '../utils/web'
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS"
export const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE"
 
// invoices
export const fetchData = () =>  {
    return async (dispatch) => {
      try {
        const response = await web('/invoices');
        const data = await response.data;

        console.log(data)
        dispatch({ type: FETCH_DATA_SUCCESS, payload: data });
      } catch (error) {
        console.log(error)
        dispatch({ type: FETCH_DATA_FAILURE, payload: error.message });
      }
    };
  };
 
  export const  saveCustomer = (email,tel,address,nom) => {
      web.post('saveCustomer', {
          email: email,
          tel: tel,
          address: address,
          name: nom
      }).then((response) => {
          if(response.status === 204) {
              window.location.reload()
          }
      }).catch((error) => { 
          if(error.response.status === 422) {
              alert('Please check your input')
          }else{
              alert('Erreur inconnue Contactez Augustin')
          }
      })
  }

  export const fetchDataSuccess = (data) => ({
    type: FETCH_DATA_SUCCESS,
    payload: data,
  });
