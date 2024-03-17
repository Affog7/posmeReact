import React, { useState } from 'react';
import { saveCustomer } from '../actions/dataActions';

const RegisterCustomerModal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [nom, setNom] = useState('');
    const [tel, setTel] = useState('');
    const [address, setAddress] = useState('');
  
    const handleRegister = (e) => {
      e.preventDefault();
      // Handle registration logic here
      saveCustomer(email,tel,address,nom)
      // Close the modal after registration
      onClose();
    };
  
    return (
      <>
        {isOpen &&
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Nouveau Client</h2>
                <hr/>
                <form onSubmit={handleRegister}>
                  <div className="p-2">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email" 
                      className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="p-2">
                    <label htmlFor="name">Nom:</label>
                    <input
                      type="text" 
                      className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                      id="name"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      required
                    />
                  </div>
                  <div className="p-2">
                    <label htmlFor="tel">Tél:</label>
                    <input
                      type="phone" 
                      className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                      id="tel"
                      value={tel}
                      onChange={(e) => setTel(e.target.value)}
                      required
                    />
                  </div>
                  <div className="p-2">
                    <label htmlFor="email">Adresse:</label>
                    <input
                      type="text" 
                      className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>
                  
                  <button type="submit" className="bg-cyan-500  max-w-md  text-white  w-1/3">VALIDER</button>
                </form>
              </div>
            </div>
          </div>
        }
      </>
    );
  };

export default RegisterCustomerModal;