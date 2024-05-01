// Setting.js
import React, { useEffect , useState} from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import store from './utils/store';
import Layout from './components/Layout';
import LeftSidebar from './components/LeftSidebar';
import TableContainerAllHistorique from './containers/TableContainerAllHistorique';
import ReportsContainer from './containers/ReportContainer';
import { HREF_ADMIN_SETTING, PAGE_SETTING_ID } from './utils/content';

const Setting = () => {
  return (
    <Provider store={store}>
      <div> 
        <Layout>
            <LeftSidebar menu={HREF_ADMIN_SETTING} />
           <TableContainerAllHistorique /> 
           <ReportsContainer /> 
           
        </Layout>
 
      </div>           

    </Provider>
  );
};

export default Setting;
const container =  document.getElementById(PAGE_SETTING_ID) 

const root = createRoot(container); 
root.render(<Setting  />);
