import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import {dateFormat} from './utils/helper'

import Layout from './components/Layout'
import LeftSidebar from './components/LeftSidebar'
import ReceiptModal from './components/ReceiptModal'
import RightSidebar from './components/RightSidebar'
import ProductMode from './pages/ProductMode'
import { AUDIO_21, AUDIO_29, HREF_HOME, PAGE_HOME_ID, SHOP_POS_CODE } from './utils/content'
import Popup from './client/Popup'

const App = () => {
    const [cartItems, setCartItems] = useState([])
    const [cash, setCash] = useState(0)
    const [change, setChange] = useState(0)
    const [showReceiptModal, setShowReceiptModal] = useState(false)
    const [receipt, setReceipt] = useState({})

    useEffect(() => {
        updateChange()
    }, [cash,cartItems])

    const playSound = (src) => {
        let sound = new Audio();
        sound.src = src;
        sound.play();
        sound.onended = () => sound = null;
    }

    const beep = () => {
        playSound(AUDIO_29);
    }

    const clearSound = () => {
        playSound(AUDIO_21);
    }

    const getTotalPrice = () => {
        return cartItems.reduce(
            (total, item) => total + (item['qty']*item['price'] || 0), 0
        )
    }

    const addToCart = (product) => {
        const exist = cartItems.find((item) => item.id === product.id)

        if(exist) {
            setCartItems(
                cartItems.map((item) =>
                    item.id === product.id ? { ...exist, qty: exist.qty + 1 } : item 
                )
            )
        }else{
            setCartItems([...cartItems, {...product, qty: 1}])
        }

        beep();
    }

    const removeFromCart = (product) => {
        const exist = cartItems.find((item) => item.id === product.id)
        if(exist.qty === 1) {
            setCartItems(cartItems.filter((item) => item.id !== product.id))
            clearSound()
        }else{
            setCartItems(
                cartItems.map((item) =>
                    item.id === product.id ? { ...exist, qty: exist.qty - 1 } : item 
                )
            )
            beep()
        }
    }

    const updateChange = () => {
        setChange(cash-getTotalPrice())
    }

    const addCash = (amount) => {
        setCash(cash+amount)
        beep()
    }

    const clearCart = () => {
        setCartItems([])
        clearSound()
    }

    const submit = () => {
        const time = new Date();
        setShowReceiptModal(true)
        setReceipt({
            receiptNo : `${SHOP_POS_CODE}-${Math.round(time.getTime() / 1000)}`,
            receiptDate : dateFormat(time)
        })
    }

    const clearAll = () => {
        setShowReceiptModal(false)
        setCartItems([])
        setReceipt({})
        setCash(0)
        setChange(0)
    }

    return (
        <>
        <Popup />
            <Layout>

                <LeftSidebar ClassName="" menu={HREF_HOME} />
                <ProductMode addToCart={addToCart} />
                <RightSidebar
                    clearCart={clearCart}
                    removeFromCart={removeFromCart}
                    addToCart={addToCart}
                    cartItems={cartItems}
                    getTotalPrice={getTotalPrice}
                    addCash={addCash}
                    cash={cash}
                    change={change}
                    idInvoice ={-1}
                    submit={submit}
                    
                />
            </Layout>
            
            <ReceiptModal
                showReceiptModal={showReceiptModal}
                setShowReceiptModal={setShowReceiptModal}
                receipt={receipt}
                cartItems={cartItems}
                getTotalPrice={getTotalPrice}
                cash={cash}
                clt={{client : "", id: -1}}
                is_caisse = {false}
                change={change}
                idInvoice = {-1}
                clearAll={clearAll}
            />
        </>
    )
}

ReactDOM.render( <App />, document.getElementById(PAGE_HOME_ID) )