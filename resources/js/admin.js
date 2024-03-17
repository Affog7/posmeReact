// App.js
import React, { useEffect , useState} from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import store from './utils/store';
import TableContainer from './containers/TableContainer';
import { fetchData } from './actions/dataActions';
import LeftSidebar from './components/LeftSidebar';
import Layout from './components/Layout';
import RightSidebarAdmin from './components/RightSidebarAdmin';

const Admin = () => {
  const [cartItems, setCartItems] = useState([])
  const [idInvoice, setIdInvoice] = useState(-1)
  const [client, setClient] = useState({})
  const [cash, setCash] = useState(0)
  const [seller, setSeller] = useState("")

  const addMultipleToCart = (item) => {  
    setCartItems(item.products);
    setClient({client : item.client, id : item.client_id});
   // setIdInvoice(item.id)
    setCash(item.change)
    setSeller(item.name)
 };

 const getTotalPrice = () => {
  return cartItems.reduce(
      (total, item) => total + (item['qty']*item['price'] || 0), 0
  )
}

  return (
    <Provider store={store}>
      <div> 
      <Layout>
                <LeftSidebar menu={"/admin/invoices"} />
                <TableContainer addMultipleToCart={addMultipleToCart} setIdInvoice={setIdInvoice} />
                <RightSidebarAdmin                   
                    cartItems = {cartItems}
                    getTotalPrice = {getTotalPrice} 
                    cash = {cash} 
                    seller = {seller}
                    idInvoice = {idInvoice}
      
                />
                
      </Layout>
        
      </div>
    </Provider>
  );
};

export default Admin;
const container =  document.getElementById('admin') 

const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Admin  />);
