import CreateNewItem from "@/components/forms/CreateNewItem";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home () {
    return (
        <div className="flex items-center justify-center flex-col">
            <h2 className="text-heading2-bold mb-5">Welcome back, Mr. Emmanuel Mwalugha</h2>
            <Button asChild>
                <Link href="/admin/checkouts">Check Outs</Link>
            </Button>
            <CreateNewItem />
        </div>
    )
}
