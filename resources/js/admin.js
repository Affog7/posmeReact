import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom' 

import Layout from './components/Layout'
import LeftSidebar from './components/LeftSidebar' 
import TableContainer from './containers/TableContainer'
import { Provider } from 'react-redux';
import store from './utils/store';
import AdminContainer from './containers/AdminContainer';
const Admin = () => {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            setIsLoading(true);
            const result = await web('/invoices');
            setInvoices(result.data);
          } catch (error) {
            console.error('Error fetching invoices:', error);
            // Gérez l'erreur selon vos besoins, par exemple, affichez un message d'erreur à l'utilisateur
          } finally {
            setIsLoading(false);
          }
        };
      
        fetchData(); // Appeler fetchData lors du montage
      
        const intervalId = setInterval(fetchData, 1000); // Appeler fetchData chaque seconde
      
        // Nettoyer l'intervalle lors du démontage du composant
        return () => clearInterval(intervalId);
      }, []);

    return (
        <>
            <Layout>
                <LeftSidebar menu={"/admin"} />
                <AdminContainer />
            </Layout>
           
        </>
    )
}

ReactDOM.render(
    <Provider store={store}>
        <Admin />
    </Provider>,
      document.getElementById('admin') )