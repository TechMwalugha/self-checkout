import { Button } from "@/components/ui/button"
import Link from "next/link"


export default async function Home () {

  return <div className="center-object">
      <div className="flex items-center justify-center flex-col">
        <h2  className="text-heading1-bold text-center bg-white text-[#202c2d] text-shadow-home">Welcome to COSF Supermarket Self Shopping</h2>
        <Button className="mt-10" asChild>
          <Link href="/shop">Shop</Link>
        </Button>
      </div>
    </div>
}
