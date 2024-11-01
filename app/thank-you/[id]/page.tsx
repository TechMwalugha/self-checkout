
import CheckoutItem from "@/components/CheckoutItem"
import { Button } from "@/components/ui/button"
import { retrieveCheckOut } from "@/lib/actions/checkout.action"
import { CheckCircledIcon } from "@radix-ui/react-icons"
import Link from "next/link"

export default async function Home( { params } : { params : { id: string }}) { 
    const checkout = await retrieveCheckOut({ apiRef: params.id })

    return (
        <div className="">
            {
                !checkout && <div className="flex items-center justify-center h-screen">
                    <h3 className="">Checkout not found</h3>
                </div>
            }

            {
                checkout && <div>
                    <h2 className="text-center">Hi, <span className="text-green-600">{checkout.fullName}</span> this is your checkout.</h2>

                    <div className="mt-5 md:flex md:items-center md:justify-between md:gap-4">
                        <div className="md:flex-auto">
                            <h3 className="text-lg font-bold">Checkout Details</h3>
                            <div className="shadow-sm p-3 rounded-sm">
                               <p className="flex items-center justify-between mb-3">
                                Name:
                                 <span className="bg-green-500 px-2 rounded-md">{checkout.fullName}</span>
                               </p>
                               <p className="flex items-center justify-between mb-3">
                                Email:
                                 <span className="bg-green-500 px-2 rounded-md">{checkout.email}</span>
                               </p>
                               <p className="flex items-center justify-between mb-3">
                                Phone Number:
                                 <span className="bg-green-500 px-2 rounded-md">{checkout.phoneNumber}</span>
                               </p>
                               <p className="flex items-center justify-between mb-3">
                                Total Price:
                                 <span className="bg-green-500 px-2 rounded-md">{checkout.amount}</span>
                               </p>
                            </div>

                        </div>

                        {
                            !checkout.state && <div className="mt-4 shadow-sm p-3 rounded-sm md:flex-auto">
                            <h4 className="text-center text-[.9em] mb-2">This is the link for your payment. Please click the button below to complete your payment</h4>
                            <Button className="w-full">
                                <Link
                                href={checkout.paymentUrl}
                                className="w-full"
                                >
                                    Payment Link
                                </Link>
                            </Button>
                    </div>
                        }
                    </div>

                    <div className="mt-5 shadow-sm p-3 rounded-sm">
                        <h4 className="text-center">This are your items</h4>

                        <div>
                            {
                                checkout.items.map((item: any, index: number) => (
                                    <CheckoutItem
                                    key={index}
                                    name={item.name}
                                    quantity = {item.quantity}
                                    image = {item.image}
                                    price = {item.price}
                                    frequency = {item.frequency}
                                     />
                                ))
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
