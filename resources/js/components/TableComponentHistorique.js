// TableComponent.js
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faExchangeAlt, faUser, faCalendarAlt, faFileAlt, faCheck, faTimes, faEdit, faTrash, faEyeSlash, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const TableComponentHistorique = ({ data1,fetchHData, fetchDataHSuccess  }) => {
  const [filter, setFilter] = useState({ action: '', modele: '' });

  useEffect(() => {
    fetchHData();
  }, [fetchDataHSuccess]);
 
  const filteredData = data1.filter((item) =>
  item.action.toUpperCase().includes(filter.action.toUpperCase()) &&
  item.modele.toUpperCase().includes(filter.modele.toUpperCase()) 
);
  const handleFilterChange = (e, filterType) => {
    setFilter({ ...filter, [filterType]: e.target.value });
  };
  return (
    <div className="overflow-x-auto p-2">
      <div className="flex justify-center mt-4">
        <h3 className="text-2xl font-bold mb-2">Filtres</h3>
      </div>
        
      <div className="flex justify-center mb-4">
        
        <input
          type="text"
          placeholder="Action"
          value={filter.action}
          onChange={(e) => handleFilterChange(e, 'action')}
          className="px-4 py-2 mr-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500"
          />
   
        <input
          type="text"
          placeholder="Modele"
          value={filter.modele}
          onChange={(e) => handleFilterChange(e, 'modele')}
          className="px-4 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:border-blue-500"
        /> 
      </div>

      <table className="min-w-full bg-white border border-gray-300 shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 border-b"><FontAwesomeIcon icon={faUser} className="mr-2" /> Modele</th>
            <th className="py-3 px-4 border-b"><FontAwesomeIcon icon={faCalendarAlt} className="mr-2" /> Action</th>
            <th className="py-3 px-4 border-b"><FontAwesomeIcon icon={faFileAlt} className="mr-2" /> Date</th>
             
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 transition-all">
              <td className="py-3 px-4 border-b text-center">{item.modele}</td>
              <td className="py-3 px-4 border-b text-center">{item.action}</td>
              <td className="py-3 px-4 border-b text-center">{new Date(item.created_at).toLocaleString()}</td> 
               
            </tr>
          ))}
        </tbody>
      </table>
     
    </div>
  );
};

export default TableComponentHistorique;
