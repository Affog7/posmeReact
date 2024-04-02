// Setting.js
import React, { useEffect , useState} from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import store from './utils/store';
import Layout from './components/Layout';
import LeftSidebar from './components/LeftSidebar';
import TableComponentHistorique from './components/TableComponentHistorique';
import TableContainer from './containers/TableContainer';
import TableContainerHistorique from './containers/TableContainerHistorique';

const Setting = () => {
  return (
    <Provider store={store}>
      <div> 
        <Layout>
            <LeftSidebar menu={"/settings"} />
           <TableContainerHistorique /> 
        </Layout>
      </div>
    </Provider>
  );
};

export default Setting;
const container =  document.getElementById('settings') 

const root = createRoot(container); 
root.render(<Setting  />);
