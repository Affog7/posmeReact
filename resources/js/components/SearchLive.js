import React, { useState, useEffect } from 'react';
import web from '../utils/web'
import RegisterCustomerModal from '../containers/registerCustomerContainer';

const LiveSearchComponent = ({onUpdateSelectedItem,client}) => {
  const [searchTerm, setSearchTerm] = useState(client);

  const [results, setResults] = useState([]);
 
  const handleSelect = (selectedValue,id) => {
    setSearchTerm(selectedValue); 
    onUpdateSelectedItem(id);
    setResults([]);
  };

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setResults([]);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await web(`/searchCustomerBy/${searchTerm}`);
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchTerm]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="max-w-md mx-auto p-4">

      <div className=" flex justify-center">
        <input
          type="text"
          placeholder="Rechercher client..."
          value={searchTerm}
          required
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
        />
        <button className="bg-cyan-500  max-w-md  text-white  w-1/3 " onClick={toggleModal} >Nouveau</button>
        <RegisterCustomerModal isOpen={isModalOpen} onClose={toggleModal} />
      </div>

      <ul className="mt-2 ">
        {results.map((result) => (
          <li
            key={result.id}
            className="w-1/2 p-2 border-t hover:bg-gray-100 cursor-pointer bg-gray-200"
            onClick={() => handleSelect(result.name,result.id)}
          >
            {result.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LiveSearchComponent;
