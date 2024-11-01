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
}

const CheckoutItem = ({name, quantity, image, price, frequency}: Item) => {

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
                    
                    <p className=" text-subtle-semibold bg-slate-500 flex items-center justify-center p-3 rounded-md">{frequency}</p>

                </div>

                <div className="flex items-center flex-col">
                    <h3>Ksh. {formatCurrency(price * frequency)}</h3>
                </div>
            </div>
  )
}

export default CheckoutItem
