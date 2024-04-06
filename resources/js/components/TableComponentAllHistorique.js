// TableComponent.js
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faExchangeAlt, faUser, faCalendarAlt, faFileAlt, faCheck, faTimes, faEdit, faTrash, faEyeSlash, faInfoCircle, faFolderOpen, faBank, faMoneyBillAlt, faMoneyBillWave, faMoneyBills } from '@fortawesome/free-solid-svg-icons';
import { fetchDayHistorique } from '../actions/historiqueActions';

const TableComponentAllHistorique = ({ data1,fetchHData, fetchDataHSuccess, handleEdit  }) => {
  const [filter, setFilter] = useState({ total: '', date: '' });

  useEffect(() => {
    fetchHData();
  }, [fetchDataHSuccess]);

  const filteredData = data1.filter((item) =>
  item.date.toUpperCase().includes(filter.date.toUpperCase()) 
);
  const handleFilterChange = (e, filterType) => {
    setFilter({ ...filter, [filterType]: e.target.value });
  };
  return (
    <div className="overflow-x-auto ">
      <div className="flex justify-center mt-4">
        <h1 className="text-2xl font-bold mb-2">Filtres</h1>
      </div>
        
      <div className="flex justify-center mb-4">
        
        <input
          type="number"
          placeholder="total"
          value={filter.action}
          onChange={(e) => handleFilterChange(e, 'total')}
          className="px-4 py-2 mr-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500"
          />
   
        <input
          type="date"
          placeholder="Date"
          value={filter.date}
          onChange={(e) => handleFilterChange(e, 'date')}
          className="px-4 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:border-blue-500"
        /> 
      </div>

      <table className="min-w-full bg-white border border-gray-300 shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 border-b"><FontAwesomeIcon icon={faCalendarAlt} className="mr-2" /> Date</th>
            <th className="py-3 px-4 border-b"><FontAwesomeIcon icon={faUser} className="mr-2" /> Total </th>
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

                <button onClick={() => handleEdit(item.date)} className="text-blue-500 mr-2 focus:outline-none">
                  <FontAwesomeIcon icon={faMoneyBills} />
                </button>
                 
              </td>

            </tr>
          ))}
        </tbody>
      </table>
     
    </div>
  );
};

export default TableComponentAllHistorique;
