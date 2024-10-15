import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Scanner from "@/components/Scanner"
import ItemId from "@/components/ItemId"
import ShoppingCart from "@/components/ShoppingCart"

const Home = () => {
    return (
        <div className="flex items-center justify-center flex-col w-full mt-5">
            <Tabs defaultValue="qr-code" className="sm:w-[400px] w-full">
                <TabsList className="w-full flex items-center justify-between bg-black">
                    <TabsTrigger value="qr-code">Use Qr Code Scanner</TabsTrigger>
                    <TabsTrigger value="item-id">Enter Item ID</TabsTrigger>
                </TabsList>
                <TabsContent value="qr-code">
                    <Scanner />
                </TabsContent>
                <TabsContent value="item-id">
                    <ItemId />
                </TabsContent>
            </Tabs>

            <hr className="bg-black my-5 w-full" />

            <ShoppingCart/>
        </div>
    )
}

export default Home