// TableComponent.js
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faExchangeAlt, faUser, faCalendarAlt, faFileAlt, faCheck, faTimes, faEdit, faTrash, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const TableComponent = ({ data, fetchData, fetchDataSuccess,addMultipleToCart }) => {
  const [filter, setFilter] = useState({ receiptNumber: '', clientName: '', creationDate: '' });

  useEffect(() => {
    fetchData();
  }, [fetchDataSuccess]);

  const handleEdit = (id) => {
    // Ajouter la logique d'édition ici
    console.log(`Éditer l'élément avec l'ID ${id}`);
  };

  const handleDetails = (item) => {
    addMultipleToCart(item)
    //console.log(`Supprimer l'élément avec l'ID ${id}`);
  };
  const filteredData = data.filter((item) =>
  item.receipt_number.toUpperCase().includes(filter.receiptNumber.toUpperCase()) &&
  item.client.toUpperCase().includes(filter.clientName.toUpperCase()) &&
  item.created_invoice.toUpperCase().includes(filter.creationDate.toUpperCase())
);
  const handleFilterChange = (e, filterType) => {
    setFilter({ ...filter, [filterType]: e.target.value });
  };
  return (
    <div className="overflow-x-auto ">
      <div className="flex justify-center mt-4"><h1 className="text-2xl font-bold mb-2">Filtres</h1></div>
        <div className="flex justify-center mb-4">
        
        <input
          type="text"
          placeholder="Numéro de reçu"
          value={filter.receiptNumber}
          onChange={(e) => handleFilterChange(e, 'receiptNumber')}
          className="px-4 py-2 mr-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500"
          />
        <input
          type="text"
          placeholder="Nom du client"
          value={filter.clientName}
          onChange={(e) => handleFilterChange(e, 'clientName')}
          className="px-4 py-2 border mr-2 border-gray-300 focus:outline-none"
        />
        <input
          type="text"
          placeholder="Date de création"
          value={filter.creationDate}
          onChange={(e) => handleFilterChange(e, 'creationDate')}
          className="px-4 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:border-blue-500"
        />
      </div>

      <table className="min-w-full bg-white border border-gray-300 shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 border-b"><FontAwesomeIcon icon={faUser} className="mr-2" /> Client</th>
            <th className="py-3 px-4 border-b"><FontAwesomeIcon icon={faCalendarAlt} className="mr-2" /> Date de création</th>
            <th className="py-3 px-4 border-b"><FontAwesomeIcon icon={faFileAlt} className="mr-2" /> Numéro de reçu</th>
            <th className="py-3 px-4 border-b"><FontAwesomeIcon icon={faMoneyBill} className="mr-2" /> Montant total</th>
            <th className="py-3 px-4 border-b"><FontAwesomeIcon icon={faExchangeAlt} className="mr-2" /> Monnaie</th>
            <th className="py-3 px-4 border-b"><FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2" /> Payé</th>
            <th className="py-3 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 transition-all">
              <td className="py-3 px-4 border-b text-center">{item.client}</td>
              <td className="py-3 px-4 border-b text-center">{item.created_invoice}</td>
              <td className="py-3 px-4 border-b text-center">{item.receipt_number}</td>
              <td className="py-3 px-4 border-b text-center">{item.total_amount}</td>
              <td className="py-3 px-4 border-b text-center">{item.change}</td>
              <td className="py-3 px-4 border-b text-center">
                {item.is_paid
                ? <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                : <FontAwesomeIcon icon={faTimes} className="text-red-500" />
                }
              </td>
              <td className="py-3 px-4 border-b">
                <button onClick={() => handleEdit(item.id)} className="text-blue-500 mr-2 focus:outline-none">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                 
                <button onClick={() => handleDetails(item)} className="text-yellow-500 focus:outline-none">
                  <FontAwesomeIcon icon={faEyeSlash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
