// TableComponent.js
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faExchangeAlt, faUser, faCalendarAlt, faFileAlt, faCheck, faTimes, faEdit, faTrash, faEyeSlash, faInfoCircle, faFolderOpen, faBank, faMoneyBillAlt, faMoneyBillWave, faMoneyBills, faWallet } from '@fortawesome/free-solid-svg-icons';
import { fetchDayHistorique } from '../actions/historiqueActions';
import TableContainerHistorique from '../containers/TableContainerHistorique';

const TableComponentAllHistorique = ({ data1,fetchHData, fetchDataHSuccess, handleEdit, handleReport  }) => {
  const [filter, setFilter] = useState({ total: '', date: '' });

  useEffect(() => {
    fetchHData();
  }, [fetchDataHSuccess]);

  const filteredData = data1.filter((item) => {
    if (filter.date) {
      const formattedItemDate = new Date(item.date).toLocaleString().toUpperCase();
      const formattedFilterDate = new Date(filter.date).toLocaleString().toUpperCase();
      return formattedItemDate.includes(formattedFilterDate);
    } else {
      return true;
    }
  });
  
  const handleFilterChange = (e, filterType) => {
    setFilter({ ...filter, [filterType]: e.target.value });
  };
  
  return (
    <div className="overflow-x-auto p-1 m-1 rounded-md " style={{ backgroundColor: '#e9e9e9a3'  }} >
       <div className="flex justify-center mt-4">
        <h3 className="text-2xl font-bold mb-2">Date</h3>
      </div>
      <div className="flex justify-center mb-4">
         
        <input
          type="date"
          placeholder="Date"
          value={filter.date}
          onChange={(e) => handleFilterChange(e, 'date')}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        /> 
      </div>

      <table className="min-w-full bg-white border border-gray-300 shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 border-b"><FontAwesomeIcon icon={faCalendarAlt} className="mr-2" /> Date</th>
            <th className="py-3 px-4 border-b"><FontAwesomeIcon icon={faWallet} className="mr-2" /> Total </th>
            <th className="py-3 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 transition-all">
              <td className="py-3 px-4 border-b text-center">{item.date}</td>
              <td className="py-3 px-4 border-b text-center">{item.total}</td>
               
              <td className="py-3 px-4 border-b">

                <button onClick={() => handleEdit(item.date)} className="text-blue-500 mr-2 focus:outline-none">
                  <FontAwesomeIcon icon={faFolderOpen} />
                </button>

                <button onClick={() => handleReport(item.date)} className="text-yellow-500 mr-2 focus:outline-none">
                  <FontAwesomeIcon icon={faMoneyBills} />
                </button>
                 
              </td>

            </tr>
          ))}
        </tbody>
      </table>
     
      <TableContainerHistorique  />
    </div>
  );
};

export default TableComponentAllHistorique;
