import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckOutForm = ()=>{

    return(
        <>
            <form>
                <CardElement/>
                <button >
                    Buy
                </button>
            </form>    
        </>
    )
}

export default function CheckOut(){
    return (
        <>
            <CheckOutForm/>
        </>
    )
}