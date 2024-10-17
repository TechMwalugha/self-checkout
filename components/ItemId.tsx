'use client'

import { useState } from "react"
import { Button } from "./ui/button"
import { retrieveItem } from "@/lib/actions/item.action"
import { AiOutlineLoading } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notifySuccess } from "@/constants/toast";

const ItemId = (
  { currentCartItems, setCurrentCartItems } :
   { 
    currentCartItems: { name: string; description: string; price: number; image: string; quantity: string;}[];
    setCurrentCartItems : React.Dispatch<React.SetStateAction<{ name: string; description: string; price: number; image: string; quantity: string;}[]>>
  }
  ) => {
    const [itemId, setItemId] = useState<null | string >(() => {
        return null
    })
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    async function onSubmit() {
        setError('')
        setIsLoading(true)
        if(!itemId) {
            setError('Please enter item id')
            setIsLoading(false)
            return
        }

        const result = await retrieveItem({ itemId })

        if(!result.success) {
          setError(result.message as string);
          setIsLoading(false)
          return
        }

        // Check if the item already exists in the current cart items
    const itemExists = currentCartItems.some(item => 
      item.name === result?.item?.name // or any unique identifier
  )

        if(itemExists) {
          setError('Item already in cart');
          setIsLoading(false)

          return
        } 

        setCurrentCartItems((currentItems: any) => {
          return [
            ...currentItems,
            {
              name: result?.item?.name,
              description: result?.item?.description,
              price: result?.item?.price,
              image: result?.item?.image,
              quantity: result?.item?.quantity
            }
          ]
        })

        setIsLoading(false)
        notifySuccess({ message: `${result?.item?.name} added to cart`})
    
    }
  return (
    <div>
        {
         error && <p className="text-red-500 my-3 text-center text-small-medium">{error}</p>
        }
        <ToastContainer />
      <input 
      type="text"
      placeholder="Enter item Id eg. 123456" 
      className="w-full mt-5 outline-none border-none shadow-md p-3 rounded-sm text-small-regular"
      onChange={(e) => setItemId(e.target.value)}
      />
      <Button
      className="mt-4 w-full"
      onClick={onSubmit}
      disabled={isLoading}
      >{
        isLoading ? <div className="flex items-center gap-5">Adding<AiOutlineLoading className="animate-spin" /></div>
        : 'Add to Cart'
      }</Button>
    </div>
  )
}

export default ItemId
