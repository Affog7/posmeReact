// App.js
import React, { useEffect , useState} from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import store from './utils/store';
import TableContainer from './containers/TableContainer';
import LeftSidebar from './components/LeftSidebar';
import Layout from './components/Layout';
import RightSidebarAdmin from './components/RightSidebarAdmin';
import { HREF_ADMIN_INVOICE, PAGE_ADMIN_ID } from './utils/content';

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
                <LeftSidebar menu={HREF_ADMIN_INVOICE} />
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
const container =  document.getElementById(PAGE_ADMIN_ID) 

const root = createRoot(container);  
root.render(<Admin  />);
