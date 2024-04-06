import React, { useEffect } from 'react';
 
const ReportComponentDisplay = ({ data }) => {
  // Filtrer les détails en fonction de l'action (insert ou update)
  const insertDetails = data?.details?.filter(detail => detail.action === 'insert');
  const updateDetails = data?.details?.filter(detail => detail.action === 'update');

  // Calculer les totaux pour chaque action
  const totalInsert = insertDetails?.reduce((acc, curr) => acc + Number(curr.reports_details[0].total_amount), 0);
  const totalUpdate = updateDetails?.reduce((acc, curr) => acc + Number(curr.reports_details[0].total_amount), 0);

  return (
    <div className="p-1">
        
      <div className="flex justify-center mt-4">
        <h3 className="text-2xl font-bold mb-2">Comptabilité</h3>
      </div>

      <div className="flex flex-row">
      
        <table className="min-w-full bg-white border border-gray-300 shadow">
            <thead>
                <tr className="bg-gray-100">
                    <th className="py-3 px-4 border-b">Montant Total Direct Payé</th>
                    <th className="py-3 px-4 border-b"> Montant Total Direct Impayé </th> 
                </tr>
            </thead>
            <tr className="hover:bg-gray-50 transition-all">
               
                <td className="py-3 px-4 border-b text-center">{data?.montant_total_direct_paye}</td>
            
                <td className="py-3 px-4 border-b text-center">{data?.montant_total_direct_impaye}</td>
            </tr>
        </table>

      </div> <br/>
      <div className="flex flex-row">
      <table className="min-w-full bg-white border border-gray-300 shadow">
            <thead>
                <tr className="bg-gray-100">
                    <th className="py-3 px-4 border-b">Vente</th>
                    <th className="py-3 px-4 border-b"> Caisse </th> 
                </tr>
            </thead>
            <tr className="hover:bg-gray-50 transition-all">
               
                <td className="py-3 px-2 border-b  ">
                    <ul>
                                {insertDetails?.map(detail => (
                                <li key={detail.id} className="mb-4">
                                    <h3 className="text-md font-bold">Modèle: {detail.modele}</h3>
                                    <p>Date de création: {new Date(detail.created_at).toLocaleString()}</p>
                                    <h4 className="text-md font-bold">Rapports:</h4>
                                    <ul>
                                    <li>
                                        <p>Numéro de reçu: {detail.reports_details[0].receipt_number}</p>
                                        <p>Montant total: {detail.reports_details[0].total_amount}</p>
                                        <p>Encaissé: {detail.reports_details[0].cash}</p>
                                        <p>Change: {detail.reports_details[0].change}</p>
                                        <p>Payé: {detail.reports_details[0].is_paid ? 'Oui' : 'Non'}</p>
                                    </li>
                                    </ul>
                                </li>
                                ))}
                    </ul>
                </td>
            
                <td className="py-3 px-2 border-b ">
                    <ul>
                        {updateDetails?.map(detail => (
                        <li key={detail.id} className="mb-4">
                            <h3 className="text-md font-bold">Modèle: {detail.modele}</h3>
                            <p>Date de création: {new Date(detail.created_at).toLocaleString()}</p>
                            <h4 className="text-md font-bold">Rapports:</h4>
                            <ul>
                            <li>
                                <p>Numéro de reçu: {detail.reports_details[0].receipt_number}</p>
                                <p>Montant total: {detail.reports_details[0].total_amount}</p>
                                <p>Encaissé: {detail.reports_details[0].cash}</p>
                                <p>Change: {detail.reports_details[0].change}</p>
                                <p>Payé: {detail.reports_details[0].is_paid ? 'Oui' : 'Non'}</p>
                            </li>
                            </ul>
                        </li>
                        ))}
                    </ul>
                </td>
            </tr>
            <tr className="hover:bg-gray-50 transition-all">
              <td className="py-3 px-4 border-b "> <p className="text-lg font-bold">Total Vente: {totalInsert}</p></td>
              <td className="py-3 px-4 border-b  "> <p className="text-lg font-bold">Total Caisse: {totalUpdate}</p></td>
            </tr>
        </table>
        
      </div> 
      <div className="justify-center mt-2">
        <button  class="text-white rounded-2xl text-lg w-full   focus:outline-none bg-blue-500">EXPORTER</button>
      </div>
    </div>
  );
}; 

export default ReportComponentDisplay;
