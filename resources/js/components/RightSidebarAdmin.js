import React, { useState } from 'react'
import {priceFormat, numberFormat} from '../utils/helper'
import {DEVISE} from '../utils/content'
const RightSidebar = (props) => {
    const { cartItems, getTotalPrice,  cash, seller , idInvoice} = props;
    
    return (
      <div className="w-3/12 flex flex-col bg-blue-gray-50 h-full bg-white pr-4 pl-2 py-4">
        <div className="bg-white rounded-3xl flex flex-col h-full shadow">

          { cartItems.length === 0 ?
          
          <div className="flex-1 w-full p-4 opacity-25 select-none flex flex-col flex-wrap content-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p>
              CART EMPTY!
            </p>
          </div>

          :

          <div className="flex-1 flex flex-col overflow-auto">
            <div className="h-16 text-center flex justify-center">
              <div className="pl-8 text-left text-lg py-4 relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <div  className="text-center absolute bg-cyan-500 text-white w-5 h-5 text-xs p-0 leading-5 rounded-full -right-2 top-3">
                  {cartItems.reduce((a, b) => a + (b['qty'] || 0), 0)}
                </div>
              </div>
               
            </div>
            <div className="flex-1 w-full px-4 overflow-auto">
              { cartItems.map(item => (
                <div key={item.id} className="select-none mb-3 bg-blue-gray-50 rounded-lg w-full text-blue-gray-700 py-2 px-2 flex justify-center">
                  <img src={`/${item.image}`}  alt="" className="rounded-lg h-10 w-10 bg-white shadow mr-2" />
                  <div className="flex-grow">
                    <h5 className="text-sm">{ item.name }</h5>
                    <span className="text-xs block">{ priceFormat(item.price) }</span>
                  </div>
                   
                </div>
              ))}
            </div>
          </div>
          }

          <div className="select-none h-auto w-full text-center pt-3 pb-4 px-4">
            <div className="flex mb-3 text-lg font-semibold text-blue-gray-700">
              <div>TOTAL</div>
              <div className="text-right w-full">
                {cartItems.length === 0
                  ? priceFormat(0)
                  : priceFormat(getTotalPrice()) 
                }
              </div>
            </div>
            <div className="mb-3 text-blue-gray-700 px-3 pt-2 pb-3 rounded-lg bg-blue-gray-50">
              <div className="flex text-lg font-semibold">
                <div className="flex-grow text-left">Monnaie</div>
                <div className="flex text-right">
                  <div className="mr-2">{DEVISE}</div>
                  <input readOnly value={numberFormat(cash)} type="text" className="w-28 text-right bg-white shadow rounded-lg focus:bg-white focus:shadow-lg px-2 focus:outline-none" />
                </div>
              </div>
              <hr className="my-2" />
              <div>
                <i>VENTE/CAISSE : {seller} </i>
              </div>
            </div>

           <div className="flex justify-center">
         
            <button onClick={() =>  idInvoice != -1 ?  window.open('/invoice_print/'.concat(idInvoice),'_bank') : {} } disabled={cartItems.length <= 0} className={"flex justify-center m-2 text-lg font-semibold "+( cartItems.length > 0 ? "bg-yellow-300" : "bg-blue-gray-200")+ "  text-red-700 rounded-lg py-2 px-3 w-2/6"}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 25" width="35" height="25" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="5" width="16" height="16" rx="2" ry="2"/>
                <line x1="10" y1="7" x2="14" y2="7"/>
                <line x1="10" y1="11" x2="14" y2="11"/>
                <line x1="10" y1="15" x2="14" y2="15"/>
                <line x1="10" y1="15" x2="14" y2="15"/>
                <line x1="10" y1="19" x2="14" y2="19"/>
                <line x1="7" y1="7" x2="7" y2="17"/>
                <text x="20%" y="50%"  alignment-baseline="bottom" text-anchor="bottom" fontSize="15" fill="#FFFFFF">FAC</text>
              </svg>
            </button>
           </div>
            
          </div>
        </div>
      </div>
    )
}

export default RightSidebar
