'use client'

import Image from "next/image";
import Item from "./Item";
import { cartItems } from "@/constants";
import { useEffect, useState } from "react";
import { ShoppingCartInterface } from "@/interfaces";
import { Button } from "./ui/button";
import { requestPayment } from "@/lib/intasend.payment";

export default function ShoppingCart({ currentCartItems, setCurrentCartItems, totalPrice, setTotalPrice} : ShoppingCartInterface) {
    const [isLoading, setIsLoading] = useState(false)

    function removeAllItems() {
        const confirmWithTheUser = confirm('Are you sure you want to remove all items from the cart?')

        if(confirmWithTheUser) {
            setCurrentCartItems([])
        }
    }

    async function reqPayment() {
        setIsLoading(true)
       const response =  requestPayment()


            setIsLoading(false)
            alert(response)

    }

    return (
        <div className="md:w-3/4 w-full bg-white p-4 shadow-md rounded-md">
           <section className="flex items-center justify-between">
            <h4 className="text-base-regular">Shopping Cart</h4>
            <button 
            type="button"
            className="text-subtle-medium text-red-600 underline hover:no-underline delay-500"
            onClick={removeAllItems}
            >
                Remove all
            </button>
           </section>

           {/* items list */}

           <div className="mt-5">
            {
                currentCartItems.map((item: any, index: number) => {
                    return (
                        <Item
                        key={index}
                        name={item.name}
                        quantity={item.quantity}
                        image={item.image}
                        price={item.price}
                        setTotalPrice={setTotalPrice}
                        currentCartItems={currentCartItems}
                        setCurrentCartItems={setCurrentCartItems}
                        />
                    )
                })
            }

            {
                currentCartItems.length === 0 && (
                    <p className="text-subtle-medium text-center my-6 text-red-400">Cart is empty</p>
                )
            }

            <hr className="my-3" />

            <div className="flex items-center justify-end gap-5">
                <h4 className="text-body-bold">Sub-Total:</h4>
                <h2 className="text-base-semibold">Ksh. {totalPrice}</h2>
            </div>
           </div>

            <hr className="my-3" />

           <Button
           onClick={reqPayment}
           className="w-full mt-3"
           disabled={isLoading}
           >
            {isLoading ? 'Please wait' : `Pay Ksh. ${totalPrice}`}
           </Button>
        </div>
    )
}