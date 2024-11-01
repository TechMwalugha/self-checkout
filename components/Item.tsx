'use client'
import { formatCurrency } from "@/lib/utils";
import Image from "next/image"
import { useState } from "react"

type Item = {
    name: string;
    quantity: string;
    image: string;
    price: number;
    frequency: number; 
    setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
    currentCartItems: { name: string; description: string; price: number; image: string; quantity: string; frequency: number; }[];
    setCurrentCartItems: React.Dispatch<React.SetStateAction<{ name: string; description: string; price: number; image: string; quantity: string; frequency: number; }[]>>
}

const Item = ({name, quantity, image, price, frequency, setTotalPrice, currentCartItems, setCurrentCartItems}: Item) => {

    // const [numberOfItems, setNumberOfItems] = useState(1)

    if(!frequency) {
        frequency = 1
    }

    currentCartItems.map((item: any) => {
        if (item.name === name) {
            item.frequency = frequency
        }

    })

    function addNoItem() {

        setTotalPrice((totalPrice: number) => {
            return totalPrice + price * 1
        })

       currentCartItems.map((item: any) => {
            if (item.name === name) {
                item.frequency = frequency + 1
            }

        })

    }

    function removeNoItem() {
        if(frequency > 1 ) { 

            setTotalPrice((totalPrice: number) => {
                return totalPrice - price * 1
            })

            currentCartItems.map((item: any) => {
                if (item.name === name) {
                    item.frequency = frequency - 1
                }
    
            })

        }
    }

    // remove this item from the cart
    
    function removeItem() {
        const newCartItems = currentCartItems.filter((item: any) => item.name !== name)
        setCurrentCartItems(newCartItems)

        setTotalPrice((totalPrice: number) => {
            return totalPrice - price * frequency
        })
    }
  return (
    <div className="flex items-center justify-between mb-3">
                <Image 
                src={image}
                width={50}
                height={50}
                alt={`${name} image`}
                />

                <div className="">
                    <h4 className="text-base-regular">{name}</h4>
                    <p className="text-subtle-medium">{quantity}</p>
                </div>

                <div className="flex items-center justify-between">
                    <button 
                    type="button" 
                    className="bg-gray-400 rounded-full w-6 h-6"
                    onClick={addNoItem}
                    >
                        +
                    </button>
                    <p className="mx-2 text-subtle-semibold">{frequency}</p>
                    <button  
                    type="button"
                    className="bg-gray-400 rounded-full w-6 h-6"
                    onClick={removeNoItem}
                    >
                        -
                    </button>

                </div>

                <div className="flex items-center flex-col">
                    <h3>{formatCurrency(price * frequency)}</h3>
                    <button 
                    type="button"
                     className="text-subtle-medium text-red-600 underline hover:no-underline delay-500 text-center"
                     onClick={removeItem}
                     >
                       Remove
                    </button>
                </div>
            </div>
  )
}

export default Item
