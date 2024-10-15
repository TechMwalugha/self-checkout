'use client'
import { useState } from "react"
import { Button } from "./ui/button"

const ItemId = () => {
    const [itemId, setItemId] = useState<null | string >(() => {
        return null
    })
    const [error, setError] = useState('')

    async function onSubmit() {
        setError('')
        if(!itemId) {
            setError('Please enter item id')
            return
        }

        console.log(itemId)
    }
  return (
    <div>
        {
         error && <p className="text-red-500 my-3 text-center text-small-medium">{error}</p>
        }
      <input 
      type="text"
      placeholder="Enter item Id eg. 1908264267" 
      className="w-full mt-5 outline-none border-none shadow-md p-3 rounded-sm text-small-regular"
      onChange={(e) => setItemId(e.target.value)}
      />
      <Button
      className="mt-4 w-full"
      onClick={onSubmit}
      >Add to Cart</Button>
    </div>
  )
}

export default ItemId
