import React, {useState, useEffect} from 'react'
import web from '../utils/web'
import {priceFormat} from '../utils/helper'
import ContentLoader from 'react-content-loader'

const CaisseMode = (props) => {
    const [invoices, setInvoices] = useState([]);
    const [search, setSearch] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const { addMultipleToCart } = props

    useEffect(() => {
        const fetchData = async () => {
          try {
            setIsLoading(true);
            const result = await web('/invoices');
            setInvoices(result.data);
          } catch (error) {
            console.error('Error fetching invoices:', error);
            // Gérez l'erreur selon vos besoins, par exemple, affichez un message d'erreur à l'utilisateur
          } finally {
            setIsLoading(false);
          }
        };
      
        fetchData(); // Appeler fetchData lors du montage
      
        const intervalId = setInterval(fetchData, 1000); // Appeler fetchData chaque seconde
      
        // Nettoyer l'intervalle lors du démontage du composant
        return () => clearInterval(intervalId);
      }, []);
      
    const InvoiceLoading = props => (
        <ContentLoader
            //width={450}
            height={300}
            //viewBox=""
            backgroundColor="#ffffff"
            foregroundColor="#f0f0f0"
            {...props}
        >          
            <rect x="0" y="235" rx="4" ry="4" width="100" height="9" />
            <rect x="160" y="235" rx="3" ry="3" width="100" height="9" />
            <rect x="0" y="10" rx="10" ry="10" width="300" height="217" />

        </ContentLoader>
    )

    return (
        <div className="w-6/12 flex-grow flex">
            <div className="flex flex-col bg-blue-gray-50 h-full w-full py-4">
                <div className="flex px-2 flex-row relative">
                    <div className="absolute left-5 top-3 px-2 py-2 rounded-full bg-cyan-500 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input onChange={(e) => setSearch(e.target.value)} type="text" className="bg-white rounded-3xl shadow text-lg full w-full h-16 py-4 pl-16 transition-shadow focus:shadow-2xl focus:outline-none" placeholder="Rechercher une commande..." />
                    </div>
                    <div className="h-full overflow-hidden mt-4">
                    <div className="h-full overflow-y-auto px-2">
                        
                        {/* Ini untuk kalo ga ada product sama sekali */}
                        { (invoices.length === 0 && isLoading === false) &&
                        <div className="select-none bg-blue-gray-100 rounded-3xl flex flex-wrap content-center justify-center h-full opacity-25">
                            <div className="w-full text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                                </svg>
                                <p className="text-xl">
                                YOU DON'T HAVE
                                <br/>
                                ANY INVOICE TO SHOW
                                </p>
                            </div>
                        </div>
                        }

                        { (invoices.length === 0 && isLoading === true) &&

                        <div className="grid grid-cols-4 gap-4 pb-1">
                            {
                                [1,2,3,4,5,6,7,8,9,10].map((item) => (
                                    <InvoiceLoading key={item} className="w-full" />
                                ))
                            }
                        </div>
                        }

                        {/* Ceci est pour quand les résultats de la recherche sont vides*/}
                        { ( invoices.filter((data) => {
                                if(search == null)
                                    return data
                                else if(
                                    data.receipt_number.toLowerCase().includes(search.toLowerCase()) ||
                                    data.client.toLowerCase().includes(search.toLowerCase()) ||
                                    data.created_invoice.toLowerCase().includes(search.toLowerCase()) ||
                                    data.total_amount.toLowerCase().includes(search.toLowerCase()) ||
                                    data.name.toLowerCase().includes(search.toLowerCase())
                                ){
                                    return data
                                }
                            }).length === 0 && search != null) &&
                            <div className="select-none bg-blue-gray-100 rounded-3xl flex flex-wrap content-center justify-center h-full opacity-25">
                                <div className="w-full text-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <p className="text-xl">
                                    EMPTY SEARCH RESULT
                                    <br/>
                                    "<span className="font-semibold"></span>"
                                    </p>
                                </div>
                            </div>
                        }

                        {/* Ceci est pour la liste des produits */}
                        <div className="grid grid-cols-4 gap-4 pb-3">
                            { invoices.filter((data)=>{
                                    if(search == null)
                                        return data
                                    else if(
                                        data.receipt_number.toLowerCase().includes(search.toLowerCase()) ||
                                        data.client.toLowerCase().includes(search.toLowerCase()) ||
                                        data.created_invoice.toLowerCase().includes(search.toLowerCase()) ||
                                        data.name.toLowerCase().includes(search.toLowerCase())
                                        ){
                                        return data
                                    }
                                }).map( item => (
                                    <div>
                                         <div onClick={ () => addMultipleToCart(item.products,{client : item.client, id : item.client_id},item.id)} key={item.id} role="button" 
                                    className={`select-none cursor-pointer transition-shadow overflow-hidden rounded-2xl  ${item.is_paid ==1 ? 'bg-green-300' : 'bg-yellow-300'} shadow hover:shadow-lg`}>
                                    <div className="w-full p-5">
                                       <span className="flex-grow truncate mr-1" >{ item.client }</span><br/>
                                       <i>VD : { item.name }</i>
                                    </div>
                                    <div className="flex pb-3 px-3 text-sm -mt-3">
                                        <p className="flex-grow truncate mr-1">{ item.receipt_number }</p>
                                        <p className="nowrap font-semibold">{ priceFormat(item.total_amount) }</p>
                                    </div>
                                    
                                </div>
                                <div className="flex mt-2 text-sm  ">
                                        <span > 
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" fill="#000000">
                                                <g>
                                                    <path d="M20 2H18V0H16V2H8V0H6V2H4C2.9 2 2 2.9 2 4V20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V4C22 2.9 21.1 2 20 2zM20 20H4V8H20V20z"/>
                                                    <path d="M16 10H8V12H16V10z"/>
                                                    <path d="M16 14H8V16H16V14z"/>
                                                </g> 
                                            </svg> 
                                        </span>
                                        <span className="">{ item.created_invoice }</span>
                                </div>
                               
                                </div>
                            ))}
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CaisseMode
