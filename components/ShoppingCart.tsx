'use client'

import Image from "next/image";
import Item from "./Item";
import { cartItems } from "@/constants";
import { useEffect, useState } from "react";

export default function ShoppingCart() {

    const [currentCartItems, setCurrentCartItems] = useState<{ name: string; quantity: string; image: string; price: number; }[]>(cartItems)
    
    // // Use useEffect to safely access localStorage on the client side
    // useEffect(() => {
    //     const storedItems = localStorage.getItem('storedCartItems')
    //     if (storedItems && JSON.parse(storedItems).length !== 0) {
    //         setCurrentCartItems(JSON.parse(storedItems));
    //     } else if(storedItems) {
    //         localStorage.setItem('storedCartItems', JSON.stringify([]));
            
    //     }
    // }, []); // Runs once when the component mounts

    
    const [totalPrice, setTotalPrice] = useState(currentCartItems.reduce((acc, item) => acc + item.price, 0))

    // Update localStorage whenever currentCartItems changes
    // useEffect(() => {
    //     localStorage.setItem('storedCartItems', JSON.stringify(currentCartItems));
    //     const newTotalPrice = currentCartItems.reduce((acc, item) => acc + item.price, 0);
    //     setTotalPrice(newTotalPrice);
    // }, [currentCartItems]);

    function removeAllItems() {
        const confirmWithTheUser = confirm('Are you sure you want to remove all items from the cart?')

        if(confirmWithTheUser) {
            setCurrentCartItems([])
        }
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
                <h4 className="text-body-bold">Sub-Total</h4>
                <h2 className="text-heading3-bold">Ksh. {totalPrice}</h2>
            </div>
           </div>

        </div>
    )
}