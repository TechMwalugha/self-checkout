import Image from "next/image";

export default function ShoppingCart() {
    return (
        <div className="md:w-3/4 w-full bg-white p-4 shadow-md rounded-md">
           <section className="flex items-center justify-between">
            <h4 className="text-base-regular">Shopping Cart</h4>
            <button 
            className="text-subtle-medium text-red-600 underline hover:no-underline delay-500"
            >
                Remove all
            </button>
           </section>

           {/* items list */}

           <div className="mt-5">
            <div className="flex items-center justify-between">
                <Image 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3h8Cdh5Uh_-6C6WVs9Pxo8_4aMXkvaQlWfw&s"
                width={50}
                height={50}
                alt="item image"
                />

                <div>
                    <h4 className="text-base-regular">Mumias Sugar</h4>
                    <p className="text-subtle-medium">1 kilogram</p>
                </div>

                <div className="flex items-center justify-between">
                    <button className="bg-gray-400 rounded-full w-6 h-6">+</button>
                    <p className="mx-2 text-subtle-semibold">2</p>
                    <button className="bg-gray-400 rounded-full w-6 h-6">-</button>
                </div>
            </div>
           </div>
        </div>
    )
}