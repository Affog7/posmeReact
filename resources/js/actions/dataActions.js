
import { useState } from 'react';
import web from '../utils/web'
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS"
export const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE"
 
// invoices
export const fetchData = () =>  {
    return async (dispatch) => {
      try {
        const response = await web('/invoices');
        const data = await response.data;

        //console.log(data)
        dispatch({ type: FETCH_DATA_SUCCESS, payload: data });
      } catch (error) {
        console.log(error)
        dispatch({ type: FETCH_DATA_FAILURE, payload: error.message });
      }
    };
  };

export const useSaveCustomer = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const saveCustomer = (email, tel, address, nom) => {
    setLoading(true);
    try {
      web.post('saveCustomer', {
        email: email,
        tel: tel,
        address: address,
        name: nom
    }).then((response) => {
      if (response.status === 204) {
        window.location.reload();
      } else if (response.status === 200) {
        setData(response.data);
      }
    }) 
    } catch (error) {
      if (error.response.status === 422) {
        alert('Please check your input');
      } else {
        alert('Erreur inconnue Contactez Augustin');
      }

      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, saveCustomer };
};

  export const fetchDataSuccess = (data) => ({
    type: FETCH_DATA_SUCCESS,
    payload: data,
  });
