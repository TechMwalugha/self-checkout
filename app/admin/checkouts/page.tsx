import { Button } from "@/components/ui/button"
import { retrieveAllCheckOuts } from "@/lib/actions/checkout.action"
import { formatDateString, hideCenterDigits } from "@/lib/utils"
import Link from "next/link"

export default async function Home () {
    const checkouts = await retrieveAllCheckOuts()

    if(!checkouts.success) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h1>{checkouts.message}</h1>
            </div>
        )
    }

    return (
        <div>
            <Button asChild>
                <Link href="/admin/createItem">Create item</Link>
            </Button>
            <h3 className="text-center text-body-semibold mb-3">This are the checkouts</h3>
            
            {
                checkouts?.data?.map((checkout: any, index: number) => (
                    <Link 
                        key={index}
                        href={`/thank-you/${checkout.apiRef}`} 
                        className="shadow-md p-3 rounded-sm block mb-3"
                        >
                        <h3 className="bg-green-500 flex items-center justify-center w-8 h-8 rounded-full">{index + 1}</h3>
                        <h4>{checkout.fullName}</h4>
                        <h5>{hideCenterDigits(checkout.phoneNumber)}</h5>
                        <p className="text-right text-[.7em]">{formatDateString('2024-11-10')}</p>
                    </Link>
                ))
            }

        </div>
    )
}