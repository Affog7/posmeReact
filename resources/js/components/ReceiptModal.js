import React, {useState} from 'react'
import { priceFormat } from '../utils/helper';
import web from '../utils/web'
import LiveSearchComponent from './SearchLive'
import RegisterCustomerModal from '../containers/registerCustomerContainer';
import PaymentForm from '../payments';
const ReceiptModal = (props) => {
    const {showReceiptModal, setShowReceiptModal, receipt, cartItems, getTotalPrice, cash, clt, is_caisse,change, idInvoice, clearAll} = props;
    const [processing, setProcessing] = useState(false)
     const [client_id, setClientId] = useState(clt.id)
    let [is_paid, setIs_paid] = useState(true)
    const [statusPaid, setStatusPaid] = useState("");
    // pour mettre à jour
    const handleDataUpdate  = (value) => {
        setClientId(value);
      };
    
    const printAndCaisse = async () => {
        setIs_paid(false);
        is_paid = false
        
        printAndProceed();
    }

    const printAndProceed = async () => {
        setProcessing(true)
        setIs_paid(true)
        // Store to database
        await web.post('/invoice/store', {
            receipt_number: receipt.receiptNo,
            total_amount: getTotalPrice(),
            cash: cash,
            change: change,
            client: client_id > 0 ? client_id : clt.id,
            is_paid : is_paid,
            is_caisse : is_caisse,
            id_invoice : idInvoice,
            products: cartItems
        })
        .then((response) => {
            setProcessing(false)
        
            if(response.status === 200 && response.data.success === 1) {
                const titleBefore = document.title
                document.title = receipt.receiptNo
                window.print()
                clearAll()
                document.title = titleBefore
            } else {
                alert('Error. Please try again 0');
            }
        } )
        .catch((error) => {
            setProcessing(false)
            console.log(error)
            alert('Error. Please try again 1');
        })
    }

    const Receipt = () => {
        return (
            <div className="text-left w-full text-sm p-6 overflow-auto">
                <div className="text-center">
                    <img src="img/logo.png" className="w-10 m-auto filter grayscale" />
                    <h2 className="text-xl font-semibold">ACTIRY POS</h2>
                    <p>AUGAFF SHOP</p>
                </div>
                <div className="flex mt-4 text-xs">
                    <div className="flex-grow">
                        No : <span>{ receipt.receiptNo} - </span>
                        { is_paid ? " PAIEMENT FAIT " : " PAIEMENT NON FAIT " }
                    
                    </div>
                    <div></div>
                </div>
                <hr className="my-2" />
                <div>
                    <table className="w-full text-xs">
                    <thead>
                        <tr>
                        <th className="py-1 w-1/12 text-center">#</th>
                        <th className="py-1 text-left">Item</th>
                        <th className="py-1 w-2/12 text-center">Qty</th>
                        <th className="py-1 w-3/12 text-right">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        { cartItems.map((item, index) => (
                            <tr key={index}>
                                <td className="py-2 text-center">{ index+1 }</td>
                                <td className="py-2 text-left">
                                <span>{ item.name }</span>
                                <br/>
                                <small>{ priceFormat(item.price) }</small>
                                </td>
                                <td className="py-2 text-center">{ item.qty }</td>
                                <td className="py-2 text-right">{ priceFormat(item.qty*item.price) }</td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                <hr className="my-2" />
                <div>
                    <div className="flex font-semibold">
                        <span className="flex-grow">TOTAL</span>
                        <span>{ priceFormat(getTotalPrice()) }</span>
                    </div>
                    <div className="flex text-xs font-semibold">
                        <span className="flex-grow">PAY AMOUNT</span>
                        <span>{ priceFormat(cash) }</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex text-xs font-semibold">
                        <span className="flex-grow">CHANGE</span>
                        <span>{ priceFormat(change) }</span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            { showReceiptModal &&
            <>
                <div className="hide-print fixed w-full h-screen left-0 top-0 z-10 flex flex-wrap overflow-auto justify-center content-center p-24">
                    <div onClick={() => setShowReceiptModal(false)} className="fixed glass w-full h-screen left-0 top-0 z-0 opacity-100"></div>
                    <div className="w-96 rounded-3xl bg-white shadow-xl overflow-hidden z-10 opacity-100 scale-100">
                        <Receipt />
                         
                          <LiveSearchComponent onUpdateSelectedItem={handleDataUpdate} client={clt.client} />
                        
                        <div className="p-4 w-full text-center">

                        <PaymentForm setStatusPaid = {setStatusPaid}  onPrintAndProceed ={printAndProceed} mustPay ={getTotalPrice()} />
                            {statusPaid}
                            {/* <button disabled={processing} onClick={() => printAndProceed()} className="bg-cyan-500 hover:bg-cyan-400 text-white text-lg px-4 py-3 rounded-2xl w-1/2 focus:outline-none">
                                { processing ? 'Processing..' : 'VALIDER'}
                            </button> */}
                            <hr/>
                            <button disabled={processing || is_caisse}  onClick={() => !is_caisse ? printAndCaisse() : {}} className="bg-yellow-700 hover:bg-cyan-400 text-white text-lg px-4 py-3 rounded-2xl w-1/2 focus:outline-none">
                                { processing ? 'Processing..' : 'CAISSE'}
                            </button>
                        </div>
                        
                    </div>
                </div>
              
                <div className="print-area">
                    <Receipt />
                    
                </div>
            </>
            }
        </>
    )
}

export default ReceiptModal
